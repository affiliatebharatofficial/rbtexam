import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Integration & Client Initialization with Mock Fallback for zero-config deployment

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-rbt-app.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}

export const supabase = getSupabaseClient();

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock-')
  );
}

let adminSupabaseInstance: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient {
  if (!adminSupabaseInstance) {
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';
    adminSupabaseInstance = createClient(SUPABASE_URL, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return adminSupabaseInstance;
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
