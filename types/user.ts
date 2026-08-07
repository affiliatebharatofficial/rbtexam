import { BACBDomainId } from './bacb';

export type UserRole = 'student' | 'therapist' | 'clinic_admin' | 'instructor';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  targetExamDate?: string;
  targetScore: number;
  clinicId?: string;
  createdAt: string;
}

export interface FlashcardProgress {
  cardId: string;
  leitnerBox: number; // 1 to 5
  lastReviewedAt: string;
  nextReviewAt: string;
  correctStreak: number;
}

export interface StudentProgress {
  userId: string;
  overallReadinessScore: number; // 0 to 100
  estimatedPassLikelihood: number; // 0 to 100%
  completedMocksCount: number;
  questionsAnsweredCount: number;
  overallAccuracyPercentage: number;
  studyTimeHours: number;
  domainMastery: Record<BACBDomainId, number>; // Percentage mastery 0-100
  streakDays: number;
  lastActiveDate: string;
}

export interface TraineeProgressSummary {
  userId: string;
  fullName: string;
  email: string;
  readinessScore: number;
  mocksTaken: number;
  lastExamScore: number;
  weakestDomain: string;
  status: 'Ready' | 'On Track' | 'Needs Support';
}

export interface ClinicCohort {
  id: string;
  name: string;
  clinicName: string;
  adminId: string;
  totalTrainees: number;
  averageReadinessScore: number;
  predictedPassRate: number;
  trainees: TraineeProgressSummary[];
}
