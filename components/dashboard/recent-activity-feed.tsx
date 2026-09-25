'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle2, Layers, Award, Clock, Activity, BookOpen } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export function RecentActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);

  const loadActivities = () => {
    try {
      const stored = localStorage.getItem('rbt_activity_stream');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setActivities(parsed);
        }
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

  const getActivityIcon = (type?: string) => {
    switch (type) {
      case 'exam':
        return Award;
      case 'flashcard':
        return Layers;
      case 'tutor':
        return Brain;
      case 'quiz':
        return CheckCircle2;
      case 'study':
        return BookOpen;
      default:
        return Sparkles;
    }
  };

  const getActivityColor = (type?: string, score?: number) => {
    if (type === 'exam') {
      return (score ?? 0) >= 80
        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
        : 'bg-blue-100 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400';
    }
    if (type === 'flashcard') {
      return 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400';
    }
    if (type === 'tutor') {
      return 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400';
    }
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  };

  const formatActivityTime = (item: any) => {
    if (item.time) return item.time;
    if (item.timestamp) {
      try {
        const d = new Date(item.timestamp);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      } catch (e) {}
    }
    return 'Recently';
  };

  if (!activities || activities.length === 0) {
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
        {activities.map((item, idx) => {
          const IconComp = getActivityIcon(item?.type);
          const colorClass = item?.color || getActivityColor(item?.type, item?.score);
          const timeText = formatActivityTime(item);
          const subtitleText =
            item?.subtitle ||
            (item?.score !== undefined ? `Diagnostic Score: ${item.score}%` : 'Study activity recorded');

          return (
            <div key={item?.id || idx} className="relative flex items-start space-x-3 text-xs pl-1">
              <div
                className={`w-7 h-7 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm`}
              >
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item?.title || 'Practice Session'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{timeText}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{subtitleText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

