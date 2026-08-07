-- Notification, Email Automation & Workflow Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. In-App & Push Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('in_app', 'email', 'push', 'sms', 'webhook')),
  action_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Email Templates Table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_code TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('onboarding', 'study', 'billing', 'marketing')),
  is_editable BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Automation Workflows Table
CREATE TABLE IF NOT EXISTS public.automation_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  condition_rules JSONB DEFAULT '{}',
  action_channel TEXT NOT NULL,
  action_template_id UUID REFERENCES public.email_templates(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. User Notification Preferences Table
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  in_app_enabled BOOLEAN DEFAULT true,
  quiet_hours_start TEXT DEFAULT '22:00',
  quiet_hours_end TEXT DEFAULT '07:00',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Delivery Logs Table
CREATE TABLE IF NOT EXISTS public.delivery_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'delivered', 'failed', 'bounced')),
  error_message TEXT,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Quick Notification Queue Retrieval
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_delivery_logs_user ON public.delivery_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_event ON public.automation_workflows(trigger_event);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own preferences" ON public.notification_preferences
  FOR ALL USING (auth.uid() = user_id);
