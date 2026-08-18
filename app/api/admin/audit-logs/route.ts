import { NextRequest, NextResponse } from 'next/server';
import { getSystemAuditLogs } from '@/lib/platform-config';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const logs = getSystemAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}
