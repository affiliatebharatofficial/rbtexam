'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCandidateAdaptiveProfile } from '@/lib/adaptive-learning-engine';
import { CertificationLevel, DailyTask } from '@/types/adaptive-learning';
import {
  Sparkles,
  Brain,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  Flame,
  ArrowRight,
  Zap,
  Target,
  Clock,
  Layers,
  ShieldCheck,
  TrendingUp,
  RotateCw,
  Plus,
} from 'lucide-react';

export default function StudyPlannerPage() {
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const profile = getCandidateAdaptiveProfile('default_user', certification);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(profile.dailyTasks);

  const toggleTaskCompleted = (taskId: string) => {
    setDailyTasks(
      dailyTasks.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const completedCount = dailyTasks.filter((t) => t.isCompleted).length;

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Adaptive Learning Engine Core</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Adaptive Study Planner & Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Real-time BACB exam readiness optimization for candidate <strong>{profile.fullName}</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Certification Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
              {(['RBT', 'BCaBA', 'BCBA'] as CertificationLevel[]).map((cert) => (
                <button
                  key={cert}
                  onClick={() => setCertification(cert)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    certification === cert ? 'bg-white text-[#2563EB] shadow font-black' : 'text-slate-600'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>

            <Link href="/exam">
              <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                <Sparkles className="w-4 h-4" />
                <span>Start Practice Test</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 4 Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Exam Readiness Score</span>
              <Award className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-3xl font-black text-slate-900">{profile.readinessScore}%</div>
            <Progress value={profile.readinessScore} colorClass="bg-[#2563EB]" size="sm" />
            <div className="text-[10px] text-emerald-600 font-bold">Passed Pass Threshold (85%)</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Predicted Pass Probability</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{profile.predictedPassProbability}%</div>
            <Progress value={profile.predictedPassProbability} colorClass="bg-emerald-500" size="sm" />
            <div className="text-[10px] text-slate-500">Based on 480 Qs answered</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Current Study Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">{profile.streakDays} Days</div>
            <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Target Exam Date: {profile.targetExamDate}</span>
            </div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Est. Hours Remaining</span>
              <Target className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">{profile.estimatedHoursRemaining} Hours</div>
            <div className="text-[10px] text-slate-500 font-medium">~3.5 hours / week velocity</div>
          </Card>
        </div>

        {/* Priority Weakness Remediation & Smart AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Priority Weak Topic Queue (7 Cols) */}
          <div className="lg:col-span-7">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span>Priority Weak Topic Remediation Queue</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automatically detected BACB task items scoring below candidate benchmark.
                  </p>
                </div>

                <Badge variant="amber" className="text-xs font-bold text-amber-600 border-amber-300">
                  {profile.weakTopics.length} Target Weakness
                </Badge>
              </div>

              <div className="space-y-4">
                {profile.weakTopics.map((item) => (
                  <div key={item.taskItemId} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 font-extrabold text-[#2563EB]">
                        <span className="px-2 py-0.5 rounded bg-blue-100">{item.taskItemId}</span>
                        <span>Domain {item.domainId}</span>
                      </div>
                      <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {item.accuracyPercentage}% Accuracy
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{item.topicName}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.recommendedAction}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="text-[11px] text-slate-400 font-mono">
                        Avg Time: {item.averageResponseTimeSeconds}s • Priority: {item.priorityScore}/100
                      </div>

                      <Link href="/tutor">
                        <Button variant="primary" size="sm" className="gap-1.5 text-xs shadow-md">
                          <Brain className="w-3.5 h-3.5" />
                          <span>Drill with Socrates AI</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Smart Recommendations (5 Cols) */}
          <div className="lg:col-span-5">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>AI Smart Recommendations</span>
                </h3>
                <span className="text-[11px] font-bold text-[#2563EB]">Live Engine</span>
              </div>

              <div className="space-y-4">
                {profile.recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">
                        +{rec.xpReward} XP REWARD
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">{rec.estimatedMinutes} Mins</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>

                    <div className="pt-2">
                      <Link href={rec.actionUrl}>
                        <Button variant="outline" size="sm" className="w-full justify-between text-xs">
                          <span>Launch Recommended Action</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

        {/* Daily Study Plan Checklist & Achievement Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Daily Study Plan Checklist (7 Cols) */}
          <div className="lg:col-span-7">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#2563EB]" />
                    <span>Today's Adaptive Study Checklist</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Completed {completedCount} of {dailyTasks.length} tasks scheduled for today.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {Math.round((completedCount / dailyTasks.length) * 100)}% Complete
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {dailyTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTaskCompleted(t.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      t.isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 opacity-75'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                        t.isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {t.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div>
                        <h4 className={`text-xs sm:text-sm font-bold ${t.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {t.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">{t.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">
                        +{t.xpReward} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Achievement Badges Grid (5 Cols) */}
          <div className="lg:col-span-5">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Achievement Badges</span>
                </h3>
                <span className="text-xs text-slate-500 font-bold">3 Unlocked</span>
              </div>

              <div className="space-y-4">
                {profile.badges.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/40 flex items-center space-x-3 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                      <Award className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{b.title}</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">UNLOCKED</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}
