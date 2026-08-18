import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { isEmailAdmin } from '@/context/auth-context';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

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
 * 1. Authorization: Bearer <jwt>
 * 2. Cookie: sb-access-token / rbt_ai_auth_session
 * 3. Custom header: x-supabase-auth
 */
export async function requireAdminAuth(request: NextRequest): Promise<AdminAuthResult> {
  let token = '';

  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token) {
    token = request.headers.get('x-supabase-auth') || '';
  }

  if (!token) {
    const cookieToken = request.cookies.get('sb-access-token')?.value || request.cookies.get('rbt_ai_auth_token')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized: Missing authentication token. Admin privileges required.' },
        { status: 401 }
      ),
    };
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized: Invalid or expired authentication session.' },
          { status: 401 }
        ),
      };
    }

    const user = userData.user;
    const email = (user.email || '').toLowerCase().trim();
    const appRole = user.app_metadata?.role;
    const userRole = user.user_metadata?.role;

    const isExplicitAdmin = isEmailAdmin(email) || appRole === 'admin' || appRole === 'super_admin' || userRole === 'admin' || userRole === 'super_admin';

    if (isExplicitAdmin) {
      return {
        authorized: true,
        user: {
          id: user.id,
          email,
          role: appRole || userRole || 'super_admin',
        },
      };
    }

    // Check public.users or public.profiles table using service role client if configured
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceRoleKey) {
      const adminClient = createClient(SUPABASE_URL, serviceRoleKey, {
        auth: { persistSession: false },
      });

      const { data: profile } = await adminClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profile && (profile.role === 'admin' || profile.role === 'super_admin')) {
        return {
          authorized: true,
          user: {
            id: user.id,
            email,
            role: profile.role,
          },
        };
      }

      const { data: dbUser } = await adminClient
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (dbUser && (dbUser.role === 'admin' || dbUser.role === 'super_admin')) {
        return {
          authorized: true,
          user: {
            id: user.id,
            email,
            role: dbUser.role,
          },
        };
      }
    }

    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Forbidden: Caller does not possess admin or super_admin privileges.' },
        { status: 403 }
      ),
    };
  } catch (err: any) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Internal server error during authentication verification.', details: err.message },
        { status: 500 }
      ),
    };
  }
}
