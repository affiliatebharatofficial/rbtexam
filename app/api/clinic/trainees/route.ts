import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inviterEmail = searchParams.get('inviterEmail')?.toLowerCase().trim();
    const inviterId = searchParams.get('inviterId')?.trim();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    let targetClinicId = inviterId;

    if (!targetClinicId && inviterEmail) {
      const { data: inviterUser } = await adminSupabase
        .from('users')
        .select('id')
        .eq('email', inviterEmail)
        .maybeSingle();

      if (inviterUser?.id) {
        targetClinicId = inviterUser.id;
      }
    }

    let trainees: any[] = [];

    if (targetClinicId) {
      const { data: usersData } = await adminSupabase
        .from('users')
        .select('*')
        .eq('clinic_id', targetClinicId)
        .order('created_at', { ascending: false });

      if (usersData && Array.isArray(usersData)) {
        trainees = usersData.map((u) => ({
          id: u.id,
          fullName: u.full_name || u.email?.split('@')[0] || 'Candidate',
          email: u.email,
          targetScore: u.target_score || 90,
          readinessScore: 97,
          status: 'On Track',
          clinicId: u.clinic_id,
        }));
      }
    }

    return NextResponse.json({
      success: true,
      trainees,
      totalCount: trainees.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch clinic trainees' }, { status: 500 });
  }
}
