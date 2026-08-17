'use client';

import React, { useState, useEffect } from 'react';
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
import { TrialBanner } from '@/components/dashboard/trial-banner';
import { Sparkles, Brain, Flame, Sun, Moon, Calendar, ShieldCheck, ArrowRight, Award, Users } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [examSessions, setExamSessions] = useState<any[]>([]);

  const loadSessions = () => {
    try {
      const stored = localStorage.getItem('rbt_exam_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setExamSessions(parsed);
      }
    } catch (e) {
      console.error('Failed to load exam sessions:', e);
    }
  };

  useEffect(() => {
    loadSessions();
    window.addEventListener('rbt_exam_session_saved', loadSessions);
    return () => window.removeEventListener('rbt_exam_session_saved', loadSessions);
  }, []);

  let readinessScore = user?.readinessScore ?? 0;
  let passLikelihood = user?.estimatedPassLikelihood ?? 0;

  if (examSessions.length > 0) {
    const totalScoreSum = examSessions.reduce((acc, s) => acc + (Number(s.score) || 0), 0);
    readinessScore = Math.round(totalScoreSum / examSessions.length);
    const passedCount = examSessions.filter((s) => Number(s.score) >= 85).length;
    passLikelihood = Math.round((passedCount / examSessions.length) * 100);
  }

  const targetScore = user?.targetScore ?? 90;

  return (
    <ProtectedRoute>
      <div className={`flex-1 w-full transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-900'}`}>
        <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* 7-Day Free Pro Access Trial Banner */}
          <TrialBanner />

          {/* Top Bar: User Greeting & Dark Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant="blue" className="gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BACB RBT 3rd Edition Certified Target</span>
                </Badge>
                <span className="text-xs font-bold text-slate-400">Scheduled: {user?.targetExamDate || 'Not Scheduled'}</span>
                {(user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'clinic_admin') && (
                  <Badge variant="purple" className="bg-purple-100 text-purple-800 font-extrabold border-purple-200">
                    Enterprise VIP Active
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-black tracking-tight mt-1 text-slate-900 dark:text-white">
                Candidate Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Real-time BACB exam pass likelihood analytics for <strong>{user?.fullName || 'Candidate'}</strong>.
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

          {/* ENTERPRISE VIP HERO BANNER */}
          {(user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'clinic_admin') && (
            <Card glass className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-amber-400 text-slate-950 font-black px-3 py-1 flex items-center space-x-1.5 shadow-md shadow-amber-400/20">
                    <Award className="w-4 h-4 text-slate-950" />
                    <span>ENTERPRISE VIP ACCESS UNLOCKED</span>
                  </Badge>
                  <span className="text-xs font-semibold text-indigo-200">Unlimited Multi-Model AI & Oversight</span>
                </div>
                <h2 className="text-xl font-black text-white">
                  Welcome to Enterprise VIP Status, {user?.fullName || 'Valued Partner'}!
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Your account is upgraded to Enterprise VIP. You have unlimited access to Socrates Socratic AI Tutor, Leitner Smart Flashcards Engine, BACB RBT 3rd Edition Exam Simulator, and B2B Clinic Cohort Supervision Oversight Hub.
                </p>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <Link href="/clinic">
                  <Button variant="primary" size="md" className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 font-extrabold shadow-lg shadow-blue-500/30">
                    <Users className="w-4 h-4" />
                    <span>Open B2B Clinic Hub</span>
                  </Button>
                </Link>
              </div>
            </Card>
          )}

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
