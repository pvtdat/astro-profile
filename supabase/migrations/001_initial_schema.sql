create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  category text,
  issue_date date,
  credential_id text,
  credential_url text,
  description text,
  image_url text,
  skills text[] not null default '{}',
  featured boolean not null default false,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists certifications_set_updated_at on public.certifications;
create trigger certifications_set_updated_at
before update on public.certifications
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.certifications enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using (id = auth.uid());

create policy "Anyone can read published certifications"
  on public.certifications for select to anon, authenticated
  using (published = true or public.is_admin());

create policy "Admins can create certifications"
  on public.certifications for insert to authenticated
  with check (public.is_admin());

create policy "Admins can update certifications"
  on public.certifications for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete certifications"
  on public.certifications for delete to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('certifications', 'certifications', true)
on conflict (id) do nothing;

create policy "Admins can upload certification images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'certifications' and public.is_admin());

create policy "Anyone can view certification images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'certifications');

create policy "Admins can replace certification images"
  on storage.objects for update to authenticated
  using (bucket_id = 'certifications' and public.is_admin())
  with check (bucket_id = 'certifications' and public.is_admin());

create policy "Admins can delete certification images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'certifications' and public.is_admin());