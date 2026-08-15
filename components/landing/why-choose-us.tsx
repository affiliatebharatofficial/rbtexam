'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Check, X, ShieldCheck, Zap, Sparkles, Brain, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyChooseUs() {
  const comparisonItems = [
    {
      feature: 'BACB RBT 3rd Edition Task List Alignment',
      us: true,
      usText: '100% Updated 2026 Standards (Domains A-F)',
      them: false,
      themText: 'Often outdated 1st Edition content',
    },
    {
      feature: 'Real-Time Conversational AI Tutor',
      us: true,
      usText: 'Socrates AI explains why wrong answers are incorrect 24/7',
      them: false,
      themText: 'Static text explanations or none',
    },
    {
      feature: 'Adaptive Domain Mastery Heatmaps',
      us: true,
      usText: 'Pinpoints exact sub-task weaknesses (e.g. C-04, D-02)',
      them: false,
      themText: 'Generic total percentage score',
    },
    {
      feature: 'Leitner Spaced Repetition Flashcards',
      us: true,
      usText: 'Algorithmic 5-box memory lock for ABA terms',
      them: false,
      themText: 'Static PDF lists or printable paper cards',
    },
    {
      feature: 'First-Time Exam Pass Rate',
      us: true,
      usText: '99.4% First-Try Pass Rate',
      them: false,
      themText: '74% BACB National First-Time Average',
    },
    {
      feature: '100% Money-Back Pass Guarantee',
      us: true,
      usText: 'Full refund if you fail after achieving 85% readiness',
      them: false,
      themText: 'No money-back guarantee',
    },
  ];

  return (
    <section className="py-24 bg-slate-50/70 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue">The Smart Choice for RBT Candidates</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Why Students & ABA Clinics Choose RBT Practice AI
          </h2>
          <p className="text-base text-slate-600">
            Compare our next-generation adaptive AI preparation platform against legacy static video courses and PDF question banks.
          </p>
        </div>

        {/* Comparison Table Card */}
        <Card glass className="p-6 sm:p-8 max-w-4xl mx-auto shadow-xl border-white/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-2/5">
                    Feature Comparison
                  </th>
                  <th className="py-4 px-4 text-sm font-extrabold text-[#2563EB] w-3/10 bg-blue-50/60 rounded-t-xl text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Sparkles className="w-4 h-4 text-[#2563EB]" />
                      <span>RBT Practice AI</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 w-3/10 text-center">
                    Traditional Prep Courses
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {item.feature}
                    </td>
                    <td className="py-4 px-4 bg-blue-50/30 text-center font-semibold text-slate-900 border-x border-blue-100/60">
                      <div className="flex items-center justify-center space-x-1.5 text-emerald-600 font-bold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs text-slate-800">{item.usText}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-slate-500">
                      <div className="flex items-center justify-center space-x-1.5 text-rose-500">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span className="text-xs text-slate-500">{item.themText}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pass Guarantee Backed</h4>
                <p className="text-xs text-slate-600">If you pass our readiness exam and fail the BACB exam, get 100% refund.</p>
              </div>
            </div>
            <Link href="/exam">
              <Button variant="primary" size="sm" className="whitespace-nowrap shadow-md">
                Start Free Diagnostic
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
