-- ====================================================================
-- RBT Practice Questions FULL MASTER DATABASE MIGRATION SCRIPT
-- Database Engine: PostgreSQL 15+ (Supabase Compatible)
-- Security: Supabase Row Level Security (RLS) Enabled Across All Tables
-- Primary Keys: UUID v4 (gen_random_uuid() / uuid_generate_v4())
-- Includes: Core Tables, RAG Vector Search, AI Workforce, Analytics, 
--           Security, Launch Controls, Feature Flags, & System Telemetry
-- ====================================================================

-- 1. EXTENSIONS SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. USERS & PROFILES
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'therapist', 'clinic_admin', 'instructor', 'admin')) DEFAULT 'student',
  target_exam_date DATE,
  target_score INTEGER DEFAULT 90,
  clinic_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- 3. CLINICS
CREATE TABLE IF NOT EXISTS public.clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  admin_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. MASTER QUESTIONS BANK
CREATE TABLE IF NOT EXISTS public.master_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_code VARCHAR(64) UNIQUE,
  certification VARCHAR(32) NOT NULL DEFAULT 'RBT',
  question_text TEXT NOT NULL,
  scenario_text TEXT,
  question_type VARCHAR(32) NOT NULL DEFAULT 'multiple_choice',
  difficulty VARCHAR(32) NOT NULL DEFAULT 'medium',
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer_id VARCHAR(16) NOT NULL,
  answer_explanation TEXT NOT NULL,
  clinical_explanation TEXT,
  "references" TEXT,
  exam_tips TEXT,
  common_mistakes TEXT,
  category VARCHAR(128) NOT NULL,
  sub_category VARCHAR(128),
  keywords TEXT[] DEFAULT '{}',
  task_list_version VARCHAR(32) DEFAULT '2nd_edition',
  estimated_time_seconds INTEGER DEFAULT 60,
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(32) NOT NULL DEFAULT 'published',
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_master_questions_cert ON public.master_questions(certification);
CREATE INDEX IF NOT EXISTS idx_master_questions_cat ON public.master_questions(category);
CREATE INDEX IF NOT EXISTS idx_master_questions_status ON public.master_questions(status);

-- 5. MASTER FLASHCARDS DECK
CREATE TABLE IF NOT EXISTS public.master_flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_code VARCHAR(64) UNIQUE,
  certification VARCHAR(32) NOT NULL DEFAULT 'RBT',
  term VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  clinical_example TEXT,
  category VARCHAR(128) NOT NULL,
  task_list_code VARCHAR(32),
  tags TEXT[] DEFAULT '{}',
  difficulty VARCHAR(32) DEFAULT 'medium',
  is_premium BOOLEAN DEFAULT false,
  status VARCHAR(32) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_master_flashcards_cert ON public.master_flashcards(certification);
CREATE INDEX IF NOT EXISTS idx_master_flashcards_term ON public.master_flashcards(term);

-- 6. EXAM SESSIONS & ANSWERS
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,
  score_percentage NUMERIC(5,2),
  passed BOOLEAN,
  total_questions INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.exam_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  selected_option TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. FLASHCARD PROGRESS (SPACED REPETITION)
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  leitner_box INTEGER DEFAULT 1,
  correct_streak INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ DEFAULT NOW(),
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, card_id)
);

-- 8. STUDENT PROGRESS SUMMARY
CREATE TABLE IF NOT EXISTS public.student_progress (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  readiness_score INTEGER DEFAULT 45,
  estimated_pass_likelihood INTEGER DEFAULT 50,
  completed_mocks_count INTEGER DEFAULT 0,
  questions_answered_count INTEGER DEFAULT 0,
  overall_accuracy NUMERIC(5,2) DEFAULT 0.00,
  study_time_hours NUMERIC(6,2) DEFAULT 0.00,
  streak_days INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. RAG KNOWLEDGE CHUNKS & VECTOR EMBEDDINGS
CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_code VARCHAR(64) UNIQUE,
  source_id VARCHAR(128) NOT NULL,
  source_type VARCHAR(64) NOT NULL,
  certification VARCHAR(32) DEFAULT 'all',
  category VARCHAR(128) NOT NULL,
  content TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  embedding vector(1536), -- OpenAI text-embedding-ada-002 (1536 dimensions)
  embedding_model VARCHAR(64) DEFAULT 'text-embedding-ada-002',
  embedding_version VARCHAR(32) DEFAULT 'v1.0',
  is_indexed BOOLEAN DEFAULT false,
  indexed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source ON public.knowledge_chunks(source_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_indexed ON public.knowledge_chunks(is_indexed);

-- 10. KNOWLEDGE GRAPH NODES & EDGES
CREATE TABLE IF NOT EXISTS public.knowledge_graph_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_code VARCHAR(64) UNIQUE,
  concept_name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(128) NOT NULL,
  task_list_code VARCHAR(32),
  definition TEXT NOT NULL,
  clinical_importance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.knowledge_graph_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_node_id UUID REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
  target_node_id UUID REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
  relationship_type VARCHAR(64) NOT NULL,
  weight NUMERIC(3,2) DEFAULT 1.00,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. AI WORKFORCE AGENTS & TASK QUEUE
CREATE TABLE IF NOT EXISTS public.ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(64) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  department VARCHAR(64) NOT NULL,
  model_provider VARCHAR(64) NOT NULL DEFAULT 'openai',
  model_name VARCHAR(64) NOT NULL DEFAULT 'gpt-4o',
  system_prompt TEXT NOT NULL,
  temperature NUMERIC(3,2) DEFAULT 0.20,
  max_tokens INTEGER DEFAULT 2048,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.task_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type VARCHAR(64) NOT NULL,
  agent_role VARCHAR(64) REFERENCES public.ai_agents(role),
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  payload JSONB DEFAULT '{}'::jsonb,
  result JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- 12. RELEASES & GO-LIVE ENGINE TABLES
CREATE TABLE IF NOT EXISTS public.releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  release_type VARCHAR(32) NOT NULL DEFAULT 'minor',
  environment VARCHAR(32) NOT NULL DEFAULT 'staging',
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  description TEXT,
  release_notes TEXT,
  breaking_changes TEXT,
  migration_notes TEXT,
  release_date TIMESTAMPTZ,
  deployed_by UUID,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES public.releases(id) ON DELETE CASCADE,
  environment VARCHAR(32) NOT NULL,
  deployment_status VARCHAR(32) NOT NULL DEFAULT 'queued',
  commit_sha VARCHAR(64),
  build_number VARCHAR(64),
  triggered_by UUID,
  verification_report JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key VARCHAR(128) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'disabled',
  flag_type VARCHAR(32) NOT NULL DEFAULT 'boolean',
  targeting_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  fallback_value JSONB DEFAULT 'false'::jsonb,
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.health_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name VARCHAR(128) NOT NULL,
  category VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL,
  latency_ms INTEGER DEFAULT 0,
  details JSONB DEFAULT '{}'::jsonb,
  checked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.rollbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES public.releases(id) ON DELETE SET NULL,
  deployment_id UUID REFERENCES public.deployments(id) ON DELETE SET NULL,
  rollback_type VARCHAR(32) NOT NULL DEFAULT 'full_release',
  target_version VARCHAR(32) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  executed_by UUID,
  details JSONB DEFAULT '{}'::jsonb,
  executed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.beta_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  beta_code VARCHAR(64),
  status VARCHAR(32) NOT NULL DEFAULT 'invited',
  beta_group VARCHAR(64) DEFAULT 'general',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  feedback_count INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.beta_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(255),
  beta_group VARCHAR(64) DEFAULT 'general',
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.beta_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email VARCHAR(255),
  feedback_type VARCHAR(32) NOT NULL DEFAULT 'feedback',
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  screenshot_url TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'open',
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.crash_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  error_name VARCHAR(255) NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  severity VARCHAR(32) NOT NULL DEFAULT 'error',
  component_stack TEXT,
  environment VARCHAR(32) DEFAULT 'production',
  metadata JSONB DEFAULT '{}'::jsonb,
  status VARCHAR(32) NOT NULL DEFAULT 'unresolved',
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.release_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(32) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  changelog_markdown TEXT NOT NULL,
  breaking_changes_markdown TEXT,
  migration_steps_markdown TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. SUBSCRIPTIONS & PAYMENTS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan_tier VARCHAR(32) NOT NULL DEFAULT 'free',
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. SECURITY & AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.security_threat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address VARCHAR(64),
  user_id UUID,
  event_type VARCHAR(64) NOT NULL,
  severity VARCHAR(32) NOT NULL DEFAULT 'warning',
  payload JSONB DEFAULT '{}'::jsonb,
  blocked BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- ENABLE SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rollbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crash_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_threat_logs ENABLE ROW LEVEL SECURITY;

-- Service Role full access policies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access releases') THEN
    CREATE POLICY "Service role full access releases" ON public.releases FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access deployments') THEN
    CREATE POLICY "Service role full access deployments" ON public.deployments FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read feature flags') THEN
    CREATE POLICY "Public read feature flags" ON public.feature_flags FOR SELECT USING (deleted_at IS NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read release notes') THEN
    CREATE POLICY "Public read release notes" ON public.release_notes FOR SELECT USING (is_published = true);
  END IF;

  -- RLS Policies for public.users & public.profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users read own record') THEN
    CREATE POLICY "Users read own record" ON public.users FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users insert own record') THEN
    CREATE POLICY "Users insert own record" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users update own record') THEN
    CREATE POLICY "Users update own record" ON public.users FOR UPDATE USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users read own profile') THEN
    CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users insert own profile') THEN
    CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users update own profile') THEN
    CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Automatic User & Profile Creation Function on Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  extracted_name TEXT;
  extracted_avatar TEXT;
BEGIN
  extracted_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );

  extracted_avatar := COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    ''
  );

  -- Upsert public.users
  INSERT INTO public.users (id, email, full_name, role, target_score, created_at, updated_at)
  VALUES (NEW.id, NEW.email, extracted_name, 'student', 90, NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
    updated_at = NOW();

  -- Upsert public.profiles
  INSERT INTO public.profiles (id, email, full_name, avatar_url, certification_target, subscription_tier, created_at, updated_at)
  VALUES (NEW.id, NEW.email, extracted_name, extracted_avatar, 'RBT', 'free', NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users AFTER INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

