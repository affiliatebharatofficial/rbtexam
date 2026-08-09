import { NextRequest, NextResponse } from 'next/server';
import { loadServerSubscriptionPlansAsync } from '@/lib/subscription-plans-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const allPlans = await loadServerSubscriptionPlansAsync();
    const activePlans = allPlans.filter((p) => p.isActive);

    return NextResponse.json({ success: true, plans: activePlans });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch active plans', message: error.message }, { status: 500 });
  }
}
