import { NextResponse } from 'next/server';
import { getWorkforceJobs, getWorkforceMetricsSummary } from '@/lib/ai-workforce-engine';

export async function GET() {
  try {
    const jobs = getWorkforceJobs();
    const metrics = getWorkforceMetricsSummary();
    return NextResponse.json({ success: true, metrics, jobs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch workforce queue' }, { status: 500 });
  }
}
