import { NextRequest, NextResponse } from 'next/server';
import { executeRollback, getRollbackLogs } from '@/lib/release-management-engine';
import { RollbackType } from '@/types/release-management';

export async function GET() {
  return NextResponse.json({
    success: true,
    logs: getRollbackLogs(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetVersion, rollbackType, reason, executedBy } = body;

    if (!targetVersion || !reason) {
      return NextResponse.json(
        { success: false, error: 'targetVersion and reason are required' },
        { status: 400 }
      );
    }

    const record = executeRollback(
      targetVersion,
      (rollbackType as RollbackType) || 'full_release',
      reason,
      executedBy
    );

    return NextResponse.json({
      success: true,
      message: `Rollback to v${targetVersion} executed successfully.`,
      rollback: record,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Rollback execution failed' },
      { status: 500 }
    );
  }
}
