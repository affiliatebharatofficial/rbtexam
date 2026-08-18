import { NextRequest, NextResponse } from 'next/server';
import { getUserInAppNotifications, markNotificationAsRead } from '@/lib/notification-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default_user';

    const notifications = getUserInAppNotifications(userId);
    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { notificationId } = body;

    if (!notificationId) {
      return NextResponse.json({ error: 'notificationId is required' }, { status: 400 });
    }

    const updated = markNotificationAsRead(notificationId);
    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update notification status' }, { status: 500 });
  }
}
