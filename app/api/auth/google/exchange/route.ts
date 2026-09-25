import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';
import { getRuntimeEnv } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { code, redirectUri } = body || {};

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const clientId =
      getRuntimeEnv('GOOGLE_CLIENT_ID') ||
      getRuntimeEnv('NEXT_PUBLIC_GOOGLE_CLIENT_ID') ||
      process.env.GOOGLE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      '';

    const clientSecret =
      getRuntimeEnv('GOOGLE_CLIENT_SECRET') ||
      process.env.GOOGLE_CLIENT_SECRET ||
      '';

    if (!clientId || !clientSecret) {
      console.error('Google OAuth credentials missing on server');
      return NextResponse.json({ error: 'Google OAuth credentials not configured on server' }, { status: 500 });
    }

    // 1. Exchange authorization code with Google Token endpoint
    const tokenParams = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Google token exchange error:', tokenRes.status, errText);
      return NextResponse.json(
        {
          error: 'Failed to exchange Google OAuth code',
          details: errText,
        },
        { status: 400 }
      );
    }

    const tokenData = (await tokenRes.json()) as {
      access_token: string;
      id_token?: string;
      expires_in?: number;
      token_type?: string;
      refresh_token?: string;
    };

    // 2. Fetch candidate profile from Google UserInfo endpoint
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Failed to retrieve Google user profile' }, { status: 400 });
    }

    const googleUser = (await userRes.json()) as {
      sub: string;
      email: string;
      name?: string;
      picture?: string;
      given_name?: string;
      family_name?: string;
      email_verified?: boolean;
    };

    if (!googleUser.email) {
      return NextResponse.json({ error: 'Google account does not have an email address' }, { status: 400 });
    }

    const cleanEmail = googleUser.email.toLowerCase().trim();
    const cleanName = googleUser.name || googleUser.given_name || cleanEmail.split('@')[0];
    const avatarUrl = googleUser.picture || '';
    const isAdmin = isEmailAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'super_admin' : 'student';
    const assignedTier = isAdmin ? 'enterprise' : 'pro';
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    let userId = '';

    // 3. Upsert user in Cloudflare D1
    if (isD1Available()) {
      try {
        const existing = await d1QueryFirst<{ id: string; role: string }>(
          'SELECT id, role FROM users WHERE LOWER(email) = ? LIMIT 1',
          [cleanEmail]
        );

        if (existing?.id) {
          userId = existing.id;
        } else {
          userId = `usr_g_${googleUser.sub || Math.random().toString(36).substring(2, 11)}`;
        }

        // Upsert users
        await d1Run(
          `INSERT INTO users (id, email, full_name, role, target_exam_date, target_score, updated_at)
           VALUES (?, ?, ?, ?, NULL, 90, ?)
           ON CONFLICT(email) DO UPDATE SET
             full_name = excluded.full_name,
             role = CASE WHEN users.role = 'super_admin' OR excluded.role = 'super_admin' THEN 'super_admin' ELSE users.role END,
             updated_at = excluded.updated_at`,
          [userId, cleanEmail, cleanName, assignedRole, now]
        );

        // Upsert profiles
        await d1Run(
          `INSERT INTO profiles (id, email, full_name, avatar_url, certification_target, subscription_tier, account_status, trial_ends_at, updated_at)
           VALUES (?, ?, ?, ?, 'RBT', ?, 'active', ?, ?)
           ON CONFLICT(email) DO UPDATE SET
             full_name = excluded.full_name,
             avatar_url = COALESCE(NULLIF(excluded.avatar_url, ''), profiles.avatar_url),
             subscription_tier = CASE WHEN excluded.subscription_tier = 'enterprise' THEN 'enterprise' ELSE profiles.subscription_tier END,
             account_status = 'active',
             updated_at = excluded.updated_at`,
          [userId, cleanEmail, cleanName, avatarUrl, assignedTier, trialEndsAt, now]
        );
      } catch (dbErr) {
        console.error('D1 user upsert error during Google auth:', dbErr);
      }
    }

    if (!userId) {
      userId = `usr_g_${googleUser.sub || Math.random().toString(36).substring(2, 11)}`;
    }

    const sessionPayload = {
      accessToken: tokenData.access_token || `google_token_${Math.random().toString(36).substring(2)}`,
      refreshToken: tokenData.refresh_token || `refresh_${Math.random().toString(36).substring(2)}`,
      expiresAt: Date.now() + 86400 * 7 * 1000,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: cleanName,
        avatarUrl: avatarUrl,
        role: assignedRole,
        subscriptionTier: assignedTier,
        accountStatus: 'active',
        trialEndsAt: trialEndsAt,
        createdAt: now,
        lastLoginAt: now,
      },
    };

    return NextResponse.json({
      success: true,
      user: sessionPayload.user,
      session: sessionPayload,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/google/exchange:', error);
    return NextResponse.json({ error: error.message || 'Internal server error during Google login' }, { status: 500 });
  }
}
