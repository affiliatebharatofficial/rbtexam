'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Brain, RefreshCw } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    async function processOAuthCallback() {
      try {
        const email = searchParams.get('email') || searchParams.get('user_email');
        const name = searchParams.get('name') || searchParams.get('full_name');
        
        await loginWithGoogle(email || undefined, name || undefined);
        router.push('/dashboard');
      } catch (err) {
        console.error('OAuth Callback handling error:', err);
        router.push('/login');
      }
    }

    processOAuthCallback();
  }, [router, searchParams, loginWithGoogle]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 animate-pulse">
        <Brain className="w-7 h-7" />
      </div>
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
        <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
        <span>Completing Google OAuth Authentication...</span>
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
