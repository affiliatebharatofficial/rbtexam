import { NextRequest, NextResponse } from 'next/server';
import { createLemonSqueezyCheckout } from '@/lib/lemon-squeezy';
import { isFreeAccessActive, isMonetizationEnabled } from '@/lib/platform-config';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { variantId, userEmail, userName, tier, billingInterval } = body;

    // If Free Access Mode is active or Monetization is disabled by Admin
    if (isFreeAccessActive() || !isMonetizationEnabled()) {
      return NextResponse.json({
        success: true,
        freeMode: true,
        message: '100% Free Access Mode is currently active! No payment required.',
        checkoutUrl: '/exam',
      });
    }

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required for checkout' }, { status: 400 });
    }

    // Default variant IDs for Lemon Squeezy plans
    const defaultVariant = billingInterval === 'yearly' ? 'v_yearly_pro_990' : 'v_monthly_pro_290';
    const targetVariantId = variantId || defaultVariant;

    const res = await createLemonSqueezyCheckout({
      variantId: targetVariantId,
      userEmail,
      userName: userName || 'RBT Candidate',
      customData: { tier: tier || 'pro', billingInterval: billingInterval || 'monthly' },
    });

    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, checkoutUrl: res.checkoutUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
