'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Clock, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentTestsTable() {
  const attempts = [
    { id: 'session_891', mode: 'Full 85-Q Mock Exam #4', score: 88, passed: true, duration: '68 mins', date: 'Today, 2:15 PM', domain: '85/85 Qs' },
    { id: 'session_890', mode: 'Domain C Skill Acquisition Drill', score: 92, passed: true, duration: '14 mins', date: 'Yesterday', domain: '15/15 Qs' },
    { id: 'session_889', mode: 'Full 85-Q Mock Exam #3', score: 81, passed: false, duration: '74 mins', date: 'Aug 4, 2026', domain: '85/85 Qs' },
    { id: 'session_888', mode: 'Baseline 15-Q Diagnostic', score: 86, passed: true, duration: '12 mins', date: 'Aug 1, 2026', domain: '15/15 Qs' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Exam Attempts</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review past score breakdowns and rationales</p>
        </div>

        <Link href="/exam">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <span>Start New Exam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Exam Mode</th>
              <th className="py-3 px-3">Score</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Time Spent</th>
              <th className="py-3 px-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
            {attempts.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>{item.mode}</span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`font-black text-sm ${item.score >= 85 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {item.score}%
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  {item.passed ? (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>PASS READY</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      <XCircle className="w-3 h-3 text-amber-600" />
                      <span>RETRY DRILL</span>
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-slate-500 font-mono">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.duration}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right text-slate-400 font-mono text-[11px]">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
