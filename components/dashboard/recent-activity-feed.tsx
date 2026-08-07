'use client';

import React from 'react';
import { Sparkles, Brain, CheckCircle2, Layers, Award, Clock } from 'lucide-react';

export function RecentActivityFeed() {
  const activities = [
    {
      id: 1,
      title: 'Passed 85-Question Mock Exam #4',
      subtitle: 'Scored 88% overall (Passed 5/6 Domains)',
      time: '2 hours ago',
      icon: Award,
      color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 2,
      title: 'Mastered 14 Flashcards in Box 5',
      subtitle: 'Extinction Burst, Continuous Measurement, Latency, DTT',
      time: '4 hours ago',
      icon: Layers,
      color: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 3,
      title: 'Socrates AI Ethics Roleplay Completed',
      subtitle: 'Resolved dual-relationship boundary dilemma with parent',
      time: 'Yesterday',
      icon: Brain,
      color: 'bg-blue-100 dark:bg-blue-950 text-[#2563EB] dark:text-blue-400',
    },
    {
      id: 4,
      title: 'Completed Domain C Skill Acquisition Drill',
      subtitle: 'Achieved 92% accuracy across C-01 to C-08 items',
      time: '2 days ago',
      icon: Sparkles,
      color: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Recent Activity Stream</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">Live Timeline</span>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
        {activities.map((item) => (
          <div key={item.id} className="relative flex items-start space-x-3 text-xs pl-1">
            <div className={`w-7 h-7 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm`}>
              <item.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
