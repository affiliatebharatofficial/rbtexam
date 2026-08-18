import { NextRequest, NextResponse } from 'next/server';
import { generateAIDraft } from '@/lib/ai-content-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { type, certification, topic, provider } = body;

    if (!type || !topic) {
      return NextResponse.json({ error: 'type and topic are required' }, { status: 400 });
    }

    const draft = generateAIDraft(type, certification || 'RBT', topic, provider || 'OpenAI GPT-4o');
    return NextResponse.json({ success: true, draft });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to generate AI content draft' }, { status: 500 });
  }
}
