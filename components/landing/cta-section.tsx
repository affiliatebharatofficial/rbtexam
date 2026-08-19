'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Brain, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-tr from-[#0F172A] via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Radial ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>7-Day Free Trial • Pass-or-Refund Guarantee Protection</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Start Your 7-Day Free Trial and Master the RBT Exam
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Start your 7-day free trial and practice with realistic RBT exam questions, 85-question timed mock exams, Socrates AI explanations, and complete 3rd Edition study tools.
        </p>

        {/* Bullet Trust Checks */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Full 7-Day Pro Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>BACB RBT 3rd Edition Aligned</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Pass Readiness Breakdown</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-4 text-base gap-2 shadow-2xl shadow-blue-500/40 font-bold">
              <span>Start Your 7-Day Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/rbt/mock-exam" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base gap-2 border-slate-700 hover:bg-white/10 text-white">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>Take a Practice Exam</span>
            </Button>
          </Link>
        </div>

        <div className="pt-6 text-xs text-slate-400 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official BACB RBT 3rd Edition Task List Standards (Domains A-F)</span>
        </div>
      </div>
    </section>
  );
}
