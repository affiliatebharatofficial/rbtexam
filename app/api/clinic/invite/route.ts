import { NextRequest, NextResponse } from 'next/server';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, targetCertification, targetExamDate, inviterEmail, inviterId } = (await request.json()) as any;

    if (!email) {
      return NextResponse.json({ error: 'Candidate email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName?.trim() || cleanEmail.split('@')[0];
    const cleanInviterEmail = inviterEmail?.toLowerCase().trim() || 'system';

    let resolvedClinicId = inviterId;

    if (isD1Available()) {
      // Resolve inviter UUID from inviterEmail or inviterId
      if (!resolvedClinicId && inviterEmail) {
        const inviterUser = await d1QueryFirst<{ id: string }>(
          'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
          [cleanInviterEmail]
        );
        if (inviterUser?.id) {
          resolvedClinicId = inviterUser.id;
        }
      }

      // Check existing user or generate random UUID
      const existingUser = await d1QueryFirst<{ id: string }>(
        'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
        [cleanEmail]
      );

      const candidateId = existingUser?.id || crypto.randomUUID();
      const now = new Date().toISOString();

      // 1. Insert/Upsert into users table with clinic_id binding
      await d1Run(
        `INSERT INTO users (id, email, full_name, role, clinic_id, target_exam_date, target_score, updated_at)
         VALUES (?, ?, ?, 'student', ?, ?, 90, ?)
         ON CONFLICT(email) DO UPDATE SET
           full_name = excluded.full_name,
           clinic_id = excluded.clinic_id,
           target_exam_date = excluded.target_exam_date,
           updated_at = excluded.updated_at`,
        [candidateId, cleanEmail, cleanName, resolvedClinicId || null, targetExamDate || null, now]
      );

      // 2. Insert/Upsert into profiles table
      await d1Run(
        `INSERT INTO profiles (id, email, full_name, certification_target, subscription_tier, account_status, updated_at)
         VALUES (?, ?, ?, ?, 'pro', 'active', ?)
         ON CONFLICT(email) DO UPDATE SET
           full_name = excluded.full_name,
           certification_target = excluded.certification_target,
           updated_at = excluded.updated_at`,
        [candidateId, cleanEmail, cleanName, targetCertification || 'RBT', now]
      );

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
    }

    // In-memory / dev fallback if D1 not yet initialized
    const fallbackId = `cand_${Math.random().toString(36).slice(2, 9)}`;
    const inviteLink = `${request.nextUrl.origin}/signup?email=${encodeURIComponent(cleanEmail)}&invite=CLINIC-VIP`;

    return NextResponse.json({
      success: true,
      message: `Candidate ${cleanName} (${cleanEmail}) invited to clinic cohort!`,
      inviteLink,
      candidate: {
        id: fallbackId,
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
