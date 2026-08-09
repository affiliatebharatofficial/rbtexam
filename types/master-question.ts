// Master Question Bank Engine - Core Type Definitions

export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export type QuestionType = 'multiple_choice' | 'true_false' | 'scenario_based' | 'case_study';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type QuestionStatus = 'draft' | 'published' | 'archived' | 'featured' | 'premium';

export type QuestionCategory =
  | 'Data Collection and Graphing'
  | 'Behavior Assessment'
  | 'Behavior Acquisition'
  | 'Behavior Reduction'
  | 'Documentation and Reporting'
  | 'Ethics'
  | 'Measurement'
  | 'Assessment'
  | 'Skill Acquisition'
  | 'Documentation'
  | 'Reporting'
  | 'Professional Conduct'
  | 'Reinforcement'
  | 'Punishment'
  | 'Prompting'
  | 'Generalization'
  | 'Maintenance'
  | 'Chaining'
  | 'Token Economy'
  | 'Data Collection'
  | 'Preference Assessment'
  | 'Behavior Intervention Plans'
  | 'ABC Data'
  | 'Replacement Behaviors';

export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'reviewer';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  explanation?: string;
  isCorrect: boolean;
}

export interface MasterQuestion {
  id: string; // UUID v4
  certification: CertificationLevel;
  question: string; // Main prompt text
  scenarioText?: string; // Scenario / Case Study context
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  options: QuestionOption[];
  correctAnswerId: string; // 'A', 'B', 'C', 'D' or 'true'/'false'
  answerExplanation: string; // Standard rationale
  clinicalExplanation: string; // Detailed clinical ABA justification
  references: string; // BACB Task List citation & Ethics Code reference
  examTips?: string; // Pro exam tip
  commonMistakes?: string; // Distractor trap warning
  category: QuestionCategory;
  subCategory?: string;
  keywords: string[];
  taskListVersion: '3rd_edition' | '2nd_edition' | '5th_edition' | '6th_edition';
  estimatedTimeSeconds: number;
  tags: string[];
  status: QuestionStatus;
  isPremium: boolean;
  isFeatured: boolean;
  version: number; // Audited version
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string; // Reviewer/editor private notes
}

export interface QuestionFilterParams {
  search?: string;
  certification?: CertificationLevel | 'ALL';
  category?: QuestionCategory | 'ALL';
  difficulty?: QuestionDifficulty | 'ALL';
  questionType?: QuestionType | 'ALL';
  status?: QuestionStatus | 'ALL';
  isPremium?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'difficulty' | 'category' | 'question';
  sortOrder?: 'asc' | 'desc';
}

export interface QuestionPaginationResult {
  data: MasterQuestion[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  pageSize?: number;
}

export interface ImportValidationError {
  row: number;
  field: string;
  message: string;
}

export interface ImportValidationResult {
  validRows: Partial<MasterQuestion>[];
  invalidRows: { row: number; rawData: any; errors: string[] }[];
  totalRows: number;
  duplicateCount: number;
}
