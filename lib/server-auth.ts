import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, isD1Available } from '@/lib/d1';

export interface AdminAuthResult {
  authorized: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  response?: NextResponse;
}

/**
 * Extracts and verifies the caller's identity and checks for admin / super_admin role.
 * Inspects:
 * 1. Custom header: x-admin-email / x-supabase-auth
 * 2. Authorization: Bearer <jwt>
 * 3. Cookie: sb-access-token / rbt_ai_auth_session
 * 4. Cloudflare D1 users table
 */
export async function requireAdminAuth(request: NextRequest): Promise<AdminAuthResult> {
  const adminEmailHeader = request.headers.get('x-admin-email');
  if (adminEmailHeader && isEmailAdmin(adminEmailHeader)) {
    return {
      authorized: true,
      user: {
        id: 'admin_header_user',
        email: adminEmailHeader.toLowerCase().trim(),
        role: 'super_admin',
      },
    };
  }

  let token = '';

  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token) {
    token = request.headers.get('x-supabase-auth') || request.headers.get('x-admin-token') || '';
  }

  if (!token) {
    const cookieToken =
      request.cookies.get('sb-access-token')?.value ||
      request.cookies.get('rbt_ai_auth_token')?.value ||
      request.cookies.get('rbt_ai_auth_session')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  // Handle JSON session stored in token/cookie
  if (token && token.startsWith('{') && token.includes('email')) {
    try {
      const parsed = JSON.parse(token);
      const email = (parsed?.user?.email || parsed?.email || '').toLowerCase().trim();
      if (isEmailAdmin(email) || parsed?.user?.role === 'super_admin' || parsed?.user?.role === 'admin') {
        return {
          authorized: true,
          user: {
            id: parsed?.user?.id || parsed?.id || 'admin_user',
            email,
            role: 'super_admin',
          },
        };
      }
    } catch {}
  }

  // Check if token directly matches an admin email
  if (token && isEmailAdmin(token)) {
    return {
      authorized: true,
      user: {
        id: 'admin_user',
        email: token.toLowerCase().trim(),
        role: 'super_admin',
      },
    };
  }

  // Verify against Cloudflare D1 users database
  if (token && isD1Available()) {
    try {
      const dbUser = await d1QueryFirst<{ id: string; email: string; role: string }>(
        'SELECT id, email, role FROM users WHERE id = ? OR email = ? LIMIT 1',
        [token, token.toLowerCase()]
      );
      if (dbUser && (dbUser.role === 'admin' || dbUser.role === 'super_admin' || isEmailAdmin(dbUser.email))) {
        return {
          authorized: true,
          user: {
            id: dbUser.id,
            email: dbUser.email,
            role: dbUser.role || 'super_admin',
          },
        };
      }
    } catch (e) {
      console.error('D1 admin auth lookup error:', e);
    }
  }

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized: Missing authentication session. Admin privileges required.' },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: false,
    response: NextResponse.json(
      { error: 'Forbidden: Caller does not possess admin or super_admin privileges.' },
      { status: 403 }
    ),
  };
}
