/**
 * Unit Tests — Subscription Engine (lib/subscription-engine.ts)
 * Aligned to actual SUBSCRIPTION_PLANS export and canUserAccessFeature signature.
 */

import { describe, it, expect } from 'vitest';
import {
  SUBSCRIPTION_PLANS,
  canUserAccessFeature,
  checkAndTrackUsageQuota,
} from '@/lib/subscription-engine';
import { UserSubscription } from '@/types/subscription';

const makeMockSub = (overrides: Partial<UserSubscription>): UserSubscription => ({
  id: 'sub-mock-id',
  userId: 'user-mock-id',
  planId: 'plan-pro',
  tier: 'pro',
  status: 'active',
  billingInterval: 'monthly',
  trialEndsAt: null,
  currentPeriodStart: new Date().toISOString(),
  currentPeriodEnd: new Date().toISOString(),
  cancelAtPeriodEnd: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe('SUBSCRIPTION_PLANS', () => {
  it('returns an array of plans', () => {
    expect(Array.isArray(SUBSCRIPTION_PLANS)).toBe(true);
    expect(SUBSCRIPTION_PLANS.length).toBeGreaterThan(0);
  });

  it('each plan has id, name, and priceMonthlyUSD', () => {
    SUBSCRIPTION_PLANS.forEach((plan) => {
      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('name');
      expect(plan).toHaveProperty('priceMonthlyUSD');
    });
  });

  it('includes a free plan with priceMonthlyUSD = 0', () => {
    const free = SUBSCRIPTION_PLANS.find((p) => p.priceMonthlyUSD === 0 && p.tier === 'free');
    expect(free).toBeDefined();
  });

  it('includes a pro plan', () => {
    const pro = SUBSCRIPTION_PLANS.find((p) => p.tier === 'pro');
    expect(pro).toBeDefined();
    expect(pro?.priceMonthlyUSD).toBeGreaterThan(0);
  });
});

describe('canUserAccessFeature()', () => {
  it('returns false for null subscription (unauthenticated user)', () => {
    const result = canUserAccessFeature(null, 'mockExams');
    expect(result).toBe(false);
  });

  it('returns false for inactive subscription', () => {
    const sub = makeMockSub({ status: 'expired', tier: 'pro' });
    const result = canUserAccessFeature(sub, 'mockExams');
    expect(result).toBe(false);
  });

  it('returns true for active pro subscription on premium feature', () => {
    const sub = makeMockSub({ status: 'active', tier: 'pro' });
    const result = canUserAccessFeature(sub, 'mockExams');
    expect(result).toBe(true);
  });

  it('returns true for active lifetime subscription on all features', () => {
    const sub = makeMockSub({ status: 'active', tier: 'lifetime', planId: 'plan-lifetime' });
    const features = ['mockExams', 'pdfExports', 'advancedAnalytics', 'unlimitedFlashcards'] as const;
    features.forEach((feature) => {
      const result = canUserAccessFeature(sub, feature);
      expect(result).toBe(true);
    });
  });
});

describe('checkAndTrackUsageQuota()', () => {
  it('allows pro users unlimited access', () => {
    const result = checkAndTrackUsageQuota('user-pro-001', 'aiMessage', 'pro');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9999);
  });

  it('allows free user first aiMessage request', () => {
    const result = checkAndTrackUsageQuota('free-user-fresh-' + Date.now(), 'aiMessage', 'free');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBeGreaterThanOrEqual(0);
  });

  it('blocks free user after daily AI message limit', () => {
    const userId = 'free-user-limit-test-' + Date.now();
    for (let i = 0; i < 5; i++) {
      checkAndTrackUsageQuota(userId, 'aiMessage', 'free');
    }
    const finalResult = checkAndTrackUsageQuota(userId, 'aiMessage', 'free');
    expect(finalResult.allowed).toBe(false);
    expect(finalResult.remaining).toBe(0);
  });

  it('allows free user flashcard access within limit', () => {
    const result = checkAndTrackUsageQuota('free-fc-' + Date.now(), 'flashcard', 'free');
    expect(result.allowed).toBe(true);
  });
});
