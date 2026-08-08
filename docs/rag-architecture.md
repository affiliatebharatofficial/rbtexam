# RAG Architecture Overview — RBT Practice Questions SaaS

## Purpose
End-to-end RAG system architecture diagram and decision record for the centralized knowledge intelligence platform.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Knowledge Sources                      │
│  Question Bank · Flashcards · Glossary · Study Guides   │
│  Clinical Scenarios · Case Studies · AI Notes            │
└─────────────────┬───────────────────────────────────────┘
                  │ ingestKnowledgeChunk()
                  ▼
┌─────────────────────────────────────────────────────────┐
│           Cleaning · Deduplication · Chunking            │
│  semanticChunk() · SHA-256 hash · 512-token windows      │
└─────────────────┬───────────────────────────────────────┘
                  │ embedding_queue
                  ▼
┌─────────────────────────────────────────────────────────┐
│        OpenAI text-embedding-ada-002 (1536-dim)          │
│              pgvector IVFFlat index                      │
└─────────────────┬───────────────────────────────────────┘
                  │ ragSearch()
                  ▼
┌─────────────────────────────────────────────────────────┐
│   Hybrid Search: Semantic (60%) + Keyword (40%)          │
│   Metadata Filters: certification / category / difficulty│
│   Re-Ranking: confidenceScore + relevanceScore           │
└─────────────────┬───────────────────────────────────────┘
                  │ buildLLMContext()
                  ▼
┌─────────────────────────────────────────────────────────┐
│      LLM (GPT-4o / Gemini 1.5 Pro) System Prompt        │
│   ===KNOWLEDGE BASE CONTEXT=== injected before prompt    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
      Grounded, Source-Attributed AI Response
```

## Design Decisions
| Decision | Choice | Rationale |
|---|---|---|
| Vector DB | pgvector (Supabase) | Zero additional infrastructure, Postgres-native |
| Embedding model | text-embedding-ada-002 | Best accuracy/cost balance, widely supported |
| Chunk size | 512 tokens / 1800 chars | Optimal context window fit for GPT-4o |
| Search strategy | Hybrid BM25 + cosine | Outperforms pure semantic on factual ABA terminology |
| Re-ranking | Score fusion | Simple, low-latency, no extra model call |

## Related Files
- [docs/rag-engine.md](file:///g:/RBT/docs/rag-engine.md)
- [docs/embedding-pipeline.md](file:///g:/RBT/docs/embedding-pipeline.md)
- [docs/retrieval-engine.md](file:///g:/RBT/docs/retrieval-engine.md)
- [docs/vector-search.md](file:///g:/RBT/docs/vector-search.md)
- [docs/knowledge-graph.md](file:///g:/RBT/docs/knowledge-graph.md)
