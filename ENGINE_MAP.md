# ENGINE MAP — RBT Practice Questions SaaS

## Platform Intelligence Engine Registry

| Engine | File Location | Key Responsibilities | Primary Consumers |
|---|---|---|---|
| **RAG Engine** | `lib/rag-engine.ts` | Hybrid vector + keyword search, semantic chunking, system prompt context builder | Socrates AI Tutor, Study Planner |
| **Security Engine** | `lib/security-engine.ts` | AI prompt injection guard, threat logging, session revocation, privacy DSR | API Middleware, Auth Routes |
| **Notification Engine** | `lib/notification-engine.ts` | Event-driven notifications, email templates, workflow automation, campaigns | User Dashboard, Admin CMS |
| **API Gateway** | `lib/api-gateway.ts` | API key generation, scope checking, webhook dispatch, developer analytics | Developer Portal, Public APIs |
| **Subscription Engine** | `lib/subscription-engine.ts` | SaaS tier management, Stripe webhook handling, feature access guards, quotas | Pricing Page, Practice Tests |
| **Adaptive Learning Engine** | `lib/adaptive-learning-engine.ts` | Learning behavior analysis, weakness detection, dynamic exam score predictions | Practice Tests, Analytics |
| **AI Content Engine** | `lib/ai-content-engine.ts` | Educational content generation, human-in-the-loop editorial workflow | Admin Content CMS |
| **SEO Engine** | `lib/seo-engine.ts` | Programmatic SEO page generation, schema markup, broken link audits | Dynamic `/rbt` Routes |
| **Health Engine** | `lib/health-engine.ts` | Aggregated service health checks, DB/OpenAI status reporting | `/api/health`, Admin Infrastructure |
| **Release Management Engine** | `lib/release-management-engine.ts` | SemVer releases, 20-point validation matrix, feature flags, beta program, rollbacks & emergency safety | Super Admin Launch Control, API Platform |

## Related Files
- [FEATURE_MAP.md](file:///g:/RBT/FEATURE_MAP.md)
- [PROJECT_INDEX.md](file:///g:/RBT/PROJECT_INDEX.md)
