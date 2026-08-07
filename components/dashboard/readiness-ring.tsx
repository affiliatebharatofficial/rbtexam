'use client';

import React from 'react';
import { Award, Zap, ShieldCheck } from 'lucide-react';

interface ReadinessRingProps {
  score: number; // e.g. 88
  targetScore?: number; // e.g. 90
  passLikelihood?: number; // e.g. 94
}

export function ReadinessRing({ score, targetScore = 90, passLikelihood = 94 }: ReadinessRingProps) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      {/* SVG Ring Container */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress Ring Gradient */}
          <defs>
            <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#readinessGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-0.5">
          <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {score}%
          </div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Readiness
          </span>
          <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 mt-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Pass Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
        <div>
          <div className="text-slate-400 dark:text-slate-500 font-medium">Target Score</div>
          <div className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{targetScore}%</div>
        </div>
        <div>
          <div className="text-slate-400 dark:text-slate-500 font-medium">Pass Probability</div>
          <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{passLikelihood}%</div>
        </div>
      </div>
    </div>
  );
}
