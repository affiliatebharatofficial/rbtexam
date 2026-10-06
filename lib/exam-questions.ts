import { Question } from '@/types/exam';
import { MasterQuestion } from '@/types/master-question';
import { CertificationLevel } from '@/types/certification';
import { BACBDomainId } from '@/types/bacb';

/**
 * Client-safe exam question helpers.
 *
 * This module intentionally does NOT import the master/seed question bank:
 * correct answers must never be bundled into the browser. Questions come
 * from /api/questions (answers stripped) and grading/reveal happens via
 * /api/questions/grade.
 */

export function convertMasterQuestionsToExamQuestions(
  masterQuestions: MasterQuestion[],
  targetCertification: CertificationLevel = 'RBT'
): Question[] {
  const eligible = masterQuestions.filter((mq) => {
    // Only published or featured questions
    const isStatusEligible = !mq.status || mq.status === 'published' || mq.status === 'featured';
    if (!isStatusEligible) return false;

    // Strict certification filter if certification is assigned
    if (mq.certification && mq.certification !== targetCertification) {
      return false;
    }

    if (targetCertification === 'RBT') {
      return (
        !mq.taskListVersion ||
        mq.taskListVersion === '3rd_edition' ||
        mq.taskListVersion.toLowerCase().includes('3rd')
      );
    }

    if (targetCertification === 'BCBA') {
      return (
        mq.certification === 'BCBA' ||
        mq.taskListVersion === '6th_edition' ||
        mq.taskListVersion?.toLowerCase().includes('6th')
      );
    }

    return true;
  });

  const rbtCategoryMap: Record<string, BACBDomainId> = {
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
    'Reinforcement': 'C',
    'Punishment': 'D',
    'Replacement Behaviors': 'D',
    'Behavior Intervention Plans': 'D',
    'Documentation': 'E',
    'Reporting': 'E',
    'Professional Conduct': 'F',
  };

  const bcbaCategoryMap: Record<string, string> = {
    'A — Behaviorism and Philosophical Foundations': 'A',
    'Philosophical Foundations': 'A',
    'Behaviorism and Philosophical Foundations': 'A',
    'B — Concepts and Principles': 'B',
    'Concepts and Principles': 'B',
    'Concepts & Principles': 'B',
    'C — Measurement, Data Display, and Interpretation': 'C',
    'Measurement, Data Display, and Interpretation': 'C',
    'Measurement & Data': 'C',
    'D — Experimental Design': 'D',
    'Experimental Design': 'D',
    'E — Ethics': 'E',
    'Ethics': 'E',
    'F — Behavior Assessment': 'F',
    'Behavior Assessment': 'F',
    'G — Behavior-Change Procedures': 'G',
    'Behavior-Change Procedures': 'G',
    'H — Selecting and Implementing Interventions': 'H',
    'Selecting and Implementing Interventions': 'H',
    'I — Personnel Supervision and Management': 'I',
    'Personnel Supervision and Management': 'I',
    'Supervision & Management': 'I',
  };

  return eligible.map((mq) => {
    let domainId = 'A';
    if (targetCertification === 'BCBA') {
      domainId = bcbaCategoryMap[mq.category] || (mq.category.startsWith('A') ? 'A' : mq.category.startsWith('B') ? 'B' : 'A');
    } else {
      domainId = rbtCategoryMap[mq.category] || 'A';
    }

    // Correct answers are stripped from public API responses; this stays
    // empty until /api/questions/grade reveals it after an answer/submit.
    const validCorrectId = (['A', 'B', 'C', 'D'].includes(mq.correctAnswerId)
      ? mq.correctAnswerId
      : '') as Question['correctOptionId'];

    let cleanReference = mq.references || '';
    if (targetCertification === 'RBT') {
      cleanReference = (cleanReference || `BACB RBT 3rd Edition TCO Item ${domainId}-01`).trim();
      cleanReference = cleanReference
        .replace(/BACB\s*2nd\s*Edition\s*Task\s*List\s*Item/gi, 'BACB RBT 3rd Edition TCO Item')
        .replace(/BACB\s*Task\s*List\s*2nd\s*Edition\s*Item/gi, 'BACB RBT 3rd Edition TCO Item')
        .replace(/2nd\s*Edition/gi, '3rd Edition');

      if (!cleanReference.includes('3rd Edition')) {
        cleanReference = `BACB RBT 3rd Edition TCO Item ${cleanReference}`;
      }
    } else if (targetCertification === 'BCBA') {
      cleanReference = (cleanReference || `BACB 6th Edition BCBA TCO Item ${domainId}.1`).trim();
      if (!cleanReference.includes('6th Edition') && !cleanReference.includes('BCBA')) {
        cleanReference = `BACB 6th Edition BCBA TCO Item ${cleanReference}`;
      }
    } else {
      cleanReference = cleanReference || `BACB BCaBA TCO Item ${domainId}.1`;
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
        explanation: o.explanation || '',
      })),
      correctOptionId: validCorrectId,
      difficulty: mq.difficulty === 'easy' ? 'Easy' : mq.difficulty === 'hard' ? 'Hard' : 'Medium',
      bacbCitation: cleanReference,
      aiExplanationDetail: mq.clinicalExplanation || mq.answerExplanation || '',
      certification: targetCertification,
    };
  });
}

/**
 * Randomizes and selects up to `count` questions from a supplied pool.
 * There is deliberately no built-in fallback bank on the client.
 */
export function generateExamQuestions(
  count: number,
  targetDomain?: string,
  customQuestions?: Question[],
  _certification: CertificationLevel = 'RBT'
): Question[] {
  void _certification; // kept for API compatibility with existing callers
  const sourceBank = customQuestions && customQuestions.length > 0 ? customQuestions : [];
  const pool =
    targetDomain && targetDomain !== 'ALL'
      ? sourceBank.filter((q) => q.domainId === targetDomain)
      : sourceBank;

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
