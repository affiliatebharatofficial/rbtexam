import { NextRequest, NextResponse } from 'next/server';
import {
  updateServerPlanAsync,
  deleteServerPlanAsync,
} from '@/lib/subscription-plans-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateServerPlanAsync(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, plan: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update plan', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteServerPlanAsync(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete plan', message: error.message }, { status: 500 });
  }
}
