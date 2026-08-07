import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, targetCertification, targetExamDate } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Candidate email address is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName?.trim() || cleanEmail.split('@')[0];
    const newUserId = `usr_clinic_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // 1. Insert/Upsert into public.users table
    await adminSupabase.from('users').upsert({
      id: newUserId,
      email: cleanEmail,
      full_name: cleanName,
      role: 'student',
      target_exam_date: targetExamDate || null,
      target_score: 90,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 2. Insert/Upsert into public.profiles table
    await adminSupabase.from('profiles').upsert({
      id: newUserId,
      email: cleanEmail,
      full_name: cleanName,
      certification_target: targetCertification || 'RBT',
      subscription_tier: 'pro',
      account_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const inviteLink = `${request.nextUrl.origin}/signup?email=${encodeURIComponent(cleanEmail)}&invite=CLINIC-VIP`;

    return NextResponse.json({
      success: true,
      message: `Candidate ${cleanName} (${cleanEmail}) invited to clinic cohort!`,
      inviteLink,
      candidate: {
        id: newUserId,
        fullName: cleanName,
        email: cleanEmail,
        targetScore: 90,
        readinessScore: 85,
        status: 'On Track',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to invite candidate' }, { status: 500 });
  }
}
