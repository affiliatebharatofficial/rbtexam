-- RBTTrainingAI Database Schema (PostgreSQL / Supabase Ready)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'therapist', 'clinic_admin', 'instructor')) DEFAULT 'student',
  target_exam_date DATE,
  target_score INTEGER DEFAULT 90,
  clinic_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Clinics & Cohorts Table
CREATE TABLE IF NOT EXISTS public.clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  admin_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Exam Sessions Table
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,
  score_percentage NUMERIC(5,2),
  passed BOOLEAN,
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. User Answers Detail Table
CREATE TABLE IF NOT EXISTS public.exam_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  selected_option TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Flashcard Progress Table (Spaced Repetition)
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  leitner_box INTEGER DEFAULT 1,
  correct_streak INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  next_review_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, card_id)
);

-- 6. Student Progress Summary Table
CREATE TABLE IF NOT EXISTS public.student_progress (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  readiness_score INTEGER DEFAULT 45,
  estimated_pass_likelihood INTEGER DEFAULT 50,
  completed_mocks_count INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy NUMERIC(5,2) DEFAULT 0.00,
  study_time_hours NUMERIC(6,2) DEFAULT 0.00,
  streak_days INTEGER DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS Policies for Supabase
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
