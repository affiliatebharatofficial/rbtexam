// AI Adaptive Learning Engine - Core Type Definitions

export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export type RecommendationType =
  | 'mock_exam'
  | 'flashcard_drill'
  | 'ai_tutor_session'
  | 'task_list_review'
  | 'daily_revision';

export interface PriorityQueueItem {
  taskItemId: string; // e.g. 'D-04'
  domainId: string; // e.g. 'D'
  topicName: string; // e.g. 'Differential Reinforcement (DRO/DRA/DRI)'
  accuracyPercentage: number; // e.g. 74%
  averageResponseTimeSeconds: number; // e.g. 85s
  mistakeFrequency: number;
  priorityScore: number; // 0 to 100 (higher = urgent remediation)
  recommendedAction: string;
}

export interface SmartRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  targetDomain?: string;
  targetTaskCode?: string;
  actionUrl: string;
  estimatedMinutes: number;
  xpReward: number;
  urgency: 'high' | 'medium' | 'low';
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  type: RecommendationType;
  actionUrl: string;
  estimatedMinutes: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt: string | null;
  progressPercentage: number;
}

export interface LearningProfile {
  userId: string;
  fullName: string;
  certification: CertificationLevel;
  targetExamDate: string;
  currentLevel: string; // e.g. 'Level 4: Exam Ready'
  readinessScore: number; // 0-100%
  predictedPassProbability: number; // 0-100%
  estimatedHoursRemaining: number; // e.g. 18 hours
  learningVelocity: number; // XP points gained per week
  streakDays: number;
  totalStudyTimeMinutes: number;
  questionsAnsweredCount: number;
  overallAccuracyPercentage: number;
  weakTopics: PriorityQueueItem[];
  strongTopics: string[];
  recommendations: SmartRecommendation[];
  dailyTasks: DailyTask[];
  badges: AchievementBadge[];
  updatedAt: string;
}
