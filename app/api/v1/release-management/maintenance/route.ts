import { NextRequest, NextResponse } from 'next/server';
import { getMaintenanceState, updateMaintenanceState } from '@/lib/release-management-engine';

export async function GET() {
  return NextResponse.json({
    success: true,
    state: getMaintenanceState(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = updateMaintenanceState(body);
    return NextResponse.json({
      success: true,
      message: 'Maintenance state updated successfully.',
      state: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update maintenance state' },
      { status: 500 }
    );
  }
}
