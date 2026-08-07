# Infrastructure Architecture — RBTTrainingAI SaaS

## Purpose
Enterprise cloud and self-host infrastructure specification designed to scale to millions of active candidates across RBT, BCaBA, and BCBA certifications.

## Topology Summary
- **Edge Routing**: Vercel Anycast Global CDN & Edge Functions (Sub-50ms TTFB worldwide).
- **Application Logic**: Next.js 16 (App Router + Server Components + API Routes).
- **Database Engine**: PostgreSQL 15 on Supabase with Connection Pooling (PgBouncer) & `pgvector` indexing.
- **Cache & Rate Limiting Layer**: Redis 7 for high-performance session state and API rate limiting.
- **Search & Knowledge Engine**: Hybrid BM25 + Vector Search (`pgvector` IVFFlat index).
- **AI Infrastructure**: OpenAI API (GPT-4o, text-embedding-ada-002) with circuit-breaking fallback handlers.

## Scaling Thresholds
- **0 - 50k MAU**: Vercel Pro + Supabase Pro (Shared DB).
- **50k - 500k MAU**: Dedicated Supabase DB Instance + Redis Cluster + Vercel Enterprise.
- **500k+ MAU / Enterprise Acquisition**: Kubernetes (EKS/GKE) + AWS Aurora PostgreSQL + Pinecone vector DB.

## Related Files
- [lib/health-engine.ts](file:///g:/RBT/lib/health-engine.ts)
- [app/admin/infrastructure/page.tsx](file:///g:/RBT/app/admin/infrastructure/page.tsx)
- [docs/devops.md](file:///g:/RBT/docs/devops.md)
