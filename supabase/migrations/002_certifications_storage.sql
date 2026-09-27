insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'certifications',
  'certifications',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload certification images" on storage.objects;
create policy "Admins can upload certification images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'certifications' and public.is_admin());

drop policy if exists "Anyone can view certification images" on storage.objects;
create policy "Anyone can view certification images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'certifications');

drop policy if exists "Admins can replace certification images" on storage.objects;
create policy "Admins can replace certification images"
  on storage.objects for update to authenticated
  using (bucket_id = 'certifications' and public.is_admin())
  with check (bucket_id = 'certifications' and public.is_admin());

drop policy if exists "Admins can delete certification images" on storage.objects;
create policy "Admins can delete certification images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'certifications' and public.is_admin());