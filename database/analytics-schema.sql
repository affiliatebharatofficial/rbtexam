-- Analytics & Business Intelligence Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. Analytics Telemetry Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('learning', 'business', 'ai_tutor', 'seo', 'system', 'auth', 'practice_test', 'flashcard')),
  payload JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Daily Business Metrics Table (Financial Aggregations)
CREATE TABLE IF NOT EXISTS public.daily_business_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE DEFAULT CURRENT_DATE NOT NULL UNIQUE,
  mrr_usd NUMERIC(10,2) NOT NULL,
  arr_usd NUMERIC(12,2) NOT NULL,
  active_subscribers INTEGER NOT NULL,
  new_subscribers_count INTEGER NOT NULL,
  churn_rate_percentage NUMERIC(5,2) NOT NULL,
  ltv_usd NUMERIC(8,2) NOT NULL,
  arpu_usd NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Daily Student Metrics Table (Learning Aggregations)
CREATE TABLE IF NOT EXISTS public.daily_student_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE DEFAULT CURRENT_DATE NOT NULL UNIQUE,
  total_students INTEGER NOT NULL,
  active_students_dau INTEGER NOT NULL,
  active_students_mau INTEGER NOT NULL,
  retention_rate_percentage NUMERIC(5,2) NOT NULL,
  average_readiness_score NUMERIC(5,2) NOT NULL,
  predicted_pass_rate_percentage NUMERIC(5,2) NOT NULL,
  total_study_hours INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. AI Usage Analytics Table (LLM Cost Tracking)
CREATE TABLE IF NOT EXISTS public.ai_usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE DEFAULT CURRENT_DATE NOT NULL UNIQUE,
  total_conversations INTEGER NOT NULL,
  total_messages_sent INTEGER NOT NULL,
  total_tokens_consumed BIGINT NOT NULL,
  total_ai_cost_usd NUMERIC(10,4) NOT NULL,
  average_response_latency_ms INTEGER NOT NULL,
  satisfaction_rating_percentage NUMERIC(5,2) NOT NULL DEFAULT 98.50,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for BI Query Performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_cat ON public.analytics_events(category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_business_metrics_date ON public.daily_business_metrics(metric_date DESC);
CREATE INDEX IF NOT EXISTS idx_student_metrics_date ON public.daily_student_metrics(metric_date DESC);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_student_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_analytics ENABLE ROW LEVEL SECURITY;

-- Candidates can log events
CREATE POLICY "Users log analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Admins full view of aggregated metrics
CREATE POLICY "Admins view BI metrics" ON public.daily_business_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );
