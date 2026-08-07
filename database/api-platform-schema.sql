-- Enterprise API Platform & Developer Ecosystem Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. API Keys Table
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT UNIQUE NOT NULL,
  secret_hash TEXT NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  rate_limit_per_minute INTEGER DEFAULT 600,
  allowed_origins TEXT[] DEFAULT '{}',
  allowed_ips TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Webhook Endpoints Table
CREATE TABLE IF NOT EXISTS public.webhook_endpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Webhook Logs Table
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID REFERENCES public.webhook_endpoints(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status_code INTEGER NOT NULL,
  latency_ms INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. API Usage Metrics Table
CREATE TABLE IF NOT EXISTS public.api_usage_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID REFERENCES public.api_keys(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  latency_ms INTEGER NOT NULL,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for API Gateway Security & Performance
CREATE INDEX IF NOT EXISTS idx_api_keys_prefix ON public.api_keys(key_prefix);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_webhook ON public.webhook_logs(webhook_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_api_usage_timestamp ON public.api_usage_metrics(timestamp DESC);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers manage own API keys" ON public.api_keys
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Developers manage own webhooks" ON public.webhook_endpoints
  FOR ALL USING (auth.uid() = user_id);
