import { NextRequest, NextResponse } from 'next/server';
import { validateBetaInviteCode, redeemBetaInvite, submitBetaFeedback, getBetaFeedbacks } from '@/lib/release-management-engine';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (code) {
    const result = validateBetaInviteCode(code);
    return NextResponse.json({
      success: result.valid,
      message: result.message,
      invite: result.invite,
    });
  }

  return NextResponse.json({
    success: true,
    feedbacks: getBetaFeedbacks(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, code, email, feedback } = body;

    if (action === 'redeem') {
      if (!code || !email) {
        return NextResponse.json(
          { success: false, error: 'code and email required for redemption' },
          { status: 400 }
        );
      }
      const result = redeemBetaInvite(code, email);
      return NextResponse.json({
        success: result.success,
        message: result.message,
        user: result.user,
      });
    }

    if (action === 'feedback') {
      if (!feedback || !feedback.title || !feedback.description) {
        return NextResponse.json(
          { success: false, error: 'title and description required for feedback' },
          { status: 400 }
        );
      }
      const entry = submitBetaFeedback(feedback);
      return NextResponse.json({
        success: true,
        message: 'Feedback recorded successfully.',
        feedback: entry,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Beta action failed' },
      { status: 500 }
    );
  }
}
