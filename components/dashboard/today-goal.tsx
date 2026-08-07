'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, Brain, BookOpen, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function TodayGoal() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Take 15-Minute Diagnostic Exam', icon: HelpCircle, completed: true, points: '+15 XP' },
    { id: 2, text: 'Review 10 Leitner Flashcards (Box 4 & 5)', icon: BookOpen, completed: true, points: '+10 XP' },
    { id: 3, text: 'Socrates AI Ethics Roleplay Scenario', icon: Brain, completed: true, points: '+20 XP' },
    { id: 4, text: 'Complete Domain D Behavior Reduction Drill', icon: Sparkles, completed: false, points: '+25 XP' },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Today's Daily Target</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {completedCount}/{tasks.length} Completed
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Complete 4 daily tasks to lock in your pass guarantee boost.</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-extrabold text-[#2563EB] dark:text-blue-400">{progressPercent}%</div>
        </div>
      </div>

      <Progress value={progressPercent} colorClass="bg-[#2563EB]" size="sm" />

      {/* Checklist items */}
      <div className="space-y-2 pt-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
              task.completed
                ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-500 line-through'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3 text-xs font-semibold">
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
              <span>{task.text}</span>
            </div>
            <span className="text-[10px] font-bold text-[#2563EB] dark:text-blue-400">{task.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
