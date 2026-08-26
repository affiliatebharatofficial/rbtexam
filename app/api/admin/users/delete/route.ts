import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/server-auth';
import { isEmailAdmin } from '@/lib/admin-whitelist';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const { userId, email } = (await request.json()) as any;

    if (!userId && !email) {
      return NextResponse.json({ error: 'User ID or Email is required for deletion' }, { status: 400 });
    }

    const adminSupabase = getSupabaseAdminClient();
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    if (cleanEmail && isEmailAdmin(cleanEmail)) {
      return NextResponse.json({ error: 'Protected administrator accounts cannot be deleted.' }, { status: 403 });
    }

    // 1. Collect all possible IDs and Emails associated with this user
    const targetUserIds = new Set<string>();
    const targetEmails = new Set<string>();

    if (userId) targetUserIds.add(userId);
    if (cleanEmail) targetEmails.add(cleanEmail);

    // 1a. Lookup by email in public.profiles
    if (cleanEmail) {
      try {
        const { data: profs } = await adminSupabase
          .from('profiles')
          .select('id, email')
          .ilike('email', cleanEmail);

        if (profs && Array.isArray(profs)) {
          profs.forEach((p) => {
            if (p.id) targetUserIds.add(p.id);
            if (p.email) targetEmails.add(p.email.toLowerCase().trim());
          });
        }
      } catch (e) {
        console.warn('Profiles email lookup warning:', e);
      }
    }

    // 1b. Lookup by ID in public.profiles
    if (userId) {
      try {
        const { data: prof } = await adminSupabase
          .from('profiles')
          .select('id, email')
          .eq('id', userId)
          .maybeSingle();

        if (prof) {
          if (prof.id) targetUserIds.add(prof.id);
          if (prof.email) targetEmails.add(prof.email.toLowerCase().trim());
        }
      } catch (e) {
        console.warn('Profiles ID lookup warning:', e);
      }
    }

    // 1c. Lookup by email and ID in public.users
    if (cleanEmail) {
      try {
        const { data: usrList } = await adminSupabase
          .from('users')
          .select('id, email')
          .ilike('email', cleanEmail);

        if (usrList && Array.isArray(usrList)) {
          usrList.forEach((u) => {
            if (u.id) targetUserIds.add(u.id);
            if (u.email) targetEmails.add(u.email.toLowerCase().trim());
          });
        }
      } catch (e) {
        console.warn('Users email lookup warning:', e);
      }
    }

    // 1d. Lookup in Supabase Auth Admin
    const authUserIds = new Set<string>();
    if (adminSupabase.auth?.admin) {
      try {
        const { data: authList } = await adminSupabase.auth.admin.listUsers({ perPage: 1000 });
        if (authList?.users) {
          authList.users.forEach((au) => {
            const auEmail = au.email?.toLowerCase().trim();
            if (
              (cleanEmail && auEmail === cleanEmail) ||
              targetEmails.has(auEmail || '') ||
              targetUserIds.has(au.id)
            ) {
              authUserIds.add(au.id);
              targetUserIds.add(au.id);
              if (auEmail) targetEmails.add(auEmail);
            }
          });
        }
      } catch (authListErr) {
        console.warn('Supabase Auth listUsers warning:', authListErr);
      }
    }

    const userIdsArray = Array.from(targetUserIds);
    const emailsArray = Array.from(targetEmails);

    // 2. Cascade delete dependent child records first
    for (const uid of userIdsArray) {
      // Find and delete exam answers for this user's exam sessions
      try {
        const { data: sessions } = await adminSupabase
          .from('exam_sessions')
          .select('id')
          .eq('user_id', uid);

        if (sessions && sessions.length > 0) {
          const sessionIds = sessions.map((s) => s.id);
          await adminSupabase.from('exam_answers').delete().in('session_id', sessionIds);
        }
      } catch (e) {
        console.warn('Exam answers delete notice:', e);
      }

      // Delete child records from known database tables
      await Promise.allSettled([
        adminSupabase.from('subscriptions').delete().eq('user_id', uid),
        adminSupabase.from('exam_sessions').delete().eq('user_id', uid),
        adminSupabase.from('flashcard_progress').delete().eq('user_id', uid),
        adminSupabase.from('student_progress').delete().eq('user_id', uid),
        adminSupabase.from('study_plans').delete().eq('user_id', uid),
        adminSupabase.from('adaptive_learning_state').delete().eq('user_id', uid),
        adminSupabase.from('ai_conversations').delete().eq('user_id', uid),
        adminSupabase.from('notifications').delete().eq('user_id', uid),
        adminSupabase.from('system_audit_logs').delete().eq('user_id', uid),
      ]);

      // Delete from profiles and users by ID
      await Promise.allSettled([
        adminSupabase.from('profiles').delete().eq('id', uid),
        adminSupabase.from('users').delete().eq('id', uid),
      ]);
    }

    // 3. Delete from profiles and users by Email (case-insensitive cleanup)
    for (const em of emailsArray) {
      await Promise.allSettled([
        adminSupabase.from('profiles').delete().ilike('email', em),
        adminSupabase.from('users').delete().ilike('email', em),
      ]);
    }

    // 4. Delete from Supabase Auth so the user cannot log back in or appear in Auth
    for (const authId of authUserIds) {
      try {
        const { error: delAuthErr } = await adminSupabase.auth.admin.deleteUser(authId);
        if (delAuthErr) {
          console.warn(`Supabase Auth admin delete error for ${authId}:`, delAuthErr);
        }
      } catch (authDelErr) {
        console.warn(`Supabase Auth delete exception for ${authId}:`, authDelErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `User account (${emailsArray.join(', ') || userIdsArray.join(', ')}) permanently deleted from database and auth.`,
      deletedUserIds: userIdsArray,
      deletedEmails: emailsArray,
    });
  } catch (error: any) {
    console.error('API /api/admin/users/delete error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete user account' }, { status: 500 });
  }
}
