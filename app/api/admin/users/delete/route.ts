import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { userId, email } = (await request.json()) as any;

    if (!userId && !email) {
      return NextResponse.json({ error: 'User ID or Email is required for deletion' }, { status: 400 });
    }

    const adminSupabase = getSupabaseAdminClient();
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    // 1. Find the exact user profile and auth ID
    let targetUserId = userId;
    let targetEmail = cleanEmail;

    if (cleanEmail) {
      const { data: prof } = await adminSupabase
        .from('profiles')
        .select('id, email')
        .eq('email', cleanEmail)
        .limit(1)
        .maybeSingle();

      if (prof) {
        targetUserId = prof.id;
        targetEmail = prof.email;
      }
    } else if (userId) {
      const { data: prof } = await adminSupabase
        .from('profiles')
        .select('id, email')
        .eq('id', userId)
        .limit(1)
        .maybeSingle();

      if (prof) {
        targetEmail = prof.email;
      }
    }

    // 2. Delete from Supabase PostgreSQL tables
    if (targetUserId) {
      await Promise.allSettled([
        adminSupabase.from('subscriptions').delete().eq('user_id', targetUserId),
        adminSupabase.from('exam_sessions').delete().eq('user_id', targetUserId),
        adminSupabase.from('profiles').delete().eq('id', targetUserId),
        adminSupabase.from('users').delete().eq('id', targetUserId),
      ]);
    }

    if (targetEmail) {
      await Promise.allSettled([
        adminSupabase.from('profiles').delete().eq('email', targetEmail),
        adminSupabase.from('users').delete().eq('email', targetEmail),
      ]);
    }

    // 3. Delete from Supabase Auth so candidate can re-register freshly
    if (adminSupabase.auth?.admin && targetUserId) {
      try {
        await adminSupabase.auth.admin.deleteUser(targetUserId);
      } catch (authDelErr) {
        console.warn('Supabase Auth deleteUser notice:', authDelErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `User ${targetEmail || targetUserId} deleted completely from database and authentication.`,
      deletedUserId: targetUserId,
      deletedEmail: targetEmail,
    });
  } catch (error: any) {
    console.error('API /api/admin/users/delete error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete user account' }, { status: 500 });
  }
}
