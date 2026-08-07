import { NextResponse } from 'next/server';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-engine';

export async function GET() {
  return NextResponse.json(SUBSCRIPTION_PLANS);
}
