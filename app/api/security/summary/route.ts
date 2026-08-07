import { NextResponse } from 'next/server';
import { getSecurityHealthSummary } from '@/lib/security-engine';

export async function GET() {
  try {
    const summary = getSecurityHealthSummary();
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch security summary' }, { status: 500 });
  }
}
