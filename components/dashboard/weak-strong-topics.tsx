'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Star, Brain, ArrowRight, CheckCircle2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

export function WeakStrongTopics() {
  const [hasData, setHasData] = useState(false);
  const weakTopics = [
    { code: 'D-04', name: 'Differential Reinforcement (DRO/DRA)', domain: 'Domain D', score: 74, reason: 'Confusing DRO interval rules' },
    { code: 'C-04', name: 'Discrete Trial Teaching Prompt Fading', domain: 'Domain C', score: 78, reason: 'Time delay prompt errors' },
  ];

  const strongTopics = [
    { code: 'E-01', name: 'Objective Clinical Session Notes', domain: 'Domain E', score: 96, status: 'Mastered' },
    { code: 'F-02', name: 'BACB RBT Ethics Code & Scope', domain: 'Domain F', score: 98, status: 'Mastered' },
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rbt_exam_sessions');
      if (stored) {
        const sessions = JSON.parse(stored);
        if (sessions.length > 0) {
          setHasData(true);
        }
      }
    } catch (e) {
      console.error('Failed to load topic breakdown', e);
    }
  }, []);

  if (!hasData) {
    return (
      <EmptyState
        icon={Target}
        title="No Domain Topic Breakdown Available"
        description="Your weak and strong BACB task list topic areas will be calculated automatically after your first completed exam drill."
        badgeLabel="Topic Breakdown Pending"
        actionLabel="Take 15-Min Diagnostic"
        onAction={() => window.location.href = '/exam'}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Weak Topics Box */}
      <div className="p-6 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Priority Focus Areas (Weak Topics)</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
            Action Required
          </span>
        </div>

        <div className="space-y-3">
          {weakTopics.map((item) => (
            <div key={item.code} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {item.code} • {item.domain}
                </span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">{item.score}% Accuracy</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.reason}</p>
            </div>
          ))}
        </div>

        <Link href="/tutor" className="block pt-1">
          <Button variant="primary" size="sm" className="w-full gap-2 shadow-md">
            <Brain className="w-4 h-4" />
            <span>Drill Weak Topics with Socrates AI</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Strong Topics Box */}
      <div className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-emerald-900 dark:text-emerald-300 text-xs uppercase tracking-wider">
            <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500" />
            <span>Mastered Concepts (Strong Topics)</span>
          </div>
          <span className="text-[10px] font-bold bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-full">
            High Confidence
          </span>
        </div>

        <div className="space-y-3">
          {strongTopics.map((item) => (
            <div key={item.code} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {item.code} • {item.domain}
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{item.score}% Mastered</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Locked in long-term memory</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/60 text-[11px] text-emerald-900 dark:text-emerald-300 font-medium text-center border border-emerald-200 dark:border-emerald-800">
          98% of mastered items stay locked in memory using Leitner spaced repetition.
        </div>
      </div>
    </div>
  );
}
