import { NextRequest, NextResponse } from 'next/server';
import { broadcastNotificationCampaign } from '@/lib/notification-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
