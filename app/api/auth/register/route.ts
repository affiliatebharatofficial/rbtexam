import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { isEmailAdmin } from '@/lib/admin-whitelist';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { id, email, fullName, role, targetExamDate, subscriptionTier, accountStatus, avatarUrl, password } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName || cleanEmail.split('@')[0];
    const isAdmin = isEmailAdmin(cleanEmail);
    const assignedRole = isAdmin ? 'super_admin' : (role || 'student');
    const assignedTier = isAdmin ? 'enterprise' : (subscriptionTier || 'pro');
    const status = accountStatus || 'active';
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const adminSupabase = getSupabaseAdminClient();

    let userId = id;

    // 1. Create or ensure user in Supabase Auth via Admin API (email_confirm: true suppresses Supabase default email)
    if (password && adminSupabase.auth?.admin) {
      try {
        const { data: createdAuth, error: createAuthErr } = await adminSupabase.auth.admin.createUser({
          email: cleanEmail,
          password: password,
          email_confirm: true,
          user_metadata: { full_name: cleanName, role: assignedRole },
        });

        if (createdAuth?.user?.id) {
          userId = createdAuth.user.id;
        } else if (createAuthErr && createAuthErr.message.toLowerCase().includes('already')) {
          // If already exists in Supabase Auth, lookup profile or update auth credentials
          const { data: existingProfiles } = await adminSupabase
            .from('profiles')
            .select('id')
            .eq('email', cleanEmail)
            .limit(1);

          if (existingProfiles && existingProfiles[0]?.id) {
            userId = existingProfiles[0].id;
            try {
              await adminSupabase.auth.admin.updateUserById(userId, {
                password: password,
                email_confirm: true,
                user_metadata: { full_name: cleanName, role: assignedRole },
              });
            } catch (updateErr) {
              console.warn('Update user password warning:', updateErr);
            }
          }
        }
      } catch (authErr) {
        console.warn('Supabase Auth admin creation notice:', authErr);
      }
    }

    // 2. Check existing profile if userId still not resolved
    if (!userId) {
      try {
        const { data: existingProfiles } = await adminSupabase
          .from('profiles')
          .select('id')
          .eq('email', cleanEmail)
          .limit(1);

        if (existingProfiles && existingProfiles.length > 0) {
          userId = existingProfiles[0].id;
        }
      } catch (e) {
        console.warn('Profile search by email failed:', e);
      }
    }

    // 3. Generate fallback UUID if still missing
    if (!userId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        userId = crypto.randomUUID();
      } else {
        userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
      }
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
