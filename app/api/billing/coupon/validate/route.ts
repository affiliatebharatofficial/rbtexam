import { NextRequest, NextResponse } from 'next/server';
import { validateAndApplyCoupon } from '@/lib/coupon-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, price, tier } = body;

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const result = validateAndApplyCoupon(code, Number(price) || 29, tier || 'pro');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to validate coupon code' }, { status: 500 });
  }
}
