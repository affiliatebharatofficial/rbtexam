import { NextRequest, NextResponse } from 'next/server';
import { processAITutorMessage } from '@/lib/ai-prompt-manager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const { userQuery, history, mode, certification, apiKey, provider, userName, userEmail, userProfile, language } = body;

    if (!userQuery || typeof userQuery !== 'string' || !userQuery.trim()) {
      return NextResponse.json({ error: 'userQuery string is required' }, { status: 400 });
    }

    const profileToPass = userProfile || (userName || userEmail ? { fullName: userName, email: userEmail } : null);

    const { message, providerUsed, modelUsed, isLive } = await processAITutorMessage(
      userQuery,
      history || [],
      mode || 'socratic_mentor',
      certification || 'RBT',
      apiKey,
      provider || 'auto',
      profileToPass,
      language || 'en'
    );

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message,
      providerUsed,
      modelUsed,
      isLive,
      latencyMs,
    });
  } catch (error: any) {
    console.error('AI Tutor Route Error:', error);
    return NextResponse.json(
      { error: 'AI Tutor processing failed', message: error.message },
      { status: 500 }
    );
  }
}
