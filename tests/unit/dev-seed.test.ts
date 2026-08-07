/**
 * Unit Tests — Development Seed System & Data Isolation (lib/dev-seed-engine.ts)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getCurrentEnvironment,
  canSeedDemoData,
  getSeedStatus,
  seedDemoData,
  clearDemoData,
} from '@/lib/dev-seed-engine';

const originalEnv = process.env.NEXT_PUBLIC_APP_ENV;

describe('Development Seed System & Production Safeguards', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_ENV = 'development';
    clearDemoData();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_ENV = originalEnv;
  });

  it('canSeedDemoData() returns true in development environment', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'development';
    expect(canSeedDemoData()).toBe(true);
  });

  it('canSeedDemoData() returns false in production environment', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';
    expect(canSeedDemoData()).toBe(false);
  });

  it('seedDemoData() populates sample counts in development', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'development';
    const result = seedDemoData();
    expect(result.success).toBe(true);
    expect(result.status.isDemoDataLoaded).toBe(true);
    expect(result.status.demoRecordCounts.questions).toBeGreaterThan(0);
  });

  it('seedDemoData() throws critical security error in production', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'production';
    expect(() => seedDemoData()).toThrow(/CRITICAL SECURITY VIOLATION/);
  });

  it('clearDemoData() purges all sample records to zero', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'development';
    seedDemoData();
    const clearResult = clearDemoData();

    expect(clearResult.success).toBe(true);
    expect(clearResult.status.isDemoDataLoaded).toBe(false);
    expect(clearResult.status.demoRecordCounts.questions).toBe(0);
  });
});
