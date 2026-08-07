'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Brain, BookOpen, Layers, BarChart2, Users, ArrowRight } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Start 85-Q Mock Exam',
      description: '90-min timed simulation with Pearson VUE scoring',
      href: '/exam',
      icon: Sparkles,
      color: 'from-[#2563EB] to-indigo-600',
      badge: 'Full Mock',
    },
    {
      title: 'Launch Socrates AI Tutor',
      description: '24/7 conversational Socratic ethics & roleplay tutor',
      href: '/tutor',
      icon: Brain,
      color: 'from-purple-600 to-indigo-600',
      badge: 'AI Powered',
    },
    {
      title: 'Leitner Spaced Flashcards',
      description: 'Review 14 due cards locked into 5-box memory',
      href: '/flashcards',
      icon: Layers,
      color: 'from-amber-500 to-rose-500',
      badge: '14 Due',
    },
    {
      title: 'BACB 2nd Ed Study Guide',
      description: 'Explore Domains A through F task item breakdowns',
      href: '/task-list',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Task List',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        Quick Action Launchers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, idx) => (
          <Link key={idx} href={act.href} className="group">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <act.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {act.badge}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                  <span>{act.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
