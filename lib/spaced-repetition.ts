import { FlashcardProgress } from '@/types/user';

export function calculateNextReviewDate(currentBox: number, isCorrect: boolean): { nextBox: number; nextReviewDate: string } {
  let nextBox = isCorrect ? Math.min(5, currentBox + 1) : 1;
  
  // Leitner box intervals in days
  const boxIntervalDays: Record<number, number> = {
    1: 1,  // Review tomorrow
    2: 3,  // Review in 3 days
    3: 7,  // Review in 7 days
    4: 14, // Review in 14 days
    5: 30, // Review in 30 days
  };

  const daysToAdd = boxIntervalDays[nextBox] || 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return {
    nextBox,
    nextReviewDate: nextDate.toISOString(),
  };
}

export function initializeFlashcardProgress(cardId: string): FlashcardProgress {
  return {
    cardId,
    leitnerBox: 1,
    lastReviewedAt: new Date().toISOString(),
    nextReviewAt: new Date().toISOString(),
    correctStreak: 0,
  };
}
