'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Brain, ShieldCheck, CheckCircle2, Unlock } from 'lucide-react';

export function CtaSection() {
  const { t } = useLanguage();
  const [freeAccessMode, setFreeAccessMode] = useState(true);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json() as Promise<any>)
      .then((data: any) => {
        if (data && data.freeAccessMode !== undefined) {
          setFreeAccessMode(Boolean(data.freeAccessMode));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gradient-to-tr from-[#0F172A] via-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Radial ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t('cta.badge', '🎉 100% Free Open Access Active • No Payment Required')}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          {t('cta.heading', 'Start Free Practice Today and Pass Your RBT Exam')}
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t('cta.subheading', 'Get full unrestricted access to realistic RBT exam questions, full 85-question timed mock exams, Socrates AI clinical explanations, and complete 3rd Edition flashcards completely free.')}
        </p>

        {/* Bullet Trust Checks */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">{t('hero.bullet1', '100% Free Access For All')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('hero.bullet4', 'BACB RBT 3rd Edition Aligned')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('hero.bullet2', 'Full 85-Question Mock Exams')}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-4 text-base gap-2 shadow-2xl shadow-blue-500/40 font-bold">
              <Unlock className="w-5 h-5 text-white" />
              <span>{t('cta.startBtn', 'Start 100% Free Practice')}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/rbt/mock-exam" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base gap-2 border-slate-700 hover:bg-white/10 text-white font-bold">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>{t('cta.mockBtn', 'Take a Free Mock Exam')}</span>
            </Button>
          </Link>
        </div>

        <div className="pt-6 text-xs text-slate-400 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t('cta.standards', 'Official BACB RBT 3rd Edition Task List Standards (Domains A-F)')}</span>
        </div>
      </div>
    </section>
  );
}
