'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Mail, Lock, KeyRound, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset, confirmPasswordReset, homeRoute } = useAuth();

  // Multi-step State: 1 = Enter Email, 2 = Enter OTP & New Password, 3 = Success
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Resend Countdown Timer
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // STEP 1: Request 6-digit Reset OTP
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await requestPasswordReset(cleanEmail);
    setIsSubmitting(false);

    if (res.success) {
      setStep(2);
      setResendCooldown(60);
      setInfoMessage(`A 6-digit security code was dispatched to ${cleanEmail}.`);
    } else {
      setErrorMessage(res.error || 'Failed to send password reset code. Please try again.');
    }
  };

  // Resend OTP Code
  const handleResendCode = async () => {
    if (resendCooldown > 0 || isSubmitting) return;
    setErrorMessage('');
    setInfoMessage('Sending a fresh 6-digit verification code...');

    setIsSubmitting(true);
    const res = await requestPasswordReset(email.trim().toLowerCase());
    setIsSubmitting(false);

    if (res.success) {
      setResendCooldown(60);
      setInfoMessage(`A new 6-digit code has been sent to ${email}.`);
    } else {
      setErrorMessage(res.error || 'Could not resend code. Please try again later.');
    }
  };

  // STEP 2: Verify OTP and Set New Password
  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    const cleanCode = code.replace(/\D/g, '').trim();

    if (cleanCode.length !== 6) {
      setErrorMessage('Please enter the 6-digit code received on your email.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    const res = await confirmPasswordReset(email.trim().toLowerCase(), cleanCode, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setStep(3);
    } else {
      setErrorMessage(res.error || 'Invalid or expired verification code.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center relative z-10">
        <Link href={homeRoute} className="inline-flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <Brain className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {step === 1 && 'Reset Your Password'}
          {step === 2 && 'Enter Security Code'}
          {step === 3 && 'Password Updated!'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {step === 1 && 'Enter your registered email address and we will send you a 6-digit verification code.'}
          {step === 2 && 'Enter the 6-digit code sent to your email along with your new password.'}
          {step === 3 && 'Your candidate account credentials have been securely updated.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card glass className="p-8 shadow-2xl border-white/90">
          
          {/* Global Alert Messages */}
          {errorMessage && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div className="mb-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Account Email Address
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full gap-2 shadow-lg shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Dispatching Security Code...</span>
                  </>
                ) : (
                  <span>Send 6-Digit Reset Code</span>
                )}
              </Button>
            </form>
          )}

          {/* STEP 2: Enter 6-Digit OTP Code & New Password */}
          {step === 2 && (
            <form onSubmit={handleVerifyAndReset} className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  Sent to: <strong className="text-slate-900">{email}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#2563EB] font-bold hover:underline"
                >
                  Change Email
                </button>
              </div>

              {/* 6-Digit Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  6-Digit Security Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="849201"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg tracking-[6px] font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                  />
                </div>
              </div>

              {/* Resend Code Link */}
              <div className="text-right">
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isSubmitting}
                  onClick={handleResendCode}
                  className={`text-xs font-semibold ${
                    resendCooldown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#2563EB] hover:underline'
                  }`}
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend 6-Digit Code'}
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full gap-2 shadow-lg shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying & Updating...</span>
                  </>
                ) : (
                  <span>Verify Code & Update Password</span>
                )}
              </Button>
            </form>
          )}

          {/* STEP 3: Success Screen */}
          {step === 3 && (
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-[#0F172A]">Password Successfully Updated</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your new password has been verified and updated. You can now log into your RBT candidate account.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/login">
                  <Button variant="primary" size="lg" className="w-full gap-2 shadow-lg shadow-blue-500/25">
                    <span>Log In to Your Account</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/login" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB]">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login Page</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
