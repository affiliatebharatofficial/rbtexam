# 10. Socrates AI Tutor Engine - RBT Practice Questions SaaS

## Purpose
The Socrates AI Tutor Engine provides an intelligent, BCBA-grade Socratic learning mentor for candidates preparing for RBT, BCaBA, and BCBA certification exams.

## Architecture
- Types: `types/ai-tutor.ts`
- Candidate Context Injector: `lib/ai-candidate-memory.ts`
- Prompt Manager Engine: `lib/ai-prompt-manager.ts`
- Schema Definition: `database/ai-tutor-schema.sql`
- Interface: `app/tutor/page.tsx`
- Dedicated Specification: `docs/ai-tutor-engine.md`

## Folder Location
- `g:\RBT\types\ai-tutor.ts`
- `g:\RBT\lib\ai-candidate-memory.ts`
- `g:\RBT\lib\ai-prompt-manager.ts`
- `g:\RBT\app\tutor\page.tsx`

## Database Tables Used
- `public.ai_conversations`
- `public.ai_messages`
- `public.ai_prompt_templates`
- `public.ai_usage_logs`

## API Endpoints
- `POST /api/tutor/chat`: Process Socratic AI mentor queries.
- `GET /api/admin/ai-prompts`: Manage system prompt templates.

## Workflow
1. Candidate sends query or selects starter chip on `/tutor`.
2. Candidate Memory injects readiness rating and weak BACB topics into prompt.
3. Socrates AI returns Markdown answer with Clinical Insight Cards, ABC Scenario Boxes, Mnemonic Tricks, and BACB Exam Tips.

## Data Flow
`User Input + Candidate Memory` -> `BCBA System Directive` -> `AI Prompt Engine` -> `Structured Clinical Cards`.

## Business Logic
- Supports RBT, BCaBA, and BCBA certifications.
- Automatically isolates problem behavior antecedents, behaviors, consequences, and replacement behaviors for submitted clinical scenarios.

## Security Notes
- Includes safety disclaimers (educational context, no medical advice, no official BACB affiliation).

## Performance Considerations
- System prompt token payload optimized for fast response streaming.

## Future Improvements
- WebRTC real-time voice Socratic conversation mode.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/ai-tutor.ts](file:///g:/RBT/types/ai-tutor.ts)
- [lib/ai-prompt-manager.ts](file:///g:/RBT/lib/ai-prompt-manager.ts)
- [docs/ai-tutor-engine.md](file:///g:/RBT/docs/ai-tutor-engine.md)
