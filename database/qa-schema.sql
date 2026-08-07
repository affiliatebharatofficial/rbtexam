-- QA & Testing Engine Database Schema

CREATE TABLE IF NOT EXISTS public.test_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_type TEXT NOT NULL CHECK (run_type IN ('unit', 'integration', 'e2e', 'ai_regression', 'performance')),
  triggered_by TEXT NOT NULL CHECK (triggered_by IN ('commit', 'pull_request', 'merge', 'nightly', 'manual')),
  branch TEXT,
  commit_sha TEXT,
  status TEXT NOT NULL CHECK (status IN ('running', 'passed', 'failed', 'cancelled')),
  total_tests INTEGER DEFAULT 0,
  passed_tests INTEGER DEFAULT 0,
  failed_tests INTEGER DEFAULT 0,
  skipped_tests INTEGER DEFAULT 0,
  coverage_lines_percentage NUMERIC(5,2),
  coverage_functions_percentage NUMERIC(5,2),
  duration_ms INTEGER,
  report_url TEXT,
  started_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.test_failures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id UUID REFERENCES public.test_runs(id) ON DELETE CASCADE,
  test_suite TEXT NOT NULL,
  test_name TEXT NOT NULL,
  error_message TEXT,
  stack_trace TEXT,
  screenshot_url TEXT,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.quality_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  unit_coverage_percentage NUMERIC(5,2),
  integration_coverage_percentage NUMERIC(5,2),
  e2e_pass_rate_percentage NUMERIC(5,2),
  ai_prompt_regression_pass_rate NUMERIC(5,2),
  total_tests_run INTEGER,
  open_failures INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_test_runs_status ON public.test_runs(status, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_failures_run ON public.test_failures(run_id);
