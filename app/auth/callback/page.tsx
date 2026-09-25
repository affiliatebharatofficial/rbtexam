'use client';

import React, { useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useAuth, isEmailAdmin } from '@/context/auth-context';
import { Brain, RefreshCw } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeGoogleAuthSession } = useAuth();
  const hasHandled = useRef(false);

  useEffect(() => {
    let isSubscribed = true;

    async function handleAuthCallback() {
      if (hasHandled.current) return;
      hasHandled.current = true;

      try {
        const errorParam = searchParams.get('error') || searchParams.get('error_description');
        if (errorParam) {
          console.error('OAuth error returned:', errorParam);
          router.push(`/login?error=${encodeURIComponent(errorParam)}`);
          return;
        }

        // Case 1: Pre-exchanged from /api/auth/callback/google
        const googleAuthSuccess = searchParams.get('google_auth_success');
        const emailParam = searchParams.get('email');
        if (googleAuthSuccess === '1' && emailParam && isSubscribed) {
          const nameParam = searchParams.get('name') || undefined;
          const userIdParam = searchParams.get('userId') || undefined;
          const avatarUrlParam = searchParams.get('avatarUrl') || undefined;
          await completeGoogleAuthSession(emailParam, nameParam, userIdParam, avatarUrlParam);
          const target = isEmailAdmin(emailParam) ? '/admin' : '/dashboard';
          window.location.href = target;
          return;
        }

        // Case 2: Direct Google OAuth Authorization Code exchange
        const code = searchParams.get('code');
        if (code && isSubscribed) {
          try {
            const redirectUri = `${window.location.origin}${window.location.pathname}`;
            const res = await fetch('/api/auth/google/exchange', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code, redirectUri }),
            });

            if (res.ok) {
              const data = (await res.json()) as any;
              if (data?.user && isSubscribed) {
                await completeGoogleAuthSession(
                  data.user.email,
                  data.user.fullName,
                  data.user.id,
                  data.user.avatarUrl
                );
                const target = isEmailAdmin(data.user.email) || data.user.role === 'admin' || data.user.role === 'super_admin'
                  ? '/admin'
                  : '/dashboard';
                window.location.href = target;
                return;
              }
            } else {
              const errBody = (await res.json().catch(() => ({}))) as any;
              console.error('OAuth exchange error:', errBody);
              window.location.href = `/login?error=${encodeURIComponent(errBody?.error || 'google_exchange_failed')}`;
              return;
            }
          } catch (exchangeErr) {
            console.error('Failed to exchange code:', exchangeErr);
            window.location.href = '/login?error=exchange_network_error';
            return;
          }
        }

        // Case 3: Supabase legacy OAuth callback fallback (if configured)
        if (isSupabaseConfigured()) {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data?.session?.user?.email && isSubscribed) {
            const userEmail = data.session.user.email;
            const userId = data.session.user.id;
            const userName = data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name;
            const userAvatar = data.session.user.user_metadata?.avatar_url || data.session.user.user_metadata?.picture;
            await completeGoogleAuthSession(userEmail, userName || undefined, userId, userAvatar || undefined);
            const target = isEmailAdmin(userEmail) ? '/admin' : '/dashboard';
            window.location.href = target;
            return;
          }

          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user?.email && isSubscribed) {
              const userEmail = session.user.email;
              const userId = session.user.id;
              const userName = session.user.user_metadata?.full_name || session.user.user_metadata?.name;
              const userAvatar = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture;
              await completeGoogleAuthSession(userEmail, userName || undefined, userId, userAvatar || undefined);
              const target = isEmailAdmin(userEmail) ? '/admin' : '/dashboard';
              window.location.href = target;
            }
          });

          const timeout = setTimeout(() => {
            if (isSubscribed) {
              authListener?.subscription.unsubscribe();
              router.push('/login?error=oauth_timeout');
            }
          }, 4000);

          return () => {
            isSubscribed = false;
            clearTimeout(timeout);
            authListener?.subscription.unsubscribe();
          };
        }

        // If no code and no parameters, return to login
        if (isSubscribed) {
          router.push('/login');
        }
      } catch (err) {
        console.error('OAuth Callback handling error:', err);
        if (isSubscribed) {
          router.push('/login?error=oauth_failed');
        }
      }
    }

    handleAuthCallback();

    return () => {
      isSubscribed = false;
    };
  }, [router, searchParams, completeGoogleAuthSession]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
      <h1 className="sr-only">Google OAuth Authentication Callback</h1>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 animate-pulse">
        <Brain className="w-7 h-7" />
      </div>
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
        <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
        <span>Completing Google OAuth Authentication for RBT Practice AI...</span>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-6 h-6 animate-spin text-[#2563EB]" />
          <span className="text-xs text-slate-600 font-semibold">Loading authentication callback...</span>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
