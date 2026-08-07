import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, role, subscriptionTier, status } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

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
        .eq('email', targetEmail);
    }

    // 2. Update public.users table
    if (role) {
      await adminSupabase
        .from('users')
        .update({
          role: role,
          updated_at: new Date().toISOString(),
        })
        .eq('email', targetEmail);
    }

    return NextResponse.json({
      success: true,
      message: `User ${targetEmail} profile updated successfully in Supabase DB!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user profile' }, { status: 500 });
  }
}
