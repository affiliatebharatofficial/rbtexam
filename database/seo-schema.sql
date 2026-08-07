-- Enterprise SEO & Programmatic Content Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. SEO Metadata Overrides Table
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url_path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  robots TEXT DEFAULT 'index, follow',
  keywords TEXT[] DEFAULT '{}',
  og_image TEXT,
  schema_type TEXT DEFAULT 'WebPage',
  custom_json_ld JSONB,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SEO Redirects Table
CREATE TABLE IF NOT EXISTS public.seo_redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_path TEXT UNIQUE NOT NULL,
  target_path TEXT NOT NULL,
  status_code INTEGER DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Internal Links Graph Table
CREATE TABLE IF NOT EXISTS public.internal_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  anchor_text TEXT NOT NULL,
  relevance_score INTEGER DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(source_url, target_url)
);

-- 4. Content Clusters Table (Pillar / Cluster Taxonomy)
CREATE TABLE IF NOT EXISTS public.content_clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pillar_title TEXT NOT NULL,
  pillar_slug TEXT UNIQUE NOT NULL,
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  cluster_urls TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ABA Glossary Terms Table
CREATE TABLE IF NOT EXISTS public.glossary_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT NOT NULL,
  bacb_citation TEXT NOT NULL,
  clinical_example TEXT NOT NULL,
  mnemonic_tip TEXT,
  related_terms TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Fast Routing & Sitemap Generation
CREATE INDEX IF NOT EXISTS idx_seo_metadata_path ON public.seo_metadata(url_path);
CREATE INDEX IF NOT EXISTS idx_seo_redirects_source ON public.seo_redirects(source_path);
CREATE INDEX IF NOT EXISTS idx_glossary_slug ON public.glossary_terms(slug);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read SEO metadata" ON public.seo_metadata FOR SELECT USING (true);
CREATE POLICY "Public read glossary terms" ON public.glossary_terms FOR SELECT USING (true);
