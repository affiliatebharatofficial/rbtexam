import { NextRequest, NextResponse } from 'next/server';
import { getPlatformConfig, updatePlatformConfig } from '@/lib/platform-config';

export async function GET() {
  try {
    const config = getPlatformConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch platform configuration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, updatedBy } = body;

    if (!key) {
      return NextResponse.json({ error: 'Setting key is required' }, { status: 400 });
    }

    const result = updatePlatformConfig(key, value, updatedBy || 'Super Admin');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update platform setting' }, { status: 500 });
  }
}
