'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { getEffectiveSubscriptionTier, getTrialDaysRemaining } from '@/lib/subscription-engine';
import { Sparkles, Clock, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export function TrialBanner() {
  const { user } = useAuth();
  if (!user) return null;

  const effectiveTier = getEffectiveSubscriptionTier(user);
  const trialInfo = getTrialDaysRemaining(user);

  // If user is admin/super_admin or lifetime/team subscriber, no trial banner needed
  if (['admin', 'super_admin'].includes(user.role) || ['team', 'lifetime', 'enterprise'].includes(effectiveTier)) {
    return null;
  }

  // Active 7-Day Pro Trial State
  if (trialInfo.isTrialActive && effectiveTier === 'pro') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-5 text-white shadow-xl border border-indigo-500/30 mb-6">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 7-Day Free Pro Access Active
                </span>
                <span className="text-xs text-indigo-200/80 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {trialInfo.daysRemaining > 1 
                    ? `${trialInfo.daysRemaining} days remaining` 
                    : `${trialInfo.hoursRemaining} hours remaining`}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                You have full access to all BACB Mock Exams & Socrates AI Mentorship!
              </h3>
              <p className="text-xs text-indigo-200 mt-0.5">
                Enjoy unlimited practice questions, spaced repetition flashcards, and pass guarantee protection during your trial.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex items-center gap-3">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-indigo-500/25 active:scale-95"
            >
              <span>Keep Pro Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Trial Expired (Reverted to Normal / Free Plan) State
  if (!trialInfo.isTrialActive && effectiveTier === 'free') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-amber-950/40 border border-amber-500/30 p-5 text-amber-100 shadow-lg mb-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  7-Day Pro Trial Ended
                </span>
                <span className="text-xs text-amber-200/80">Active Plan: Free Candidate</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Your 7-day Pro trial has ended. Upgrade to keep unlimited access!
              </h3>
              <p className="text-xs text-amber-200/80 mt-0.5">
                You are currently on the Free plan (1 quiz/day, 15 flashcards/day). Upgrade to Pro for unlimited mock exams.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
