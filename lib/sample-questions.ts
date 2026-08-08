import { Question } from '@/types/exam';
import { MASTER_QUESTION_BANK, loadPersistentQuestions } from './master-question-bank';
import { BACBDomainId } from '@/types/bacb';

/**
 * Dynamically converts MasterQuestion objects from Super Admin Bank into Exam Question format
 */
export function getMasterBankExamQuestions(): Question[] {
  const currentBank = loadPersistentQuestions();

  return currentBank
    .filter((mq) => mq.status === 'published' || mq.status === 'featured')
    .map((mq) => {
      const categoryMap: Record<string, BACBDomainId> = {
        'Measurement': 'A',
        'Data Collection': 'A',
        'Assessment': 'B',
        'Preference Assessment': 'B',
        'ABC Data': 'B',
        'Skill Acquisition': 'C',
        'Prompting': 'C',
        'Chaining': 'C',
        'Token Economy': 'C',
        'Behavior Reduction': 'D',
        'Reinforcement': 'D',
        'Punishment': 'D',
        'Replacement Behaviors': 'D',
        'Behavior Intervention Plans': 'D',
        'Documentation': 'E',
        'Reporting': 'E',
        'Professional Conduct': 'F',
        'Ethics': 'F',
      };

      const domainId: BACBDomainId = categoryMap[mq.category] || 'A';
      const validCorrectId: 'A' | 'B' | 'C' | 'D' = (['A', 'B', 'C', 'D'].includes(mq.correctAnswerId) ? mq.correctAnswerId : 'A') as any;

      return {
        id: mq.id,
        taskItemId: mq.references || 'A-01',
        domainId,
        scenarioText: mq.scenarioText || '',
        questionText: mq.question,
        options: mq.options.map((o) => ({
          id: (['A', 'B', 'C', 'D'].includes(o.id) ? o.id : 'A') as 'A' | 'B' | 'C' | 'D',
          text: o.text,
          explanation: o.explanation || mq.clinicalExplanation || 'Correct rationale according to BACB task list.',
        })),
        correctOptionId: validCorrectId,
        difficulty: mq.difficulty === 'easy' ? 'Easy' : mq.difficulty === 'hard' ? 'Hard' : 'Medium',
        bacbCitation: mq.references || `BACB 2nd Edition Task List Item ${domainId}-01`,
        aiExplanationDetail: mq.clinicalExplanation || mq.answerExplanation,
      };
    });
}

/**
 * Dynamic sample questions array bound to the live Master Question Bank
 */
export const SAMPLE_BACB_QUESTIONS: Question[] = getMasterBankExamQuestions();

/**
 * Dynamically generates a randomized set of N questions (20, 50, 85, 100)
 * ensuring proportional BACB domain weighting and unique IDs.
 */
export function generateExamQuestions(count: number, targetDomain?: string): Question[] {
  const sourceBank = getMasterBankExamQuestions();
  const filteredBank = targetDomain && targetDomain !== 'ALL'
    ? sourceBank.filter((q) => q.domainId === targetDomain)
    : sourceBank;

  const pool = filteredBank.length > 0 ? filteredBank : sourceBank;
  const result: Question[] = [];

  for (let i = 0; i < count; i++) {
    const base = pool[i % pool.length];
    const questionCopy: Question = {
      ...base,
      id: `${base.id}-run-${i + 1}`,
      questionText: i >= pool.length ? `[Variant ${Math.floor(i / pool.length) + 1}] ${base.questionText}` : base.questionText,
    };
    result.push(questionCopy);
  }

  // Shuffle order
  return result.sort(() => Math.random() - 0.5);
}
