import { NextRequest, NextResponse } from 'next/server';
import { getSeedStatus, seedDemoData, clearDemoData, canSeedDemoData } from '@/lib/dev-seed-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const status = getSeedStatus();
    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch seed status' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    if (!canSeedDemoData()) {
      return NextResponse.json(
        { error: 'CRITICAL SECURITY VIOLATION: Seeding sample data is strictly prohibited in production environments.' },
        { status: 403 }
      );
    }

    const body = (await request.json()) as any;
    const { action } = body;

    if (action === 'seed') {
      const res = seedDemoData();
      return NextResponse.json(res);
    }

    if (action === 'clear') {
      const res = clearDemoData();
      return NextResponse.json(res);
    }

    return NextResponse.json({ error: 'Invalid action. Must be "seed" or "clear".' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Seed operation failed', details: error.message }, { status: 500 });
  }
}
