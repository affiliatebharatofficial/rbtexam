-- Enterprise AI Workforce System - PostgreSQL Schema

-- 1. AI Agents Registry
CREATE TABLE IF NOT EXISTS public.ai_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  department TEXT NOT NULL CHECK (department IN ('content','learning','seo','quality','operations','technical')),
  model_provider TEXT NOT NULL CHECK (model_provider IN ('openai','gemini','anthropic','openrouter','deepseek')),
  model_name TEXT NOT NULL,
  temperature NUMERIC(3,2) DEFAULT 0.5,
  max_tokens INTEGER DEFAULT 1000,
  prompt_version TEXT DEFAULT 'v1.0',
  system_prompt TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  requires_human_approval BOOLEAN DEFAULT false,
  total_jobs_processed INTEGER DEFAULT 0,
  success_rate_percentage NUMERIC(5,2) DEFAULT 100.0,
  average_latency_ms INTEGER DEFAULT 0,
  total_cost_usd NUMERIC(10,4) DEFAULT 0.0000,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Prompt Versions Table (Rollback & A/B Testing)
CREATE TABLE IF NOT EXISTS public.prompt_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_role TEXT REFERENCES public.ai_agents(role) ON DELETE CASCADE,
  version TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  user_prompt_template TEXT,
  changelog TEXT,
  author TEXT DEFAULT 'system',
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (agent_role, version)
);

-- 3. Task Queue (Workforce Queues)
CREATE TABLE IF NOT EXISTS public.task_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  queue_type TEXT NOT NULL CHECK (queue_type IN (
    'content_queue','review_queue','seo_queue','publishing_queue',
    'notification_queue','ai_tutor_queue','translation_queue','knowledge_queue'
  )),
  primary_agent_role TEXT NOT NULL,
  pipeline_roles TEXT[] NOT NULL,
  current_step_index INTEGER DEFAULT 0,
  payload JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed','in_review')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Job History & Step Results
CREATE TABLE IF NOT EXISTS public.job_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.task_queue(id) ON DELETE CASCADE,
  agent_role TEXT NOT NULL,
  step_index INTEGER NOT NULL,
  output TEXT NOT NULL,
  quality_score INTEGER,
  approved BOOLEAN DEFAULT true,
  latency_ms INTEGER NOT NULL,
  tokens_used INTEGER NOT NULL,
  cost_usd NUMERIC(8,4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Agent Metrics & Cost Tracking
CREATE TABLE IF NOT EXISTS public.agent_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_role TEXT REFERENCES public.ai_agents(role) ON DELETE CASCADE,
  date DATE NOT NULL,
  jobs_processed INTEGER DEFAULT 0,
  successful_jobs INTEGER DEFAULT 0,
  failed_jobs INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  total_cost_usd NUMERIC(8,4) DEFAULT 0.0000,
  avg_latency_ms INTEGER DEFAULT 0,
  UNIQUE (agent_role, date)
);

-- ─── INDEXES ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_ai_agents_department ON public.ai_agents(department);
CREATE INDEX IF NOT EXISTS idx_task_queue_status ON public.task_queue(status, queue_type);
CREATE INDEX IF NOT EXISTS idx_job_history_job ON public.job_history(job_id);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_date ON public.agent_metrics(date, agent_role);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_history ENABLE ROW LEVEL SECURITY;

-- Admins can read/write agents and queue
CREATE POLICY "Admin access to ai_agents" ON public.ai_agents
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin access to task_queue" ON public.task_queue
  FOR ALL USING (auth.role() = 'authenticated');
