-- Enterprise Super Admin CMS Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. System Settings Table
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('branding', 'ai', 'security', 'billing', 'features')),
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Custom Roles Table
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_code TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  permissions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. AI Providers Configuration Table
CREATE TABLE IF NOT EXISTS public.ai_providers_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 1,
  api_key_encrypted TEXT,
  monthly_token_limit BIGINT DEFAULT 50000000,
  tokens_consumed_this_month BIGINT DEFAULT 0,
  monthly_cost_usd NUMERIC(10,2) DEFAULT 0.00,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Media Assets Library Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'pdf', 'video')),
  file_size_kb INTEGER NOT NULL,
  url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. System Audit Logs Table
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  ip_address TEXT,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Platform Plugin Registry Table
CREATE TABLE IF NOT EXISTS public.platform_plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plugin_name TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  menu_label TEXT NOT NULL,
  route TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Fast System Queries
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.system_audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media_assets(file_type);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_providers_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_plugins ENABLE ROW LEVEL SECURITY;

-- Super Admin Full Control Policy
CREATE POLICY "Super Admin manage settings" ON public.system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );
