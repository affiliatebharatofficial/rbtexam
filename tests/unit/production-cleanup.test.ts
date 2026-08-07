import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getCurrentEnvironment,
  canSeedDemoData,
  seedDemoData,
  clearDemoData,
  filterProductionData,
} from '@/lib/dev-seed-engine';
import { getPlatformAnalyticsSummary } from '@/lib/analytics-engine';

describe('Production Data Isolation & Cleanup Safeguards', () => {
  const originalEnv = process.env.NEXT_PUBLIC_APP_ENV;

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_ENV = originalEnv;
    clearDemoData();
  });

  it('should identify production environment and disable demo data seeding', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';

    expect(getCurrentEnvironment()).toBe('production');
    expect(canSeedDemoData()).toBe(false);
  });

  it('should throw critical security error if seedDemoData is invoked in production', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';

    expect(() => seedDemoData()).toThrow(
      'CRITICAL SECURITY VIOLATION: Seeding sample data is strictly prohibited in production environments.'
    );
  });

  it('should return zero metrics in production / unseeded state', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';
    clearDemoData();

    const summary = getPlatformAnalyticsSummary();
    expect(summary.business.mrrUSD).toBe(0);
    expect(summary.business.activeSubscribers).toBe(0);
    expect(summary.students.totalStudents).toBe(0);
  });

  it('should filter production data cleanly without showing mock items', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';

    const dbItems: any[] = [];
    const sampleItems = [{ id: 'sample-1' }];

    const filtered = filterProductionData(dbItems, sampleItems);
    expect(filtered.length).toBe(0);
  });
});
