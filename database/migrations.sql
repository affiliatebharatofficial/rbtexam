-- Database Migration System for RBT Practice Questions
-- Run migrations in order using: scripts/migrate.sh
-- Each migration is numbered and idempotent.

-- ─── Migration Tracking Table ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.schema_migrations (
  id SERIAL PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  applied_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  duration_ms INTEGER,
  checksum TEXT
);

-- ─── Migration 001: Core Auth & Profiles ─────────────────────────────────────
INSERT INTO public.schema_migrations (version, description) VALUES ('001', 'Core auth profiles table')
  ON CONFLICT (version) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  certification_target TEXT CHECK (certification_target IN ('RBT','BCaBA','BCBA')),
  exam_date DATE,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─── Migration 002: Subscription & Billing Tables ─────────────────────────────
INSERT INTO public.schema_migrations (version, description) VALUES ('002', 'Subscription and billing tables')
  ON CONFLICT (version) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan_id TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL CHECK (status IN ('active','expired','cancelled','trialing','past_due')),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id),
  stripe_invoice_id TEXT UNIQUE,
  amount_usd NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL CHECK (status IN ('draft','open','paid','void','uncollectible')),
  invoice_url TEXT,
  pdf_url TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─── Migration 003: Analytics Events ─────────────────────────────────────────
INSERT INTO public.schema_migrations (version, description) VALUES ('003', 'Analytics events table')
  ON CONFLICT (version) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  page_path TEXT,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON public.analytics_events(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events(event_name, timestamp DESC);

-- ─── Migration 004: System Settings ──────────────────────────────────────────
INSERT INTO public.schema_migrations (version, description) VALUES ('004', 'System settings key-value store')
  ON CONFLICT (version) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default settings
INSERT INTO public.system_settings (key, value, description, is_public) VALUES
  ('maintenance_mode', 'false', 'Put platform in maintenance mode', true),
  ('ai_tutor_enabled', 'true', 'Enable AI Tutor feature', true),
  ('free_plan_daily_questions', '10', 'Daily question limit for free plan', false),
  ('free_plan_daily_ai_messages', '5', 'Daily AI message limit for free plan', false)
ON CONFLICT (key) DO NOTHING;
