-- ====================================================================
-- RBT Practice Questions Database Migration: Articles & Blog CMS Schema
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN (
      'RBT Exam Guide',
      'ABA Techniques',
      'BACB Ethics',
      'Study Strategies',
      'Clinical Scenarios',
      'Career & Certification'
    )
  ) DEFAULT 'RBT Exam Guide',
  tags TEXT[] DEFAULT '{}',
  cover_image_url TEXT,
  author_name TEXT DEFAULT 'Jobpe gyan',
  read_time_minutes INTEGER DEFAULT 5,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);

-- RLS Security Policies
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'articles' AND policyname = 'Public can view published articles') THEN
    CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (status = 'published');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'articles' AND policyname = 'Admins can manage all articles') THEN
    CREATE POLICY "Admins can manage all articles" ON public.articles FOR ALL USING (true);
  END IF;
END $$;
