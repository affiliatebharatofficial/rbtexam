import { NextRequest, NextResponse } from 'next/server';
import { sendOTPToEmail } from '@/lib/otp-auth-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { email, fullName } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const result = await sendOTPToEmail(email, fullName);

    if (!result.success) {
      return NextResponse.json({ error: result.error, cooldownSeconds: result.cooldownSeconds }, { status: 429 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error('API /api/auth/otp/send error:', error);
    return NextResponse.json({ error: error.message || 'Failed to dispatch verification code' }, { status: 500 });
  }
}
