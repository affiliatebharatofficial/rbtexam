import { NextResponse } from 'next/server';
import { getAPIMetricsSummary } from '@/lib/api-gateway';

export async function GET() {
  const metrics = getAPIMetricsSummary();

  return NextResponse.json({
    status: 'healthy',
    apiVersion: 'v1.0.0',
    gateway: 'RBT Practice Questions Enterprise Gateway',
    timestamp: new Date().toISOString(),
    metrics,
  });
}
