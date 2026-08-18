import { NextRequest, NextResponse } from 'next/server';
import { getWorkforceJobs, getWorkforceMetricsSummary } from '@/lib/ai-workforce-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const jobs = getWorkforceJobs();
    const metrics = getWorkforceMetricsSummary();
    return NextResponse.json({ success: true, metrics, jobs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch workforce queue' }, { status: 500 });
  }
}
