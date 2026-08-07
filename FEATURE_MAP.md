# FEATURE MAP — RBTTrainingAI SaaS

## Core Product Feature Matrix

| Feature Module | Route | Access Tier | Description | Engine Dependency |
|---|---|---|---|---|
| **BACB Practice Test Engine** | `/exam` | Free (limited) / Pro | 85-question mock exams, immediate feedback, task list tracking | `master-question-bank.ts`, `adaptive-learning-engine.ts` |
| **Socrates AI Tutor** | `/tutor` | Free (5/day) / Pro | Retrieval-augmented AI tutor grounded in internal knowledge | `rag-engine.ts`, `ai-prompt-manager.ts` |
| **Smart Flashcard Deck** | `/flashcards` | Free (15/day) / Pro | Leitner Leitner-box spaced repetition memory system | `flashcard-bank.ts`, `spaced-repetition-engine.ts` |
| **Adaptive Study Planner** | `/study-planner` | Pro / Team | Dynamically adjusts candidate study schedules based on weak areas | `adaptive-learning-engine.ts` |
| **Programmatic SEO Hub** | `/rbt` & `/rbt/question/[slug]` | Public | Thousands of SEO landing pages, schema markup, broken link checks | `seo-engine.ts` |
| **Developer API Portal** | `/developer` | Pro / Enterprise | API key generation, scope management, multi-language SDK code | `api-gateway.ts` |
| **AI Content Generator** | `/admin/content-engine` | Admin | Human-in-the-loop content draft generation & editorial review | `ai-content-engine.ts` |
| **Admin RAG & Knowledge Graph** | `/admin/knowledge` | Admin | Vector index explorer, Knowledge Graph topology viewer, prompt inspector | `rag-engine.ts` |
| **Admin QA Testing Center** | `/admin/qa` | Admin | Vitest + Playwright suite results, coverage targets | `health-engine.ts` |
| **Admin Security Center** | `/admin/security` | Admin | Security threat logs, session revocation, privacy DSR queue | `security-engine.ts` |
| **Admin DevOps Infrastructure** | `/admin/infrastructure` | Admin | Service health checks, deployment history, deploy commands | `health-engine.ts` |
| **Production Launch & Go-Live Control** | `/admin/launch-control` | Super Admin | 20-point validation matrix, feature flags, health diagnostics, beta program, maintenance & rollbacks | `release-management-engine.ts` |
