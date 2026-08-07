-- Enterprise Subscription & Billing Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. Subscription Plans Table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier TEXT UNIQUE NOT NULL CHECK (tier IN ('free', 'basic', 'pro', 'premium', 'team', 'enterprise', 'lifetime')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_monthly_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  price_yearly_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  price_lifetime_usd NUMERIC(10,2) DEFAULT 0.00,
  stripe_monthly_price_id TEXT,
  stripe_yearly_price_id TEXT,
  limits JSONB NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan_id UUID REFERENCES public.plans(id),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'basic', 'pro', 'premium', 'team', 'enterprise', 'lifetime')) DEFAULT 'free',
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'paused', 'unpaid', 'expired')) DEFAULT 'active',
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('monthly', 'yearly', 'one_time')) DEFAULT 'monthly',
  current_period_start TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_end TIMESTAMPTZ DEFAULT timezone('utc'::text, now() + interval '30 days') NOT NULL,
  trial_ends_at TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount_paid_usd NUMERIC(10,2) NOT NULL,
  tax_amount_usd NUMERIC(10,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('paid', 'open', 'void', 'uncollectible')) DEFAULT 'paid',
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(10,2) NOT NULL,
  applicable_tiers TEXT[] DEFAULT '{}',
  max_uses INTEGER DEFAULT 1000,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Daily Usage Quotas Table
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE DEFAULT CURRENT_DATE NOT NULL,
  practice_tests_used INTEGER DEFAULT 0,
  flashcards_used INTEGER DEFAULT 0,
  ai_messages_used INTEGER DEFAULT 0,
  pdf_downloads_used INTEGER DEFAULT 0,
  UNIQUE(user_id, usage_date)
);

-- Indices for Fast Subscription & Billing Querying
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_invoices_user ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_date ON public.usage_tracking(user_id, usage_date);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view active plans" ON public.plans FOR SELECT USING (is_active = true);
CREATE POLICY "Users access own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users access own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);
