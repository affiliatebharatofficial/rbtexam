# Scalability & Capacity Review — RBTTrainingAI SaaS

## Capacity Benchmark Matrix

| Tier | Active Users (MAU) | Bottleneck Component | Mitigation Strategy | Infrastructure Cost Estimate |
|---|---|---|---|---|
| **100 Users** | 100 | None | Vercel Free + Supabase Free | $0 / mo |
| **1,000 Users** | 1,000 | Serverless Cold Starts | Vercel Pro (Always Warm) | $20 / mo |
| **10,000 Users** | 10,000 | DB Connection Limits | Supabase PgBouncer Pooler | $50 - $100 / mo |
| **100,000 Users** | 100,000 | `pgvector` IVFFlat Index Search | Migrate to HNSW Index (`m=16, ef=64`) | $300 - $600 / mo |
| **1,000,000 Users**| 1,000,000 | Monolithic Database Writes | Partitioning + Pinecone Vector DB | $2,000 - $4,000 / mo |

---

## Architectural Scaling Bottlenecks Identified

### 1. Vector Search Indexing at Scale
- **Current**: IVFFlat index with 100 lists (`database/rag-schema.sql`).
- **Trigger**: > 100,000 knowledge chunks.
- **Solution**: Upgrade to HNSW (Hierarchical Navigable Small World) index for O(log N) approximate nearest-neighbour search.

### 2. Analytics Aggregation
- **Current**: Real-time SQL aggregation queries (`analytics_events`).
- **Trigger**: > 1,000,000 events/month.
- **Solution**: Asynchronous ingestion via PostHog / ClickHouse columnar store.

---

## Related Files
- [docs/infrastructure.md](file:///g:/RBT/docs/infrastructure.md)
- [docs/performance-review.md](file:///g:/RBT/docs/performance-review.md)
