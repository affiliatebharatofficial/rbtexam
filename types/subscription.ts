// Enterprise Subscription & Billing Engine - Core Type Definitions

export type PlanTier = 'free' | 'basic' | 'pro' | 'premium' | 'team' | 'enterprise' | 'lifetime';

export type BillingInterval = 'monthly' | 'yearly' | 'one_time';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'paused'
  | 'unpaid'
  | 'expired';

export interface PlanLimits {
  dailyPracticeTests: number; // -1 for unlimited
  dailyFlashcards: number;
  dailyAIMessages: number;
  dailyMockExams: number;
  allowPDFExports: boolean;
  allowAdvancedAnalytics: boolean;
  allowPrioritySupport: boolean;
  maxTeamSeats: number;
}

export interface SubscriptionPlan {
  id: string;
  tier: PlanTier;
  name: string;
  description: string;
  priceMonthlyUSD: number;
  priceYearlyUSD: number;
  priceLifetimeUSD?: number;
  stripeMonthlyPriceId?: string;
  stripeYearlyPriceId?: string;
  lemonSqueezyVariantIdMonthly?: string;
  lemonSqueezyVariantIdYearly?: string;
  limits: PlanLimits;
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  tier: PlanTier;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEndsAt: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  lemonSqueezyCustomerId?: string;
  lemonSqueezySubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsageQuota {
  userId: string;
  date: string; // YYYY-MM-DD
  practiceTestsUsed: number;
  flashcardsUsed: number;
  aiMessagesUsed: number;
  pdfDownloadsUsed: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 10 for $10
  applicableTiers: PlanTier[];
  maxUses: number;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  subscriptionId: string;
  amountPaidUSD: number;
  taxAmountUSD: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  pdfUrl?: string;
  createdAt: string;
}
