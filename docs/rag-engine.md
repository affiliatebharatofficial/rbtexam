# RAG Engine — RBT Practice Questions SaaS

## Purpose
The RAG (Retrieval-Augmented Generation) Engine is the centralized knowledge intelligence platform for RBT Practice Questions. It prevents AI hallucination by grounding every AI Tutor response, adaptive recommendation, and study plan in authoritative internal knowledge — never relying solely on LLM memory.

## Architecture

```
Knowledge Source (Question Bank / Flashcards / Glossary / Study Guides)
  ↓ Cleaning & Deduplication (chunk_hash SHA-256)
  ↓ Semantic Chunking (≤512 tokens, 200-token overlap)
  ↓ Embedding (OpenAI text-embedding-ada-002 / 3-small, 1536-dim)
  ↓ pgvector Storage (IVFFlat cosine index)
  ↓ Hybrid Search (Semantic + Keyword BM25)
  ↓ Metadata Filters (certification / category / difficulty)
  ↓ Re-ranking (confidence + relevance score)
  ↓ buildLLMContext() → LLM System Prompt Injection
  ↓ AI Response (grounded, source-attributed)
```

## Folder Location
- `g:\RBT\types\rag-engine.ts`
- `g:\RBT\lib\rag-engine.ts`
- `g:\RBT\database\rag-schema.sql`
- `g:\RBT\app\admin\knowledge\page.tsx`
- `g:\RBT\app\api\rag\search\route.ts`
- `g:\RBT\app\api\admin\rag\index\route.ts`

## Database Tables Used
- `public.knowledge_sources`
- `public.knowledge_chunks` (pgvector `VECTOR(1536)`)
- `public.knowledge_graph_nodes`
- `public.knowledge_graph_edges`
- `public.embedding_queue`
- `public.retrieval_logs`

## API Endpoints
- `POST /api/rag/search` — Hybrid RAG search with filters.
- `GET /api/admin/rag/index` — Admin knowledge index, metrics, and embedding queue.

## Knowledge Sources
Only authorized internal sources are ingested:
- Internal Question Bank (`question_bank`)
- Internal Flashcard Decks (`flashcard_deck`)
- Internal Glossary (`glossary_term`)
- Internal Study Guides (`study_guide`)
- Internal Blog Articles (`blog_article`)
- Internal Clinical Scenarios (`clinical_scenario`)
- Internal Case Studies (`case_study`)
- AI-Generated Notes (`ai_notes`)
- User Bookmarks (`user_bookmark`) — isolated per user via RLS

**Third-party copyrighted content is never ingested without a valid license.**

## Business Logic
1. All ingested chunks are assigned a SHA-256 `chunk_hash` for duplicate detection.
2. Chunks are versioned with `embedding_model` and `embedding_version` fields.
3. On Admin re-index, all chunks with stale `embedding_version` are queued to `embedding_queue`.
4. `buildLLMContext()` assembles the top-4 retrieved chunks into a structured system prompt block, transparently labeled with source type, category, and confidence score.

## Security Notes
- Supabase RLS: authenticated users can only read `is_indexed = true` chunks.
- User notes are isolated via `user_id` foreign key and per-user RLS policy.
- No external knowledge scraped; all content sourced internally.

## Performance Considerations
- IVFFlat index with 100 lists for sub-10ms approximate nearest-neighbour search at 100k+ chunks.
- Embedding generation batched in background workers (max 100 chunks/batch).
- Retrieved contexts cached per query hash for 5 minutes to avoid redundant vector lookups.

## Future Improvements
- Pinecone / Qdrant multi-provider support via adapter pattern.
- Graph-based traversal retrieval (walk knowledge edges to surface prerequisite concepts).
- Streaming RAG responses via Server-Sent Events.
- Automated re-indexing trigger on Question Bank or Flashcard edits.

## Dependencies
- `pgvector`: PostgreSQL vector extension (Supabase managed).
- `@supabase/supabase-js`: ^2.39.0
- OpenAI `text-embedding-ada-002` (1536-dim) via `OPENAI_API_KEY`.

## Related Files
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts)
- [types/rag-engine.ts](file:///g:/RBT/types/rag-engine.ts)
- [database/rag-schema.sql](file:///g:/RBT/database/rag-schema.sql)
- [app/admin/knowledge/page.tsx](file:///g:/RBT/app/admin/knowledge/page.tsx)
- [docs/knowledge-graph.md](file:///g:/RBT/docs/knowledge-graph.md)
