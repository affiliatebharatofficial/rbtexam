// Centralized Analytics & Business Intelligence Engine - Core Types

export type AnalyticsCategory =
  | 'learning'
  | 'business'
  | 'ai_tutor'
  | 'seo'
  | 'system'
  | 'auth'
  | 'practice_test'
  | 'flashcard';

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventName: string;
  category: AnalyticsCategory;
  payload: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface BusinessMetrics {
  mrrUSD: number; // Monthly Recurring Revenue
  arrUSD: number; // Annual Recurring Revenue
  activeSubscribers: number;
  newSubscribersCount: number;
  churnRatePercentage: number; // e.g. 1.8%
  ltvUSD: number; // Lifetime Value $380
  arpuUSD: number; // Average Revenue Per User $32
  conversionRatePercentage: number; // 4.2%
}

export interface StudentAnalytics {
  totalStudents: number;
  activeStudentsDAU: number;
  activeStudentsMAU: number;
  retentionRatePercentage: number;
  averageReadinessScore: number; // e.g. 88%
  predictedPassRatePercentage: number; // e.g. 99.4%
  totalStudyHours: number;
  averageSessionLengthMinutes: number;
  certificationDistribution: {
    rbt: number;
    bcaba: number;
    bcba: number;
  };
}

export interface AITutorMetrics {
  totalConversations: number;
  totalMessagesSent: number;
  totalTokensConsumed: number;
  totalAICostUSD: number;
  averageResponseLatencyMs: number;
  satisfactionRatingPercentage: number; // e.g. 98.6%
  costPerActiveStudentUSD: number;
}

export interface QuestionMetrics {
  totalQuestionsCount: number;
  overallAccuracyPercentage: number;
  averageResponseTimeSeconds: number;
  mostDifficultCategory: string;
  skipRatePercentage: number;
}

export interface SEOMetrics {
  indexedPagesCount: number;
  organicImpressionsMonthly: number;
  organicClickThroughRate: number; // e.g. 4.8%
  topKeyword: string;
  schemaValidationHealth: number; // 100%
}

export interface SystemHealthMetrics {
  apiAverageLatencyMs: number; // e.g. 42ms
  cacheHitRatioPercentage: number; // e.g. 96.4%
  backgroundQueueHealth: number; // 100%
  errorRatePercentage: number; // 0.01%
  uptimePercentage: number; // 99.99%
}

export interface ExecutiveSummary {
  business: BusinessMetrics;
  students: StudentAnalytics;
  aiTutor: AITutorMetrics;
  questions: QuestionMetrics;
  seo: SEOMetrics;
  system: SystemHealthMetrics;
  updatedAt: string;
}
