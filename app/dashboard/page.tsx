'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReadinessRing } from '@/components/dashboard/readiness-ring';
import { StreakCard } from '@/components/dashboard/streak-card';
import { TodayGoal } from '@/components/dashboard/today-goal';
import { WeakStrongTopics } from '@/components/dashboard/weak-strong-topics';
import { FlashcardsSummary } from '@/components/dashboard/flashcards-summary';
import { RecentTestsTable } from '@/components/dashboard/recent-tests-table';
import { RecentActivityFeed } from '@/components/dashboard/recent-activity-feed';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { Sparkles, Brain, Flame, Sun, Moon, Calendar, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const readinessScore = user?.readinessScore || 88;
  const targetScore = user?.targetScore || 90;
  const passLikelihood = user?.estimatedPassLikelihood || 94;

  return (
    <ProtectedRoute>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-900'}`}>
        <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Top Bar: User Greeting & Dark Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant="blue" className="gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BACB 2nd Edition Certified Target</span>
                </Badge>
                <span className="text-xs font-bold text-slate-400">Scheduled: {user?.targetExamDate || '2026-09-15'}</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight mt-1 text-slate-900 dark:text-white">
                Candidate Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Real-time BACB exam pass likelihood analytics for <strong>{user?.fullName || 'Sarah Jenkins'}</strong>.
              </p>
            </div>

            {/* Dark Mode Toggle Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm flex items-center space-x-2 text-xs font-bold"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span>Dark Theme</span>
                  </>
                )}
              </button>

              <Link href="/exam">
                <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span>Start Mock Exam</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Action Launchers Grid */}
          <QuickActions />

          {/* Main Top Cards: Exam Readiness, Study Streak, Today's Goal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Exam Readiness Ring Card (4 Cols) */}
            <div className="lg:col-span-4">
              <Card glass className={`p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80 h-full flex flex-col justify-between`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
                    <Award className="w-4 h-4" />
                    <span>Exam Readiness Gauge</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    Pass Guaranteed
                  </span>
                </div>

                <ReadinessRing score={readinessScore} targetScore={targetScore} passLikelihood={passLikelihood} />
              </Card>
            </div>

            {/* Study Streak Card (4 Cols) */}
            <div className="lg:col-span-4">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80 h-full">
                <StreakCard streakDays={7} />
              </Card>
            </div>

            {/* Today's Goal Checklist (4 Cols) */}
            <div className="lg:col-span-4">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80 h-full">
                <TodayGoal />
              </Card>
            </div>
          </div>

          {/* Performance Analytics & Weak/Strong BACB Topics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Analytics Trend Chart (7 Cols) */}
            <div className="lg:col-span-7">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80">
                <PerformanceChart />
              </Card>
            </div>

            {/* Flashcards Progress Summary (5 Cols) */}
            <div className="lg:col-span-5">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80">
                <FlashcardsSummary />
              </Card>
            </div>
          </div>

          {/* Priority Focus Areas (Weak & Strong Topics) */}
          <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80">
            <WeakStrongTopics />
          </Card>

          {/* Recent Test Attempts & Activity Feed Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Exam Attempts Table (7 Cols) */}
            <div className="lg:col-span-7">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80">
                <RecentTestsTable />
              </Card>
            </div>

            {/* Recent Activity Stream (5 Cols) */}
            <div className="lg:col-span-5">
              <Card glass className="p-6 shadow-xl border-white/80 dark:border-slate-800 dark:bg-slate-900/80">
                <RecentActivityFeed />
              </Card>
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
