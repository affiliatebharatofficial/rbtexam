'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Root Error caught by app/global-error.tsx:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Application Error
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              A temporary interface error occurred. Please refresh or navigate back to the home screen.
            </p>
            {error?.digest && (
              <p className="text-[10px] text-slate-500 font-mono bg-slate-800/80 py-1 px-2 rounded-lg inline-block">
                Ref: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={() => { window.location.href = '/dashboard'; }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
