import { Question, ExamSession, ExamResult, DomainScore, UserAnswer } from '@/types/exam';
import { BACBDomainId } from '@/types/bacb';
import { BACB_TASK_LIST_2ND_EDITION } from '@/lib/bacb-task-list';
import { SAMPLE_BACB_QUESTIONS } from '@/lib/sample-questions';

export class ExamService {
  /**
   * Generates a new exam session based on mode and domain filter
   */
  static createExamSession(mode: 'diagnostic' | 'full_mock' | 'domain_focus', targetDomainId?: BACBDomainId): ExamSession {
    let questions = [...SAMPLE_BACB_QUESTIONS];

    if (mode === 'domain_focus' && targetDomainId) {
      questions = questions.filter(q => q.domainId === targetDomainId);
    }

    // Default duration: 90 minutes (5400 seconds) for full mock, 25 minutes for diagnostic
    const durationSeconds = mode === 'full_mock' ? 5400 : 1500;

    return {
      id: `session-${Date.now()}`,
      userId: 'demo-student-id',
      mode,
      targetDomainId,
      questions,
      userAnswers: {},
      startedAt: new Date().toISOString(),
      durationSeconds,
      timeRemainingSeconds: durationSeconds,
      isFinished: false,
    };
  }

  /**
   * Evaluates user answers and builds detailed BACB diagnostic report
   */
  static calculateResults(session: ExamSession): ExamResult {
    const totalQuestions = session.questions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const domainBuckets: Record<BACBDomainId, { total: number; correct: number }> = {
      A: { total: 0, correct: 0 },
      B: { total: 0, correct: 0 },
      C: { total: 0, correct: 0 },
      D: { total: 0, correct: 0 },
      E: { total: 0, correct: 0 },
      F: { total: 0, correct: 0 },
    };

    session.questions.forEach((q) => {
      const answer: UserAnswer | undefined = session.userAnswers[q.id];
      domainBuckets[q.domainId].total += 1;

      if (!answer || !answer.selectedOptionId) {
        unansweredCount += 1;
      } else if (answer.selectedOptionId === q.correctOptionId) {
        correctCount += 1;
        domainBuckets[q.domainId].correct += 1;
      } else {
        incorrectCount += 1;
      }
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = scorePercentage >= 80; // Standard BACB pass threshold ~80%

    const domainScores: DomainScore[] = BACB_TASK_LIST_2ND_EDITION.map((domain) => {
      const stats = domainBuckets[domain.id];
      const percentageScore = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

      let masteryStatus: 'Mastered' | 'Proficient' | 'Needs Review' | 'Critical Focus' = 'Mastered';
      if (percentageScore < 60) masteryStatus = 'Critical Focus';
      else if (percentageScore < 75) masteryStatus = 'Needs Review';
      else if (percentageScore < 90) masteryStatus = 'Proficient';

      return {
        domainId: domain.id,
        domainName: domain.name,
        totalQuestions: stats.total,
        correctCount: stats.correct,
        percentageScore,
        masteryStatus,
      };
    });

    // Generate AI recommendations based on lowest domains
    const weakDomains = domainScores.filter(d => d.percentageScore < 80);
    const aiRecommendations: string[] = weakDomains.length > 0
      ? weakDomains.map(d => `Focus on Domain ${d.domainId} (${d.domainName}): Review key Task List items and practice 15+ scenario questions.`)
      : ['Outstanding readiness score! Maintain your knowledge using spaced repetition flashcards daily.'];

    return {
      sessionId: session.id,
      scorePercentage,
      passed,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds: session.durationSeconds - session.timeRemainingSeconds,
      domainScores,
      readinessImpactScore: Math.min(100, Math.round(scorePercentage * 1.05)),
      aiRecommendations,
    };
  }
}
