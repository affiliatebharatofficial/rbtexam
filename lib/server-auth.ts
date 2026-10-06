import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, isD1Available } from '@/lib/d1';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session-token';

export interface AdminAuthResult {
  authorized: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  response?: NextResponse;
}

function collectCandidateTokens(request: NextRequest): string[] {
  const tokens: string[] = [];

  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    tokens.push(authHeader.slice('Bearer '.length).trim());
  }

  const cookieToken =
    request.cookies.get(SESSION_COOKIE_NAME)?.value ||
    request.cookies.get('rbt_ai_auth_session_token')?.value;
  if (cookieToken) tokens.push(cookieToken);

  return tokens.filter(Boolean);
}

/**
 * Verifies the caller's identity for admin / super_admin routes.
 *
 * Only server-signed session tokens (see lib/session-token.ts, issued by
 * /api/auth/login, /api/auth/register and the Google OAuth routes after
 * real credential verification) are accepted. Client-supplied identity
 * claims — an x-admin-email header, a raw email as the token, or unsigned
 * session JSON from localStorage — are NOT trusted and are rejected.
 *
 * When Cloudflare D1 is available the signed identity is also re-checked
 * against the users table, so revoking a user's admin role takes effect
 * immediately instead of waiting for the token to expire.
 */
/**
 * Returns the signed admin user for a request, or null. Unlike
 * requireAdminAuth this never produces an error response, which makes it
 * suitable for endpoints that are public for students but return extra
 * data (e.g. correct answers) to admins.
 */
export async function getAdminUser(
  request: NextRequest
): Promise<{ id: string; email: string; role: string } | null> {
  const result = await resolveAdminUser(request);
  return result;
}

async function resolveAdminUser(
  request: NextRequest
): Promise<{ id: string; email: string; role: string } | null> {
  const tokens = collectCandidateTokens(request);

  for (const token of tokens) {
    const payload = await verifySessionToken(token);
    if (!payload) continue;

    const email = payload.email.toLowerCase().trim();
    const tokenClaimsAdmin =
      isEmailAdmin(email) || payload.role === 'admin' || payload.role === 'super_admin';
    if (!tokenClaimsAdmin) continue;

    if (isD1Available()) {
      try {
        const dbUser = await d1QueryFirst<{ id: string; email: string; role: string }>(
          'SELECT id, email, role FROM users WHERE id = ? OR LOWER(email) = ? LIMIT 1',
          [payload.sub, email]
        );
        if (dbUser) {
          const dbIsAdmin =
            dbUser.role === 'admin' || dbUser.role === 'super_admin' || isEmailAdmin(dbUser.email);
          if (!dbIsAdmin) continue;
          return { id: dbUser.id, email: dbUser.email, role: dbUser.role || payload.role };
        }
      } catch (e) {
        console.error('D1 admin auth lookup error:', e);
      }
      // D1 is available but the signed user no longer exists: do not authorize.
      continue;
    }

    return { id: payload.sub, email, role: payload.role };
  }

  return null;
}

export async function requireAdminAuth(request: NextRequest): Promise<AdminAuthResult> {
  const tokens = collectCandidateTokens(request);

  if (tokens.length === 0) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized: Missing authentication session. Admin privileges required.' },
        { status: 401 }
      ),
    };
  }

  const user = await resolveAdminUser(request);
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Forbidden: Caller does not possess admin or super_admin privileges.' },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user };
}
