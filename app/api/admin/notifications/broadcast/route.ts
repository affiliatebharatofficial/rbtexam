import { NextRequest, NextResponse } from 'next/server';
import { broadcastNotificationCampaign } from '@/lib/notification-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { title, message, segment } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'title and message are required' }, { status: 400 });
    }

    const result = broadcastNotificationCampaign(title, message, segment || 'all');
    return NextResponse.json({ success: true, recipientsCount: result.count });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to dispatch broadcast campaign' }, { status: 500 });
  }
}
