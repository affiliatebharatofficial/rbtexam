'use client';

import React from 'react';

interface EmergencyFallbackProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const EmergencyFallback: React.FC<EmergencyFallbackProps> = ({
  title = 'System Maintenance Mode Engaged',
  description = 'RBTTrainingAI is currently undergoing scheduled platform upgrades to ensure peak reliability. We will return shortly.',
  onRetry,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-3xl">
          ⚙️
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="pt-2 flex flex-col gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Check System Status Again
            </button>
          )}
          <a
            href="https://status.rbttraining.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors"
          >
            Visit Live Status Dashboard &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
