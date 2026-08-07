-- Enterprise AI Knowledge Graph & RAG Engine - PostgreSQL Schema (pgvector + Supabase Ready)
-- Enable pgvector extension before running: CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Knowledge Source Registry Table
CREATE TABLE IF NOT EXISTS public.knowledge_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type TEXT NOT NULL CHECK (source_type IN (
    'question_bank','flashcard_deck','glossary_term','study_guide',
    'blog_article','clinical_scenario','case_study','ai_notes',
    'user_bookmark','user_notes'
  )),
  source_reference_id TEXT NOT NULL,  -- FK to the source record (question id, flashcard id, etc.)
  title TEXT NOT NULL,
  is_licensed BOOLEAN DEFAULT true,   -- Only ingest licensed / internal content
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Knowledge Chunks Table (pgvector enabled)
CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES public.knowledge_sources(id) ON DELETE CASCADE,
  certification TEXT NOT NULL CHECK (certification IN ('RBT','BCaBA','BCBA','all')),
  category TEXT NOT NULL,
  subcategory TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy','medium','hard')),
  content TEXT NOT NULL,
  summary TEXT,
  keywords TEXT[] DEFAULT '{}',
  chunk_index INTEGER DEFAULT 0,    -- Position within the parent source document
  chunk_hash TEXT NOT NULL,         -- SHA-256 of content for duplicate detection
  embedding_model TEXT NOT NULL,
  embedding_version TEXT NOT NULL,
  embedding VECTOR(1536),           -- OpenAI ada-002 / text-embedding-3-small dimension
  is_indexed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Knowledge Graph Nodes Table
CREATE TABLE IF NOT EXISTS public.knowledge_graph_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  node_type TEXT NOT NULL CHECK (node_type IN ('topic','concept','question','flashcard','definition','scenario')),
  certification TEXT NOT NULL CHECK (certification IN ('RBT','BCaBA','BCBA','all')),
  category TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Knowledge Graph Edges Table (relationships between nodes)
CREATE TABLE IF NOT EXISTS public.knowledge_graph_edges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_node_id UUID REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
  target_node_id UUID REFERENCES public.knowledge_graph_nodes(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL CHECK (relationship IN (
    'related_to','prerequisite_of','example_of','contrasts_with','part_of'
  )),
  weight NUMERIC(4,3) NOT NULL DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Embedding Queue (for background workers)
CREATE TABLE IF NOT EXISTS public.embedding_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chunk_id UUID REFERENCES public.knowledge_chunks(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
  error_message TEXT,
  queued_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  processed_at TIMESTAMPTZ
);

-- 6. Retrieval Logs (RAG analytics)
CREATE TABLE IF NOT EXISTS public.retrieval_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL,
  top_confidence_score NUMERIC(4,3),
  latency_ms INTEGER,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─── INDEXES ───────────────────────────────────────────────────────────────
-- IVFFlat index for approximate nearest-neighbour vector search
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON public.knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_chunks_certification ON public.knowledge_chunks(certification, category);
CREATE INDEX IF NOT EXISTS idx_chunks_is_indexed ON public.knowledge_chunks(is_indexed);
CREATE INDEX IF NOT EXISTS idx_retrieval_logs_timestamp ON public.retrieval_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_embedding_queue_status ON public.embedding_queue(status);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────
ALTER TABLE public.knowledge_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_graph_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retrieval_logs ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read indexed knowledge
CREATE POLICY "Authenticated users read indexed chunks" ON public.knowledge_chunks
  FOR SELECT USING (is_indexed = true AND auth.role() = 'authenticated');

-- Retrieval logs only visible to the user who triggered the query
CREATE POLICY "Users view own retrieval logs" ON public.retrieval_logs
  FOR SELECT USING (auth.uid() = user_id);
