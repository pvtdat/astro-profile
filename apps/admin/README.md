# Admin CMS

Next.js admin application for the Astro portfolio. It runs independently at `http://localhost:3000`.

## Setup

1. Create `apps/admin/.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
2. Keep Astro variables in the repository root `.env` using the `PUBLIC_*` names.
3. Apply `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.
4. Optionally apply `supabase/seed.sql` to import the current portfolio certifications.
5. Create an account in Supabase Auth, then promote it in SQL:

```sql
insert into public.profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'your-admin-email@example.com'
on conflict (id) do update set role = 'admin';
```

To upload the local certificate images after seeding, set `SUPABASE_SERVICE_ROLE_KEY`
only in your local terminal and run `npm run migrate:certificates`. Never put this
key in `.env.local`, browser code, or any `NEXT_PUBLIC_*` variable.

Start the Admin app from the repository root:

```bash
npm run dev:admin
```

The Astro portfolio remains available through the existing `npm run dev` command. Do not expose a service role key in this app's browser environment.
