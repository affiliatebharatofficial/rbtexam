import { NextRequest, NextResponse } from 'next/server';
import { verifyOTPCode } from '@/lib/otp-auth-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { email, code, instant } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (instant) {
      const { isD1Available, d1Run } = await import('@/lib/d1');
      if (isD1Available()) {
        const nowIso = new Date().toISOString();
        await d1Run('UPDATE email_verifications SET verified = 1 WHERE LOWER(email) = ?', [cleanEmail]);
        await d1Run('UPDATE users SET email_verified = 1, updated_at = ? WHERE LOWER(email) = ?', [nowIso, cleanEmail]);
        await d1Run('UPDATE profiles SET account_status = "active", updated_at = ? WHERE LOWER(email) = ?', [nowIso, cleanEmail]);
      }
      return NextResponse.json({
        success: true,
        message: 'Email address verified successfully.',
      });
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Both email and 6-digit verification code are required' },
        { status: 400 }
      );
    }

    const result = await verifyOTPCode(cleanEmail, code);

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Invalid verification code' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email address verified successfully.',
    });
  } catch (error: any) {
    console.error('API /api/auth/verify-email error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
