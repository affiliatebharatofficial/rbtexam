import { BACBDomainId } from './bacb';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  taskItemId: string; // e.g. "C-03"
  domainId: BACBDomainId;
  scenarioText: string;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bacbCitation: string;
  aiExplanationDetail: string;
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
  targetDomainId?: BACBDomainId;
  questions: Question[];
  userAnswers: Record<string, UserAnswer>;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  timeRemainingSeconds: number;
  isFinished: boolean;
}

export interface DomainScore {
  domainId: BACBDomainId;
  domainName: string;
  totalQuestions: number;
  correctCount: number;
  percentageScore: number;
  masteryStatus: 'Mastered' | 'Proficient' | 'Needs Review' | 'Critical Focus';
}

export interface ExamResult {
  sessionId: string;
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
