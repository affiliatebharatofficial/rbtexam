import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    let realUsers: any[] = [];

    // Query Supabase public.profiles table
    if (isSupabaseConfigured()) {
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching profiles in /api/admin/users:', error);
        } else if (profiles && Array.isArray(profiles)) {
          realUsers = profiles.map((p) => ({
            id: p.id,
            email: p.email,
            fullName: p.full_name || p.email?.split('@')[0] || 'Registered User',
            role: p.email?.toLowerCase() === 'jobpegyan@gmail.com' ? 'super_admin' : (p.role || 'student'),
            subscriptionTier: p.subscription_tier || 'pro',
            status: p.account_status || 'active',
            joinedAt: p.created_at || new Date().toISOString(),
            lastLoginAt: p.updated_at || new Date().toISOString(),
          }));
        }
      } catch (err) {
        console.error('Failed to query profiles:', err);
      }
    }

    // Always guarantee primary owner jobpegyan@gmail.com is included
    if (!realUsers.some((u) => u.email?.toLowerCase() === 'jobpegyan@gmail.com')) {
      realUsers.unshift({
        id: 'usr_super_jobpegyan',
        email: 'jobpegyan@gmail.com',
        fullName: 'Jobpe gyan',
        role: 'super_admin',
        subscriptionTier: 'enterprise',
        status: 'active',
        joinedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      users: realUsers,
      totalCount: realUsers.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch user accounts' }, { status: 500 });
  }
}
