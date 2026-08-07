import { NextRequest, NextResponse } from 'next/server';
import { runDeepSystemHealthCheck } from '@/lib/release-management-engine';
import { ReleaseEnvironment } from '@/types/release-management';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const env = (searchParams.get('env') as ReleaseEnvironment) || 'production';

    const report = await runDeepSystemHealthCheck(env);

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'System health audit failed' },
      { status: 500 }
    );
  }
}
