-- AI Content Generation & Knowledge Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. Knowledge Base Repository Table
CREATE TABLE IF NOT EXISTS public.knowledge_base_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_or_concept TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  bacb_citation TEXT NOT NULL,
  canonical_definition TEXT NOT NULL,
  clinical_examples TEXT[] DEFAULT '{}',
  mnemonic_tip TEXT,
  related_item_ids UUID[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. AI Content Drafts Table
CREATE TABLE IF NOT EXISTS public.ai_content_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('question', 'flashcard', 'scenario', 'study_guide', 'blog_article', 'glossary_term')),
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  title TEXT NOT NULL,
  topic_category TEXT NOT NULL,
  bacb_task_code TEXT,
  content_payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'needs_review', 'fact_check', 'seo_review', 'approved', 'published', 'rejected', 'archived')) DEFAULT 'draft',
  version INTEGER DEFAULT 1,
  quality_score NUMERIC(5,2) DEFAULT 90.00,
  created_by_ai_provider TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Content Versions History Table
CREATE TABLE IF NOT EXISTS public.content_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  draft_id UUID REFERENCES public.ai_content_drafts(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content_payload_snapshot JSONB NOT NULL,
  edited_by UUID REFERENCES auth.users(id),
  change_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Quality Reports Table
CREATE TABLE IF NOT EXISTS public.quality_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  draft_id UUID REFERENCES public.ai_content_drafts(id) ON DELETE CASCADE,
  overall_score NUMERIC(5,2) NOT NULL,
  reading_level TEXT NOT NULL,
  duplicate_risk_percentage NUMERIC(5,2) DEFAULT 0.00,
  has_bacb_citation BOOLEAN DEFAULT true,
  has_distractor_explanations BOOLEAN DEFAULT true,
  has_schema_markup BOOLEAN DEFAULT true,
  issues TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Quick Editorial Filtering
CREATE INDEX IF NOT EXISTS idx_drafts_status ON public.ai_content_drafts(status);
CREATE INDEX IF NOT EXISTS idx_drafts_type ON public.ai_content_drafts(type);
CREATE INDEX IF NOT EXISTS idx_drafts_task ON public.ai_content_drafts(bacb_task_code);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.knowledge_base_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read knowledge base" ON public.knowledge_base_items FOR SELECT USING (true);
CREATE POLICY "Admins manage AI drafts" ON public.ai_content_drafts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin', 'bcba_editor')
  )
);
