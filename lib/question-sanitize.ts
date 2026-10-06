import type { MasterQuestion } from '@/types/master-question';

/**
 * Removes every answer-revealing field from a question before it is sent
 * to a non-admin client. Correct answers and rationales are revealed only
 * through the server-side grading endpoint (/api/questions/grade) after
 * the candidate has actually answered.
 */
export function stripAnswerFields<T extends Partial<MasterQuestion>>(question: T): T {
  if (!question || typeof question !== 'object') return question;

  const sanitized = { ...(question as MasterQuestion) } as Partial<MasterQuestion>;
  delete sanitized.correctAnswerId;
  delete sanitized.answerExplanation;
  delete sanitized.clinicalExplanation;
  delete sanitized.examTips;
  delete sanitized.commonMistakes;
  delete sanitized.internalNotes;

  if (Array.isArray(sanitized.options)) {
    sanitized.options = sanitized.options.map((opt) => {
      const safeOpt = { ...(opt || {}) } as Partial<(typeof sanitized.options)[number]>;
      delete safeOpt.isCorrect;
      delete safeOpt.explanation;
      return safeOpt as (typeof sanitized.options)[number];
    });
  }

  return sanitized as T;
}

export function stripAnswerFieldsList<T extends Partial<MasterQuestion>>(questions: T[]): T[] {
  return (questions || []).map((q) => stripAnswerFields(q));
}
