# 13. Blog & AI Content Intelligence Engine - RBTTrainingAI SaaS

## Purpose
The Blog & AI Content Intelligence Engine powers educational blog articles, study guides, clinical ABA scenarios, and question drafts through an AI-assisted human-in-the-loop review pipeline.

## Architecture
- Types: `types/ai-content.ts`
- Engine: `lib/ai-content-engine.ts`
- Schema Definition: `database/ai-content-schema.sql`
- Editorial Kanban Board: `app/admin/content-engine/page.tsx`
- Dedicated Specification Suite:
  - `docs/ai-content-engine.md`
  - `docs/knowledge-base-engine.md`
  - `docs/content-workflow.md`
  - `docs/content-versioning.md`
  - `docs/approval-workflow.md`
  - `docs/prompt-library.md`

## Folder Location
- `g:\RBT\types\ai-content.ts`
- `g:\RBT\lib\ai-content-engine.ts`
- `g:\RBT\database\ai-content-schema.sql`
- `g:\RBT\app\admin\content-engine\page.tsx`

## Database Tables Used
- `public.knowledge_base_items`
- `public.ai_content_drafts`
- `public.content_versions`
- `public.quality_reports`

## API Endpoints
- `POST /api/admin/content-engine/generate`: Trigger AI draft generation.
- `POST /api/admin/content-engine/review`: Update review status (`approve`, `reject`, `publish`).

## Workflow
1. Editor opens `/admin/content-engine`.
2. Triggers AI generation for topic (*e.g. Reinforcement Schedules*).
3. Draft created in `needs_review` status.
4. BCBA Editor reviews clinical accuracy and approves for publication.

## Business Logic
- Zero unverified auto-publishing policy.

## Security Notes
- Content publication restricted to `bcba_editor` and `admin` roles via Supabase Row Level Security (RLS).

## Performance Considerations
- Async background queue for LLM generation tasks.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/ai-content.ts](file:///g:/RBT/types/ai-content.ts)
- [lib/ai-content-engine.ts](file:///g:/RBT/lib/ai-content-engine.ts)
- [docs/ai-content-engine.md](file:///g:/RBT/docs/ai-content-engine.md)
