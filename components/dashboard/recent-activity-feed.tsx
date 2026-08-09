'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle2, Layers, Award, Clock, Activity } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export function RecentActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);

  const loadActivities = () => {
    try {
      const stored = localStorage.getItem('rbt_activity_stream');
      if (stored) {
        setActivities(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load activity stream', e);
    }
  };

  useEffect(() => {
    loadActivities();
    window.addEventListener('rbt_exam_session_saved', loadActivities);
    return () => window.removeEventListener('rbt_exam_session_saved', loadActivities);
  }, []);

  if (activities.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Recent Activity Stream</span>
          </h3>
        </div>
        <EmptyState
          icon={Activity}
          title="No Activity Logged"
          description="Your study sessions, flashcards reviews, and AI tutor interactions will be tracked here in real-time."
          badgeLabel="Timeline Empty"
        />
      </div>
    );
  }

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
