'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/auth-context';
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
  HelpCircle,
  Database,
} from 'lucide-react';

export default function StudyPlannerPage() {
  const { user } = useAuth();
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [examSessions, setExamSessions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rbt_exam_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setExamSessions(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load exam sessions in study planner:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const candidateName = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Candidate');
  const profile = getCandidateAdaptiveProfile(candidateName, certification, examSessions);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(profile.dailyTasks);

  const toggleTaskCompleted = (taskId: string) => {
    setDailyTasks(
      dailyTasks.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const hasExamData = examSessions.length > 0;

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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
                <Sparkles className="w-4 h-4 text-amber-300" />
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
            <div className="text-3xl font-black text-slate-900">
              {hasExamData ? `${profile.readinessScore}%` : '-- %'}
            </div>
            <Progress value={profile.readinessScore} colorClass="bg-[#2563EB]" size="sm" />
            <div className="text-[10px] text-emerald-600 font-bold">
              {hasExamData ? (profile.readinessScore >= 85 ? 'Passed Pass Threshold (85%)' : 'Target Pass Threshold: 85%') : 'Complete 1st Exam to Calculate'}
            </div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Predicted Pass Probability</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {hasExamData ? `${profile.predictedPassProbability}%` : '-- %'}
            </div>
            <Progress value={profile.predictedPassProbability} colorClass="bg-emerald-500" size="sm" />
            <div className="text-[10px] text-slate-500">
              {hasExamData ? `Based on ${profile.questionsAnsweredCount} Qs answered` : 'No exam history recorded yet'}
            </div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Current Study Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">{profile.streakDays} Day{profile.streakDays > 1 ? 's' : ''}</div>
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

              {!hasExamData ? (
                <div className="py-10 text-center space-y-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300 p-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">Candidate Diagnostic Baseline Pending</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your personalized weak topic queue will be generated automatically after you complete your first practice test or diagnostic quiz.
                    </p>
                  </div>
                  <Link href="/exam">
                    <Button variant="primary" size="sm" className="gap-2 shadow-md">
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Take 15-Min Diagnostic Test Now</span>
                    </Button>
                  </Link>
                </div>
              ) : profile.weakTopics.length === 0 ? (
                <div className="py-10 text-center space-y-3 bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">All Target Domains Above 85% Accuracy!</h4>
                  <p className="text-xs text-emerald-700">Great work! Your latest practice scores show strong mastery across all BACB domains.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.weakTopics.map((item) => (
                    <div
                      key={item.taskItemId}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 transition-all space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 rounded font-black text-[10px] bg-amber-100 text-amber-800">
                            {item.taskItemId} • Domain {item.domainId}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{item.topicName}</span>
                        </div>
                        <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.accuracyPercentage}% Accuracy
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">{item.recommendedAction}</p>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                        <span className="text-[10px] font-semibold text-slate-400">
                          Avg Time: {item.averageResponseTimeSeconds}s • Priority: {item.priorityScore}/100
                        </span>
                        <Link href="/tutor">
                          <Button variant="primary" size="sm" className="gap-1.5 text-xs font-bold py-1 h-8">
                            <Brain className="w-3.5 h-3.5" />
                            <span>Drill with Socrates AI</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Smart AI Recommendations (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>AI Smart Recommendations</span>
                </h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Live Engine</span>
              </div>

              <div className="space-y-3">
                {profile.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-[#2563EB] font-black">{rec.xpReward > 0 ? `+${rec.xpReward} XP REWARD` : 'RECOMMENDED'}</span>
                      <span className="text-slate-400">{rec.estimatedMinutes} Mins</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{rec.description}</p>

                    <Link href={rec.actionUrl} className="block pt-1">
                      <Button variant="outline" size="sm" className="w-full justify-between text-xs font-bold text-slate-700 hover:text-[#2563EB]">
                        <span>Launch Recommended Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Task Checklist */}
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Daily Study Checklist</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  {dailyTasks.filter((t) => t.isCompleted).length}/{dailyTasks.length} Completed
                </span>
              </div>

              <div className="space-y-2">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompleted(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      task.isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                        task.isCompleted ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                      }`}>
                        {task.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.title}
                        </div>
                        <div className="text-[10px] text-slate-500">{task.description}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      +{task.xpReward} XP
                    </span>
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
