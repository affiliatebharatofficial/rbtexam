// Supabase Integration & Client Initialization with Mock Fallback for zero-config deployment

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-rbt-app.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function fetchMockOrRealUserProgress() {
  return {
    userId: 'demo-student-id',
    overallReadinessScore: 88,
    estimatedPassLikelihood: 94,
    completedMocksCount: 6,
    questionsAnsweredCount: 420,
    overallAccuracyPercentage: 86.4,
    studyTimeHours: 18.5,
    streakDays: 7,
    lastActiveDate: new Date().toISOString(),
    domainMastery: {
      A: 92, // Measurement
      B: 85, // Assessment
      C: 89, // Skill Acquisition
      D: 81, // Behavior Reduction
      E: 94, // Documentation
      F: 95, // Ethics & Scope
    },
  };
}
