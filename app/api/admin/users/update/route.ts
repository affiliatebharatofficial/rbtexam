import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { email, role, subscriptionTier, status } = (await request.json()) as any;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const adminSupabase = getSupabaseAdminClient();
    const targetEmail = email.toLowerCase().trim();

    // 1. Update public.profiles table
    if (subscriptionTier || status) {
      await adminSupabase
        .from('profiles')
        .update({
          ...(subscriptionTier && { subscription_tier: subscriptionTier }),
          ...(status && { account_status: status }),
          updated_at: new Date().toISOString(),
        })
        .ilike('email', targetEmail);
    }

    // 2. Update public.users table
    if (role) {
      await adminSupabase
        .from('users')
        .update({
          role: role,
          updated_at: new Date().toISOString(),
        })
        .ilike('email', targetEmail);
    }

    return NextResponse.json({
      success: true,
      message: `User ${targetEmail} profile updated successfully in Supabase DB!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user profile' }, { status: 500 });
  }
}
