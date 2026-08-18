import { NextRequest, NextResponse } from 'next/server';
import {
  updateServerPlanAsync,
  deleteServerPlanAsync,
} from '@/lib/subscription-plans-server';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as any;

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
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { id } = await params;
    const success = await deleteServerPlanAsync(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete plan', message: error.message }, { status: 500 });
  }
}
