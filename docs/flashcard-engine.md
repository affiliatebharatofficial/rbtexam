# Smart Flashcard Engine - RBTTrainingAI SaaS

## Purpose
The Smart Flashcard Engine delivers an AI-powered, adaptive spaced repetition learning system inspired by Anki and SuperMemo (SM-2). Supporting **RBT**, **BCaBA**, and **BCBA** certification levels, it calculates memory decay intervals, automates learning stage progressions (*learning, review, mastered, forgotten*), and integrates with the Master Question Bank to dynamically generate clinical scenario flashcards with Socratic AI mnemonics.

## Architecture
- **Certifications Supported**: RBT, BCaBA, BCBA
- **Flashcard Types**: `basic`, `definition`, `image`, `scenario`, `case_study`, `fill_in_the_blank`, `true_false`, `ai_generated`.
- **Core Entities & Types**: `g:\RBT\types\flashcard.ts` (`Flashcard`, `SpacedRepetitionState`, `LearningStage`, `LearningMode`, `FeedbackRating`).
- **Algorithm Engine**: `g:\RBT\lib\spaced-repetition-engine.ts` (`calculateNextSpacedRepetition`, `createInitialCardState`).
- **Bank & Generator**: `g:\RBT\lib\flashcard-bank.ts` (`MASTER_FLASHCARDS`, `generateFlashcardsFromQuestions`, `getFilteredFlashcards`, `updateUserCardRating`).
- **Study Deck Interface**: `g:\RBT\app\flashcards\page.tsx` (3D Flip Animation, Learning Mode Chips, SM-2 Feedback Rating Bar).

## Folder Location
- `g:\RBT\types\flashcard.ts`
- `g:\RBT\lib\spaced-repetition-engine.ts`
- `g:\RBT\lib\flashcard-bank.ts`
- `g:\RBT\database\flashcard-schema.sql`
- `g:\RBT\app\flashcards\page.tsx`
- `g:\RBT\app\api\flashcards\route.ts`
- `g:\RBT\app\api\flashcards\review\route.ts`
- `g:\RBT\docs\flashcard-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\flashcard-schema.sql`

```sql
CREATE TABLE public.user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES public.master_flashcards(id) ON DELETE CASCADE,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  wrong_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  confidence_score INTEGER DEFAULT 1,
  mastery_score INTEGER DEFAULT 0,
  ease_factor NUMERIC(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 0,
  learning_stage TEXT NOT NULL CHECK (learning_stage IN ('learning', 'review', 'mastered', 'forgotten')) DEFAULT 'learning',
  is_favorite BOOLEAN DEFAULT false,
  is_bookmarked BOOLEAN DEFAULT false,
  user_notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, card_id)
);
```

## API Endpoints

### 1. Get Flashcard Deck
- **Endpoint**: `GET /api/flashcards`
- **Query Parameters**: `certification`, `category`, `learningMode`, `onlyDue`, `onlyFavorites`, `onlyWeak`, `page`, `limit`.
- **Response**: `FlashcardPaginationResult` JSON object.

### 2. Submit Spaced Repetition Rating
- **Endpoint**: `POST /api/flashcards/review`
- **Body**: `{ cardId: string, rating: 1 | 2 | 3 | 4, userId?: string }`
- **Response**: `{ success: true, updatedState: SpacedRepetitionState }`

## Workflow

### 1. Daily Spaced Review Workflow
1. Candidate accesses `/flashcards`.
2. System queries due cards where `nextReviewAt <= now()`.
3. Candidate reviews Front Card prompt and clicks to trigger 3D Flip animation to reveal Back Answer, Mnemonic Tip, and Socratic Rationale.
4. Candidate rates recall difficulty:
   - `Again (1)`: Reset interval to 1 day; set stage to `learning`.
   - `Hard (2)`: Increase interval by 1.2x.
   - `Good (3)`: Increase interval by `easeFactor` (2.5x).
   - `Easy (4)`: Jump interval to 14+ days; set stage to `mastered`.

## Spaced Repetition Algorithm (SM-2 SuperMemo Logic)
- **Ease Factor Formula**:
  - `EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))` where `q` is feedback rating (3, 4, 5).
  - Minimum `EF` capped at `1.3`.
- **Interval Days**:
  - `n = 1` -> 1 day
  - `n = 2` -> 3 or 6 days
  - `n > 2` -> `I(n) = I(n-1) * EF`

## AI Integration
- Converts Master Question Bank items (`lib/master-question-bank.ts`) into formatted scenario flashcards.
- Attaches AI Mnemonics, Memory Tricks, Real-Life Clinical Examples, and Common Mistake Warnings to back cards.

## Security Notes
- Candidate flashcard progress isolated by `user_id` using Supabase RLS.

## Performance Considerations
- 3D Card Flip CSS transform (`transform-style-3d`, `rotateY`) uses GPU hardware acceleration for smooth 60fps animations.

## Future Improvements
- Audio pronunciation player for complex medical / ABA terms.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [types/flashcard.ts](file:///g:/RBT/types/flashcard.ts)
- [lib/spaced-repetition-engine.ts](file:///g:/RBT/lib/spaced-repetition-engine.ts)
- [lib/flashcard-bank.ts](file:///g:/RBT/lib/flashcard-bank.ts)
- [database/flashcard-schema.sql](file:///g:/RBT/database/flashcard-schema.sql)
- [app/flashcards/page.tsx](file:///g:/RBT/app/flashcards/page.tsx)
