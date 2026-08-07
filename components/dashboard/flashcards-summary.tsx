'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FlashcardsSummary() {
  const [boxes, setBoxes] = useState([
    { box: 1, count: 0, label: 'Unfamiliar', color: 'bg-rose-500' },
    { box: 2, count: 0, label: 'Reviewing', color: 'bg-amber-500' },
    { box: 3, count: 0, label: 'Familiar', color: 'bg-blue-500' },
    { box: 4, count: 0, label: 'Strong', color: 'bg-indigo-500' },
    { box: 5, count: 0, label: 'Mastered', color: 'bg-emerald-500' },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rbt_flashcard_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        Object.values(parsed).forEach((card: any) => {
          const box = card.leitnerBox || 1;
          counts[box] = (counts[box] || 0) + 1;
        });
        setBoxes([
          { box: 1, count: counts[1], label: 'Unfamiliar', color: 'bg-rose-500' },
          { box: 2, count: counts[2], label: 'Reviewing', color: 'bg-amber-500' },
          { box: 3, count: counts[3], label: 'Familiar', color: 'bg-blue-500' },
          { box: 4, count: counts[4], label: 'Strong', color: 'bg-indigo-500' },
          { box: 5, count: counts[5], label: 'Mastered', color: 'bg-emerald-500' },
        ]);
      }
    } catch (e) {
      console.error('Failed to load flashcard progress', e);
    }
  }, []);

  const totalCards = boxes.reduce((acc, curr) => acc + curr.count, 0) || 250;
  const masteredCount = boxes[3].count + boxes[4].count;
  const dueCount = boxes[0].count + boxes[1].count;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Leitner Spaced Flashcards</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{totalCards} core ABA terminology cards</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            {Math.round((masteredCount / totalCards) * 100)}% Mastered
          </span>
        </div>
      </div>

      {/* Leitner Box Progress Bars */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {boxes.map((b) => (
          <div key={b.box} className="space-y-1 text-center">
            <div className="text-[10px] font-bold text-slate-400">Box {b.box}</div>
            <div className="h-16 w-full bg-slate-100 dark:bg-slate-800 rounded-xl relative overflow-hidden flex flex-col justify-end p-1">
              <div
                className={`w-full ${b.color} rounded-lg transition-all duration-500`}
                style={{ height: `${Math.min(100, (b.count / 130) * 100)}%` }}
              />
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{b.count}</div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
          <RotateCw className="w-4 h-4 text-[#2563EB]" />
          <span><strong>{dueCount} cards</strong> due for review today</span>
        </div>

        <Link href="/flashcards">
          <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
            <span>Review Due Cards</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
