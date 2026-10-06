import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';
import { hashPassword, verifyPassword, needsPasswordRehash } from '@/lib/crypto-auth';
import { signSessionToken, SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/session-token';
import { secureRandomString } from '@/lib/secure-random';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (!isD1Available()) {
      // Never authenticate without the database: previously any email +
      // password was accepted here when D1 was unavailable.
      return NextResponse.json(
        { error: 'Authentication service is temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      );
    }

    // 1. Fetch user from users table
    const dbUser = await d1QueryFirst<{
      id: string;
      email: string;
      full_name: string;
      role: string;
      email_verified: number;
      password_hash: string | null;
      target_exam_date: string | null;
      target_score: number;
      readiness_score: number;
      estimated_pass_likelihood: number;
    }>('SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1', [cleanEmail]);

    if (!dbUser) {
      return NextResponse.json(
        { error: 'No account found with this email. Please create an account.' },
        { status: 404 }
      );
    }

    // 2. Verify password
    if (!dbUser.password_hash) {
      // Accounts created via Google OAuth (or without a password) must use
      // Google sign-in or the password-reset flow. Accepting whatever
      // password was typed here would let anyone take over such accounts.
      return NextResponse.json(
        { error: 'No password is set for this account. Please sign in with Google or use "Forgot password" to set one.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, dbUser.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please verify your credentials or reset your password.' },
        { status: 401 }
      );
    }

    // Transparently upgrade legacy (single SHA-256) hashes to PBKDF2.
    if (needsPasswordRehash(dbUser.password_hash)) {
      try {
        const upgradedHash = await hashPassword(password);
        await d1Run('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?', [
          upgradedHash,
          new Date().toISOString(),
          dbUser.id,
        ]);
      } catch (rehashErr) {
        console.warn('Password hash upgrade warning:', rehashErr);
      }
    }

    // 3. Fetch profile
    const dbProfile = await d1QueryFirst<{
      subscription_tier: string;
      account_status: string;
      trial_ends_at: string;
      avatar_url: string;
    }>('SELECT * FROM profiles WHERE LOWER(email) = ? LIMIT 1', [cleanEmail]);

    const isAdmin = isEmailAdmin(cleanEmail) || dbUser.role === 'admin' || dbUser.role === 'super_admin';
    const role = isAdmin ? 'super_admin' : (dbUser.role || 'student');
    const tier = isAdmin ? 'enterprise' : (dbProfile?.subscription_tier || 'pro');

    const userProfile = {
      id: dbUser.id,
      email: dbUser.email,
      fullName: dbUser.full_name || cleanEmail.split('@')[0],
      role,
      avatarUrl: dbProfile?.avatar_url || '',
      emailVerified: dbUser.email_verified === 1,
      accountStatus: dbProfile?.account_status || 'active',
      subscriptionTier: tier,
      trialEndsAt: dbProfile?.trial_ends_at || new Date(Date.now() + 7 * 86400 * 1000).toISOString(),
      targetExamDate: dbUser.target_exam_date || '',
      targetScore: dbUser.target_score || 90,
      readinessScore: dbUser.readiness_score || 0,
      estimatedPassLikelihood: dbUser.estimated_pass_likelihood || 0,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    // Issue a server-signed session token (also set as an httpOnly cookie)
    const accessToken = await signSessionToken({
      id: userProfile.id,
      email: userProfile.email,
      role: userProfile.role,
    });

    const response = NextResponse.json({
      success: true,
      user: userProfile,
      accessToken,
      sessionId: `sess_${secureRandomString(16)}`,
    });
    if (accessToken) {
      response.cookies.set(SESSION_COOKIE_NAME, accessToken, sessionCookieOptions());
    }
    return response;
  } catch (error: any) {
    console.error('API /api/auth/login error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
