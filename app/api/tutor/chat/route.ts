import { NextRequest, NextResponse } from 'next/server';
import { processAITutorMessage } from '@/lib/ai-prompt-manager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userQuery, history, mode, certification } = body;

    if (!userQuery) {
      return NextResponse.json({ error: 'userQuery string is required' }, { status: 400 });
    }

    const aiMessage = await processAITutorMessage(
      userQuery,
      history || [],
      mode || 'socratic_mentor',
      certification || 'RBT'
    );

    return NextResponse.json({ success: true, message: aiMessage });
  } catch (error: any) {
    return NextResponse.json({ error: 'AI Tutor processing failed', message: error.message }, { status: 500 });
  }
}
