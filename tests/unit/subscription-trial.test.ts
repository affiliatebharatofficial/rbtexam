import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getEffectiveSubscriptionTier, getTrialDaysRemaining } from '../../lib/subscription-engine';
import { updatePlatformConfig } from '../../lib/platform-config';
import { UserProfile } from '../../types/auth';

describe('7-Day Free Pro Access & Trial Expiration Engine', () => {
  const now = new Date('2026-08-17T10:00:00Z').getTime();

  beforeEach(() => {
    vi.setSystemTime(now);
  });

  it('should grant pro tier for a fresh candidate with trialEndsAt in the future', () => {
    const candidateUser: Partial<UserProfile> = {
      id: 'usr_test_001',
      role: 'student',
      subscriptionTier: 'pro',
      trialEndsAt: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const effectiveTier = getEffectiveSubscriptionTier(candidateUser, { bypassFreeCheck: true });
    expect(effectiveTier).toBe('pro');

    const trialInfo = getTrialDaysRemaining(candidateUser);
    expect(trialInfo.isTrialActive).toBe(true);
    expect(trialInfo.daysRemaining).toBe(7);
  });

  it('should automatically revert candidate to free tier when trialEndsAt has passed under strict paywall', () => {
    const expiredUser: Partial<UserProfile> = {
      id: 'usr_test_002',
      role: 'student',
      subscriptionTier: 'pro',
      trialEndsAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), // Expired 1 day ago
    };

    const effectiveTier = getEffectiveSubscriptionTier(expiredUser, { bypassFreeCheck: true });
    expect(effectiveTier).toBe('free');

    const trialInfo = getTrialDaysRemaining(expiredUser);
    expect(trialInfo.isTrialActive).toBe(false);
    expect(trialInfo.daysRemaining).toBe(0);
  });

  it('should always return enterprise tier for admin users regardless of trial date', () => {
    const adminUser: Partial<UserProfile> = {
      id: 'usr_admin_001',
      role: 'admin',
      subscriptionTier: 'pro',
      trialEndsAt: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const effectiveTier = getEffectiveSubscriptionTier(adminUser, { bypassFreeCheck: true });
    expect(effectiveTier).toBe('enterprise');
  });

  it('should preserve paid subscription tiers like team or lifetime after trial', () => {
    const teamUser: Partial<UserProfile> = {
      id: 'usr_team_001',
      role: 'student',
      subscriptionTier: 'team',
    };

    const effectiveTier = getEffectiveSubscriptionTier(teamUser, { bypassFreeCheck: true });
    expect(effectiveTier).toBe('team');
  });

  it('should grant pro tier to all users when freeAccessMode is enabled', () => {
    updatePlatformConfig('freeAccessMode', true, 'Test Admin');
    const freeUser: Partial<UserProfile> = {
      id: 'usr_free_001',
      role: 'student',
      subscriptionTier: 'free',
    };

    const effectiveTier = getEffectiveSubscriptionTier(freeUser);
    expect(effectiveTier).toBe('pro');
  });
});
