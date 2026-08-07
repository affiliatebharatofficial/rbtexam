import { NextRequest, NextResponse } from 'next/server';
import { getAllFeatureFlags, evaluateFeatureFlag, upsertFeatureFlag } from '@/lib/release-management-engine';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const evalKey = searchParams.get('eval');
    const userId = searchParams.get('userId') || undefined;
    const role = searchParams.get('role') || undefined;
    const country = searchParams.get('country') || undefined;

    if (evalKey) {
      const isEnabled = evaluateFeatureFlag(evalKey, { userId, role, country });
      return NextResponse.json({
        success: true,
        flagKey: evalKey,
        isEnabled,
      });
    }

    const flags = getAllFeatureFlags();
    return NextResponse.json({
      success: true,
      count: flags.length,
      data: flags,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch feature flags' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.flagKey) {
      return NextResponse.json({ success: false, error: 'flagKey is required' }, { status: 400 });
    }

    const updated = upsertFeatureFlag(body);
    return NextResponse.json({
      success: true,
      message: `Feature flag '${updated.flagKey}' updated successfully.`,
      flag: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update feature flag' },
      { status: 500 }
    );
  }
}
