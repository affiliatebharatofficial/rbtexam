# Master Question Bank Engine - RBT Practice Questions SaaS

## Purpose
The Master Question Bank Engine is the centralized core data and item management engine of the RBT Practice Questions SaaS platform. It serves as the single source of truth for all practice questions, diagnostic simulations, Socrates AI tutor drills, and flashcard associations across all supported BACB certification levels (**RBT**, **BCaBA**, and **BCBA**).

## Architecture
- **Certifications Supported**: RBT (Registered Behavior Technician), BCaBA (Board Certified Assistant Behavior Analyst), BCBA (Board Certified Behavior Analyst).
- **Core Entities & Types**: `g:\RBT\types\master-question.ts` (`MasterQuestion`, `QuestionOption`, `CertificationLevel`, `QuestionType`, `QuestionDifficulty`, `QuestionStatus`, `QuestionCategory`, `AdminRole`).
- **Data Store & Algorithms**: `g:\RBT\lib\master-question-bank.ts` (Centralized question array, filtering, pagination, search, export engine).
- **Import Engine**: `g:\RBT\lib\question-import-engine.ts` (CSV parser, validator, duplicate detector, error logging).
- **Admin UI System**: `/app/admin/questions/page.tsx` (Dashboard, Question Table, Filters, Bulk Selection Actions, Preview Drawer).
- **Rich Editor Modal**: `components/admin/question-editor-modal.tsx` (Editor Form with Markdown, scenario text, distractor explanations, clinical ABA justifications, BACB citations, exam tips, and common mistakes).
- **Import Modal**: `components/admin/csv-import-modal.tsx` (CSV file upload, validation summary, error logs, and duplicate detection).

## Folder Structure
- `g:\RBT\types\master-question.ts`
- `g:\RBT\lib\master-question-bank.ts`
- `g:\RBT\lib\question-import-engine.ts`
- `g:\RBT\database\master-question-schema.sql`
- `g:\RBT\app\admin\questions\page.tsx`
- `g:\RBT\app\api\questions\route.ts`
- `g:\RBT\app\api\questions\[id]\route.ts`
- `g:\RBT\app\api\questions\bulk\route.ts`
- `g:\RBT\components\admin\question-editor-modal.tsx`
- `g:\RBT\components\admin\csv-import-modal.tsx`
- `g:\RBT\docs\question-bank-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\master-question-schema.sql`

```sql
CREATE TABLE public.master_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  question TEXT NOT NULL,
  scenario_text TEXT,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'scenario_based', 'case_study')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  correct_answer_id TEXT NOT NULL,
  answer_explanation TEXT NOT NULL,
  clinical_explanation TEXT NOT NULL,
  references TEXT NOT NULL,
  exam_tips TEXT,
  common_mistakes TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  keywords TEXT[] DEFAULT '{}',
  task_list_version TEXT NOT NULL DEFAULT '2nd_edition',
  estimated_time_seconds INTEGER DEFAULT 60,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived', 'featured', 'premium')) DEFAULT 'draft',
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Questions (Paginated & Filtered)
- **Endpoint**: `GET /api/questions`
- **Query Parameters**: `search`, `certification`, `category`, `difficulty`, `status`, `page`, `limit`, `sortBy`, `sortOrder`.
- **Response**: `QuestionPaginationResult` JSON object containing `data`, `total`, `page`, `totalPages`, `limit`.

### 2. Get Single Question
- **Endpoint**: `GET /api/questions/:id`
- **Response**: `MasterQuestion` JSON object.

### 3. Create Question
- **Endpoint**: `POST /api/questions`
- **Body**: `Omit<MasterQuestion, 'id' | 'createdAt' | 'updatedAt' | 'version'>`
- **Response**: `{ success: true, question: MasterQuestion }`

### 4. Update Question
- **Endpoint**: `PUT /api/questions/:id`
- **Body**: `Partial<MasterQuestion>`
- **Response**: `{ success: true, question: MasterQuestion }`

### 5. Delete Question
- **Endpoint**: `DELETE /api/questions/:id`
- **Response**: `{ success: true, message: string }`

### 6. Bulk Operations & Export
- **Endpoint**: `POST /api/questions/bulk`
- **Actions**:
  - `update_status`: `{ action: "update_status", ids: [...], status: "published" }`
  - `delete`: `{ action: "delete", ids: [...] }`
  - `export`: `{ action: "export" }` (Returns CSV file attachment)

## Workflow

### 1. Item Authoring & Editing Workflow
1. Editor accesses `/app/admin/questions`.
2. Clicks "Add New Question" or "Edit Question".
3. Inputs certification level (RBT/BCaBA/BCBA), Category (Measurement, Assessment, Skill Acquisition, etc.), difficulty, scenario text, main prompt, options A-D, distractor explanations, clinical ABA justifications, BACB task code references, exam tips, and common mistake traps.
4. Saves question to central bank. Version counter increments automatically.

### 2. Bulk CSV Import Workflow
1. Admin opens CSV Import modal.
2. Selects `.csv` file.
3. `parseAndValidateCSV()` parses text lines, verifies mandatory columns, checks valid certification/category values, and hashes question prompts to detect duplicate entries.
4. Validation Summary displays count of valid rows, invalid rows, and duplicates with error logs.
5. Admin clicks "Import Valid Questions" to commit valid items to the item bank.

## Business Logic
- **Categorization**: Supports 20 core ABA domain categories including *Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, Reporting, Professional Conduct, Ethics, Reinforcement, Punishment, Prompting, Generalization, Maintenance, Chaining, Token Economy, Data Collection, Preference Assessment, Behavior Intervention Plans, ABC Data, and Replacement Behaviors*.
- **Duplicate Prevention**: Rejects imports if question text exactly matches an existing question in the bank.
- **Auditing**: Every update increments the integer `version` field and logs modified fields to `question_audit_logs`.

## Security Notes
- Admin Management routes (`/app/admin/questions`) guarded by `ProtectedRoute` verifying authorized user role (`super_admin`, `admin`, `editor`, `clinic_admin`).
- PostgreSQL Row Level Security (RLS) ensures candidates can only query `status IN ('published', 'featured', 'premium')` questions.

## Performance Considerations
- Database indices created on `certification`, `category`, `difficulty`, `status`, and `task_list_version` for sub-10ms query execution.
- Pagination limits default to 10/25/50 items to minimize DOM node overhead.

## Future Improvements
- Automated AI-assisted Distractor Generator using LLM prompts to propose plausible distractor options for new questions.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/master-question.ts](file:///g:/RBT/types/master-question.ts)
- [lib/master-question-bank.ts](file:///g:/RBT/lib/master-question-bank.ts)
- [lib/question-import-engine.ts](file:///g:/RBT/lib/question-import-engine.ts)
- [database/master-question-schema.sql](file:///g:/RBT/database/master-question-schema.sql)
- [app/admin/questions/page.tsx](file:///g:/RBT/app/admin/questions/page.tsx)
- [components/admin/question-editor-modal.tsx](file:///g:/RBT/components/admin/question-editor-modal.tsx)
- [components/admin/csv-import-modal.tsx](file:///g:/RBT/components/admin/csv-import-modal.tsx)
