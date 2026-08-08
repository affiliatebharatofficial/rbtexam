# SYSTEM MAP — RBT Practice Questions SaaS

## High-Level System Subsystems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            User & Admin Frontend                            │
│  Candidate App · Socrates AI Tutor · Super Admin CMS · Developer Portal      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST APIs / Server Actions
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Security & API Gateway                           │
│  Zero Trust Guard · sanitizeAIPromptInput() · API Key Auth · Rate Limit     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
┌──────────────┐             ┌──────────────────┐           ┌──────────────────┐
│  AI Workforce│             │ RAG & Knowledge  │           │ Billing & Quotas │
│ 29 AI Agents │             │ Hybrid pgvector  │           │ Stripe Webhooks  │
└───────┬──────┘             └─────────┬────────┘           └─────────┬────────┘
        │                              │                              │
        └──────────────────────────────┴──────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Persistence Layer                                │
│               Supabase PostgreSQL 15 · pgvector (1536-dim)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Subsystem Responsibilities
1. **Frontend Presentation**: Next.js 16 App Router views with glassmorphic design and dark mode.
2. **Security Gateway**: Input sanitization, API key scoping, session tracking, and threat logging.
3. **AI Workforce**: Autonomous agent collaboration across content and operations.
4. **RAG Knowledge Hub**: Vector search retrieval over internal BACB study materials.
5. **Monetization**: SaaS subscription tier permissions and usage quota enforcement.

## Related Files
- [docs/PROJECT_BRAIN.md](file:///g:/RBT/docs/PROJECT_BRAIN.md)
- [docs/ENGINE_MAP.md](file:///g:/RBT/docs/ENGINE_MAP.md)
