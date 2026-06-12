-- 0001_init_enums_profiles.sql
-- Enums, profiles table (1:1 with auth.users), and the shared updated_at trigger.

-- ─── Enums ──────────────────────────────────────────────────────────────────
create type public.user_role as enum ('student', 'teacher', 'admin');
create type public.account_status as enum ('active', 'suspended');

-- ─── Shared updated_at trigger function ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── profiles ────────────────────────────────────────────────────────────────
-- One row per auth.users record. Populated by the handle_new_user() trigger
-- (see 0005). Never inserted directly by the client.
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  phone       text,
  student_id  text unique,
  first_name  text not null default '',
  surname     text not null default '',
  role        public.user_role not null default 'student',
  avatar_url  text,
  status      public.account_status not null default 'active',
  enrolled_at timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index profiles_student_id_idx on public.profiles (student_id);
create index profiles_role_idx on public.profiles (role);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
