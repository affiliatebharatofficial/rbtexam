import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Integration & Client Initialization with Mock Fallback for zero-config deployment

export function getRuntimeEnv(key: string): string {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    if (ctx?.env && ctx.env[key]) {
      return ctx.env[key] as string;
    }
  } catch {}
  return '';
}

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ntwomhtfkuazqgtnkffk.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTYxMzMsImV4cCI6MjEwMTYzMjEzM30.GnMw1y4htxgLJd1Kr20fWCPN7elME_uKU2EbxwudHcw';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const url = getRuntimeEnv('NEXT_PUBLIC_SUPABASE_URL') || SUPABASE_URL;
  const anonKey = getRuntimeEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || SUPABASE_ANON_KEY;
  if (!supabaseInstance) {
    supabaseInstance = createClient(url, anonKey);
  }
  return supabaseInstance;
}

export const supabase = getSupabaseClient();

export function isSupabaseConfigured(): boolean {
  const url = getRuntimeEnv('NEXT_PUBLIC_SUPABASE_URL') || SUPABASE_URL;
  const anonKey = getRuntimeEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    anonKey &&
    !url.includes('mock-') &&
    anonKey !== 'mock-anon-key'
  );
}

export function getSupabaseAdminClient(): SupabaseClient {
  const url = getRuntimeEnv('NEXT_PUBLIC_SUPABASE_URL') || SUPABASE_URL;
  const serviceRoleKey =
    getRuntimeEnv('SUPABASE_SERVICE_ROLE_KEY') ||
    getRuntimeEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
    SUPABASE_ANON_KEY;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
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
