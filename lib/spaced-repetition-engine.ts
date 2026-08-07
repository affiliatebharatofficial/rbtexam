import { SpacedRepetitionState, FeedbackRating, LearningStage } from '@/types/flashcard';

/**
 * Calculates updated Spaced Repetition state for a flashcard using the SM-2 algorithm
 */
export function calculateNextSpacedRepetition(
  currentState: SpacedRepetitionState,
  rating: FeedbackRating
): SpacedRepetitionState {
  const now = new Date();
  let { reviewCount, correctCount, wrongCount, easeFactor, intervalDays } = currentState;

  reviewCount += 1;

  // Rating 1 = Again (Failed recall)
  if (rating === 1) {
    wrongCount += 1;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    const nextDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

    return {
      ...currentState,
      reviewCount,
      wrongCount,
      easeFactor,
      intervalDays,
      lastReviewedAt: now.toISOString(),
      nextReviewAt: nextDate.toISOString(),
      confidenceScore: 1,
      masteryScore: Math.max(0, currentState.masteryScore - 20),
      learningStage: 'learning',
    };
  }

  // Rating >= 2 (Successful recall)
  correctCount += 1;

  if (reviewCount === 1) {
    intervalDays = rating === 2 ? 1 : 3;
  } else if (reviewCount === 2) {
    intervalDays = rating === 2 ? 3 : 6;
  } else {
    // SM-2 Ease Factor Multiplier
    const quality = rating + 1; // Map 2,3,4 to SM-2 quality 3,4,5
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, Math.min(3.0, easeFactor));
    intervalDays = Math.round(intervalDays * easeFactor);
  }

  const nextDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  // Determine stage & mastery percentage
  let learningStage: LearningStage = 'review';
  let masteryScore = Math.min(100, Math.round((correctCount / (correctCount + wrongCount)) * 100));

  if (intervalDays >= 21 || rating === 4) {
    learningStage = 'mastered';
    masteryScore = Math.max(85, masteryScore);
  }

  return {
    ...currentState,
    reviewCount,
    correctCount,
    easeFactor,
    intervalDays,
    lastReviewedAt: now.toISOString(),
    nextReviewAt: nextDate.toISOString(),
    confidenceScore: rating + 1,
    masteryScore,
    learningStage,
  };
}

/**
 * Creates default initial state for a newly encountered flashcard
 */
export function createInitialCardState(cardId: string, userId: string): SpacedRepetitionState {
  return {
    cardId,
    userId,
    reviewCount: 0,
    correctCount: 0,
    wrongCount: 0,
    lastReviewedAt: null,
    nextReviewAt: new Date().toISOString(), // Due immediately
    confidenceScore: 1,
    masteryScore: 0,
    easeFactor: 2.5,
    intervalDays: 0,
    learningStage: 'learning',
    isFavorite: false,
    isBookmarked: false,
  };
}
