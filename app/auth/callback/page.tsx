'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/context/auth-context';
import { Brain, RefreshCw } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeGoogleAuthSession } = useAuth();

  useEffect(() => {
    let isSubscribed = true;

    async function handleAuthCallback() {
      try {
        const errorParam = searchParams.get('error') || searchParams.get('error_description');
        if (errorParam) {
          console.error('OAuth error returned:', errorParam);
          router.push(`/login?error=${encodeURIComponent(errorParam)}`);
          return;
        }

        if (isSupabaseConfigured()) {
          // 1. Check existing session
          const { data, error } = await supabase.auth.getSession();
          if (!error && data?.session?.user?.email && isSubscribed) {
            const userEmail = data.session.user.email;
            const userId = data.session.user.id;
            const userName = data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name;
            const userAvatar = data.session.user.user_metadata?.avatar_url || data.session.user.user_metadata?.picture;
            await completeGoogleAuthSession(userEmail, userName || undefined, userId, userAvatar || undefined);
            router.push('/dashboard');
            return;
          }

          // 2. Listen for auth state change (e.g. hash token exchange)
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user?.email && isSubscribed) {
              const userEmail = session.user.email;
              const userId = session.user.id;
              const userName = session.user.user_metadata?.full_name || session.user.user_metadata?.name;
              const userAvatar = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture;
              await completeGoogleAuthSession(userEmail, userName || undefined, userId, userAvatar || undefined);
              router.push('/dashboard');
            }
          });

          // Timeout fallback if no session received within 5 seconds
          const timeout = setTimeout(() => {
            if (isSubscribed) {
              authListener?.subscription.unsubscribe();
              router.push('/login?error=oauth_timeout');
            }
          }, 5000);

          return () => {
            isSubscribed = false;
            clearTimeout(timeout);
            authListener?.subscription.unsubscribe();
          };
        } else {
          router.push('/login?error=auth_unconfigured');
        }
      } catch (err) {
        console.error('OAuth Callback handling error:', err);
        router.push('/login?error=oauth_failed');
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
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-6 h-6 animate-spin text-[#2563EB]" />
        <span className="text-xs text-slate-600 font-semibold">Loading authentication callback...</span>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
