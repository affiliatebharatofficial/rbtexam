import { NextRequest, NextResponse } from 'next/server';
import {
  loadServerSubscriptionPlansAsync,
  createServerPlanAsync,
} from '@/lib/subscription-plans-server';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const plans = await loadServerSubscriptionPlansAsync();
    return NextResponse.json({ success: true, plans, total: plans.length });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch subscription plans', message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { name, description, priceMonthly, priceAnnual, badge, features, isPopular, isActive, buttonText, targetAudience } = body;

    if (!name || priceMonthly === undefined) {
      return NextResponse.json({ error: 'Plan name and priceMonthly are mandatory' }, { status: 400 });
    }

    const createdPlan = await createServerPlanAsync({
      name,
      description: description || '',
      priceMonthly: Number(priceMonthly),
      priceAnnual: priceAnnual !== undefined ? Number(priceAnnual) : Number(priceMonthly),
      badge: badge || '',
      targetAudience: targetAudience || '',
      buttonText: buttonText || 'Get Started',
      features: Array.isArray(features) ? features : [],
      isPopular: Boolean(isPopular),
      isActive: isActive !== false,
    });

    return NextResponse.json({ success: true, plan: createdPlan }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create subscription plan', message: error.message }, { status: 500 });
  }
}
