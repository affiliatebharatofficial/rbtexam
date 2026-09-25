import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';
import { hashPassword, verifyPassword } from '@/lib/crypto-auth';

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
      return NextResponse.json({
        success: true,
        user: {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          email: cleanEmail,
          fullName: cleanEmail.split('@')[0],
          role: isEmailAdmin(cleanEmail) ? 'super_admin' : 'student',
          emailVerified: true,
          accountStatus: 'active',
        },
      });
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
    if (dbUser.password_hash) {
      const isValid = await verifyPassword(password, dbUser.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Incorrect password. Please verify your credentials or reset your password.' },
          { status: 401 }
        );
      }
    } else {
      // First login with password after registration or password not yet stored: save hash
      const newHash = await hashPassword(password);
      await d1Run(
        'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?',
        [newHash, new Date().toISOString(), dbUser.id]
      );
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

    return NextResponse.json({
      success: true,
      user: userProfile,
    });
  } catch (error: any) {
    console.error('API /api/auth/login error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
