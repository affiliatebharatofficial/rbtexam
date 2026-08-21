import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/server-auth';
import { isEmailAdmin } from '@/lib/admin-whitelist';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminAuth(request);
    if (!auth.authorized) {
      return auth.response!;
    }

    const adminSupabase = getSupabaseAdminClient();
    const realUsersMap = new Map<string, any>();

    // 1. Fetch profiles from public.profiles table
    try {
      const { data: profiles, error: profErr } = await adminSupabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!profErr && profiles && Array.isArray(profiles)) {
        profiles.forEach((p: any) => {
          if (p.email) {
            const emailLower = p.email.toLowerCase().trim();
            const isAdmin = isEmailAdmin(emailLower) || p.role === 'admin' || p.role === 'super_admin';
            realUsersMap.set(emailLower, {
              id: p.id || `usr_${Math.random().toString(36).substring(2)}`,
              email: emailLower,
              fullName: p.full_name || emailLower.split('@')[0],
              role: isAdmin ? 'super_admin' : (p.role || 'student'),
              subscriptionTier: isAdmin ? 'enterprise' : (p.subscription_tier || 'pro'),
              status: p.account_status || 'active',
              joinedAt: p.created_at || new Date().toISOString(),
              lastLoginAt: p.updated_at || new Date().toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.error('Error fetching profiles in /api/admin/users:', err);
    }

    // 2. Fallback to public.users table if profiles was empty
    if (realUsersMap.size === 0) {
      try {
        const { data: users, error: usersErr } = await adminSupabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (!usersErr && users && Array.isArray(users)) {
          users.forEach((u: any) => {
            if (u.email) {
              const emailLower = u.email.toLowerCase().trim();
              const isAdmin = isEmailAdmin(emailLower) || u.role === 'admin' || u.role === 'super_admin';
              realUsersMap.set(emailLower, {
                id: u.id || `usr_${Math.random().toString(36).substring(2)}`,
                email: emailLower,
                fullName: u.full_name || emailLower.split('@')[0],
                role: isAdmin ? 'super_admin' : (u.role || 'student'),
                subscriptionTier: isAdmin ? 'enterprise' : 'pro',
                status: 'active',
                joinedAt: u.created_at || new Date().toISOString(),
                lastLoginAt: u.updated_at || new Date().toISOString(),
              });
            }
          });
        }
      } catch (err) {
        console.error('Error fetching users table in /api/admin/users:', err);
      }
    }

    // Ensure all designated admins are present
    const ADMIN_ACCOUNTS = [
      { email: 'jobpegyan@gmail.com', name: 'Jobpe gyan' },
      { email: 'manorhub533@gmail.com', name: 'FK Digital Media (Admin)' },
      { email: 'affiliatebharatofficial@gmail.com', name: 'Affiliate Bharat (Admin)' },
    ];

    ADMIN_ACCOUNTS.forEach(({ email, name }) => {
      const existing = realUsersMap.get(email);
      if (existing) {
        existing.role = 'super_admin';
        existing.subscriptionTier = 'enterprise';
      } else {
        realUsersMap.set(email, {
          id: `usr_admin_${email.split('@')[0]}`,
          email,
          fullName: name,
          role: 'super_admin',
          subscriptionTier: 'enterprise',
          status: 'active',
          joinedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        });
      }
    });

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
