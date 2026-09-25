import { NextRequest, NextResponse } from 'next/server';
import { d1QueryFirst, d1Query, isD1Available } from '@/lib/d1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inviterEmail = searchParams.get('inviterEmail')?.toLowerCase().trim();
    const inviterId = searchParams.get('inviterId')?.trim();

    let targetClinicId = inviterId;
    let trainees: any[] = [];

    if (isD1Available()) {
      if (!targetClinicId && inviterEmail) {
        const inviterUser = await d1QueryFirst<{ id: string }>(
          'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
          [inviterEmail]
        );
        if (inviterUser?.id) {
          targetClinicId = inviterUser.id;
        }
      }

      if (targetClinicId) {
        const usersData = await d1Query(
          'SELECT * FROM users WHERE clinic_id = ? ORDER BY created_at DESC',
          [targetClinicId]
        );

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
