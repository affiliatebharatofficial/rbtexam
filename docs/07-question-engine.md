# 07. Master Question Engine - RBTTrainingAI SaaS

## Purpose
The Question Engine manages the item bank for all BACB practice questions (RBT, BCaBA, BCBA), including domain tagging, difficulty weighting, answer option shuffling, distractors, CSV imports, and Socratic feedback rationales.

## Architecture
- Core Types: `types/master-question.ts`
- Bank Location: `lib/master-question-bank.ts`
- Import Parser: `lib/question-import-engine.ts`
- Schema Definition: `database/master-question-schema.sql`
- Admin Dashboard: `/app/admin/questions/page.tsx`
- Dedicated Specification Documentation: `/docs/question-bank-engine.md`

## Folder Location
- `g:\RBT\lib\master-question-bank.ts`
- `g:\RBT\lib\question-import-engine.ts`
- `g:\RBT\types\master-question.ts`
- `g:\RBT\app\admin\questions\`

## Database Tables Used
- `public.master_questions`
- `public.question_options`
- `public.question_categories`
- `public.question_audit_logs`
- `public.question_imports`

## API Endpoints
- `GET /api/questions`: Filter, search, and paginate questions.
- `POST /api/questions`: Create question.
- `GET /api/questions/:id`: Retrieve single question.
- `PUT /api/questions/:id`: Update question.
- `DELETE /api/questions/:id`: Delete question.
- `POST /api/questions/bulk`: Bulk status update, delete, and CSV export.

## Workflow
1. Practice exam or tutor engine requests questions.
2. Question Engine selects items proportional to BACB 2nd / 5th / 6th Edition domain weights.
3. Shuffles choices dynamically for every attempt.
4. Editors manage, edit, import CSV, and audit items in the Admin Question Management System.

## Data Flow
`Question Bank Database` -> `Domain Filtering & Weighting` -> `Choice Shuffler` -> `Exam / Admin View Render`.

## Business Logic
- Supports RBT, BCaBA, and BCBA certifications.
- Categorized under 20 core ABA domain categories (*Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, Reporting, Ethics, etc.*).
- Distractors reflect common real-world RBT/BCBA misconceptions.

## Security Notes
- Row Level Security (RLS) policies enforce admin role requirements for editing (`admin`, `super_admin`, `editor`).

## Performance Considerations
- Database indices on `certification`, `category`, `difficulty`, `status`, and `task_list_version` ensure sub-10ms query performance.

## Future Improvements
- AI-generated dynamic question variants using Socrates LLM engine.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [lib/master-question-bank.ts](file:///g:/RBT/lib/master-question-bank.ts)
- [lib/question-import-engine.ts](file:///g:/RBT/lib/question-import-engine.ts)
- [docs/question-bank-engine.md](file:///g:/RBT/docs/question-bank-engine.md)
- [app/admin/questions/page.tsx](file:///g:/RBT/app/admin/questions/page.tsx)
