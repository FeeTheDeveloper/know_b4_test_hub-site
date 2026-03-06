-- ============================================================
-- Know B4 Certification Hub — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- ─── Profiles ────────────────────────────────────────────
-- Linked to auth.users via trigger on signup
create table if not exists public.profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique not null references auth.users(id) on delete cascade,
  email        text not null,
  role         text not null default 'user' check (role in ('user','admin')),
  first_name   text not null default '',
  last_name    text not null default '',
  company      text,
  job_title    text,
  phone        text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Courses ─────────────────────────────────────────────
create table if not exists public.courses (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text unique not null,
  description       text not null default '',
  short_description text not null default '',
  thumbnail_url     text,
  category          text not null default 'General',
  difficulty        text not null default 'beginner' check (difficulty in ('beginner','intermediate','advanced')),
  duration_hours    numeric not null default 1,
  passing_score     integer not null default 70,
  target_audience   text not null default '',
  learning_objectives jsonb not null default '[]'::jsonb,
  certificate_title text not null default '',
  certificate_validity_months integer not null default 24,
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ─── Course Modules ──────────────────────────────────────
create table if not exists public.course_modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  title       text not null,
  description text not null default '',
  order_index integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ─── Course Lessons ──────────────────────────────────────
create table if not exists public.course_lessons (
  id               uuid primary key default gen_random_uuid(),
  module_id        uuid not null references public.course_modules(id) on delete cascade,
  title            text not null,
  content          text not null default '',
  content_type     text not null default 'text' check (content_type in ('text','video','document')),
  duration_minutes integer not null default 5,
  order_index      integer not null default 0,
  created_at       timestamptz not null default now()
);

-- ─── Enrollments ─────────────────────────────────────────
create table if not exists public.enrollments (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  course_id        uuid not null references public.courses(id) on delete cascade,
  status           text not null default 'active' check (status in ('active','completed','dropped')),
  progress_percent integer not null default 0,
  enrolled_at      timestamptz not null default now(),
  completed_at     timestamptz,
  unique (user_id, course_id)
);

-- ─── Lesson Progress ─────────────────────────────────────
create table if not exists public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    uuid not null references public.course_lessons(id) on delete cascade,
  completed    boolean not null default false,
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

-- ─── Quizzes ─────────────────────────────────────────────
create table if not exists public.quizzes (
  id                  uuid primary key default gen_random_uuid(),
  course_id           uuid not null references public.courses(id) on delete cascade,
  title               text not null,
  description         text not null default '',
  time_limit_minutes  integer,
  created_at          timestamptz not null default now()
);

-- ─── Quiz Questions ──────────────────────────────────────
create table if not exists public.quiz_questions (
  id                   uuid primary key default gen_random_uuid(),
  quiz_id              uuid not null references public.quizzes(id) on delete cascade,
  question_text        text not null,
  options              jsonb not null default '[]'::jsonb,
  correct_option_index integer not null default 0,
  order_index          integer not null default 0
);

-- ─── Quiz Attempts ───────────────────────────────────────
create table if not exists public.quiz_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  quiz_id      uuid not null references public.quizzes(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  score        integer not null default 0,
  passed       boolean not null default false,
  answers      jsonb not null default '{}'::jsonb,
  started_at   timestamptz not null default now(),
  completed_at timestamptz
);

-- ─── Certificates ────────────────────────────────────────
create table if not exists public.certificates (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  course_id          uuid not null references public.courses(id) on delete cascade,
  certificate_number text unique not null,
  issued_at          timestamptz not null default now(),
  expires_at         timestamptz,
  revoked            boolean not null default false,
  revoked_at         timestamptz,
  revoked_reason     text
);

-- ─── Indexes ─────────────────────────────────────────────
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_course_modules_course on public.course_modules(course_id, order_index);
create index if not exists idx_course_lessons_module on public.course_lessons(module_id, order_index);
create index if not exists idx_enrollments_user on public.enrollments(user_id);
create index if not exists idx_enrollments_course on public.enrollments(course_id);
create index if not exists idx_lesson_progress_user on public.lesson_progress(user_id);
create index if not exists idx_quiz_attempts_user on public.quiz_attempts(user_id);
create index if not exists idx_certificates_user on public.certificates(user_id);
create index if not exists idx_certificates_number on public.certificates(certificate_number);

-- ============================================================
-- Row Level Security (RLS) Policies
-- Enable RLS on every table, then add policies.
-- ============================================================

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.certificates enable row level security;

-- Helper: check if the current user is an admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Profiles: users see own, admins see all
create policy "Users can view own profile" on public.profiles for select using (user_id = auth.uid());
create policy "Users can update own profile" on public.profiles for update using (user_id = auth.uid());
create policy "Admins can view all profiles" on public.profiles for select using (public.is_admin());
create policy "Admins can update all profiles" on public.profiles for update using (public.is_admin());

-- Courses: everyone reads published, admins manage all
create policy "Anyone can view published courses" on public.courses for select using (is_published = true);
create policy "Admins can manage courses" on public.courses for all using (public.is_admin());

-- Modules & Lessons: readable if course is published, admin full access
create policy "Read modules of published courses" on public.course_modules for select
  using (exists (select 1 from public.courses where id = course_id and is_published));
create policy "Admins manage modules" on public.course_modules for all using (public.is_admin());

create policy "Read lessons of published courses" on public.course_lessons for select
  using (exists (
    select 1 from public.course_modules m
    join public.courses c on c.id = m.course_id
    where m.id = module_id and c.is_published
  ));
create policy "Admins manage lessons" on public.course_lessons for all using (public.is_admin());

-- Enrollments: users see own, admins see all
create policy "Users manage own enrollments" on public.enrollments for all using (user_id = auth.uid());
create policy "Admins view all enrollments" on public.enrollments for select using (public.is_admin());
create policy "Admins update enrollments" on public.enrollments for update using (public.is_admin());

-- Lesson progress: own only
create policy "Users manage own progress" on public.lesson_progress for all using (user_id = auth.uid());
create policy "Admins view progress" on public.lesson_progress for select using (public.is_admin());

-- Quizzes: readable for enrolled users, admin full
create policy "Read quizzes" on public.quizzes for select using (true);
create policy "Admins manage quizzes" on public.quizzes for all using (public.is_admin());

create policy "Read quiz questions" on public.quiz_questions for select using (true);
create policy "Admins manage questions" on public.quiz_questions for all using (public.is_admin());

-- Quiz attempts: own only, admin reads all
create policy "Users manage own attempts" on public.quiz_attempts for all using (user_id = auth.uid());
create policy "Admins view attempts" on public.quiz_attempts for select using (public.is_admin());

-- Certificates: own only, admin manages all
create policy "Users view own certificates" on public.certificates for select using (user_id = auth.uid());
create policy "Admins manage certificates" on public.certificates for all using (public.is_admin());
