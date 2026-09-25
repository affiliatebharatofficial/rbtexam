import { NextRequest, NextResponse } from 'next/server';
import { d1Run, isD1Available } from '@/lib/d1';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { email, role, full_name } = (await request.json()) as any;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const targetEmail = email.toLowerCase().trim();

    if (isD1Available()) {
      await d1Run(
        `UPDATE users SET
          role = COALESCE(?, role),
          full_name = COALESCE(?, full_name),
          updated_at = datetime('now')
        WHERE email = ?`,
        [role || null, full_name || null, targetEmail]
      );
    }

    return NextResponse.json({
      success: true,
      message: `User ${targetEmail} profile updated successfully in Cloudflare D1!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user profile' }, { status: 500 });
  }
}
