# Backend Implementation — GraphiCode (Supabase)

## Context

GraphiCode is a LabVIEW learning platform whose **frontend is fully built** (Next.js 16, React 19, next-intl, Tailwind v4) but runs entirely on **empty mock arrays** in `lib/mock/*`. There is no backend: no `@supabase/*` packages, no `.env`, no client code, no auth. Pages import `MOCK_*` constants directly into Server Components and the auth pages fake login with `setTimeout`.

The goal is to implement the secure cloud backend described in `brand_assets/design.md` on Supabase (the project `cawwdnnmoeleaqhinksp` is already referenced in `.mcp.json`), and wire the existing UI to real data **without changing its design**. `lib/types.ts` is the data contract the UI already expects and must be preserved — DB rows are mapped to these shapes.

**Security is the explicit top priority.** Every table gets RLS, the service-role key never reaches the client, all input is validated server-side, and login/role checks are enforced both at the edge (`proxy.ts`) and server-side in layouts.

### Decisions (confirmed with user)
- **Schema application:** via the Supabase **MCP** (user authenticates it); SQL also saved as migration files as source of truth.
- **Credentials:** I create **placeholders only** (`.env.example` + `.env.local` with blank values); user fills real keys. Nothing secret is committed/exposed.
- **Seed:** **Schema + auth only** — no demo content rows. Pages render their existing empty states until admins add content.

---

## Data model (Supabase / PostgreSQL)

Localized text (`{en,ru,uz}`) is stored as **`jsonb`** to match `LocalizedText`. All ids that the UI treats as strings stay text/uuid-as-text compatible.

| Table | Purpose / key columns |
|---|---|
| `profiles` | 1:1 with `auth.users`. `id` (uuid PK → auth.users), `email`, `phone`, `student_id` (unique), `first_name`, `surname`, `role` (`user_role` enum), `avatar_url`, `status`, `enrolled_at` |
| `video_lessons` | `title`/`tags` jsonb, `slug` unique, `category`, `difficulty`, `duration_minutes`, `thumbnail_url`, `video_path`, `order_index`, `is_published`, `created_by` → profiles |
| `lesson_summaries` | `lesson_id` fk, `section_title` jsonb, `paragraphs` jsonb, `order_index` |
| `visualization_examples` | `lesson_id` fk, `title`/`description` jsonb, `complexity`, `diagram_id` (maps to `lib/visualization/registry.ts` keys, e.g. `viz_for_loop_sum`), `order_index` |
| `quizzes` | `lesson_id` fk, `title`/`description` jsonb, `passing_score`, `time_limit_minutes` |
| `quiz_questions` | `quiz_id` fk, `type`, `prompt`/`options`/`correct_answer`/`explanation` jsonb, `image_url`, `points`, `order_index` |
| `quiz_results` | `user_id`, `quiz_id`, `score`, `max_score`, `percentage`, `passed`, `answers` jsonb, `completed_at`, `time_spent_seconds` |
| `progress_tracking` | `user_id`, `lesson_id`, `status`, `progress_percent`, `last_viewed_at`, `completed_at`, `watched_seconds`, `quiz_best_score`, **unique(user_id, lesson_id)** |
| `visualization_sessions` | `user_id`, `example_id` fk, `duration_seconds`, `animation_speed`, `interactions` jsonb (analytics per design.md) |
| `notifications` | `user_id`, `payload` jsonb, `read_at` |
| `analytics_logs`, `error_logs`, `audit_logs` | append-only event/audit trails |
| `system_settings` | admin-managed key/value (`jsonb`) |

Enum: `user_role` = `student | teacher | admin`.

---

## Migrations (written to `supabase/migrations/`, then applied via MCP `apply_migration`)

1. **`0001_init_enums_profiles.sql`** — `user_role` enum; `profiles`; `updated_at` trigger function.
2. **`0002_content.sql`** — `video_lessons`, `lesson_summaries`, `visualization_examples`, `quizzes`, `quiz_questions`.
3. **`0003_learner_data.sql`** — `progress_tracking`, `quiz_results`, `visualization_sessions`, `notifications`, indexes on hot columns (`student_id`, `lesson_id`, `category`, `user_id`).
4. **`0004_logs_settings.sql`** — `analytics_logs`, `error_logs`, `audit_logs`, `system_settings`.
5. **`0005_functions_triggers.sql`**
   - `handle_new_user()` trigger on `auth.users` → inserts `profiles` row from signup metadata (first/surname/phone/student_id), role defaults to `student`.
   - `current_user_role()`, `is_admin()`, `is_staff()` — **`SECURITY DEFINER`, `search_path = ''`** helpers used by RLS (avoids recursive policy evaluation on `profiles`).
   - `get_email_for_student_id(p_student_id text)` — `SECURITY DEFINER` RPC returning the email for an exact student_id, so the **anon** role can resolve student-ID logins without read access to `profiles`.
   - Audit trigger writing to `audit_logs` on admin/destructive changes.
6. **`0006_rls.sql`** — `ENABLE ROW LEVEL SECURITY` + `FORCE` on every table; **default-deny**, then explicit policies:
   - Students: read published lessons/summaries/viz/quizzes; read+write **own** `progress_tracking`, `quiz_results`, `visualization_sessions`, `notifications`; read own `profile`.
   - Teachers: full CRUD on content **they created** (`created_by = auth.uid()`); read analytics for their lessons.
   - Admins: full access (via `is_admin()`).
   - `quiz_questions.correct_answer` exposure: served only through a grading RPC / view that omits answers for students (prevents answer leakage).
7. **`0007_storage.sql`** — private buckets `lesson-videos`, `thumbnails`, `materials`; storage RLS (authenticated read of published content; staff write). Uploads validated (MIME/extension/size) in a server action before insert.

> Bootstrapping the first admin: documented snippet (`update profiles set role='admin' where email=…`) run once via MCP — no admin self-promotion path in the app.

---

## Application wiring (Next.js)

**Dependencies:** add `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `server-only`.

**Supabase clients** (`lib/supabase/`)
- `client.ts` — browser client (anon key, `NEXT_PUBLIC_*`).
- `server.ts` — server client bound to Next cookies via `@supabase/ssr` (RSC + server actions).
- `admin.ts` — service-role client, first line `import "server-only"`; **never** `NEXT_PUBLIC`.
- `middleware.ts` — `updateSession()` refresh helper.
- `database.types.ts` — generated via MCP `generate_typescript_types`.

**Edge protection** — `proxy.ts` (Next 16's middleware): compose existing `next-intl` middleware **with** Supabase session refresh; redirect unauthenticated users from `(app)`/`(admin)` to `/login`, and non-admin/non-staff away from `(admin)`. Defense-in-depth: also check `getUser()` + role in `app/[locale]/(app)/layout.tsx` and `(admin)/layout.tsx`.

**Auth** (`lib/auth/actions.ts` server actions, validated by `lib/validation/auth.ts` zod schemas)
- `signUp` — `supabase.auth.signUp` with metadata; trigger creates the profile; enforce password policy + unique student_id.
- `signInWithIdentifier` — if identifier isn't an email, resolve via `get_email_for_student_id` RPC, then `signInWithPassword`. Lightweight per-IP attempt throttle on top of Supabase Auth's built-in limits.
- `signOut`, `requestPasswordReset`.
- Rewire `login/page.tsx` & `signup/page.tsx` to call these actions (keep all existing markup/styles — data-only change), surfacing real errors via existing `Input error` prop.

**Data-access layer** (`lib/data/*.ts`, server-only) returning existing `lib/types.ts` shapes via `lib/data/mappers.ts`:
- `lessons.ts` (`listLessons`, `getLessonById` with summaries+viz), `quizzes.ts` (`getQuizByLessonId`, `getQuizById`, `submitQuiz`), `progress.ts`, `dashboard.ts` (`getDashboard` — aggregates), `admin.ts` (`getAnalyticsOverview`, lesson mgmt), `profile.ts`.
- Replace `MOCK_*` imports in: `dashboard`, `library`, `lessons/[id]`, `quizzes/[id]`, `admin` pages. Convert `lessons/[id]` from `generateStaticParams`/static to **dynamic** (content + per-user progress are DB-driven).
- Wire real user + working sign-out into `AppSidebar.tsx` / `AppTopBar.tsx` (replace hardcoded "Amir Karimov").
- `lib/mock/*` retained only as type-shaped fixtures for tests; no longer imported by pages.

**Security hardening**
- `next.config.ts`: security headers (HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, Referrer-Policy, CSP allowing only self + Supabase) and Supabase image `remotePatterns`.
- Enable Supabase **leaked-password protection** + email confirmation (documented setting / via MCP if available).
- Add `.gitignore` rule for `.env*.local`.

**Env placeholders** (user fills real values)
- `.env.example` and `.env.local` with blank: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## Critical files
- New: `supabase/migrations/0001..0007*.sql`, `lib/supabase/{client,server,admin,middleware,database.types}.ts`, `lib/auth/actions.ts`, `lib/validation/auth.ts`, `lib/data/{lessons,quizzes,progress,dashboard,admin,profile,mappers}.ts`, `.env.example`, `.env.local`, `.gitignore`.
- Modified: `proxy.ts`, `next.config.ts`, `package.json`, `app/[locale]/(auth)/{login,signup}/page.tsx`, `app/[locale]/(app)/{layout,dashboard,library}.tsx`, `app/[locale]/(app)/lessons/[id]/page.tsx`, `app/[locale]/(app)/quizzes/[id]/page.tsx`, `app/[locale]/(admin)/{layout,admin}/…`, `components/layout/{AppSidebar,AppTopBar}.tsx`.

> Per `CLAUDE.md`, the `frontend-design` skill is invoked before editing any `.tsx`; page edits are **data-wiring only** and preserve existing layout/spacing/styles.

---

## Verification
1. **Schema (MCP):** after `apply_migration`, run `list_tables` and `list_migrations`; `execute_sql` a probe confirming RLS is enabled and a student JWT cannot read another user's `progress_tracking` (expect 0 rows / denial).
2. **Types:** `generate_typescript_types` → commit `database.types.ts`; `npm run build` / `tsc` clean.
3. **Auth E2E (`npm run dev`, localhost:3000):**
   - Sign up a student → profile row auto-created (verify via MCP `execute_sql`).
   - Log in by **email**, then log out and log in by **student_id** → both reach `/dashboard`.
   - Unauthenticated hit on `/dashboard` → redirected to `/login`; student hit on `/admin` → blocked.
   - Promote a user to `admin` via MCP, confirm `/admin` now loads.
4. **Data render:** insert one lesson via MCP, confirm it appears in `library`/`dashboard`/`lessons/[id]` and the `viz_for_loop_sum` panel still animates.
5. **Secret hygiene:** confirm `SUPABASE_SERVICE_ROLE_KEY` appears in no client bundle (grep `.next` output) and `.env.local` is gitignored.
