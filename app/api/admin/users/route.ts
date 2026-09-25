import { NextRequest, NextResponse } from 'next/server';
import { d1Query, isD1Available } from '@/lib/d1';
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

    const realUsersMap = new Map<string, any>();

    // 1. Fetch users from Cloudflare D1 users table
    if (isD1Available()) {
      try {
        const rows = await d1Query<any>('SELECT * FROM users ORDER BY created_at DESC LIMIT 100');
        if (Array.isArray(rows)) {
          rows.forEach((u) => {
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
        console.error('Error fetching users from Cloudflare D1:', err);
      }
    }

    // 2. Ensure all designated admins are present
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
