-- Socrates AI Tutor Engine Database Schema (PostgreSQL 15+ / Supabase Ready)

-- 1. AI Conversations Table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Socrates AI Chat',
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  mode TEXT NOT NULL CHECK (mode IN ('socratic_mentor', 'question_explainer', 'scenario_analyzer', 'flashcard_generator', 'quiz_generator')) DEFAULT 'socratic_mentor',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. AI Messages Table
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  clinical_insight JSONB,
  scenario_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. AI Prompt Templates Table (Centralized Prompt Manager)
CREATE TABLE IF NOT EXISTS public.ai_prompt_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mode TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'gemini', 'openrouter', 'anthropic')),
  model TEXT NOT NULL DEFAULT 'gpt-4o-mini',
  temperature NUMERIC(3,2) DEFAULT 0.70,
  max_tokens INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. AI Usage & Token Logs Table
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL,
  completion_tokens INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  estimated_cost_usd NUMERIC(8,6) DEFAULT 0.000000,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for Fast Conversation & Message Lookups
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON public.ai_conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conv ON public.ai_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user ON public.ai_usage_logs(user_id);

-- Supabase Row Level Security (RLS)
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own AI conversations" ON public.ai_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own AI messages" ON public.ai_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.ai_conversations
      WHERE ai_conversations.id = ai_messages.conversation_id
      AND ai_conversations.user_id = auth.uid()
    )
  );
