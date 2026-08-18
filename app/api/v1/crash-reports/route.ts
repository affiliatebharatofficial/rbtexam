import { NextRequest, NextResponse } from 'next/server';
import { logCrashReport, getCrashReports } from '@/lib/release-management-engine';

export async function GET() {
  return NextResponse.json({
    success: true,
    reports: getCrashReports(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any;
    const { errorName, errorMessage, stackTrace, severity, environment, metadata } = body;

    if (!errorName || !errorMessage) {
      return NextResponse.json(
        { success: false, error: 'errorName and errorMessage required' },
        { status: 400 }
      );
    }

    const report = logCrashReport({
      errorName,
      errorMessage,
      stackTrace,
      severity: severity || 'error',
      environment: environment || 'production',
      metadata,
    });

    return NextResponse.json({
      success: true,
      reportId: report.id,
      message: 'Crash report logged successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to log crash report' },
      { status: 500 }
    );
  }
}
