-- Enterprise Security, Privacy & Compliance Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. Security Threat & Anomaly Logs Table
CREATE TABLE IF NOT EXISTS public.security_threat_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL CHECK (event_type IN ('prompt_injection', 'brute_force', 'rate_limit_exceeded', 'invalid_jwt', 'csrf_attempt')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  source_ip TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  request_path TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Active User Sessions Table
CREATE TABLE IF NOT EXISTS public.active_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_info TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  location TEXT,
  is_mfa_verified BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Privacy Consent Records Table (GDPR / CCPA)
CREATE TABLE IF NOT EXISTS public.privacy_consent_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  analytics_consent BOOLEAN DEFAULT true,
  marketing_consent BOOLEAN DEFAULT false,
  necessary_cookies BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Data Subject Requests Table (Erasure / Export)
CREATE TABLE IF NOT EXISTS public.data_subject_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  request_type TEXT NOT NULL CHECK (request_type IN ('export_data', 'delete_account', 'opt_out')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  requested_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMPTZ
);

-- 5. IP Whitelists & Allow Rules Table
CREATE TABLE IF NOT EXISTS public.ip_whitelists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Fast Security Auditing
CREATE INDEX IF NOT EXISTS idx_threat_logs_timestamp ON public.security_threat_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_active_sessions_user ON public.active_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_data_requests_status ON public.data_subject_requests(status);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.security_threat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_subject_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own sessions" ON public.active_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own privacy requests" ON public.data_subject_requests FOR ALL USING (auth.uid() = user_id);
