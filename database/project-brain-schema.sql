-- Master Project Brain - PostgreSQL Schema

-- 1. Master Project Brain Registry Table
CREATE TABLE IF NOT EXISTS public.project_brain_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_name TEXT NOT NULL DEFAULT 'RBTTrainingAI',
  version TEXT NOT NULL DEFAULT 'v2.8.0',
  health_score NUMERIC(5,2) DEFAULT 98.50,
  total_features INTEGER DEFAULT 12,
  total_engines INTEGER DEFAULT 9,
  total_api_routes INTEGER DEFAULT 20,
  total_database_tables INTEGER DEFAULT 35,
  total_docs_files INTEGER DEFAULT 104,
  last_sync_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Feature Registry Table
CREATE TABLE IF NOT EXISTS public.feature_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  owner TEXT NOT NULL CHECK (owner IN ('Core Team','AI Team','SEO Team','Security Team','DevOps Team')),
  version TEXT NOT NULL DEFAULT 'v1.0.0',
  status TEXT NOT NULL CHECK (status IN ('planned','in_progress','completed','testing','production','deprecated')),
  dependencies TEXT[] DEFAULT '{}',
  database_tables TEXT[] DEFAULT '{}',
  api_endpoints TEXT[] DEFAULT '{}',
  routes TEXT[] DEFAULT '{}',
  documentation_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. API Registry Table
CREATE TABLE IF NOT EXISTS public.api_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint TEXT UNIQUE NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('GET','POST','PUT','DELETE','PATCH')),
  description TEXT NOT NULL,
  authentication TEXT NOT NULL CHECK (authentication IN ('none','user','admin','api_key')),
  rate_limit TEXT DEFAULT '60 req/min',
  consumer_modules TEXT[] DEFAULT '{}',
  documentation_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Database Registry Table
CREATE TABLE IF NOT EXISTS public.database_registry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT UNIQUE NOT NULL,
  schema TEXT NOT NULL DEFAULT 'public',
  description TEXT NOT NULL,
  column_count INTEGER NOT NULL,
  has_rls BOOLEAN DEFAULT true,
  has_indexes BOOLEAN DEFAULT true,
  related_tables TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Engine Dependency Graph Table
CREATE TABLE IF NOT EXISTS public.engine_dependencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  engine_name TEXT UNIQUE NOT NULL,
  file_location TEXT NOT NULL,
  depends_on TEXT[] DEFAULT '{}',
  consumed_by TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─── INDEXES ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_feature_registry_status ON public.feature_registry(status);
CREATE INDEX IF NOT EXISTS idx_feature_registry_owner ON public.feature_registry(owner);
CREATE INDEX IF NOT EXISTS idx_api_registry_method ON public.api_registry(method);
CREATE INDEX IF NOT EXISTS idx_database_registry_table ON public.database_registry(table_name);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────
ALTER TABLE public.project_brain_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users read project brain" ON public.project_brain_registry
  FOR SELECT USING (auth.role() = 'authenticated');
