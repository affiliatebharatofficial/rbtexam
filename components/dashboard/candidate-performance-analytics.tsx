'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/auth-context';
import { getCandidatePerformanceProfile, CandidatePerformanceProfile } from '@/lib/candidate-performance-engine';
import {
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Brain,
  Clock,
  ArrowRight,
  TrendingUp,
  RotateCw,
  Star,
  Target,
  BarChart2,
  History,
} from 'lucide-react';

export function CandidatePerformanceAnalyticsView() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CandidatePerformanceProfile | null>(null);

  const reloadProfile = () => {
    const name = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Candidate');
    const email = user?.email || 'candidate@rbtexam.com';
    const currentProfile = getCandidatePerformanceProfile('usr_current', name, email);
    setProfile(currentProfile);
  };

  useEffect(() => {
    reloadProfile();
  }, [user]);

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Top XP Points & Candidate Rank Banner */}
      <Card glass className="p-6 sm:p-8 border-white/90 shadow-2xl space-y-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>LEVEL {profile.level}: {profile.levelTitle}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] flex items-center space-x-1">
                <Flame className="w-3 h-3" />
                <span>{profile.streakDays} Day Streak</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {profile.candidateName}'s Performance & XP Headquarters
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Earn XP points by completing daily study checklist tasks, taking timed practice tests, and clearing 85%+ exam pass benchmarks.
            </p>
          </div>

          {/* XP Score Circle Badge */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1 min-w-[180px] shadow-xl">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Total Earned XP</div>
            <div className="text-4xl font-black text-amber-400">{profile.totalXP.toLocaleString()} XP</div>
            <div className="text-[10px] text-slate-300">Next Rank at {profile.nextLevelXP.toLocaleString()} XP</div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="space-y-2 relative z-10 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Level {profile.level} Progression</span>
            <span>{profile.levelProgressPercentage}% to Level {profile.level + 1}</span>
          </div>
          <Progress value={profile.levelProgressPercentage} colorClass="bg-gradient-to-r from-amber-400 to-amber-500" size="md" />
        </div>
      </Card>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Mock Exams Passed</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {profile.examsPassed} / {profile.examsCompleted}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">85%+ Passing Benchmark</div>
        </Card>

        <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Overall Questions Answered</span>
            <Target className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {profile.totalQuestionsAnswered} Qs
          </div>
          <div className="text-[10px] text-slate-400 font-medium">Across Timed & Study Modes</div>
        </Card>

        <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Overall Accuracy Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600">
            {profile.overallAccuracyPercentage}%
          </div>
          <Progress value={profile.overallAccuracyPercentage} colorClass="bg-indigo-600" size="sm" />
        </Card>

        <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Badges Unlocked</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">
            {profile.unlockedBadgeIds.length} / {profile.badges.length}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">Unlocked Trophies</div>
        </Card>
      </div>

      {/* Badges Showcase & XP Reward Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Badges Showcase Grid (7 Cols) */}
        <div className="lg:col-span-7">
          <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Candidate Badges & Milestone Trophies</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Earn XP bonuses and unlock achievements by completing exam milestones.
                </p>
              </div>

              <Badge variant="amber" className="text-xs font-bold">
                {profile.unlockedBadgeIds.length} Unlocked
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    badge.isUnlocked
                      ? 'bg-amber-50/50 border-amber-200 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      badge.isUnlocked ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-200 text-slate-400'
                    }`}>
                      🏆
                    </div>

                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      badge.isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      +{badge.xpBonus} XP
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{badge.description}</p>
                  </div>

                  <div className="pt-2 text-[10px] font-extrabold flex items-center justify-between border-t border-slate-200/50">
                    <span className={badge.isUnlocked ? 'text-emerald-700' : 'text-slate-400'}>
                      {badge.isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Realtime XP Audit Log (5 Cols) */}
        <div className="lg:col-span-5">
          <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                <History className="w-4 h-4 text-[#2563EB]" />
                <span>XP Points Reward Log</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Live Stream</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {profile.xpHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {item.type} REWARD
                    </span>
                    <span className="text-xs font-black text-amber-600">+{item.amount} XP</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{item.reason}</p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
