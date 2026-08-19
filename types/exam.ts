import { BACBDomainId } from './bacb';
import { CertificationLevel } from './certification';

export type ExamDomainId = BACBDomainId | string;

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  taskItemId: string; // e.g. "C-03", "A.1"
  domainId: ExamDomainId;
  scenarioText: string;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bacbCitation: string;
  aiExplanationDetail: string;
  certification?: CertificationLevel;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: 'A' | 'B' | 'C' | 'D' | null;
  isFlagged: boolean;
  timeSpentSeconds: number;
}

export type ExamMode = 'diagnostic' | 'full_mock' | 'domain_focus' | 'ai_adaptive';

export interface ExamSession {
  id: string;
  userId: string;
  mode: ExamMode;
  certification?: CertificationLevel;
  targetDomainId?: ExamDomainId;
  questions: Question[];
  userAnswers: Record<string, UserAnswer>;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  timeRemainingSeconds: number;
  isFinished: boolean;
}

export interface DomainScore {
  domainId: ExamDomainId;
  domainName: string;
  totalQuestions: number;
  correctCount: number;
  percentageScore: number;
  masteryStatus: 'Mastered' | 'Proficient' | 'Needs Review' | 'Critical Focus';
}

export interface ExamResult {
  sessionId: string;
  certification?: CertificationLevel;
  scorePercentage: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  domainScores: DomainScore[];
  readinessImpactScore: number;
  aiRecommendations: string[];
}
