-- AI Adaptive Learning Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. User Learning Profiles Table
CREATE TABLE IF NOT EXISTS public.user_learning_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  target_exam_date DATE NOT NULL,
  current_level TEXT DEFAULT 'Level 1: Novice',
  readiness_score NUMERIC(5,2) DEFAULT 0.00,
  predicted_pass_probability NUMERIC(5,2) DEFAULT 0.00,
  estimated_hours_remaining INTEGER DEFAULT 40,
  learning_velocity INTEGER DEFAULT 0, -- XP per week
  streak_days INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Priority Learning Queue Table (Weak Topic Detection)
CREATE TABLE IF NOT EXISTS public.priority_learning_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task_item_id TEXT NOT NULL, -- e.g. 'D-04'
  domain_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
  average_response_time_seconds INTEGER DEFAULT 0,
  mistake_frequency INTEGER DEFAULT 0,
  priority_score INTEGER DEFAULT 0, -- 0 to 100
  recommended_action TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, task_item_id)
);

-- 3. Adaptive Recommendations Table
CREATE TABLE IF NOT EXISTS public.adaptive_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('mock_exam', 'flashcard_drill', 'ai_tutor_session', 'task_list_review', 'daily_revision')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_domain TEXT,
  target_task_code TEXT,
  action_url TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 100,
  urgency TEXT NOT NULL CHECK (urgency IN ('high', 'medium', 'low')) DEFAULT 'medium',
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Daily Study Plans Table
CREATE TABLE IF NOT EXISTS public.daily_study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE DEFAULT CURRENT_DATE NOT NULL,
  task_title TEXT NOT NULL,
  task_description TEXT NOT NULL,
  task_type TEXT NOT NULL,
  action_url TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 100,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Achievement Unlocks Table
CREATE TABLE IF NOT EXISTS public.achievement_unlocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, badge_code)
);

-- Indices for Adaptive Performance
CREATE INDEX IF NOT EXISTS idx_learning_profile_user ON public.user_learning_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_priority_queue_user ON public.priority_learning_queue(user_id, priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_daily_plans_user_date ON public.daily_study_plans(user_id, plan_date);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.user_learning_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.priority_learning_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievement_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own learning profile" ON public.user_learning_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own priority queue" ON public.priority_learning_queue
  FOR ALL USING (auth.uid() = user_id);
