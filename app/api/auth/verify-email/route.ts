import { NextRequest, NextResponse } from 'next/server';
import { verifyOTPCode } from '@/lib/otp-auth-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Both email and 6-digit verification code are required' },
        { status: 400 }
      );
    }

    const result = await verifyOTPCode(email, code);

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
