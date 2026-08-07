import { NextResponse } from 'next/server';
import { getPlatformHealthReport } from '@/lib/health-engine';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/health
 * Public health check endpoint. Returns full service status.
 * Used by: Uptime monitors (UptimeRobot, Checkly), CI/CD deployment gates,
 *          Admin Infrastructure Dashboard.
 */
export async function GET() {
  try {
    const report = await getPlatformHealthReport();
    const statusCode = report.overall === 'healthy' ? 200 : report.overall === 'degraded' ? 207 : 503;
    return NextResponse.json(report, { status: statusCode });
  } catch (error: any) {
    return NextResponse.json(
      { overall: 'unhealthy', message: 'Health check failed', error: error.message },
      { status: 503 }
    );
  }
}
