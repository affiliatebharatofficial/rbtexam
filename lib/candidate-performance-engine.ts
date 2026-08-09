import { isSupabaseConfigured, supabase } from './supabase';

export interface CandidateBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  isUnlocked: boolean;
  xpBonus: number;
}

export interface XPAuditLogItem {
  id: string;
  reason: string;
  amount: number;
  timestamp: string;
  type: 'exam' | 'task' | 'flashcard' | 'ai' | 'badge';
}

export interface CandidatePerformanceProfile {
  userId: string;
  candidateName: string;
  candidateEmail: string;
  totalXP: number;
  level: number;
  levelTitle: string;
  nextLevelXP: number;
  levelProgressPercentage: number;
  streakDays: number;
  examsCompleted: number;
  examsPassed: number;
  totalQuestionsAnswered: number;
  overallAccuracyPercentage: number;
  completedTaskIds: string[];
  unlockedBadgeIds: string[];
  badges: CandidateBadge[];
  xpHistory: XPAuditLogItem[];
  domainAccuracy: Record<string, { attempted: number; correct: number; percentage: number }>;
}

const LEVEL_THRESHOLDS = [
  { level: 1, title: 'RBT Novice Candidate', minXP: 0, maxXP: 499 },
  { level: 2, title: 'BACB Task Explorer', minXP: 500, maxXP: 1499 },
  { level: 3, title: 'Behavior Analyst Trainee', minXP: 1500, maxXP: 3499 },
  { level: 4, title: 'Clinical Practice Master', minXP: 3500, maxXP: 6999 },
  { level: 5, title: 'RBT Exam Hero (Certified Ready)', minXP: 7000, maxXP: 15000 },
];

const ALL_BADGES: Omit<CandidateBadge, 'unlockedAt' | 'isUnlocked'>[] = [
  {
    id: 'badge_first_exam',
    name: 'First Step Diagnostic',
    description: 'Completed your first 85-Question BACB Mock Practice Test.',
    icon: 'ShieldCheck',
    xpBonus: 200,
  },
  {
    id: 'badge_pass_threshold',
    name: 'Pass Threshold Master',
    description: 'Scored 85%+ accuracy on an official BACB timed practice exam.',
    icon: 'Award',
    xpBonus: 500,
  },
  {
    id: 'badge_task_ninja',
    name: 'Daily Task Champion',
    description: 'Completed 5+ daily study checklist tasks.',
    icon: 'CheckCircle2',
    xpBonus: 300,
  },
  {
    id: 'badge_streak_3',
    name: '3-Day Study Streak',
    description: 'Maintained consecutive daily study sessions for 3 days.',
    icon: 'Flame',
    xpBonus: 250,
  },
  {
    id: 'badge_exam_certified_ready',
    name: 'BACB Exam Certified Ready',
    description: 'Completed 3+ qualifying mock exams with 85%+ score.',
    icon: 'Sparkles',
    xpBonus: 1000,
  },
];

const PROGRESS_STORAGE_KEY = 'rbt_candidate_performance_v1';

export function getCandidatePerformanceProfile(
  userId: string = 'default_user',
  candidateName: string = 'Candidate',
  candidateEmail: string = 'candidate@rbtexam.com'
): CandidatePerformanceProfile {
  let storedXP = 350;
  let storedTaskIds: string[] = [];
  let storedLogs: XPAuditLogItem[] = [
    {
      id: 'log-01',
      reason: 'Welcome Bonus: Created RBT Candidate Account',
      amount: 250,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      type: 'badge',
    },
    {
      id: 'log-02',
      reason: 'Completed Diagnostic Baseline Task',
      amount: 100,
      timestamp: new Date().toISOString(),
      type: 'task',
    },
  ];

  let examSessions: any[] = [];

  // Read LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const rawProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress);
        if (typeof parsed.totalXP === 'number') storedXP = parsed.totalXP;
        if (Array.isArray(parsed.completedTaskIds)) storedTaskIds = parsed.completedTaskIds;
        if (Array.isArray(parsed.xpHistory)) storedLogs = parsed.xpHistory;
      }

      const rawExams = localStorage.getItem('rbt_exam_sessions');
      if (rawExams) {
        const parsed = JSON.parse(rawExams);
        if (Array.isArray(parsed)) examSessions = parsed;
      }
    } catch (e) {
      console.error('Failed to parse candidate performance state:', e);
    }
  }

  // Compute Exam Performance Statistics
  let examsCompleted = examSessions.length;
  let examsPassed = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;

  const domainScores: Record<string, { attempted: number; correct: number; percentage: number }> = {
    A: { attempted: 0, correct: 0, percentage: 0 },
    B: { attempted: 0, correct: 0, percentage: 0 },
    C: { attempted: 0, correct: 0, percentage: 0 },
    D: { attempted: 0, correct: 0, percentage: 0 },
    E: { attempted: 0, correct: 0, percentage: 0 },
    F: { attempted: 0, correct: 0, percentage: 0 },
  };

  examSessions.forEach((session) => {
    const score = Number(session.score || 0);
    const total = Number(session.totalQuestions || 0);
    const correctCount = Number(session.correctCount || Math.round((score / 100) * total));

    totalQuestionsAnswered += total;
    totalCorrect += correctCount;

    if (score >= 85) examsPassed += 1;

    if (session.domainBreakdown && typeof session.domainBreakdown === 'object') {
      Object.entries(session.domainBreakdown).forEach(([dom, val]: [string, any]) => {
        if (!domainScores[dom]) domainScores[dom] = { attempted: 0, correct: 0, percentage: 0 };
        const domTotal = Number(val.total || 0);
        const domCorrect = Number(val.correct || 0);
        domainScores[dom].attempted += domTotal;
        domainScores[dom].correct += domCorrect;
      });
    }
  });

  // Calculate domain percentages
  Object.keys(domainScores).forEach((dom) => {
    const item = domainScores[dom];
    item.percentage = item.attempted > 0 ? Math.round((item.correct / item.attempted) * 100) : 0;
  });

  const overallAccuracyPercentage = totalQuestionsAnswered > 0 ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) : 0;

  // Calculate Level Progression
  let currentLevelObj = LEVEL_THRESHOLDS[0];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (storedXP >= LEVEL_THRESHOLDS[i].minXP) {
      currentLevelObj = LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const levelProgressPercentage = Math.min(
    100,
    Math.max(0, Math.round(((storedXP - currentLevelObj.minXP) / (currentLevelObj.maxXP - currentLevelObj.minXP)) * 100))
  );

  // Compute Unlocked Badges
  const unlockedBadgeIds: string[] = [];
  if (examsCompleted >= 1) unlockedBadgeIds.push('badge_first_exam');
  if (examsPassed >= 1) unlockedBadgeIds.push('badge_pass_threshold');
  if (storedTaskIds.length >= 5) unlockedBadgeIds.push('badge_task_ninja');
  if (examsCompleted >= 3 && examsPassed >= 3) unlockedBadgeIds.push('badge_exam_certified_ready');

  const badges: CandidateBadge[] = ALL_BADGES.map((b) => ({
    ...b,
    isUnlocked: unlockedBadgeIds.includes(b.id),
    unlockedAt: unlockedBadgeIds.includes(b.id) ? new Date().toISOString() : null,
  }));

  return {
    userId,
    candidateName,
    candidateEmail,
    totalXP: storedXP,
    level: currentLevelObj.level,
    levelTitle: currentLevelObj.title,
    nextLevelXP: currentLevelObj.maxXP + 1,
    levelProgressPercentage,
    streakDays: Math.max(1, examsCompleted),
    examsCompleted,
    examsPassed,
    totalQuestionsAnswered,
    overallAccuracyPercentage,
    completedTaskIds: storedTaskIds,
    unlockedBadgeIds,
    badges,
    xpHistory: storedLogs,
    domainAccuracy: domainScores,
  };
}

export function awardCandidateXP(
  amount: number,
  reason: string,
  type: 'exam' | 'task' | 'flashcard' | 'ai' | 'badge' = 'task',
  taskId?: string
): CandidatePerformanceProfile {
  const current = getCandidatePerformanceProfile();
  const newXP = current.totalXP + amount;
  const newCompletedTasks = taskId && !current.completedTaskIds.includes(taskId)
    ? [...current.completedTaskIds, taskId]
    : current.completedTaskIds;

  const newLog: XPAuditLogItem = {
    id: `log-${Date.now()}`,
    reason,
    amount,
    timestamp: new Date().toISOString(),
    type,
  };

  const updatedLogs = [newLog, ...current.xpHistory].slice(0, 50);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          totalXP: newXP,
          completedTaskIds: newCompletedTasks,
          xpHistory: updatedLogs,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.error('Failed to persist XP award:', e);
    }
  }

  return getCandidatePerformanceProfile();
}
