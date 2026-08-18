import { NextRequest, NextResponse } from 'next/server';
import { trackAnalyticsEvent } from '@/lib/analytics-engine';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { eventName, category, payload, userId } = body;

    if (!eventName || !category) {
      return NextResponse.json({ error: 'eventName and category are required' }, { status: 400 });
    }

    const event = trackAnalyticsEvent(eventName, category, payload || {}, userId);
    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to record analytics event' }, { status: 500 });
  }
}
