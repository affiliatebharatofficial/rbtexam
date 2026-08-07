'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lock, Mail, User, Calendar, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { UserRole } from '@/types/auth';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, loginWithGoogle, isLoading: authLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [targetExamDate, setTargetExamDate] = useState('2026-10-15');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute password strength
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: '' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-rose-500' };
    if (password.length < 10) return { label: 'Moderate', color: 'bg-amber-500' };
    return { label: 'Strong (BACB Secure)', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUp({
      email,
      password,
      fullName,
      role,
      targetExamDate,
    });
    setIsSubmitting(false);

    if (res.success) {
      // Redirect to email verification pending screen
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      setErrorMessage(res.error || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    const res = await loginWithGoogle();
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Google sign-up failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Radial Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center relative z-10">
        <Link href="/" className="inline-flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <Brain className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Create Your RBT Candidate Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Get 100% money-back pass guarantee protection, Socrates AI, and adaptive domain diagnostics.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <Card glass className="p-8 shadow-2xl border-white/90">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting || authLoading}
            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-3 transition-all shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign Up with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 px-3 text-slate-400 font-bold">Or Register With Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                />
              </div>
              {password && (
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Strength:</span>
                  <span className="font-bold text-slate-800">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Role & Exam Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                >
                  <option value="student">RBT Candidate / Student</option>
                  <option value="therapist">Active Behavior Tech</option>
                  <option value="clinic_admin">BCBA / Clinic Supervisor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target BACB Exam Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={targetExamDate}
                    onChange={(e) => setTargetExamDate(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="leading-snug">
                  I agree to the <a href="#" className="text-[#2563EB] underline">Terms of Service</a> and acknowledge the <a href="#" className="text-[#2563EB] underline">BACB 2nd Edition Ethics Code</a>.
                </span>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || authLoading}
              variant="primary"
              size="lg"
              className="w-full gap-2 shadow-lg shadow-blue-500/25 mt-4"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Verify Email</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            Already registered?{' '}
            <Link href="/login" className="font-bold text-[#2563EB] hover:underline">
              Log In to Portal
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
