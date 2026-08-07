# 09. Smart Flashcard Engine - RBTTrainingAI SaaS

## Purpose
The Flashcard Engine provides an adaptive spaced repetition study system (SM-2 algorithm) for RBT, BCaBA, and BCBA terminology. It tracks confidence ratings, memory decay intervals, and mastery scores across Leitner 5-box memory distribution.

## Architecture
- Types: `types/flashcard.ts`
- SM-2 Algorithm: `lib/spaced-repetition-engine.ts`
- Bank & Question Converter: `lib/flashcard-bank.ts`
- Schema Definition: `database/flashcard-schema.sql`
- Study Deck Interface: `app/flashcards/page.tsx`
- Dedicated Specification: `docs/flashcard-engine.md`

## Folder Location
- `g:\RBT\types\flashcard.ts`
- `g:\RBT\lib\spaced-repetition-engine.ts`
- `g:\RBT\lib\flashcard-bank.ts`
- `g:\RBT\app\flashcards\page.tsx`

## Database Tables Used
- `public.master_flashcards`
- `public.user_flashcard_progress`
- `public.flashcard_decks`

## API Endpoints
- `GET /api/flashcards`: Query deck with learning modes (*study, review due, weak topics, favorites, ai recommended*).
- `POST /api/flashcards/review`: Record SM-2 rating (1 = Again, 2 = Hard, 3 = Good, 4 = Easy) and calculate next review date.

## Workflow
1. Candidate opens flashcard study session on `/flashcards`.
2. Engine loads due cards (`nextReviewAt <= now()`).
3. Candidate flips 3D card to view definition, mnemonic tip, and clinical explanation.
4. Ratings update ease factors, interval days, and mastery percentages.

## Data Flow
`Master Question Bank + Seed Cards` -> `SM-2 Spaced Repetition Engine` -> `Due Queue Filtering` -> `3D Flip Player UI`.

## Business Logic
- Supports RBT, BCaBA, and BCBA certifications.
- Rating 1 (Again) resets spacing interval to 1 day.
- Rating 4 (Easy) marks card as `mastered` with 14+ day spacing.

## Security Notes
- Row Level Security (RLS) ensures candidate user progress is private to authenticated user ID.

## Performance Considerations
- 3D Card Flip CSS uses hardware acceleration (`transform-style-3d`).

## Future Improvements
- Audio term pronunciation and speech-to-text flashcard drill mode.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/flashcard.ts](file:///g:/RBT/types/flashcard.ts)
- [lib/spaced-repetition-engine.ts](file:///g:/RBT/lib/spaced-repetition-engine.ts)
- [lib/flashcard-bank.ts](file:///g:/RBT/lib/flashcard-bank.ts)
- [docs/flashcard-engine.md](file:///g:/RBT/docs/flashcard-engine.md)
