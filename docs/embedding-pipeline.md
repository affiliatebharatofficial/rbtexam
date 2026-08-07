# Embedding Pipeline — RBTTrainingAI SaaS

## Purpose
Specifies the semantic chunking strategy, embedding generation workflow, versioned embedding metadata, and background embedding queue processing.

## Chunking Strategy
- **Max chunk size**: 512 tokens (≈1800 characters)
- **Overlap**: 200 characters across sentence boundaries
- **Method**: Sentence-boundary semantic split (`semanticChunk()` in `lib/rag-engine.ts`)
- **Duplicate detection**: SHA-256 `chunk_hash` on raw content

## Embedding Queue Lifecycle
```
ingestKnowledgeChunk() → embedding_queue (pending)
  → Background worker picks up pending items
  → Calls OpenAI Embeddings API (batch 100 chunks)
  → Upserts VECTOR(1536) into knowledge_chunks.embedding
  → Sets is_indexed = true, embedding_queue.status = 'completed'
```

## Related Files
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts) — `ingestKnowledgeChunk()`, `semanticChunk()`
- [database/rag-schema.sql](file:///g:/RBT/database/rag-schema.sql) — `embedding_queue`, `knowledge_chunks.embedding`
