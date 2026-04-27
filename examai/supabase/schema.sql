-- ExamAI Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Teachers table (linked to Supabase Auth)
create table if not exists teachers (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  subject text,
  created_at timestamptz not null default now()
);

-- Exams table
create table if not exists exams (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid not null references teachers(id) on delete cascade,
  title text not null,
  subject text not null,
  level text not null default 'E',
  adaptive boolean not null default false,
  archived boolean not null default false,
  time_limit_minutes integer not null default 45,
  created_at timestamptz not null default now()
);

-- Questions table
create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  exam_id uuid not null references exams(id) on delete cascade,
  text text not null,
  level text not null check (level in ('E', 'C', 'A')),
  points integer not null default 1,
  order_index integer not null default 0
);

-- Student codes (GDPR: code only, never name/email)
create table if not exists student_codes (
  id uuid primary key default uuid_generate_v4(),
  exam_id uuid not null references exams(id) on delete cascade,
  code text not null unique,
  created_at timestamptz not null default now(),
  used boolean not null default false
);

-- Exam sessions (GDPR: student_code only, no personal data)
create table if not exists exam_sessions (
  id uuid primary key default uuid_generate_v4(),
  exam_id uuid not null references exams(id) on delete cascade,
  student_code text not null,
  chosen_level text not null check (chosen_level in ('E', 'C', 'A')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  cheat_log jsonb not null default '[]',
  locked boolean not null default false
);

-- Answers table (GDPR: no personal data, only text + session reference)
create table if not exists answers (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references exam_sessions(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  text text not null default '',
  word_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, question_id)
);

-- Row Level Security
alter table teachers enable row level security;
alter table exams enable row level security;
alter table questions enable row level security;
alter table student_codes enable row level security;
alter table exam_sessions enable row level security;
alter table answers enable row level security;

-- Teachers: only own row
create policy "Teachers can view own profile"
  on teachers for select using (auth.uid() = id);
create policy "Teachers can update own profile"
  on teachers for update using (auth.uid() = id);
create policy "Teachers can insert own profile"
  on teachers for insert with check (auth.uid() = id);

-- Exams: teachers manage their own exams
create policy "Teachers manage own exams"
  on exams for all using (teacher_id = auth.uid());

-- Questions: teachers manage questions in their exams
create policy "Teachers manage own questions"
  on questions for all using (
    exam_id in (select id from exams where teacher_id = auth.uid())
  );

-- Student codes: teachers manage their own codes, anyone can read by code
create policy "Teachers manage own student codes"
  on student_codes for all using (
    exam_id in (select id from exams where teacher_id = auth.uid())
  );
create policy "Public can read student codes"
  on student_codes for select using (true);

-- Exam sessions: public insert (student starts session), teachers can read
create policy "Public can create exam sessions"
  on exam_sessions for insert with check (true);
create policy "Public can update own session"
  on exam_sessions for update using (true);
create policy "Public can read own session"
  on exam_sessions for select using (true);

-- Answers: public insert/update, teachers can read via exam ownership
create policy "Public can manage answers"
  on answers for all using (true);

-- Function to auto-create teacher profile on signup
create or replace function handle_new_teacher()
returns trigger language plpgsql security definer as $$
begin
  insert into teachers (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_teacher();
