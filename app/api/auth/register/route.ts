import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { id, email, fullName, role, targetExamDate, subscriptionTier, accountStatus, avatarUrl } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName || cleanEmail.split('@')[0];
    const assignedRole = cleanEmail === 'jobpegyan@gmail.com' ? 'super_admin' : (role || 'student');
    const assignedTier = cleanEmail === 'jobpegyan@gmail.com' ? 'enterprise' : (subscriptionTier || 'pro');
    const status = accountStatus || 'active';
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    let userId = id;

    // 1. Check if user already exists in auth or DB
    try {
      const { data: existingProfiles } = await adminSupabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .limit(1);

      if (existingProfiles && existingProfiles.length > 0) {
        userId = existingProfiles[0].id;
      }
    } catch (e) {
      console.warn('Profile search by email failed:', e);
    }

    // 2. If no valid id provided, search or create in auth.users
    if (!userId || !userId.includes('-')) {
      try {
        const { data: authUsers } = await adminSupabase.auth.admin.listUsers();
        const foundAuth = authUsers?.users?.find((u: any) => u.email?.toLowerCase().trim() === cleanEmail);
        if (foundAuth) {
          userId = foundAuth.id;
        } else {
          // Attempt to create user in auth.users via Admin API
          const { data: createdAuth, error: createErr } = await adminSupabase.auth.admin.createUser({
            email: cleanEmail,
            email_confirm: true,
            user_metadata: { full_name: cleanName, role: assignedRole },
          });
          if (createdAuth?.user?.id) {
            userId = createdAuth.user.id;
          }
        }
      } catch (authErr) {
        console.warn('Supabase Auth user creation/lookup warning:', authErr);
      }
    }

    // Generate fallback UUID if still missing
    if (!userId) {
      userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
    }

    const now = new Date().toISOString();

    // 3. Upsert into public.profiles
    const profilePayload: any = {
      id: userId,
      email: cleanEmail,
      full_name: cleanName,
      avatar_url: avatarUrl || '',
      certification_target: 'RBT',
      subscription_tier: assignedTier,
      trial_ends_at: trialEndsAt,
      account_status: status,
      updated_at: now,
    };

    if (targetExamDate) {
      profilePayload.exam_date = targetExamDate;
    }

    const { error: profileErr } = await adminSupabase
      .from('profiles')
      .upsert(profilePayload, { onConflict: 'email' });

    if (profileErr) {
      console.error('Error upserting public.profiles:', profileErr);
    }

    // 4. Upsert into public.subscriptions
    try {
      await adminSupabase.from('subscriptions').upsert(
        {
          user_id: userId,
          tier: assignedTier,
          status: 'trialing',
          trial_ends_at: trialEndsAt,
          current_period_start: now,
          current_period_end: trialEndsAt,
          updated_at: now,
        },
        { onConflict: 'user_id' }
      );
    } catch (subErr) {
      console.warn('Subscriptions upsert warning:', subErr);
    }

    // 5. Upsert into public.users
    const userPayload: any = {
      id: userId,
      email: cleanEmail,
      full_name: cleanName,
      role: assignedRole,
      target_score: 90,
      updated_at: now,
    };

    if (targetExamDate) {
      userPayload.target_exam_date = targetExamDate;
    }

    const { error: userErr } = await adminSupabase
      .from('users')
      .upsert(userPayload, { onConflict: 'email' });

    if (userErr) {
      console.error('Error upserting public.users:', userErr);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: cleanName,
        role: assignedRole,
        subscriptionTier: assignedTier,
        trialEndsAt: trialEndsAt,
        status: status,
        createdAt: now,
      },
    });
  } catch (error: any) {
    console.error('API /api/auth/register error:', error);
    return NextResponse.json({ error: error.message || 'Failed to register user centrally' }, { status: 500 });
  }
}
