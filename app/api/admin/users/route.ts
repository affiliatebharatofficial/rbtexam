import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50d29taHRma3VhenFndG5rZmZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA1NjEzMywiZXhwIjoyMTAxNjMyMTMzfQ.OEKK73cH84lpMAr9ma2MMdzUeq5nI8IsLZVtBT2qHxQ';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    let realUsersMap = new Map<string, any>();

    // 1. Fetch all users directly from Supabase auth.users via Admin API
    try {
      const { data: authData } = await adminSupabase.auth.admin.listUsers();
      if (authData?.users && Array.isArray(authData.users)) {
        authData.users.forEach((u: any) => {
          if (u.email) {
            const emailLower = u.email.toLowerCase().trim();
            const fullName = u.user_metadata?.full_name || u.user_metadata?.name || emailLower.split('@')[0];
            const isAdmin = emailLower === 'jobpegyan@gmail.com' || u.app_metadata?.role === 'super_admin';
            realUsersMap.set(emailLower, {
              id: u.id,
              email: emailLower,
              fullName,
              role: isAdmin ? 'super_admin' : 'student',
              subscriptionTier: isAdmin ? 'enterprise' : 'free',
              status: 'active',
              joinedAt: u.created_at || new Date().toISOString(),
              lastLoginAt: u.last_sign_in_at || u.updated_at || new Date().toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.error('Error fetching Supabase auth admin users:', err);
    }

    // 2. Fetch profiles from public.profiles table (overrides with rich profile data)
    try {
      const { data: profiles } = await adminSupabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profiles && Array.isArray(profiles)) {
        profiles.forEach((p: any) => {
          if (p.email) {
            const emailLower = p.email.toLowerCase().trim();
            const existing = realUsersMap.get(emailLower) || {};
            const isAdmin = emailLower === 'jobpegyan@gmail.com' || p.role === 'admin' || p.role === 'super_admin';
            realUsersMap.set(emailLower, {
              id: p.id || existing.id || `usr_${Math.random().toString(36).substring(2)}`,
              email: emailLower,
              fullName: p.full_name || existing.fullName || emailLower.split('@')[0],
              role: isAdmin ? 'super_admin' : (p.role || existing.role || 'student'),
              subscriptionTier: p.subscription_tier || existing.subscriptionTier || 'pro',
              status: p.account_status || existing.status || 'active',
              joinedAt: p.created_at || existing.joinedAt || new Date().toISOString(),
              lastLoginAt: p.updated_at || existing.lastLoginAt || new Date().toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.error('Error fetching profiles in /api/admin/users:', err);
    }

    // 3. Fetch users from public.users table
    try {
      const { data: users } = await adminSupabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (users && Array.isArray(users)) {
        users.forEach((u: any) => {
          if (u.email) {
            const emailLower = u.email.toLowerCase().trim();
            const existing = realUsersMap.get(emailLower) || {};
            const isAdmin = emailLower === 'jobpegyan@gmail.com' || u.role === 'admin' || u.role === 'super_admin';
            realUsersMap.set(emailLower, {
              id: u.id || existing.id || `usr_${Math.random().toString(36).substring(2)}`,
              email: emailLower,
              fullName: u.full_name || existing.fullName || emailLower.split('@')[0],
              role: isAdmin ? 'super_admin' : (u.role || existing.role || 'student'),
              subscriptionTier: existing.subscriptionTier || 'pro',
              status: existing.status || 'active',
              joinedAt: u.created_at || existing.joinedAt || new Date().toISOString(),
              lastLoginAt: u.updated_at || existing.lastLoginAt || new Date().toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.error('Error fetching users table in /api/admin/users:', err);
    }

    // Always guarantee primary owner jobpegyan@gmail.com is present
    if (!realUsersMap.has('jobpegyan@gmail.com')) {
      realUsersMap.set('jobpegyan@gmail.com', {
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

    const realUsers = Array.from(realUsersMap.values());

    return NextResponse.json({
      success: true,
      users: realUsers,
      totalCount: realUsers.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch user accounts' }, { status: 500 });
  }
}
