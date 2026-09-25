import { NextRequest, NextResponse } from 'next/server';
import { isEmailAdmin } from '@/lib/admin-whitelist';
import { d1QueryFirst, d1Run, isD1Available } from '@/lib/d1';
import { getRuntimeEnv } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error') || url.searchParams.get('error_description');
  const origin = url.origin;

  if (error) {
    console.error('Google OAuth error in GET callback:', error);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  try {
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
      console.error('Google OAuth credentials missing in callback route');
      return NextResponse.redirect(`${origin}/login?error=oauth_credentials_missing`);
    }

    const redirectUri = `${origin}/api/auth/callback/google`;

    // 1. Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Google token exchange error in callback route:', errText);
      return NextResponse.redirect(`${origin}/login?error=oauth_token_exchange_failed`);
    }

    const tokenData = (await tokenRes.json()) as any;
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${origin}/login?error=oauth_userinfo_failed`);
    }

    const googleUser = (await userRes.json()) as any;
    const cleanEmail = (googleUser.email || '').toLowerCase().trim();
    const cleanName = googleUser.name || googleUser.given_name || cleanEmail.split('@')[0];
    const avatarUrl = googleUser.picture || '';
    const isAdmin = isEmailAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'super_admin' : 'student';
    const assignedTier = isAdmin ? 'enterprise' : 'pro';
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    let userId = '';

    if (isD1Available()) {
      try {
        const existing = await d1QueryFirst<{ id: string; role: string }>(
          'SELECT id, role FROM users WHERE LOWER(email) = ? LIMIT 1',
          [cleanEmail]
        );
        userId = existing?.id || `usr_g_${googleUser.sub || Math.random().toString(36).substring(2, 11)}`;

        await d1Run(
          `INSERT INTO users (id, email, full_name, role, target_exam_date, target_score, updated_at)
           VALUES (?, ?, ?, ?, NULL, 90, ?)
           ON CONFLICT(email) DO UPDATE SET
             full_name = excluded.full_name,
             role = CASE WHEN users.role = 'super_admin' OR excluded.role = 'super_admin' THEN 'super_admin' ELSE users.role END,
             updated_at = excluded.updated_at`,
          [userId, cleanEmail, cleanName, assignedRole, now]
        );

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
      } catch (e) {
        console.error('D1 error in callback route:', e);
      }
    }

    if (!userId) {
      userId = `usr_g_${googleUser.sub || Math.random().toString(36).substring(2, 11)}`;
    }

    // Redirect to /auth/callback with user credentials so client state is cleanly populated
    const callbackTarget = new URL(`${origin}/auth/callback`);
    callbackTarget.searchParams.set('google_auth_success', '1');
    callbackTarget.searchParams.set('email', cleanEmail);
    callbackTarget.searchParams.set('name', cleanName);
    callbackTarget.searchParams.set('userId', userId);
    if (avatarUrl) callbackTarget.searchParams.set('avatarUrl', avatarUrl);
    callbackTarget.searchParams.set('role', assignedRole);

    return NextResponse.redirect(callbackTarget.toString());
  } catch (err: any) {
    console.error('Callback error:', err);
    return NextResponse.redirect(`${origin}/login?error=oauth_internal_error`);
  }
}
