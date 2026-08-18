import { NextRequest, NextResponse } from 'next/server';
import { runPreLaunchValidation } from '@/lib/release-management-engine';
import { ReleaseEnvironment } from '@/types/release-management';

export async function POST(req: NextRequest) {
  try {
    const body = ((await req.json().catch(() => ({}))) || {}) as any;
    const env = (body.environment as ReleaseEnvironment) || 'production';

    const report = await runPreLaunchValidation(env);

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Validation execution failed' },
      { status: 500 }
    );
  }
}
