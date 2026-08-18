'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, isEmailAdmin } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginWithGoogle, user, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const performRedirect = () => {
    const customRedirect = searchParams.get('redirect');
    if (customRedirect) {
      router.push(customRedirect);
    } else if (isEmailAdmin(email) || (user && (user.role === 'admin' || user.role === 'super_admin'))) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide your email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login({ email, password, rememberMe });
    setIsSubmitting(false);

    if (res.success) {
      performRedirect();
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    const res = await loginWithGoogle();
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    }
  };

  return (
    <Card glass className="p-8 shadow-2xl border-white/90">
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Google Single Sign On Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting || authLoading}
        className="w-full p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-3 transition-all shadow-sm hover:shadow"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/90 px-3 text-slate-400 font-bold">Or Sign In With Email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@rbtpracticeai.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span>Keep me signed in on this device</span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || authLoading}
          variant="primary"
          size="lg"
          className="w-full gap-2 shadow-lg shadow-blue-500/25"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Candidate Portal</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Card Footer redirect to Sign Up */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
        Don't have an RBT candidate account yet?{' '}
        <Link href="/signup" className="font-bold text-[#2563EB] hover:underline">
          Create Free Candidate Account
        </Link>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  const { homeRoute } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center relative z-10">
        <Link href={homeRoute} className="inline-flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
            <Brain className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Welcome back to <span className="text-[#2563EB]">RBT Practice AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Log in to access your Socrates AI Tutor, domain heatmaps, and practice exam simulations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<Card glass className="p-8 text-center text-xs text-slate-500">Loading sign in form...</Card>}>
          <LoginForm />
        </Suspense>

        {/* BACB Security Badge */}
        <div className="mt-6 text-center flex items-center justify-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-Bit SSL Encrypted • BACB RBT 3rd Edition TCO Aligned</span>
        </div>
      </div>
    </div>
  );
}
