-- 0004_logs_settings.sql
-- Append-only event/audit trails and admin-managed settings.

-- ─── analytics_logs ───────────────────────────────────────────────────────────
create table public.analytics_logs (
  id         bigint generated always as identity primary key,
  user_id    uuid references public.profiles (id) on delete set null,
  event      text not null,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index analytics_logs_event_idx on public.analytics_logs (event);
create index analytics_logs_created_at_idx on public.analytics_logs (created_at);

-- ─── error_logs ───────────────────────────────────────────────────────────────
create table public.error_logs (
  id         bigint generated always as identity primary key,
  user_id    uuid references public.profiles (id) on delete set null,
  context    text,
  message    text not null,
  detail     jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index error_logs_created_at_idx on public.error_logs (created_at);

-- ─── audit_logs ───────────────────────────────────────────────────────────────
-- Written by the audit trigger (0005) and by content server actions.
create table public.audit_logs (
  id          bigint generated always as identity primary key,
  actor_id    uuid references public.profiles (id) on delete set null,
  action      text not null,                       -- e.g. 'lesson.create'
  entity      text not null,                       -- e.g. 'video_lessons'
  entity_id   text,
  detail      jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index audit_logs_created_at_idx on public.audit_logs (created_at);
create index audit_logs_actor_idx on public.audit_logs (actor_id);

-- ─── system_settings ──────────────────────────────────────────────────────────
create table public.system_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

create trigger system_settings_set_updated_at
  before update on public.system_settings
  for each row execute function public.set_updated_at();
