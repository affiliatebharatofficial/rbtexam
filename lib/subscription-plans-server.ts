import { supabase, isSupabaseConfigured } from './supabase';
import { SubscriptionPlan, SubscriptionPlanInput } from '@/types/subscription-plan';

const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-student-pro',
    name: 'Student Pro',
    slug: 'student-pro',
    description: 'Ideal for 30-60 day intensive RBT exam study plans.',
    priceMonthly: 39,
    priceAnnual: 29,
    badge: 'RBT Candidates',
    targetAudience: 'Individual Candidates',
    buttonText: 'Get Started Today',
    isPopular: false,
    isActive: true,
    features: [
      'Full 85-Question Pearson VUE Timed Mock Exams',
      'Leitner Smart Flashcard Spaced Repetition System',
      'Socrates AI Tutor Chat & Rationales',
      'Domain Weakness Diagnostic Heatmap',
      '100% Pass Money-Back Guarantee',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan-pass-guarantee',
    name: 'Pass Guarantee VIP',
    slug: 'pass-guarantee-vip',
    description: 'Complete all-access VIP prep pass with 100% money-back guarantee protection.',
    priceMonthly: 59,
    priceAnnual: 49,
    badge: '100% Money-Back Pass Guarantee',
    targetAudience: 'VIP RBT Candidates',
    buttonText: 'Claim Pass Guarantee Pass',
    isPopular: true,
    isActive: true,
    features: [
      'Unlimited 85-Question Mock Exams & Retakes',
      'Priority Socrates AI Clinical ABA Mentorship',
      'Full BACB Task List 3rd Edition Study Modules',
      'Full Leitner Spaced Memory Box Flashcards',
      '100% Pass Money-Back Guarantee Policy',
      'VIP Fast-Track Email Support',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan-clinic-cohort',
    name: 'Clinic & Enterprise Cohort',
    slug: 'clinic-enterprise-cohort',
    description: 'Tailored for BCBA clinic supervisors managing RBT trainee cohorts.',
    priceMonthly: 199,
    priceAnnual: 149,
    badge: 'BCBA Clinic Cohort Management',
    targetAudience: 'Clinics & Supervision Labs',
    buttonText: 'Contact Clinic Partnerships',
    isPopular: false,
    isActive: true,
    features: [
      'Up to 10 RBT Trainee Candidate Accounts',
      'BCBA Supervisor Progress Oversight Dashboard',
      'Cohort Domain Diagnostics & Weakness Reports',
      'Unlimited Mock Exams & Flashcards for All Trainees',
      'Dedicated Customer Success Manager',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let inMemoryPlans: SubscriptionPlan[] = [...DEFAULT_PLANS];

export async function loadServerSubscriptionPlansAsync(): Promise<SubscriptionPlan[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_monthly', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          slug: row.slug || row.id,
          description: row.description || '',
          priceMonthly: Number(row.price_monthly || row.price_usd || 0),
          priceAnnual: Number(row.price_annual || row.price_monthly || 0),
          badge: row.badge || '',
          targetAudience: row.target_audience || '',
          buttonText: row.button_text || 'Select Plan',
          features: Array.isArray(row.features) ? row.features : (typeof row.features === 'string' ? JSON.parse(row.features) : []),
          isPopular: Boolean(row.is_popular),
          isActive: row.is_active !== false,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (e) {
      console.error('Failed to fetch subscription plans from Supabase:', e);
    }
  }

  return inMemoryPlans;
}

export async function createServerPlanAsync(input: SubscriptionPlanInput): Promise<SubscriptionPlan> {
  const newId = `plan-${Date.now()}`;
  const slug = input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const now = new Date().toISOString();

  const plan: SubscriptionPlan = {
    id: newId,
    name: input.name,
    slug,
    description: input.description,
    priceMonthly: Number(input.priceMonthly),
    priceAnnual: Number(input.priceAnnual),
    badge: input.badge || '',
    targetAudience: input.targetAudience || '',
    buttonText: input.buttonText || 'Get Started',
    features: input.features || [],
    isPopular: Boolean(input.isPopular),
    isActive: input.isActive !== false,
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .insert([{
          id: newId,
          name: input.name,
          slug,
          description: input.description,
          price_monthly: input.priceMonthly,
          price_annual: input.priceAnnual,
          badge: input.badge,
          target_audience: input.targetAudience,
          button_text: input.buttonText,
          features: JSON.stringify(input.features),
          is_popular: input.isPopular,
          is_active: input.isActive !== false,
          created_at: now,
          updated_at: now,
        }])
        .select()
        .single();

      if (!error && data) {
        plan.id = data.id;
      }
    } catch (e) {
      console.error('Failed to insert plan in Supabase:', e);
    }
  }

  inMemoryPlans.push(plan);
  return plan;
}

export async function updateServerPlanAsync(id: string, input: Partial<SubscriptionPlanInput>): Promise<SubscriptionPlan | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured() && supabase) {
    try {
      const updateData: any = { updated_at: now };
      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined) updateData.description = input.description;
      if (input.priceMonthly !== undefined) updateData.price_monthly = input.priceMonthly;
      if (input.priceAnnual !== undefined) updateData.price_annual = input.priceAnnual;
      if (input.badge !== undefined) updateData.badge = input.badge;
      if (input.targetAudience !== undefined) updateData.target_audience = input.targetAudience;
      if (input.buttonText !== undefined) updateData.button_text = input.buttonText;
      if (input.features !== undefined) updateData.features = JSON.stringify(input.features);
      if (input.isPopular !== undefined) updateData.is_popular = input.isPopular;
      if (input.isActive !== undefined) updateData.is_active = input.isActive;

      await supabase
        .from('subscription_plans')
        .update(updateData)
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update plan in Supabase:', e);
    }
  }

  const idx = inMemoryPlans.findIndex((p) => p.id === id);
  if (idx !== -1) {
    inMemoryPlans[idx] = {
      ...inMemoryPlans[idx],
      ...input,
      updatedAt: now,
    };
    return inMemoryPlans[idx];
  }

  return null;
}

export async function deleteServerPlanAsync(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.error('Failed to delete plan from Supabase:', e);
    }
  }

  const initialLen = inMemoryPlans.length;
  inMemoryPlans = inMemoryPlans.filter((p) => p.id !== id);
  return inMemoryPlans.length < initialLen;
}
