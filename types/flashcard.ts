// Smart Flashcard Engine - Core Type Definitions

export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export type FlashcardType =
  | 'basic'
  | 'definition'
  | 'image'
  | 'scenario'
  | 'case_study'
  | 'fill_in_the_blank'
  | 'true_false'
  | 'ai_generated';

export type FlashcardCategory =
  | 'Measurement'
  | 'Assessment'
  | 'Skill Acquisition'
  | 'Behavior Reduction'
  | 'Documentation'
  | 'Reporting'
  | 'Ethics'
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

export type LearningStage = 'learning' | 'review' | 'mastered' | 'forgotten';

export type LearningMode =
  | 'study'
  | 'review'
  | 'shuffle'
  | 'favorite'
  | 'weak_topics'
  | 'recently_wrong'
  | 'ai_recommended'
  | 'exam';

export type FeedbackRating = 1 | 2 | 3 | 4; // 1 = Again, 2 = Hard, 3 = Good, 4 = Easy

export interface SpacedRepetitionState {
  cardId: string;
  userId: string;
  reviewCount: number;
  correctCount: number;
  wrongCount: number;
  lastReviewedAt: string | null;
  nextReviewAt: string;
  confidenceScore: number; // 1 to 5
  masteryScore: number; // 0 to 100 percentage
  easeFactor: number; // SM-2 ease factor (default 2.5)
  intervalDays: number; // Current spacing interval
  learningStage: LearningStage;
  isFavorite: boolean;
  isBookmarked: boolean;
  userNotes?: string;
}

export interface Flashcard {
  id: string; // UUID v4
  title: string;
  front: string; // Front card content
  back: string; // Back card content / answer
  cardType: FlashcardType;
  explanation: string;
  clinicalExplanation: string;
  memoryTip?: string; // Mnemonic or memory trick
  realLifeExample?: string;
  commonMistakes?: string;
  reference: string; // BACB Task List citation
  certification: CertificationLevel;
  category: FlashcardCategory;
  subcategory?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  keywords: string[];
  tags: string[];
  imageUrl?: string;
  status: 'published' | 'draft' | 'archived';
  isPremium: boolean;
  isFeatured: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  // Attached user progress (if loaded for active user session)
  userState?: SpacedRepetitionState;
}

export interface FlashcardFilterParams {
  search?: string;
  certification?: CertificationLevel | 'ALL';
  category?: FlashcardCategory | 'ALL';
  difficulty?: string;
  cardType?: FlashcardType | 'ALL';
  learningMode?: LearningMode;
  onlyDue?: boolean;
  onlyFavorites?: boolean;
  onlyWeak?: boolean;
  page?: number;
  limit?: number;
}

export interface FlashcardPaginationResult {
  data: Flashcard[];
  total: number;
  dueCount: number;
  masteredCount: number;
  learningCount: number;
  page: number;
  totalPages: number;
}
