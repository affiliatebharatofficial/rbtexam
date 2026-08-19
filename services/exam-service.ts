import { Question, ExamSession, ExamResult, DomainScore, UserAnswer, ExamDomainId } from '@/types/exam';
import { CertificationLevel } from '@/types/certification';
import { getMasterBankExamQuestions } from '@/lib/sample-questions';
import { getCertificationConfig } from '@/lib/certifications-config';

export interface CreateExamSessionOptions {
  mode: 'diagnostic' | 'full_mock' | 'domain_focus';
  targetDomainId?: ExamDomainId;
  certification?: CertificationLevel;
  customDurationSeconds?: number;
}

export class ExamService {
  /**
   * Generates a new exam session based on mode, certification, and domain filter
   */
  static createExamSession(
    modeOrOptions: 'diagnostic' | 'full_mock' | 'domain_focus' | CreateExamSessionOptions,
    legacyTargetDomainId?: ExamDomainId
  ): ExamSession {
    const options: CreateExamSessionOptions =
      typeof modeOrOptions === 'string'
        ? { mode: modeOrOptions, targetDomainId: legacyTargetDomainId, certification: 'RBT' }
        : modeOrOptions;

    const cert: CertificationLevel = options.certification || 'RBT';
    const config = getCertificationConfig(cert);

    let questions = getMasterBankExamQuestions(cert);

    if (options.mode === 'domain_focus' && options.targetDomainId) {
      questions = questions.filter((q) => q.domainId === options.targetDomainId);
    }

    // Duration based on certification config and exam mode
    const fullMockDuration = config.officialExamDurationMinutes * 60;
    const diagnosticDuration = Math.round(fullMockDuration * 0.28); // ~25 mins for RBT, ~65 mins for BCBA
    const durationSeconds =
      options.customDurationSeconds || (options.mode === 'full_mock' ? fullMockDuration : diagnosticDuration);

    return {
      id: `session-${Date.now()}`,
      userId: 'demo-student-id',
      mode: options.mode,
      certification: cert,
      targetDomainId: options.targetDomainId,
      questions,
      userAnswers: {},
      startedAt: new Date().toISOString(),
      durationSeconds,
      timeRemainingSeconds: durationSeconds,
      isFinished: false,
    };
  }

  /**
   * Evaluates user answers and builds detailed certification-aware diagnostic report
   */
  static calculateResults(session: ExamSession): ExamResult {
    const cert: CertificationLevel = session.certification || 'RBT';
    const config = getCertificationConfig(cert);
    const totalQuestions = session.questions.length;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    // Dynamically initialize domain buckets based on certification TCO
    const domainBuckets: Record<string, { total: number; correct: number }> = {};
    config.domains.forEach((d) => {
      domainBuckets[d.id] = { total: 0, correct: 0 };
    });

    session.questions.forEach((q) => {
      const answer: UserAnswer | undefined = session.userAnswers[q.id];
      const domId = q.domainId || 'A';
      if (!domainBuckets[domId]) {
        domainBuckets[domId] = { total: 0, correct: 0 };
      }
      domainBuckets[domId].total += 1;

      if (!answer || !answer.selectedOptionId) {
        unansweredCount += 1;
      } else if (answer.selectedOptionId === q.correctOptionId) {
        correctCount += 1;
        domainBuckets[domId].correct += 1;
      } else {
        incorrectCount += 1;
      }
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = scorePercentage >= config.passingScorePercentage;

    const domainScores: DomainScore[] = config.domains.map((domain) => {
      const stats = domainBuckets[domain.id] || { total: 0, correct: 0 };
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
    const weakDomains = domainScores.filter((d) => d.totalQuestions > 0 && d.percentageScore < config.passingScorePercentage);
    const aiRecommendations: string[] =
      weakDomains.length > 0
        ? weakDomains.map(
            (d) =>
              `Focus on Domain ${d.domainId} (${d.domainName}): Review key Task List items and practice scenario questions to reach ${config.passingScorePercentage}% mastery.`
          )
        : ['Outstanding readiness score! Maintain your knowledge using spaced repetition flashcards daily.'];

    return {
      sessionId: session.id,
      certification: cert,
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

