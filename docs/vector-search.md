# Vector Search & pgvector — RBTTrainingAI SaaS

## Purpose
Specifies pgvector IVFFlat cosine similarity search, approximate nearest-neighbour (ANN) queries, and multi-provider embedding adapter strategy.

## Index Strategy
- `USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)` — optimal for 10k–500k chunk corpus.
- At 1M+ chunks, migrate to HNSW index: `USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64)`.

## Providers Supported
| Provider | Model | Dimensions | Admin Configurable |
|---|---|---|---|
| OpenAI | text-embedding-ada-002 | 1536 | ✅ |
| OpenAI | text-embedding-3-small | 1536 | ✅ |
| Google | text-embedding-004 | 768 | 🔜 |
| Cohere | embed-english-v3 | 1024 | 🔜 |

## Related Files
- [database/rag-schema.sql](file:///g:/RBT/database/rag-schema.sql)
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts)
