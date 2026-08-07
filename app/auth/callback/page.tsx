'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/context/auth-context';
import { Brain, RefreshCw } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        if (isSupabaseConfigured()) {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (data?.session?.user) {
            const userEmail = data.session.user.email;
            const userName = data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name;
            await loginWithGoogle(userEmail || undefined, userName || undefined);
            router.push('/dashboard');
            return;
          }
        }
        router.push('/dashboard');
      } catch (err) {
        console.error('Failed to complete Supabase OAuth session:', err);
        router.push('/login?error=oauth_failed');
      }
    }

    handleAuthCallback();
  }, [router, loginWithGoogle]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 animate-pulse">
        <Brain className="w-7 h-7" />
      </div>
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
        <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
        <span>Completing Google OAuth Authentication for RBTTrainingAI...</span>
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
