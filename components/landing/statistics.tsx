'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Card } from '@/components/ui/card';
import { Award, Users, CheckCircle2, Star, Clock, ShieldCheck } from 'lucide-react';

export function Statistics() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('stats.mockQuestions', 'Mock Exam Questions'),
      value: '85',
      subtext: t('stats.mockQuestionsSub', '75 Scored + 10 Pilot Questions'),
      icon: CheckCircle2,
      color: 'text-blue-500',
    },
    {
      label: t('stats.examDomains', 'TCO Domains'),
      value: '6',
      subtext: t('stats.examDomainsSub', '100% 3rd Edition Syllabus'),
      icon: ShieldCheck,
      color: 'text-emerald-500',
    },
    {
      label: t('stats.tcoTasks', 'Clinical Tasks'),
      value: '43',
      subtext: t('stats.tcoTasksSub', 'Comprehensive RBT Competencies'),
      icon: Award,
      color: 'text-indigo-400',
    },
    {
      label: t('stats.examDuration', 'Exam Simulation Duration'),
      value: '120 Min',
      subtext: t('stats.examDurationSub', 'Authentic Test Center Pacing (2 Hours)'),
      icon: Clock,
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-tr from-[#0F172A] via-slate-900 to-blue-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{s.value}</div>
              <div className="text-sm font-bold text-slate-200">{s.label}</div>
              <div className="text-xs text-slate-400 font-medium">{s.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
