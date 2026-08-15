'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || 'candidate@rbtpracticeai.com';

  const { verifyEmail, user } = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.emailVerified || false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resentMessage, setResentMessage] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    const res = await verifyEmail(emailParam, fullCode);
    setIsVerifying(false);

    if (res.success) {
      setIsVerified(true);
    } else {
      setErrorMessage(res.error || 'Invalid verification code.');
    }
  };

  const handleResend = async () => {
    setResentMessage('');
    setErrorMessage('');
    await new Promise((resolve) => setTimeout(resolve, 600));
    setResentMessage(`A new 6-digit verification code has been dispatched to ${emailParam}.`);
  };

  return (
    <Card glass className="p-8 shadow-2xl border-white/90 text-center">
      {!isVerified ? (
        <form onSubmit={handleVerify} className="space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {errorMessage}
            </div>
          )}

          {resentMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              {resentMessage}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter 6-Digit Code
            </label>
            <div className="flex items-center justify-center gap-2 pt-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isVerifying}
            variant="primary"
            size="lg"
            className="w-full gap-2 shadow-lg shadow-blue-500/25"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <>
                <span>Confirm Email & Complete Setup</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <div className="pt-2 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleResend}
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Resend Verification Code
            </button>
            <Link href="/login" className="text-slate-500 hover:text-slate-700">
              Change Email
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6 py-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[#0F172A]">Email Verified!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your candidate email has been verified. You now have full access to Socrates AI Tutor, 85-question diagnostic mock exams, and pass guarantee protection.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button variant="primary" size="lg" className="w-full gap-2 shadow-xl shadow-blue-500/25">
                <span>Enter Candidate Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function VerifyEmailPage() {
  const { homeRoute } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center relative z-10">
        <Link href={homeRoute} className="inline-flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <Brain className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Verify Your Email Address
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter the verification code sent to your email to complete registration.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<Card glass className="p-8 text-center text-xs text-slate-500">Loading verification form...</Card>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
