'use client';

import React from 'react';
import { Flame, Calendar, Award } from 'lucide-react';

interface StreakCardProps {
  streakDays?: number; // e.g. 7
  activeDays?: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
}

export function StreakCard({ streakDays = 0, activeDays = [false, false, false, false, false, false, false] }: StreakCardProps) {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Flame className="w-6 h-6 fill-white animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-1.5">
              <span>{streakDays} Days</span>
              <span className="text-xs text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                {streakDays > 0 ? 'Active Streak!' : 'Start Streak'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Daily study habit streak</p>
          </div>
        </div>

        <div className="text-right text-xs">
          <div className="font-extrabold text-slate-700 dark:text-slate-300">Personal Record</div>
          <div className="text-amber-600 dark:text-amber-400 font-bold">{streakDays} Days</div>
        </div>
      </div>

      {/* Week Day Pills */}
      <div className="grid grid-cols-7 gap-1.5 pt-2">
        {weekDays.map((day, idx) => {
          const isActive = activeDays[idx];
          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <div
                className={`w-full py-2.5 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {isActive ? <Flame className="w-4 h-4 fill-slate-950" /> : day}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
