# SYSTEM MAP — RBTTrainingAI SaaS

## High-Level System Dataflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Client Interface Layer                          │
│        Web App (Next.js 16) · Mobile Web · Developer API Portal              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / REST / Server Actions
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Security & API Gateway                           │
│  sanitizeAIPromptInput() · validateAPIKeyRequest() · Rate Limiting · RLS     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
┌──────────────┐             ┌──────────────────┐           ┌──────────────────┐
│  RAG Engine  │             │ Adaptive Engine  │           │ Billing & Quotas │
│ Hybrid Search│             │ Task List Weight │           │ Usage Limits     │
└───────┬──────┘             └─────────┬────────┘           └─────────┬────────┘
        │                              │                              │
        ▼                              ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Persistence & Vector DB                          │
│               Supabase PostgreSQL 15 · pgvector (1536-dim)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## System Subsystems
1. **Intelligence Subsystem**: RAG Engine + Knowledge Graph + AI Prompt Manager.
2. **Security Subsystem**: Zero Trust firewall + Threat Logger + Data Subject Request pipeline.
3. **Monetization Subsystem**: Stripe billing + Feature entitlement guard + Usage quotas.
4. **Operations Subsystem**: Super Admin CMS + Health Engine + CI/CD deployment pipeline.

## Related Files
- [ENGINE_MAP.md](file:///g:/RBT/ENGINE_MAP.md)
- [PROJECT_INDEX.md](file:///g:/RBT/PROJECT_INDEX.md)
