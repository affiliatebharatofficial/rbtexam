-- Master Question Bank Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Master Questions Table
CREATE TABLE IF NOT EXISTS public.master_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  question TEXT NOT NULL,
  scenario_text TEXT,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'scenario_based', 'case_study')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  correct_answer_id TEXT NOT NULL,
  answer_explanation TEXT NOT NULL,
  clinical_explanation TEXT NOT NULL,
  "references" TEXT NOT NULL,
  exam_tips TEXT,
  common_mistakes TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  keywords TEXT[] DEFAULT '{}',
  task_list_version TEXT NOT NULL DEFAULT '2nd_edition',
  estimated_time_seconds INTEGER DEFAULT 60,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived', 'featured', 'premium')) DEFAULT 'draft',
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Question Options Table (Normalized)
CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES public.master_questions(id) ON DELETE CASCADE,
  option_letter TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
  option_text TEXT NOT NULL,
  distractor_explanation TEXT,
  is_correct BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Question Categories Metadata Table
CREATE TABLE IF NOT EXISTS public.question_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  exam_weight_percentage NUMERIC(5,2) DEFAULT 0.00
);

-- 4. Question Audit Logs Table (Version History)
CREATE TABLE IF NOT EXISTS public.question_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES public.master_questions(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'published', 'archived', 'deleted', 'imported')),
  changed_by UUID REFERENCES auth.users(id),
  previous_state JSONB,
  new_state JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Question Import Sessions Table
CREATE TABLE IF NOT EXISTS public.question_imports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  total_rows INTEGER NOT NULL,
  success_count INTEGER NOT NULL,
  failure_count INTEGER NOT NULL,
  error_logs JSONB,
  imported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Optimized Query Performance
CREATE INDEX IF NOT EXISTS idx_questions_certification ON public.master_questions(certification);
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.master_questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.master_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.master_questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_task_version ON public.master_questions(task_list_version);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON public.master_questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_question_options_qid ON public.question_options(question_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.master_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_imports ENABLE ROW LEVEL SECURITY;

-- Candidates can view published questions
CREATE POLICY "Public candidates view published questions" ON public.master_questions
  FOR SELECT USING (status IN ('published', 'featured', 'premium'));

-- Admins and Editors full CRUD access
CREATE POLICY "Admins full management" ON public.master_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'editor', 'clinic_admin')
    )
  );
