# Work Queue Architecture — RBTTrainingAI SaaS

## Purpose
Specifies asynchronous workforce job queues: Content Queue, Review Queue, SEO Queue, Publishing Queue, Notification Queue, AI Tutor Queue, Translation Queue, Knowledge Queue.

## Queue Lifecycle
`pending` → `processing` → `in_review` (human admin approval) → `completed` / `failed`

## Queue Types
1. `content_queue`: Practice question & flashcard drafting.
2. `review_queue`: Fact-checking & clinical copyediting.
3. `seo_queue`: Meta tags & JSON-LD schema generation.
4. `publishing_queue`: Final content package publication.
5. `notification_queue`: Push & email copywriting.
6. `ai_tutor_queue`: Socratic mentorship requests.
7. `translation_queue`: Spanish/Portuguese translation.
8. `knowledge_queue`: RAG vector chunk ingestion.

## Related Files
- [database/ai-workforce-schema.sql](file:///g:/RBT/database/ai-workforce-schema.sql) — `public.task_queue`
- [lib/ai-workforce-engine.ts](file:///g:/RBT/lib/ai-workforce-engine.ts)
