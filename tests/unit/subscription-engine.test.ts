import { describe, it, expect } from 'vitest';
import {
  SUBSCRIPTION_PLANS,
  canUserAccessFeature,
  checkAndTrackUsageQuota,
} from '@/lib/subscription-engine';
import { updatePlatformConfig } from '@/lib/platform-config';
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

describe('canUserAccessFeature() with Paywall Checks', () => {
  it('returns false for null subscription when paywall check is enforced', () => {
    const result = canUserAccessFeature(null, 'mockExams', { bypassFreeCheck: true });
    expect(result).toBe(false);
  });

  it('returns false for inactive subscription when paywall check is enforced', () => {
    const sub = makeMockSub({ status: 'expired', tier: 'pro' });
    const result = canUserAccessFeature(sub, 'mockExams', { bypassFreeCheck: true });
    expect(result).toBe(false);
  });

  it('returns true for active pro subscription on premium feature', () => {
    const sub = makeMockSub({ status: 'active', tier: 'pro' });
    const result = canUserAccessFeature(sub, 'mockExams', { bypassFreeCheck: true });
    expect(result).toBe(true);
  });

  it('returns true for active lifetime subscription on all features', () => {
    const sub = makeMockSub({ status: 'active', tier: 'lifetime', planId: 'plan-lifetime' });
    const features = ['mockExams', 'pdfExports', 'advancedAnalytics', 'unlimitedFlashcards'] as const;
    features.forEach((feature) => {
      const result = canUserAccessFeature(sub, feature, { bypassFreeCheck: true });
      expect(result).toBe(true);
    });
  });
});

describe('Dynamic Free Access Mode (Sabke Liye Free)', () => {
  it('allows unauthenticated and free candidates full access when freeAccessMode is enabled', () => {
    updatePlatformConfig('freeAccessMode', true, 'Test Admin');
    const result = canUserAccessFeature(null, 'mockExams');
    expect(result).toBe(true);
  });

  it('gives unlimited quota when freeAccessMode is enabled', () => {
    updatePlatformConfig('freeAccessMode', true, 'Test Admin');
    const result = checkAndTrackUsageQuota('random-user-id', 'aiMessage', 'free');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9999);
  });
});

describe('checkAndTrackUsageQuota() under strict quota checks', () => {
  it('allows pro users unlimited access', () => {
    const result = checkAndTrackUsageQuota('user-pro-001', 'aiMessage', 'pro', { bypassFreeCheck: true });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9999);
  });

  it('allows free user first aiMessage request', () => {
    const result = checkAndTrackUsageQuota('free-user-fresh-' + Date.now(), 'aiMessage', 'free', { bypassFreeCheck: true });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBeGreaterThanOrEqual(0);
  });

  it('blocks free user after daily AI message limit', () => {
    const userId = 'free-user-limit-test-' + Date.now();
    for (let i = 0; i < 5; i++) {
      checkAndTrackUsageQuota(userId, 'aiMessage', 'free', { bypassFreeCheck: true });
    }
    const finalResult = checkAndTrackUsageQuota(userId, 'aiMessage', 'free', { bypassFreeCheck: true });
    expect(finalResult.allowed).toBe(false);
    expect(finalResult.remaining).toBe(0);
  });

  it('allows free user flashcard access within limit', () => {
    const result = checkAndTrackUsageQuota('free-fc-' + Date.now(), 'flashcard', 'free', { bypassFreeCheck: true });
    expect(result.allowed).toBe(true);
  });
});
