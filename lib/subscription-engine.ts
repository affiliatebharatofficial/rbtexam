import {
  SubscriptionPlan,
  UserSubscription,
  PlanTier,
  UsageQuota,
} from '@/types/subscription';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    tier: 'free',
    name: 'Free Candidate Plan',
    description: 'Basic diagnostic practice tools for RBT candidates.',
    priceMonthlyUSD: 0,
    priceYearlyUSD: 0,
    limits: {
      dailyPracticeTests: 1,
      dailyFlashcards: 15,
      dailyAIMessages: 5,
      dailyMockExams: 0,
      allowPDFExports: false,
      allowAdvancedAnalytics: false,
      allowPrioritySupport: false,
      maxTeamSeats: 1,
    },
    features: [
      '15 Flashcards per Day',
      '1 Diagnostic Quiz per Day',
      '5 Socrates AI Tutor Messages per Day',
      'BACB 2nd Edition Task List Reference',
    ],
    isActive: true,
  },
  {
    id: 'plan-pro',
    tier: 'pro',
    name: 'Pro Pass Guarantee',
    description: 'Complete BACB RBT, BCaBA, and BCBA exam preparation suite.',
    priceMonthlyUSD: 29,
    priceYearlyUSD: 199,
    isPopular: true,
    limits: {
      dailyPracticeTests: -1, // Unlimited
      dailyFlashcards: -1,
      dailyAIMessages: -1,
      dailyMockExams: -1,
      allowPDFExports: true,
      allowAdvancedAnalytics: true,
      allowPrioritySupport: true,
      maxTeamSeats: 1,
    },
    features: [
      'Unlimited 85-Question BACB Mock Exams',
      'Unlimited Spaced Repetition Flashcards',
      'Unlimited Socrates AI Tutor Mentorship',
      '100% Pass Money-Back Guarantee',
      'Exam Readiness Score & Analytics',
      'PDF Summary Downloads',
      'Priority Support',
    ],
    isActive: true,
  },
  {
    id: 'plan-team',
    tier: 'team',
    name: 'Clinic & Supervisor Team',
    description: 'For ABA clinics and BCBA supervisors training teams of RBTs.',
    priceMonthlyUSD: 99,
    priceYearlyUSD: 799,
    limits: {
      dailyPracticeTests: -1,
      dailyFlashcards: -1,
      dailyAIMessages: -1,
      dailyMockExams: -1,
      allowPDFExports: true,
      allowAdvancedAnalytics: true,
      allowPrioritySupport: true,
      maxTeamSeats: 10,
    },
    features: [
      'Up to 10 RBT Candidate Seats Included',
      'Supervisor Oversight Analytics Dashboard',
      'Bulk Exam Assigning & Performance Tracking',
      'Shared Organization Billing & Invoices',
      'Dedicated BCBA Account Manager',
    ],
    isActive: true,
  },
  {
    id: 'plan-lifetime',
    tier: 'lifetime',
    name: 'Lifetime VIP Access',
    description: 'One-time payment for perpetual access across RBT, BCaBA, and BCBA.',
    priceMonthlyUSD: 0,
    priceYearlyUSD: 0,
    priceLifetimeUSD: 499,
    limits: {
      dailyPracticeTests: -1,
      dailyFlashcards: -1,
      dailyAIMessages: -1,
      dailyMockExams: -1,
      allowPDFExports: true,
      allowAdvancedAnalytics: true,
      allowPrioritySupport: true,
      maxTeamSeats: 1,
    },
    features: [
      'Lifetime Access to All Current & Future Features',
      'Covers RBT, BCaBA, and BCBA Certification Exams',
      'Never Pay Monthly Fees Again',
      'All Premium AI Tutor Upgrades Included',
    ],
    isActive: true,
  },
];

// In-Memory Usage Quotas Store (Supabase ready)
const USAGE_QUOTA_STORE: Record<string, UsageQuota> = {};

/**
 * Feature Permission Guard
 * Checks if user's subscription tier permits access to a premium feature
 */
export function canUserAccessFeature(
  userSub: UserSubscription | null,
  feature: 'mockExams' | 'pdfExports' | 'advancedAnalytics' | 'unlimitedFlashcards'
): boolean {
  if (!userSub || userSub.status !== 'active') {
    return false; // Free plan restricted
  }
  if (['pro', 'team', 'enterprise', 'lifetime'].includes(userSub.tier)) {
    return true; // Premium plans have full access
  }
  return false;
}

/**
 * Checks and increments daily resource usage quota for free plan users
 */
export function checkAndTrackUsageQuota(
  userId: string = 'default_user',
  resourceType: 'aiMessage' | 'flashcard' | 'practiceTest',
  tier: PlanTier = 'free'
): { allowed: boolean; remaining: number } {
  if (['pro', 'team', 'enterprise', 'lifetime'].includes(tier)) {
    return { allowed: true, remaining: 9999 }; // Unlimited for paid plans
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const key = `${userId}_${todayStr}`;

  if (!USAGE_QUOTA_STORE[key]) {
    USAGE_QUOTA_STORE[key] = {
      userId,
      date: todayStr,
      practiceTestsUsed: 0,
      flashcardsUsed: 0,
      aiMessagesUsed: 0,
      pdfDownloadsUsed: 0,
    };
  }

  const quota = USAGE_QUOTA_STORE[key];
  const freePlan = SUBSCRIPTION_PLANS.find((p) => p.tier === 'free')!;

  if (resourceType === 'aiMessage') {
    if (quota.aiMessagesUsed >= freePlan.limits.dailyAIMessages) {
      return { allowed: false, remaining: 0 };
    }
    quota.aiMessagesUsed += 1;
    return { allowed: true, remaining: freePlan.limits.dailyAIMessages - quota.aiMessagesUsed };
  }

  if (resourceType === 'flashcard') {
    if (quota.flashcardsUsed >= freePlan.limits.dailyFlashcards) {
      return { allowed: false, remaining: 0 };
    }
    quota.flashcardsUsed += 1;
    return { allowed: true, remaining: freePlan.limits.dailyFlashcards - quota.flashcardsUsed };
  }

  return { allowed: true, remaining: 10 };
}

import { UserProfile } from '@/types/auth';

/**
 * Calculates the effective subscription tier for a user, taking 7-day Pro free trial expiration into account.
 */
export function getEffectiveSubscriptionTier(user: Partial<UserProfile> | null | undefined): PlanTier {
  if (!user) return 'free';

  // Admin & Super Admin users always have enterprise access
  if (user.role === 'admin' || user.role === 'super_admin') {
    return 'enterprise';
  }

  const rawTier: PlanTier = user.subscriptionTier || 'pro'; // Default to pro for candidates

  // Check 7-day trial expiry if user is on 'pro' trial
  if (rawTier === 'pro' && user.trialEndsAt) {
    const trialEndTime = new Date(user.trialEndsAt).getTime();
    const nowTime = Date.now();
    if (nowTime > trialEndTime) {
      // Trial has expired, downgrade to normal/free plan
      return 'free';
    }
  }

  return rawTier;
}

/**
 * Checks remaining days on 7-day Pro trial
 */
export function getTrialDaysRemaining(user: Partial<UserProfile> | null | undefined): { isTrialActive: boolean; daysRemaining: number; hoursRemaining: number } {
  if (!user || !user.trialEndsAt) {
    return { isTrialActive: false, daysRemaining: 0, hoursRemaining: 0 };
  }

  const trialEndTime = new Date(user.trialEndsAt).getTime();
  const diffMs = trialEndTime - Date.now();

  if (diffMs <= 0) {
    return { isTrialActive: false, daysRemaining: 0, hoursRemaining: 0 };
  }

  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));

  return {
    isTrialActive: true,
    daysRemaining,
    hoursRemaining,
  };
}
