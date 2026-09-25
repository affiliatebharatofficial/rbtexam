import { NextRequest, NextResponse } from 'next/server';
import { d1Run, isD1Available } from '@/lib/d1';
import { requireAdminAuth } from '@/lib/server-auth';
import { isEmailAdmin } from '@/lib/admin-whitelist';

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

    const cleanEmail = email ? email.toLowerCase().trim() : '';

    if (cleanEmail && isEmailAdmin(cleanEmail)) {
      return NextResponse.json({ error: 'Protected administrator accounts cannot be deleted.' }, { status: 403 });
    }

    if (isD1Available()) {
      if (cleanEmail) {
        await d1Run('DELETE FROM profiles WHERE user_id IN (SELECT id FROM users WHERE email = ?)', [cleanEmail]);
        await d1Run('DELETE FROM exam_sessions WHERE user_id IN (SELECT id FROM users WHERE email = ?)', [cleanEmail]);
        await d1Run('DELETE FROM users WHERE email = ?', [cleanEmail]);
      }
      if (userId) {
        await d1Run('DELETE FROM profiles WHERE user_id = ? OR id = ?', [userId, userId]);
        await d1Run('DELETE FROM exam_sessions WHERE user_id = ?', [userId]);
        await d1Run('DELETE FROM users WHERE id = ?', [userId]);
      }
    }

    return NextResponse.json({
      success: true,
      message: `User account (${cleanEmail || userId}) permanently deleted from Cloudflare D1.`,
    });
  } catch (error: any) {
    console.error('API /api/admin/users/delete error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete user account' }, { status: 500 });
  }
}
