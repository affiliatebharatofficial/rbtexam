'use client';

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface QuestionSourceDisclosureProps {
  compact?: boolean;
  className?: string;
}

export function QuestionSourceDisclosure({ compact = false, className = '' }: QuestionSourceDisclosureProps) {
  if (compact) {
    return (
      <div className={`p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-start space-x-2 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="leading-snug">
          <strong>Independent Practice Material:</strong> Questions on RBTPracticeAI are original practice questions created for educational preparation and are not official BACB examination questions.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/50 text-xs text-blue-900 dark:text-blue-200 flex items-start space-x-3 ${className}`}>
      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
      <div className="space-y-1">
        <div className="font-bold flex items-center space-x-1.5 text-blue-950 dark:text-blue-100">
          <span>Original Practice & Preparation Notice</span>
        </div>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          Questions on RBTPracticeAI are original practice items created for educational preparation and are not official BACB® examination questions. RBTPracticeAI is an independent educational platform and is not sponsored, approved, or endorsed by the Behavior Analyst Certification Board® (BACB®) or Pearson VUE®.
        </p>
      </div>
    </div>
  );
}
