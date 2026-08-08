# Socrates AI Tutor Engine - RBT Practice Questions SaaS

## Purpose
The Socrates AI Tutor Engine is an intelligent, BCBA-grade Socratic learning assistant designed specifically for candidates preparing for **RBT**, **BCaBA**, and **BCBA** certification exams. It goes far beyond a generic chatbot by injecting candidate-specific memory context (*readiness rating, priority weak topics, target exam date, recent mock scores*) directly into system prompts, generating clinical ABC scenario deconstructions, mnemonic memory tricks, and BACB exam strategy tips.

## Architecture
- **Certifications Supported**: RBT, BCaBA, BCBA
- **Personality Directives**: Professional, patient, clinical, evidence-based, educational, simple language.
- **Core Entities & Types**: `g:\RBT\types\ai-tutor.ts` (`ChatMessage`, `ConversationSession`, `CandidateMemoryContext`, `PromptTemplate`, `AIUsageLog`, `AIProvider`).
- **Candidate Memory Aggregator**: `g:\RBT\lib\ai-candidate-memory.ts` (`buildCandidateSystemContext`, `formatSystemDirective`).
- **Centralized Prompt Manager**: `g:\RBT\lib\ai-prompt-manager.ts` (`SYSTEM_PROMPT_TEMPLATES`, `processAITutorMessage`).
- **Interface**: `g:\RBT\app\tutor\page.tsx` (Chat History, Mode Selector, Clinical Insight Cards, ABC Scenario Boxes, Mnemonic Tricks, Exam Tips).

## Folder Structure
- `g:\RBT\types\ai-tutor.ts`
- `g:\RBT\lib\ai-candidate-memory.ts`
- `g:\RBT\lib\ai-prompt-manager.ts`
- `g:\RBT\database\ai-tutor-schema.sql`
- `g:\RBT\app\tutor\page.tsx`
- `g:\RBT\app\api\tutor\chat\route.ts`
- `g:\RBT\app\api\admin\ai-prompts\route.ts`
- `g:\RBT\docs\ai-tutor-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\ai-tutor-schema.sql`

```sql
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Socrates AI Chat',
  certification TEXT NOT NULL CHECK (certification IN ('RBT', 'BCaBA', 'BCBA')),
  mode TEXT NOT NULL CHECK (mode IN ('socratic_mentor', 'question_explainer', 'scenario_analyzer', 'flashcard_generator', 'quiz_generator')) DEFAULT 'socratic_mentor',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Process AI Tutor Message
- **Endpoint**: `POST /api/tutor/chat`
- **Body**: `{ userQuery: string, history: ChatMessage[], mode: string, certification: string }`
- **Response**: `{ success: true, message: ChatMessage }`

### 2. Admin Prompt Templates Manager
- **Endpoint**: `GET /api/admin/ai-prompts` (Fetch templates)
- **Endpoint**: `PUT /api/admin/ai-prompts` (Update template system prompt, provider, or model)

## Prompt Flow
`User Query Input` -> `Fetch Candidate Memory (Readiness, Weak Topics)` -> `Format BCBA System Directive` -> `Process via Prompt Manager` -> `Structure Clinical Insight & ABC Scenario Cards` -> `Render in Chat UI`.

## Business Logic
- **Personalized Context Injection**: Injects candidate's specific weak topics (*e.g., D-04 Differential Reinforcement 74%*) into every Socratic prompt.
- **Scenario Deconstruction**: Automatically parses submitted clinical text into 3-phase ABC analysis: Antecedent, Behavior, Consequence, Replacement Behavior, Ethical Considerations, and Session Note Logging Tips.

## Security Notes
- **Safety Disclaimers**: Explicitly states educational context, no medical advice, no clinical client diagnosis, and no official BACB affiliation.
- **RLS Isolation**: Supabase Row Level Security ensures candidate conversation history is restricted to current user ID.

## Performance & Token Optimization
- Keeps system prompt token overhead under 300 tokens by compressing candidate memory attributes.
- Caches common concept explanations to minimize LLM token usage costs.

## Future Improvements
- Real-time Socratic voice conversation mode using WebRTC audio streaming.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/ai-tutor.ts](file:///g:/RBT/types/ai-tutor.ts)
- [lib/ai-candidate-memory.ts](file:///g:/RBT/lib/ai-candidate-memory.ts)
- [lib/ai-prompt-manager.ts](file:///g:/RBT/lib/ai-prompt-manager.ts)
- [database/ai-tutor-schema.sql](file:///g:/RBT/database/ai-tutor-schema.sql)
- [app/tutor/page.tsx](file:///g:/RBT/app/tutor/page.tsx)
