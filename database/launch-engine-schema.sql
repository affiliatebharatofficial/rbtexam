-- ====================================================================
-- PRODUCTION LAUNCH, BETA RELEASE & GO-LIVE ENGINE SCHEMA
-- Database: PostgreSQL via Supabase
-- Primary Keys: UUID v4
-- Security: Supabase Row Level Security (RLS) Enabled on All Tables
-- ====================================================================

-- 1. RELEASES TABLE
CREATE TABLE IF NOT EXISTS public.releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(32) NOT NULL UNIQUE, -- SemVer (e.g. 2.8.0)
  name VARCHAR(255) NOT NULL,
  release_type VARCHAR(32) NOT NULL DEFAULT 'minor', -- major, minor, patch, hotfix, emergency
  environment VARCHAR(32) NOT NULL DEFAULT 'staging', -- development, staging, private_beta, public_beta, production
  status VARCHAR(32) NOT NULL DEFAULT 'draft', -- draft, pending_validation, approved, deploying, deployed, rolled_back, failed
  description TEXT,
  release_notes TEXT,
  breaking_changes TEXT,
  migration_notes TEXT,
  release_date TIMESTAMPTZ,
  deployed_by UUID,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_releases_version ON public.releases(version);
CREATE INDEX IF NOT EXISTS idx_releases_env_status ON public.releases(environment, status);

-- 2. DEPLOYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES public.releases(id) ON DELETE CASCADE,
  environment VARCHAR(32) NOT NULL,
  deployment_status VARCHAR(32) NOT NULL DEFAULT 'queued', -- queued, validating, in_progress, successful, failed, rolled_back
  commit_sha VARCHAR(64),
  build_number VARCHAR(64),
  triggered_by UUID,
  verification_report JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_deployments_release_id ON public.deployments(release_id);
CREATE INDEX IF NOT EXISTS idx_deployments_env_status ON public.deployments(environment, deployment_status);

-- 3. FEATURE FLAGS TABLE
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key VARCHAR(128) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'disabled', -- enabled, disabled, percentage, targeted
  flag_type VARCHAR(32) NOT NULL DEFAULT 'boolean', -- boolean, string, json, percentage
  targeting_rules JSONB NOT NULL DEFAULT '{
    "betaOnly": false,
    "internalOnly": false,
    "premiumOnly": false,
    "allowedRoles": [],
    "allowedCountries": [],
    "percentageRollout": 100,
    "startTime": null,
    "endTime": null
  }'::jsonb,
  fallback_value JSONB DEFAULT 'false'::jsonb,
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON public.feature_flags(flag_key);
CREATE INDEX IF NOT EXISTS idx_feature_flags_status ON public.feature_flags(status);

-- 4. HEALTH CHECKS LOG TABLE
CREATE TABLE IF NOT EXISTS public.health_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name VARCHAR(128) NOT NULL,
  category VARCHAR(64) NOT NULL, -- application, api, database, storage, auth, billing, ai_providers, email, workers, queues, webhooks
  status VARCHAR(32) NOT NULL, -- healthy, degraded, unhealthy
  latency_ms INTEGER DEFAULT 0,
  details JSONB DEFAULT '{}'::jsonb,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_health_checks_service ON public.health_checks(service_name, checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_health_checks_status ON public.health_checks(status);

-- 5. ROLLBACKS TABLE
CREATE TABLE IF NOT EXISTS public.rollbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES public.releases(id) ON DELETE SET NULL,
  deployment_id UUID REFERENCES public.deployments(id) ON DELETE SET NULL,
  rollback_type VARCHAR(32) NOT NULL DEFAULT 'full_release', -- application, database, feature, configuration, full_release
  target_version VARCHAR(32) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending', -- pending, executing, completed, failed
  executed_by UUID,
  details JSONB DEFAULT '{}'::jsonb,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rollbacks_release_id ON public.rollbacks(release_id);

-- 6. BETA USERS TABLE
CREATE TABLE IF NOT EXISTS public.beta_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  beta_code VARCHAR(64),
  status VARCHAR(32) NOT NULL DEFAULT 'invited', -- invited, active, suspended, graduated
  beta_group VARCHAR(64) DEFAULT 'general', -- internal_testers, early_access, power_users, enterprise_beta
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  feedback_count INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_beta_users_email ON public.beta_users(email);
CREATE INDEX IF NOT EXISTS idx_beta_users_status ON public.beta_users(status);

-- 7. BETA INVITES TABLE
CREATE TABLE IF NOT EXISTS public.beta_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(255),
  beta_group VARCHAR(64) DEFAULT 'general',
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_beta_invites_code ON public.beta_invites(code);

-- 8. BETA FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS public.beta_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email VARCHAR(255),
  feedback_type VARCHAR(32) NOT NULL DEFAULT 'feedback', -- feedback, bug_report, feature_request, performance_issue
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  screenshot_url TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'open', -- open, under_review, resolved, closed
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_beta_feedback_type ON public.beta_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_beta_feedback_status ON public.beta_feedback(status);

-- 9. CRASH REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.crash_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  error_name VARCHAR(255) NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  severity VARCHAR(32) NOT NULL DEFAULT 'error', -- warning, error, critical, fatal
  component_stack TEXT,
  environment VARCHAR(32) DEFAULT 'production',
  metadata JSONB DEFAULT '{}'::jsonb,
  status VARCHAR(32) NOT NULL DEFAULT 'unresolved', -- unresolved, investigating, resolved, ignored
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crash_reports_severity ON public.crash_reports(severity);
CREATE INDEX IF NOT EXISTS idx_crash_reports_status ON public.crash_reports(status);

-- 10. RELEASE NOTES TABLE
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_release_notes_version ON public.release_notes(version);

-- ====================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

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

-- Service Role full access policies
CREATE POLICY "Service role manages releases" ON public.releases FOR ALL USING (true);
CREATE POLICY "Service role manages deployments" ON public.deployments FOR ALL USING (true);
CREATE POLICY "Service role manages feature_flags" ON public.feature_flags FOR ALL USING (true);
CREATE POLICY "Service role manages health_checks" ON public.health_checks FOR ALL USING (true);
CREATE POLICY "Service role manages rollbacks" ON public.rollbacks FOR ALL USING (true);
CREATE POLICY "Service role manages beta_users" ON public.beta_users FOR ALL USING (true);
CREATE POLICY "Service role manages beta_invites" ON public.beta_invites FOR ALL USING (true);
CREATE POLICY "Service role manages beta_feedback" ON public.beta_feedback FOR ALL USING (true);
CREATE POLICY "Service role manages crash_reports" ON public.crash_reports FOR ALL USING (true);
CREATE POLICY "Service role manages release_notes" ON public.release_notes FOR ALL USING (true);

-- Public read access for release notes & public feature flags
CREATE POLICY "Public views published release notes" ON public.release_notes FOR SELECT USING (is_published = true);
CREATE POLICY "Public reads feature flags" ON public.feature_flags FOR SELECT USING (deleted_at IS NULL);
