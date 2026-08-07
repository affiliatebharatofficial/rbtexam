import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, targetCertification, targetExamDate, inviterEmail, inviterId } = await request.json();

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
    const cleanInviterEmail = inviterEmail?.toLowerCase().trim() || 'system';

    // Resolve inviter UUID from inviterEmail or inviterId
    let resolvedClinicId = inviterId;
    if (!resolvedClinicId && inviterEmail) {
      const { data: inviterUser } = await adminSupabase
        .from('users')
        .select('id')
        .eq('email', cleanInviterEmail)
        .maybeSingle();

      if (inviterUser?.id) {
        resolvedClinicId = inviterUser.id;
      }
    }

    // Check existing user or generate random UUID
    const { data: existingUser } = await adminSupabase
      .from('users')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    const candidateId = existingUser?.id || crypto.randomUUID();

    // 1. Insert/Upsert into public.users table with clinic_id binding
    await adminSupabase.from('users').upsert({
      id: candidateId,
      email: cleanEmail,
      full_name: cleanName,
      role: 'student',
      clinic_id: resolvedClinicId || null,
      target_exam_date: targetExamDate || null,
      target_score: 90,
      updated_at: new Date().toISOString(),
    });

    // 2. Insert/Upsert into public.profiles table
    await adminSupabase.from('profiles').upsert({
      id: candidateId,
      email: cleanEmail,
      full_name: cleanName,
      certification_target: targetCertification || 'RBT',
      subscription_tier: 'pro',
      account_status: 'active',
      updated_at: new Date().toISOString(),
    });

    const inviteLink = `${request.nextUrl.origin}/signup?email=${encodeURIComponent(cleanEmail)}&invite=CLINIC-VIP`;

    return NextResponse.json({
      success: true,
      message: `Candidate ${cleanName} (${cleanEmail}) invited to clinic cohort!`,
      inviteLink,
      candidate: {
        id: candidateId,
        fullName: cleanName,
        email: cleanEmail,
        targetScore: 90,
        readinessScore: 97,
        status: 'On Track',
        clinicId: resolvedClinicId,
        invitedBy: cleanInviterEmail,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to invite candidate' }, { status: 500 });
  }
}
