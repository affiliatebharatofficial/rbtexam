# DATABASE MAP — RBTTrainingAI SaaS

## Master PostgreSQL Table Registry (35 Tables)

| Table Name | Schema | Columns | RLS Active | Primary Purpose | Documentation |
|---|---|---|---|---|---|
| `profiles` | `public` | 9 | ✅ | User profiles & certification target | [04-authentication.md](file:///g:/RBT/docs/04-authentication.md) |
| `master_questions` | `public` | 12 | ✅ | BACB question bank items | [07-question-engine.md](file:///g:/RBT/docs/07-question-engine.md) |
| `master_flashcards` | `public` | 10 | ✅ | Spaced repetition flashcard deck | [09-flashcards-engine.md](file:///g:/RBT/docs/09-flashcards-engine.md) |
| `subscriptions` | `public` | 10 | ✅ | User subscription tier & Stripe state | [14-subscription-engine.md](file:///g:/RBT/docs/14-subscription-engine.md) |
| `invoices` | `public` | 10 | ✅ | SaaS billing invoices & receipts | [15-payment-engine.md](file:///g:/RBT/docs/15-payment-engine.md) |
| `knowledge_chunks` | `public` | 14 | ✅ | pgvector 1536-dim embeddings store | [rag-engine.md](file:///g:/RBT/docs/rag-engine.md) |
| `knowledge_graph_nodes` | `public` | 7 | ✅ | ABA concept nodes | [knowledge-graph.md](file:///g:/RBT/docs/knowledge-graph.md) |
| `knowledge_graph_edges` | `public` | 6 | ✅ | Weighted concept relationships | [knowledge-graph.md](file:///g:/RBT/docs/knowledge-graph.md) |
| `ai_agents` | `public` | 17 | ✅ | Registry of 29 AI Employees | [ai-workforce.md](file:///g:/RBT/docs/ai-workforce.md) |
| `task_queue` | `public` | 8 | ✅ | Asynchronous workforce job queue | [job-queue.md](file:///g:/RBT/docs/job-queue.md) |
| `job_history` | `public` | 10 | ✅ | Agent execution step results | [agent-memory.md](file:///g:/RBT/docs/agent-memory.md) |
| `prompt_versions` | `public` | 9 | ✅ | System prompt versions & rollback | [prompt-governance.md](file:///g:/RBT/docs/prompt-governance.md) |
| `security_threat_logs` | `public` | 8 | ✅ | Rate limit & prompt injection events | [security-engine.md](file:///g:/RBT/docs/security-engine.md) |
| `schema_migrations` | `public` | 6 | ❌ | Migration tracking table | [devops.md](file:///g:/RBT/docs/devops.md) |
| `project_brain_registry` | `public` | 9 | ✅ | Project Brain system health | [PROJECT_BRAIN.md](file:///g:/RBT/docs/PROJECT_BRAIN.md) |
| `releases` | `public` | 14 | ✅ | SemVer release history & status | [release-management.md](file:///g:/RBT/docs/release-management.md) |
| `deployments` | `public` | 12 | ✅ | Deployment executions per env | [release-management.md](file:///g:/RBT/docs/release-management.md) |
| `feature_flags` | `public` | 12 | ✅ | Dynamic feature flags & targeting rules | [feature-flags.md](file:///g:/RBT/docs/feature-flags.md) |
| `health_checks` | `public` | 7 | ✅ | 11-subsystem health check audit log | [production-launch.md](file:///g:/RBT/docs/production-launch.md) |
| `rollbacks` | `public` | 10 | ✅ | Rollback execution history | [rollback-strategy.md](file:///g:/RBT/docs/rollback-strategy.md) |
| `beta_users` | `public` | 12 | ✅ | Private & public beta tester roster | [beta-program.md](file:///g:/RBT/docs/beta-program.md) |
| `beta_invites` | `public` | 9 | ✅ | Beta invite access codes | [beta-program.md](file:///g:/RBT/docs/beta-program.md) |
| `beta_feedback` | `public` | 11 | ✅ | User feedback & bug submissions | [beta-program.md](file:///g:/RBT/docs/beta-program.md) |
| `crash_reports` | `public` | 12 | ✅ | Client & server crash reports | [production-launch.md](file:///g:/RBT/docs/production-launch.md) |
| `release_notes` | `public` | 10 | ✅ | Published version release notes | [versioning.md](file:///g:/RBT/docs/versioning.md) |

## Related Files
- [docs/API_MAP.md](file:///g:/RBT/docs/API_MAP.md)
- [docs/03-database-schema.md](file:///g:/RBT/docs/03-database-schema.md)
