import { Question } from '@/types/exam';
import { MasterQuestion } from '@/types/master-question';
import { MASTER_QUESTION_BANK, loadPersistentQuestions } from './master-question-bank';
import { BACBDomainId } from '@/types/bacb';

/**
 * Dynamically converts MasterQuestion objects into Exam Question format
 */
export function convertMasterQuestionsToExamQuestions(masterQuestions: MasterQuestion[]): Question[] {
  const eligible = masterQuestions.filter(
    (mq) =>
      (!mq.status || mq.status === 'published' || mq.status === 'featured') &&
      (!mq.taskListVersion ||
        mq.taskListVersion === '3rd_edition' ||
        mq.taskListVersion.toLowerCase().includes('3rd'))
  );

  return eligible.map((mq) => {
    const categoryMap: Record<string, BACBDomainId> = {
      'Data Collection and Graphing': 'A',
      'Behavior Assessment': 'B',
      'Behavior Acquisition': 'C',
      'Behavior Reduction': 'D',
      'Documentation and Reporting': 'E',
      'Ethics': 'F',
      'Measurement': 'A',
      'Data Collection': 'A',
      'Assessment': 'B',
      'Preference Assessment': 'B',
      'ABC Data': 'B',
      'Skill Acquisition': 'C',
      'Prompting': 'C',
      'Chaining': 'C',
      'Token Economy': 'C',
      'Reinforcement': 'D',
      'Punishment': 'D',
      'Replacement Behaviors': 'D',
      'Behavior Intervention Plans': 'D',
      'Documentation': 'E',
      'Reporting': 'E',
      'Professional Conduct': 'F',
    };

    const domainId: BACBDomainId = categoryMap[mq.category] || 'A';
    const validCorrectId: 'A' | 'B' | 'C' | 'D' = (['A', 'B', 'C', 'D'].includes(mq.correctAnswerId) ? mq.correctAnswerId : 'A') as any;

    let cleanReference = (mq.references || `BACB RBT 3rd Edition TCO Item ${domainId}-01`).trim();
    cleanReference = cleanReference
      .replace(/BACB\s*2nd\s*Edition\s*Task\s*List\s*Item/gi, 'BACB RBT 3rd Edition TCO Item')
      .replace(/BACB\s*Task\s*List\s*2nd\s*Edition\s*Item/gi, 'BACB RBT 3rd Edition TCO Item')
      .replace(/2nd\s*Edition/gi, '3rd Edition');

    if (!cleanReference.includes('3rd Edition')) {
      cleanReference = `BACB RBT 3rd Edition TCO Item ${cleanReference}`;
    }

    return {
      id: mq.id,
      taskItemId: cleanReference,
      domainId,
      scenarioText: mq.scenarioText || '',
      questionText: mq.question,
      options: (mq.options || []).map((o) => ({
        id: (['A', 'B', 'C', 'D'].includes(o.id) ? o.id : 'A') as 'A' | 'B' | 'C' | 'D',
        text: o.text,
        explanation: o.explanation || mq.clinicalExplanation || 'Correct rationale according to BACB 3rd Edition TCO.',
      })),
      correctOptionId: validCorrectId,
      difficulty: mq.difficulty === 'easy' ? 'Easy' : mq.difficulty === 'hard' ? 'Hard' : 'Medium',
      bacbCitation: cleanReference,
      aiExplanationDetail: mq.clinicalExplanation || mq.answerExplanation,
    };
  });
}

/**
 * Dynamically converts MasterQuestion objects from Super Admin Bank into Exam Question format
 */
export function getMasterBankExamQuestions(): Question[] {
  const currentBank = loadPersistentQuestions();
  return convertMasterQuestionsToExamQuestions(currentBank);
}

/**
 * Dynamic sample questions getter bound to live Master Question Bank
 */
export function getSampleBacbQuestions(): Question[] {
  return getMasterBankExamQuestions();
}

export const SAMPLE_BACB_QUESTIONS: Question[] = getMasterBankExamQuestions();

/**
 * Dynamically generates a randomized set of N unique questions (up to count)
 */
export function generateExamQuestions(count: number, targetDomain?: string, customQuestions?: Question[]): Question[] {
  const sourceBank = customQuestions || getMasterBankExamQuestions();
  const pool = targetDomain && targetDomain !== 'ALL'
    ? sourceBank.filter((q) => q.domainId === targetDomain)
    : sourceBank;

  // Shuffle pool for randomized exam order
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Return up to 'count' unique questions without artificial [Variant X] duplicates
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
