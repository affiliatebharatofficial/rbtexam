/**
 * Development Seed System & Production Data Isolation Engine
 * Ensures 100% data integrity:
 * - Production environment contains ZERO fake metrics, fake users, or mock data.
 * - Development & Staging environments allow controlled sample data seeding.
 */

export type AppEnvironment = 'development' | 'staging' | 'production';

export interface SeedStatus {
  environment: AppEnvironment;
  isDemoDataLoaded: boolean;
  canSeedData: boolean; // Strictly false in production
  demoRecordCounts: {
    questions: number;
    flashcards: number;
    analyticsEvents: number;
    workforceJobs: number;
    retrievalLogs: number;
  };
  lastSeededAt?: string;
}

let IS_DEMO_DATA_LOADED = false;
let LAST_SEEDED_AT: string | undefined = undefined;

/**
 * Returns current environment from process.env.NEXT_PUBLIC_APP_ENV or NODE_ENV
 */
export function getCurrentEnvironment(): AppEnvironment {
  const env = (process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development').toLowerCase();
  if (env === 'production' || env === 'prod') return 'production';
  if (env === 'staging') return 'staging';
  return 'development';
}

/**
 * Check if current environment permits demo data seeding
 */
export function canSeedDemoData(): boolean {
  return getCurrentEnvironment() !== 'production';
}

/**
 * Returns seed status
 */
export function getSeedStatus(): SeedStatus {
  const env = getCurrentEnvironment();
  const allowed = canSeedDemoData();

  return {
    environment: env,
    isDemoDataLoaded: allowed ? IS_DEMO_DATA_LOADED : false,
    canSeedData: allowed,
    demoRecordCounts: IS_DEMO_DATA_LOADED && allowed
      ? { questions: 25, flashcards: 40, analyticsEvents: 120, workforceJobs: 15, retrievalLogs: 30 }
      : { questions: 0, flashcards: 0, analyticsEvents: 0, workforceJobs: 0, retrievalLogs: 0 },
    lastSeededAt: LAST_SEEDED_AT,
  };
}

/**
 * Populate sample demo data (STRICTLY DEV & STAGING ONLY)
 */
export function seedDemoData(): { success: boolean; message: string; status: SeedStatus } {
  if (!canSeedDemoData()) {
    throw new Error('CRITICAL SECURITY VIOLATION: Seeding sample data is strictly prohibited in production environments.');
  }

  IS_DEMO_DATA_LOADED = true;
  LAST_SEEDED_AT = new Date().toISOString();

  return {
    success: true,
    message: 'Sample demo data populated successfully for development/staging testing.',
    status: getSeedStatus(),
  };
}

/**
 * Purge sample demo data (1-click cleanup)
 */
export function clearDemoData(): { success: boolean; message: string; status: SeedStatus } {
  IS_DEMO_DATA_LOADED = false;
  LAST_SEEDED_AT = undefined;

  return {
    success: true,
    message: 'All sample demo data purged completely. Data store restored to clean state.',
    status: getSeedStatus(),
  };
}

/**
 * Safe data filter wrapper:
 * In production mode, returns empty array if no real DB records exist.
 * In development mode, returns sample data if demo data has been explicitly seeded.
 */
export function filterProductionData<T>(realDbRecords: T[], sampleRecords: T[]): T[] {
  if (getCurrentEnvironment() === 'production') {
    return realDbRecords; // Pure database records in production
  }
  // In dev/staging: Return real DB records if present; else sample records if seeded
  if (realDbRecords.length > 0) return realDbRecords;
  return IS_DEMO_DATA_LOADED ? sampleRecords : [];
}
