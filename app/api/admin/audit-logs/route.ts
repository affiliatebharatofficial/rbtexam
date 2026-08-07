import { NextResponse } from 'next/server';
import { getSystemAuditLogs } from '@/lib/platform-config';

export async function GET() {
  try {
    const logs = getSystemAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}
