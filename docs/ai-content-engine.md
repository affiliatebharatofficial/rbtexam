# AI Content Generation & Knowledge Engine - RBT Practice Questions SaaS

## Purpose
The AI Content Generation & Knowledge Engine is the central content intelligence platform for RBT Practice Questions. Designed to generate high-quality educational drafts (*practice questions, flashcard decks, clinical ABA scenarios, study guides, blog articles, and glossary terms*) for **RBT**, **BCaBA**, and **BCBA** candidates, it enforces a strict human-in-the-loop editorial review workflow (*Draft -> Needs Review -> Fact & SEO Check -> BCBA Approval -> Published*) preventing unverified auto-publishing.

## Architecture
- **Central Core Engine**: `g:\RBT\lib\ai-content-engine.ts` (`generateAIDraft`, `inspectContentQuality`, `updateDraftReviewStatus`, `getAllContentDrafts`).
- **Core Entities & Types**: `g:\RBT\types\ai-content.ts` (`ContentDraft`, `ContentVersion`, `QualityReport`, `KnowledgeItem`, `AIContentType`, `ReviewStatus`).
- **PostgreSQL Database Schema**: `g:\RBT\database\ai-content-schema.sql` (`knowledge_base_items`, `ai_content_drafts`, `content_versions`, `quality_reports`).
- **Editorial Kanban Admin Interface**: `g:\RBT\app\admin\content-engine\page.tsx` (Pending Review Kanban Column, Draft Generator Modal, Quality Inspector).

## Folder Structure
- `g:\RBT\types\ai-content.ts`
- `g:\RBT\lib\ai-content-engine.ts`
- `g:\RBT\database\ai-content-schema.sql`
- `g:\RBT\app\admin\content-engine\page.tsx`
- `g:\RBT\app\api\admin\content-engine\generate\route.ts`
- `g:\RBT\app\api\admin\content-engine\review\route.ts`
- `g:\RBT\docs\ai-content-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\ai-content-schema.sql`

```sql
CREATE TABLE public.ai_content_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('question', 'flashcard', 'scenario', 'study_guide', 'blog_article', 'glossary_term')),
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  title TEXT NOT NULL,
  topic_category TEXT NOT NULL,
  bacb_task_code TEXT,
  content_payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'needs_review', 'fact_check', 'seo_review', 'approved', 'published', 'rejected', 'archived')) DEFAULT 'draft',
  version INTEGER DEFAULT 1,
  quality_score NUMERIC(5,2) DEFAULT 90.00,
  created_by_ai_provider TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Generate AI Content Draft
- **Endpoint**: `POST /api/admin/content-engine/generate`
- **Body**: `{ type: string, certification: string, topic: string, provider?: string }`
- **Response**: `{ success: true, draft: ContentDraft }`

### 2. Update Editorial Review Status
- **Endpoint**: `POST /api/admin/content-engine/review`
- **Body**: `{ draftId: string, status: string, reviewerNotes?: string }`
- **Response**: `{ success: true, draft: ContentDraft }`

## Editorial Workflow
`AI Provider Generation` -> `Draft Status (needs_review)` -> `Automated Quality Audit` -> `Human BCBA Editorial Review` -> `Approved & Published`.

## Business Logic
- **No Auto-Publishing**: AI generated items are created in `needs_review` status to guarantee human BCBA oversight.
- **Distractor Justification**: Every practice question draft MUST include distractor explanations for choices A, B, C, and D.

## Security Notes
- Content draft generation and publication routes restricted to `bcba_editor`, `admin`, and `super_admin` roles via Supabase Row Level Security (RLS).

## Performance Considerations
- Background workers process LLM generation pipelines asynchronously to avoid blocking the Admin UI.

## Related Files
- [lib/ai-content-engine.ts](file:///g:/RBT/lib/ai-content-engine.ts)
- [app/admin/content-engine/page.tsx](file:///g:/RBT/app/admin/content-engine/page.tsx)
- [docs/knowledge-base-engine.md](file:///g:/RBT/docs/knowledge-base-engine.md)
