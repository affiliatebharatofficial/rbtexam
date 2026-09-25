import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { id, email, fullName, role, targetExamDate, subscriptionTier, accountStatus, avatarUrl } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName || cleanEmail.split('@')[0];
    const isAdmin = isEmailAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'super_admin' : (role || 'student');
    const assignedTier = isAdmin ? 'enterprise' : (subscriptionTier || 'pro');
    const status = accountStatus || 'active';
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    let userId = id;

    if (isD1Available()) {
      // 1. Check existing user
      if (!userId) {
        const existing = await d1QueryFirst<{ id: string }>(
          'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
          [cleanEmail]
        );
        if (existing?.id) {
          userId = existing.id;
        }
      }

      if (!userId) {
        userId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Math.random().toString(36).substring(2, 11)}`;
      }

      // 2. Upsert into users table
      await d1Run(
        `INSERT INTO users (id, email, full_name, role, target_exam_date, target_score, updated_at)
         VALUES (?, ?, ?, ?, ?, 90, ?)
         ON CONFLICT(email) DO UPDATE SET
           full_name = excluded.full_name,
           role = CASE WHEN users.role = 'super_admin' OR excluded.role = 'super_admin' THEN 'super_admin' ELSE excluded.role END,
           target_exam_date = COALESCE(excluded.target_exam_date, users.target_exam_date),
           updated_at = excluded.updated_at`,
        [userId, cleanEmail, cleanName, assignedRole, targetExamDate || null, now]
      );

      // 3. Upsert into profiles table
      await d1Run(
        `INSERT INTO profiles (id, email, full_name, avatar_url, certification_target, subscription_tier, account_status, trial_ends_at, updated_at)
         VALUES (?, ?, ?, ?, 'RBT', ?, ?, ?, ?)
         ON CONFLICT(email) DO UPDATE SET
           full_name = excluded.full_name,
           avatar_url = COALESCE(excluded.avatar_url, profiles.avatar_url),
           subscription_tier = excluded.subscription_tier,
           account_status = excluded.account_status,
           trial_ends_at = excluded.trial_ends_at,
           updated_at = excluded.updated_at`,
        [userId, cleanEmail, cleanName, avatarUrl || '', assignedTier, status, trialEndsAt, now]
      );
    } else {
      if (!userId) {
        userId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Math.random().toString(36).substring(2, 11)}`;
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: cleanName,
        role: assignedRole,
        subscriptionTier: assignedTier,
        trialEndsAt: trialEndsAt,
        status: status,
        createdAt: now,
      },
    });
  } catch (error: any) {
    console.error('API /api/auth/register error:', error);
    return NextResponse.json({ error: error.message || 'Failed to register user centrally' }, { status: 500 });
  }
}
