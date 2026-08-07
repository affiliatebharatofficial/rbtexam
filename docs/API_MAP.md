# API MAP — RBTTrainingAI SaaS

## Complete REST Endpoint Registry

| Endpoint | Method | Auth | Rate Limit | Description | Documentation |
|---|---|---|---|---|---|
| `/api/health` | GET | None | 100 req/min | Platform unified service health status | [monitoring.md](file:///g:/RBT/docs/monitoring.md) |
| `/api/rag/search` | POST | User | 60 req/min | Hybrid pgvector semantic search | [rag-engine.md](file:///g:/RBT/docs/rag-engine.md) |
| `/api/tutor/chat` | POST | User | 30 req/min | Socrates AI Tutor interactive mentorship | [10-ai-tutor-engine.md](file:///g:/RBT/docs/10-ai-tutor-engine.md) |
| `/api/questions` | GET | User | 120 req/min | Fetch practice test question bank items | [07-question-engine.md](file:///g:/RBT/docs/07-question-engine.md) |
| `/api/flashcards` | GET | User | 120 req/min | Fetch spaced repetition flashcards | [09-flashcards-engine.md](file:///g:/RBT/docs/09-flashcards-engine.md) |
| `/api/admin/project-brain` | GET | Admin | 30 req/min | Master Project Brain self-inspection | [PROJECT_BRAIN.md](file:///g:/RBT/docs/PROJECT_BRAIN.md) |
| `/api/admin/ai-workforce/agents` | GET/PUT | Admin | 60 req/min | AI agent directory & model routing | [ai-workforce.md](file:///g:/RBT/docs/ai-workforce.md) |
| `/api/admin/ai-workforce/orchestrate` | POST | Admin | 20 req/min | Execute multi-agent collaboration pipeline | [agent-orchestration.md](file:///g:/RBT/docs/agent-orchestration.md) |
| `/api/admin/ai-workforce/queue` | GET | Admin | 60 req/min | Fetch workforce job queue & metrics | [job-queue.md](file:///g:/RBT/docs/job-queue.md) |
| `/api/security/summary` | GET | Admin | 30 req/min | Security threat logs & metrics | [security-engine.md](file:///g:/RBT/docs/security-engine.md) |
| `/api/privacy/request` | POST | None | 10 req/min | Submit GDPR/CCPA data privacy request | [privacy-engine.md](file:///g:/RBT/docs/privacy-engine.md) |
| `/api/v1/developer/keys` | GET/POST | User | 30 req/min | Scoped developer API key management | [api-platform.md](file:///g:/RBT/docs/api-platform.md) |
| `/api/v1/health` | GET | None | 100 req/min | Developer portal v1 health check | [api-platform.md](file:///g:/RBT/docs/api-platform.md) |
| `/api/billing/plans` | GET | None | 120 req/min | Fetch SaaS subscription plans | [14-subscription-engine.md](file:///g:/RBT/docs/14-subscription-engine.md) |
| `/api/billing/webhook` | POST | Secret | Unlimited | Stripe billing webhook handler | [15-payment-engine.md](file:///g:/RBT/docs/15-payment-engine.md) |
| `/api/seo/metadata` | GET | None | 200 req/min | SEO title/meta metadata | [12-seo-engine.md](file:///g:/RBT/docs/12-seo-engine.md) |
| `/api/v1/release-management/releases` | GET/POST | Admin | 60 req/min | Release lifecycle & SemVer updates | [release-management.md](file:///g:/RBT/docs/release-management.md) |
| `/api/v1/release-management/feature-flags` | GET/POST | Admin | 120 req/min | Feature flags evaluation & rules | [feature-flags.md](file:///g:/RBT/docs/feature-flags.md) |
| `/api/v1/release-management/validation` | POST | Admin | 20 req/min | Run 20-point pre-launch validation matrix | [deployment-checklist.md](file:///g:/RBT/docs/deployment-checklist.md) |
| `/api/v1/release-management/rollback` | GET/POST | Admin | 10 req/min | Rollback execution & history logs | [rollback-strategy.md](file:///g:/RBT/docs/rollback-strategy.md) |
| `/api/v1/release-management/maintenance` | GET/POST | Admin | 60 req/min | Maintenance & emergency mode state | [maintenance-mode.md](file:///g:/RBT/docs/maintenance-mode.md) |
| `/api/v1/beta/invites` | GET/POST | Public | 60 req/min | Beta invite redemption & feedback | [beta-program.md](file:///g:/RBT/docs/beta-program.md) |
| `/api/v1/crash-reports` | GET/POST | Public | 100 req/min | Global crash reporting & error logs | [production-launch.md](file:///g:/RBT/docs/production-launch.md) |
| `/api/v1/health/system` | GET | None | 100 req/min | 11-Subsystem deep health audit | [production-launch.md](file:///g:/RBT/docs/production-launch.md) |

## Related Files
- [docs/FEATURE_MAP.md](file:///g:/RBT/docs/FEATURE_MAP.md)
- [docs/DATABASE_MAP.md](file:///g:/RBT/docs/DATABASE_MAP.md)
