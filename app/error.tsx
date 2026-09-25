'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console and telemetry
    console.error('Unhandled Next.js application error caught by app/error.tsx:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Something went wrong
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The application encountered a temporary display issue. You can reload the view or return to the main dashboard.
          </p>
          {error?.digest && (
            <p className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800/80 py-1 px-2 rounded-lg inline-block">
              Code: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => reset()}
            className="w-full gap-2 justify-center shadow-lg shadow-blue-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => { window.location.href = '/dashboard'; }}
            className="w-full gap-2 justify-center"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>RBT Practice AI • System Protected</span>
        </div>
      </div>
    </div>
  );
}
