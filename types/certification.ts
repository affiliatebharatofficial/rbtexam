export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export interface TaskItem {
  id: string; // e.g. "A-01", "A.1"
  domainId: string; // e.g. "A", "B"
  title: string;
  description: string;
  keyConcepts: string[];
  examWeightPercentage: number;
}

export interface ExamDomain {
  id: string; // "A", "B", "C", ...
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  questionCountApprox?: number;
  weightPercentage: number;
  items: TaskItem[];
}

export interface CertificationConfig {
  id: CertificationLevel;
  displayName: string;
  shortName: string;
  examStandard: string;
  taskListVersion: string;
  officialExamQuestionCount: number;
  officialExamDurationMinutes: number;
  availableQuestionCounts: number[];
  passingScorePercentage: number;
  status: 'active' | 'content_expanding' | 'coming_soon';
  statusBadge: string;
  isEnabledForExam: boolean;
  domains: ExamDomain[];
}
