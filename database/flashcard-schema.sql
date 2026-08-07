-- Smart Flashcard Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. Master Flashcards Table
CREATE TABLE IF NOT EXISTS public.master_flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  card_type TEXT NOT NULL CHECK (card_type IN ('basic', 'definition', 'image', 'scenario', 'case_study', 'fill_in_the_blank', 'true_false', 'ai_generated')),
  explanation TEXT NOT NULL,
  clinical_explanation TEXT NOT NULL,
  memory_tip TEXT,
  real_life_example TEXT,
  common_mistakes TEXT,
  reference TEXT NOT NULL,
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  category TEXT NOT NULL,
  subcategory TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  keywords TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('published', 'draft', 'archived')) DEFAULT 'published',
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Spaced Repetition Progress Table
CREATE TABLE IF NOT EXISTS public.user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES public.master_flashcards(id) ON DELETE CASCADE,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  wrong_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  confidence_score INTEGER DEFAULT 1,
  mastery_score INTEGER DEFAULT 0,
  ease_factor NUMERIC(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 0,
  learning_stage TEXT NOT NULL CHECK (learning_stage IN ('learning', 'review', 'mastered', 'forgotten')) DEFAULT 'learning',
  is_favorite BOOLEAN DEFAULT false,
  is_bookmarked BOOLEAN DEFAULT false,
  user_notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, card_id)
);

-- 3. Flashcard Decks Table
CREATE TABLE IF NOT EXISTS public.flashcard_decks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  certification TEXT CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  card_ids UUID[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Spaced Repetition & Due Card Queries
CREATE INDEX IF NOT EXISTS idx_flashcards_certification ON public.master_flashcards(certification);
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON public.master_flashcards(category);
CREATE INDEX IF NOT EXISTS idx_user_card_progress_due ON public.user_flashcard_progress(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_user_card_progress_stage ON public.user_flashcard_progress(user_id, learning_stage);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.master_flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view published flashcards" ON public.master_flashcards
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users access own flashcard progress" ON public.user_flashcard_progress
  FOR ALL USING (auth.uid() = user_id);
