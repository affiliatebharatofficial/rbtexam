'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/language-context';
import { Question } from '@/types/exam';
import { SAMPLE_BACB_QUESTIONS, generateExamQuestions, convertMasterQuestionsToExamQuestions } from '@/lib/sample-questions';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';
import { awardCandidateXP } from '@/lib/candidate-performance-engine';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Bookmark,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Zap,
  Brain,
  ShieldCheck,
  Play,
  Pause,
  AlertCircle,
  FileText,
  HelpCircle,
  Check,
  X,
} from 'lucide-react';

type ExamPhase = 'setup' | 'active' | 'review_drawer' | 'results';
type ExamMode = 'timed' | 'untimed';
type QuestionCount = 20 | 50 | 85 | 100;

const EXAM_STORAGE_KEY = 'rbt_exam_active_session_v2';

export default function ExamPage() {
  const { language, t } = useLanguage();
  // Setup State
  const [phase, setPhase] = useState<ExamPhase>('setup');
  const [mode, setMode] = useState<ExamMode>('timed');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(85);
  const [domainFocus, setDomainFocus] = useState<string>('ALL');

  // Active Exam State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(5400); // 90 mins default
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);

  // Results Review Filter State
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'bookmarked'>('all');
  const [showExplanationId, setShowExplanationId] = useState<string | null>(null);

  // Check LocalStorage for saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(EXAM_STORAGE_KEY);
      if (saved) {
        setHasSavedSession(true);
      }
    } catch (e) {
      console.error('Failed to load saved session', e);
    }
  }, []);

  // Timer countdown hook for active exam phase
  useEffect(() => {
    if (phase !== 'active' || mode === 'untimed' || isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit(); // Auto submit on timer expiration
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, mode, isPaused]);

  // Start new exam session with live DB questions
  const handleStartExam = async () => {
    let convertedQuestions: Question[] = [];
    try {
      const res = await fetch(`/api/questions?limit=100&certification=RBT&status=published`);
      if (res.ok) {
        const json = (await res.json()) as any;
        if (json && json.data && Array.isArray(json.data) && json.data.length > 0) {
          convertedQuestions = convertMasterQuestionsToExamQuestions(json.data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch live DB questions for exam:', e);
    }

    const generated = generateExamQuestions(questionCount, domainFocus, convertedQuestions);
    setQuestions(generated);
    setCurrentIndex(0);
    setUserAnswers({});
    setBookmarkedIds([]);
    // Set 90 mins for 85/100 Qs; 50 mins for 50 Qs; 20 mins for 20 Qs
    const allocatedSeconds = questionCount === 100 ? 6000 : questionCount === 85 ? 5400 : questionCount === 50 ? 3000 : 1200;
    setTimeRemaining(allocatedSeconds);
    setIsPaused(false);
    setPhase('active');
    localStorage.removeItem(EXAM_STORAGE_KEY);
  };

  // Resume saved session with live DB validation
  const handleResumeSession = async () => {
    try {
      const saved = localStorage.getItem(EXAM_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify questions still exist in live database
        const res = await fetch(`/api/questions?limit=100&certification=RBT&status=published`);
        if (res.ok) {
          const json = (await res.json()) as any;
          const dbQuestionIds = new Set((json?.data || []).map((q: any) => q.id));
          const validQuestions = (parsed.questions || []).filter((q: Question) => dbQuestionIds.has(q.id));

          if (validQuestions.length > 0) {
            setQuestions(validQuestions);
            setCurrentIndex(Math.min(parsed.currentIndex || 0, validQuestions.length - 1));
            setUserAnswers(parsed.userAnswers || {});
            setBookmarkedIds(parsed.bookmarkedIds || []);
            setTimeRemaining(parsed.timeRemaining || 5400);
            setMode(parsed.mode || 'timed');
            setQuestionCount(parsed.questionCount || 85);
            setPhase('active');
            return;
          }
        }
      }
    } catch (e) {
      console.error('Failed to validate saved session:', e);
    }
    // If DB is empty or questions were deleted, clear saved session state
    localStorage.removeItem(EXAM_STORAGE_KEY);
    setHasSavedSession(false);
    handleStartExam();
  };

  // Save session to localStorage
  const saveProgress = () => {
    try {
      const sessionData = {
        questions,
        currentIndex,
        userAnswers,
        bookmarkedIds,
        timeRemaining,
        mode,
        questionCount,
        domainFocus,
        timestamp: Date.now(),
      };
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {
      console.error('Failed to save session state', e);
    }
  };

  // Select Option
  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...userAnswers, [questionId]: optionId };
    setUserAnswers(updated);
    saveProgress();
  };

  // Toggle Bookmark
  const handleToggleBookmark = (questionId: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      return updated;
    });
    saveProgress();
  };

  // Final Submit
  const handleFinalSubmit = () => {
    setPhase('results');
    localStorage.removeItem(EXAM_STORAGE_KEY);

    // Calculate score & domain breakdown
    let correct = 0;
    const domainScores: Record<string, { total: number; correct: number }> = {
      A: { total: 0, correct: 0 },
      B: { total: 0, correct: 0 },
      C: { total: 0, correct: 0 },
      D: { total: 0, correct: 0 },
      E: { total: 0, correct: 0 },
      F: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const dom = q.domainId || 'A';
      if (!domainScores[dom]) domainScores[dom] = { total: 0, correct: 0 };
      domainScores[dom].total += 1;

      if (userAnswers[q.id] === q.correctOptionId) {
        correct += 1;
        domainScores[dom].correct += 1;
      }
    });

    const percentage = Math.round((correct / (questions.length || 1)) * 100);

    // Save Completed Exam Session to Persistent LocalStorage & Database
    const newSession = {
      id: `session_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      score: percentage,
      totalQuestions: questions.length,
      correctCount: correct,
      timeSpentSeconds: 5400 - timeRemaining,
      mode,
      certification: 'RBT',
      domainBreakdown: domainScores,
    };

    try {
      const existing = localStorage.getItem('rbt_exam_sessions');
      let sessionsList = [];
      if (existing) {
        try { sessionsList = JSON.parse(existing); } catch (e) {}
      }
      if (!Array.isArray(sessionsList)) sessionsList = [];
      sessionsList.unshift(newSession);
      localStorage.setItem('rbt_exam_sessions', JSON.stringify(sessionsList));

      // Append to Activity Feed Stream
      const newActivity = {
        id: `act_${Date.now()}`,
        title: `Completed ${questions.length}-Question Practice Exam (${percentage}%)`,
        timestamp: new Date().toISOString(),
        type: 'exam',
        score: percentage,
      };
      const existingAct = localStorage.getItem('rbt_activity_stream');
      let actList = [];
      if (existingAct) { try { actList = JSON.parse(existingAct); } catch (e) {} }
      if (!Array.isArray(actList)) actList = [];
      actList.unshift(newActivity);
      localStorage.setItem('rbt_activity_stream', JSON.stringify(actList.slice(0, 30)));

      window.dispatchEvent(new Event('rbt_exam_session_saved'));
    } catch (e) {
      console.error('Failed to save completed exam session:', e);
    }

    // Calculate & Award XP
    let xpEarned = 200; // Base completion
    let xpReason = `Completed ${questions.length}-Question Practice Exam (${percentage}%)`;

    if (percentage >= 85) {
      xpEarned += 500;
      xpReason = `🎉 PASSED ${questions.length}-Q Exam (${percentage}%) - Pass Threshold Bonus!`;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    if (percentage >= 95) {
      xpEarned += 300;
      xpReason = `🏆 OUTSTANDING ${questions.length}-Q Exam (${percentage}%) - High Mastery Bonus!`;
    }

    awardCandidateXP(xpEarned, xpReason, 'exam');
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const isBookmarked = currentQ && bookmarkedIds.includes(currentQ.id);

  // Formatting helpers
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate results metrics
  const getResultsSummary = () => {
    let correct = 0;
    const domainScores: Record<string, { total: number; correct: number }> = {
      A: { total: 0, correct: 0 },
      B: { total: 0, correct: 0 },
      C: { total: 0, correct: 0 },
      D: { total: 0, correct: 0 },
      E: { total: 0, correct: 0 },
      F: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const dom = q.domainId;
      if (!domainScores[dom]) domainScores[dom] = { total: 0, correct: 0 };
      domainScores[dom].total += 1;

      if (userAnswers[q.id] === q.correctOptionId) {
        correct += 1;
        domainScores[dom].correct += 1;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const isPassed = percentage >= 85;

    return { correct, percentage, isPassed, domainScores };
  };

  const results = phase === 'results' ? getResultsSummary() : null;

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">

        {/* PHASE 1: SETUP SCREEN */}
        {phase === 'setup' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <Badge variant="blue" className="gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BACB RBT 3rd Edition Exam Simulator</span>
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                RBT Practice Test Engine
              </h1>
              <p className="text-sm text-slate-600">
                Simulate official Pearson VUE test conditions or practice in untimed Socratic study mode.
              </p>
            </div>

            {hasSavedSession && (
              <Card glass className="p-6 border-blue-200 bg-blue-50/60 flex items-center justify-between shadow-md">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Unfinished Exam Session Found</h4>
                  <p className="text-xs text-slate-600">You have an in-progress exam session saved on this device.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button onClick={() => localStorage.removeItem(EXAM_STORAGE_KEY)} variant="outline" size="sm" className="text-xs">
                    Discard
                  </Button>
                  <Button onClick={handleResumeSession} variant="primary" size="sm" className="gap-1 text-xs shadow-md">
                    <span>Resume Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            )}

            <Card glass className="p-8 shadow-2xl border-white/90 space-y-8">
              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Exam Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setMode('timed')}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      mode === 'timed'
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xl scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Clock className={`w-5 h-5 ${mode === 'timed' ? 'text-blue-400' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                        Official Simulation
                      </span>
                    </div>
                    <h3 className="text-sm font-bold">Timed Exam Mode</h3>
                    <p className="text-xs opacity-80 mt-1">
                      Strict countdown timer with Pearson VUE scoring rules. Rationales revealed after submission.
                    </p>
                  </button>

                  <button
                    onClick={() => setMode('untimed')}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      mode === 'untimed'
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xl scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Brain className={`w-5 h-5 ${mode === 'untimed' ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        Socratic Study
                      </span>
                    </div>
                    <h3 className="text-sm font-bold">Untimed Study Mode</h3>
                    <p className="text-xs opacity-80 mt-1">
                      No timer pressure. Instant option explanations and Socratic AI rationale on demand.
                    </p>
                  </button>
                </div>
              </div>

              {/* Question Count Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Question Count
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {([20, 50, 85, 100] as QuestionCount[]).map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`p-4 rounded-xl text-center border font-bold transition-all text-xs ${
                        questionCount === count
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-lg font-black">{count} Qs</div>
                      <div className="text-[10px] opacity-80 font-normal">
                        {count === 85 ? 'Official BACB Length' : count === 100 ? 'Extended Mock' : `${count * 1.1} Mins`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Domain Filter */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Domain Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => setDomainFocus('ALL')}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      domainFocus === 'ALL'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    All Domains A-F
                  </button>
                  {BACB_TASK_LIST_3RD_EDITION.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDomainFocus(d.id)}
                      className={`p-3 rounded-xl border text-left font-semibold transition-all truncate ${
                        domainFocus === d.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      Domain {d.id}: {d.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Launch Exam CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Backed by 100% Money-Back Pass Guarantee</span>
                </div>
                <Button onClick={handleStartExam} variant="primary" size="lg" className="gap-2 shadow-xl shadow-blue-500/25 px-8">
                  <span>Start Practice Exam</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* PHASE 2: ACTIVE EXAM SIMULATION */}
        {phase === 'active' && (!currentQ || questions.length === 0) && (
          <div className="max-w-xl mx-auto py-12">
            <Card glass className="p-8 text-center space-y-4 border-white/90 shadow-xl">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Published Questions Available</h3>
              <p className="text-sm text-slate-600">
                All questions are currently set to Draft in the Super Admin CMS. Publish questions in the Admin panel to make them active for candidate practice exams.
              </p>
              <Button onClick={() => setPhase('setup')} variant="outline" className="mt-4">
                Back to Setup
              </Button>
            </Card>
          </div>
        )}

        {phase === 'active' && currentQ && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Top Exam Status Bar */}
            <Card glass className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/90 shadow-lg">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#2563EB] font-bold text-xs">
                  {currentQ.taskItemId.includes('3rd Edition')
                    ? currentQ.taskItemId
                    : `BACB RBT 3rd Edition TCO Item ${currentQ.taskItemId.replace(/2nd Edition/gi, '3rd Edition')}`}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Domain {currentQ.domainId}: Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Timer Clock */}
                {mode === 'timed' ? (
                  <div className={`flex items-center space-x-1.5 font-mono text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    timeRemaining < 300
                      ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    Untimed Study Mode
                  </span>
                )}

                {/* Bookmark Toggle */}
                <button
                  onClick={() => handleToggleBookmark(currentQ.id)}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1 border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                  <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                {/* Review Drawer Trigger */}
                <Button onClick={() => setPhase('review_drawer')} variant="outline" size="sm" className="text-xs gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Review ({answeredCount}/{questions.length})</span>
                </Button>
              </div>
            </Card>

            {/* Main Question Card */}
            <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  {currentQ.scenarioText}
                </p>

                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  {currentQ.questionText}
                </h3>
              </div>

              {/* Option List */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.id;
                  const hasAnswered = Boolean(userAnswers[currentQ.id]);
                  const isCorrectOpt = opt.id === currentQ.correctOptionId;

                  let buttonStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';
                  let badgeStyle = 'bg-slate-100 text-slate-700';
                  let icon = isSelected ? <Check className="w-5 h-5 text-[#2563EB] flex-shrink-0" /> : null;

                  if (mode === 'untimed' && hasAnswered) {
                    if (isCorrectOpt) {
                      buttonStyle = 'border-2 border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold shadow-md';
                      badgeStyle = 'bg-emerald-600 text-white';
                      icon = (
                        <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-extrabold flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Correct</span>
                        </div>
                      );
                    } else if (isSelected) {
                      buttonStyle = 'border-2 border-rose-500 bg-rose-50/90 text-rose-950 font-bold shadow-md';
                      badgeStyle = 'bg-rose-600 text-white';
                      icon = (
                        <div className="flex items-center space-x-1.5 text-xs text-rose-700 font-extrabold flex-shrink-0">
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Your Selection</span>
                        </div>
                      );
                    } else {
                      buttonStyle = 'border-slate-200 bg-white/60 text-slate-400 opacity-60';
                      badgeStyle = 'bg-slate-100 text-slate-400';
                    }
                  } else if (isSelected) {
                    buttonStyle = 'border-2 border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-bold shadow-md';
                    badgeStyle = 'bg-[#2563EB] text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs ${badgeStyle}`}>
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Untimed Study Mode Instant Rationale & Socratic Guidance */}
              {mode === 'untimed' && userAnswers[currentQ.id] && (
                <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-3 animate-fadeIn ${
                  userAnswers[currentQ.id] === currentQ.correctOptionId
                    ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-extrabold text-xs sm:text-sm">
                      {userAnswers[currentQ.id] === currentQ.correctOptionId ? (
                        <span className="flex items-center space-x-1.5 text-emerald-700">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Correct Answer! (+10 XP)</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1.5 text-rose-700">
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Incorrect — Correct Answer is Option {currentQ.correctOptionId}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                      BACB Item {currentQ.taskItemId}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center space-x-2 font-bold text-[#2563EB]">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Socrates AI Clinical Rationale & Explanation:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-normal">
                      {currentQ.aiExplanationDetail}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Domain {currentQ.domainId}: BACB Task List 3rd Edition
                    </span>
                    <Link
                      href={`/tutor?q=${encodeURIComponent(`Explain BACB task list question: ${currentQ.questionText}`)}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                        <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Ask Socrates AI for Deeper Rationale</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <Button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  variant="outline"
                  size="md"
                  className="gap-1.5 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  {currentIndex < questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      variant="primary"
                      size="md"
                      className="gap-1.5 text-xs shadow-md"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={() => setPhase('review_drawer')} variant="primary" size="md" className="gap-1.5 text-xs shadow-xl shadow-blue-500/25">
                      <span>Complete & Review</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* PHASE 3: PRE-SUBMIT REVIEW DRAWER MODAL */}
        {phase === 'review_drawer' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Exam Summary & Review Grid</h2>
                  <p className="text-xs text-slate-500">
                    Verify all questions before submitting for final score calculation.
                  </p>
                </div>
                <Button onClick={() => setPhase('active')} variant="outline" size="sm" className="text-xs">
                  Back to Question {currentIndex + 1}
                </Button>
              </div>

              {answeredCount < questions.length && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>
                    You have <strong>{questions.length - answeredCount} unanswered questions</strong> remaining.
                  </span>
                </div>
              )}

              {/* Grid Pills */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 max-h-[360px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const isAns = Boolean(userAnswers[q.id]);
                  const isBk = bookmarkedIds.includes(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setPhase('active');
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold text-center border relative transition-all ${
                        isBk
                          ? 'bg-amber-500 text-white border-amber-500'
                          : isAns
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button onClick={() => setPhase('active')} variant="outline" size="md" className="text-xs">
                  Return to Active Test
                </Button>
                <Button onClick={handleFinalSubmit} variant="primary" size="lg" className="gap-2 shadow-xl shadow-blue-500/25 px-8">
                  <span>Submit Exam for Final Scoring</span>
                  <CheckCircle2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* PHASE 4: POST-EXAM RESULTS & DETAILED ANALYTICS */}
        {phase === 'results' && results && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Results Banner */}
            <Card glass className={`p-8 text-center space-y-4 border-white/90 shadow-2xl ${
              results.isPassed ? 'bg-gradient-to-tr from-emerald-950 via-slate-900 to-slate-900 text-white' : 'bg-gradient-to-tr from-slate-900 via-slate-900 to-amber-950 text-white'
            }`}>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold border border-white/20">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Instant Score Report</span>
              </div>

              <div className="space-y-1">
                <div className="text-5xl sm:text-6xl font-black tracking-tight">{results.percentage}%</div>
                <div className="text-sm font-semibold text-slate-300">
                  {results.correct} of {questions.length} Correct Questions
                </div>
              </div>

              <div className="pt-2">
                {results.isPassed ? (
                  <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                    <span>BACB PASS READY GUARANTEED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/30">
                    <AlertCircle className="w-5 h-5" />
                    <span>RETRY DRILL RECOMMENDED</span>
                  </span>
                )}
              </div>
            </Card>

            {/* Domain Performance Sub-Scores */}
            <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
              <h3 className="text-lg font-bold text-[#0F172A] pb-4 border-b border-slate-100">
                BACB Task List Domain Sub-Scores
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(results.domainScores).map(([domId, data]) => {
                  if (data.total === 0) return null;
                  const domPct = Math.round((data.correct / data.total) * 100);
                  const isStrong = domPct >= 85;

                  return (
                    <div key={domId} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Domain {domId} ({data.correct}/{data.total} Qs)</span>
                        <span className={isStrong ? 'text-emerald-600' : 'text-amber-600'}>{domPct}%</span>
                      </div>
                      <Progress value={domPct} colorClass={isStrong ? 'bg-emerald-500' : 'bg-amber-500'} size="sm" />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Question Walkthrough & Rationales */}
            <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Detailed Question Walkthrough & Rationales
                </h3>

                <div className="flex items-center space-x-1 text-xs font-semibold bg-slate-100 p-1 rounded-xl">
                  {(['all', 'correct', 'incorrect', 'bookmarked'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setReviewFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                        reviewFilter === filter ? 'bg-white text-[#2563EB] shadow-sm font-bold' : 'text-slate-600'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Question List */}
              <div className="space-y-6">
                {questions
                  .filter((q) => {
                    const isCorr = userAnswers[q.id] === q.correctOptionId;
                    const isBk = bookmarkedIds.includes(q.id);
                    if (reviewFilter === 'correct') return isCorr;
                    if (reviewFilter === 'incorrect') return !isCorr;
                    if (reviewFilter === 'bookmarked') return isBk;
                    return true;
                  })
                  .map((q, idx) => {
                    const userOptId = userAnswers[q.id];
                    const isCorr = userOptId === q.correctOptionId;

                    return (
                      <div key={q.id} className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-sm">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {q.taskItemId} • Domain {q.domainId}
                          </span>
                          {isCorr ? (
                            <span className="text-emerald-600 font-bold flex items-center space-x-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct</span>
                            </span>
                          ) : (
                            <span className="text-rose-600 font-bold flex items-center space-x-1">
                              <XCircle className="w-4 h-4" />
                              <span>Incorrect</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">
                          "{q.scenarioText}"
                        </p>
                        <h4 className="text-sm font-bold text-slate-900">{q.questionText}</h4>

                        {/* Options Walkthrough */}
                        <div className="space-y-2 text-xs">
                          {q.options.map((opt) => {
                            const isChosen = userOptId === opt.id;
                            const isCorrectOpt = q.correctOptionId === opt.id;

                            let optStyle = 'border-slate-100 bg-slate-50 text-slate-600';
                            if (isCorrectOpt) optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                            if (isChosen && !isCorrectOpt) optStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';

                            return (
                              <div key={opt.id} className={`p-3 rounded-xl border ${optStyle} flex items-center justify-between`}>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold uppercase">{opt.id}.</span>
                                  <span>{opt.text}</span>
                                </div>
                                {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                                {isChosen && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-600" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* AI Explanation Detail */}
                        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-800 space-y-1">
                          <div className="font-bold text-[#2563EB]">Socrates AI Rationale:</div>
                          <p className="leading-relaxed">{q.aiExplanationDetail}</p>
                          <div className="text-[10px] text-slate-400 font-mono pt-1">{q.bacbCitation}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <Button onClick={() => setPhase('setup')} variant="outline" size="lg" className="gap-2">
                <RotateCw className="w-4 h-4" />
                <span>Take Another Practice Exam</span>
              </Button>

              <Link href="/tutor">
                <Button variant="primary" size="lg" className="gap-2 shadow-xl shadow-blue-500/25 px-8">
                  <Brain className="w-5 h-5" />
                  <span>Drill Weak Domains with Socrates AI</span>
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
