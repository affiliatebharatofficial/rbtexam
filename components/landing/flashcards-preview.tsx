'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, RotateCw, Check, X, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FlashcardsPreview() {
  const flashcards = [
    {
      id: 1,
      term: 'Discriminative Stimulus (SD)',
      domain: 'Domain C: Skill Acquisition',
      code: 'C-02',
      definition: 'A stimulus in the presence of which a particular response will be reinforced and in the absence of which that response will not be reinforced.',
      clinicalExample: 'RBT says "Touch red circle" while pointing to the red card.',
      leitnerBox: 4,
    },
    {
      id: 2,
      term: 'Differential Reinforcement of Alternative Behavior (DRA)',
      domain: 'Domain D: Behavior Reduction',
      code: 'D-02',
      definition: 'Reinforcing a specific desirable alternative behavior while placing the problem behavior on extinction.',
      clinicalExample: 'Reinforcing a child when they hand a break card instead of screaming.',
      leitnerBox: 3,
    },
    {
      id: 3,
      term: 'Inter-Response Time (IRT)',
      domain: 'Domain A: Measurement',
      code: 'A-02',
      definition: 'The elapsed time between the end of one response and the beginning of the next adjacent response.',
      clinicalExample: 'Recording 45 seconds between two consecutive hand-mouthing instances.',
      leitnerBox: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCount, setKnownCount] = useState<number>(0);

  const card = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMark = (known: boolean) => {
    if (known) setKnownCount((prev) => prev + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <section id="flashcards" className="py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Spaced Repetition Flashcards</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Master ABA Terminology 3x Faster
          </h2>
          <p className="text-base text-slate-600">
            Powered by the Leitner 5-Box Spaced Repetition Algorithm. Flip through sample flashcards below to test your memory recall.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Card Box Wrapper */}
          <div className="relative cursor-pointer perspective-1000 group" onClick={handleFlip}>
            <div
              className={`w-full min-h-[300px] p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 text-white shadow-2xl border border-slate-700/80 flex flex-col justify-between transition-transform duration-500 transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {!isFlipped ? (
                /* Front Side */
                <div className="flex flex-col justify-between h-full space-y-8">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                      {card.code} • {card.domain}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click to flip</span>
                    </span>
                  </div>

                  <div className="text-center space-y-3 py-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {card.term}
                    </h3>
                    <div className="inline-flex items-center space-x-1.5 text-xs text-slate-400">
                      <Volume2 className="w-4 h-4 text-[#2563EB]" />
                      <span>BACB Core ABA Term</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                    <span>Leitner Box Level {card.leitnerBox} of 5</span>
                    <span className="text-emerald-400 font-bold">Mastery Rate: 92%</span>
                  </div>
                </div>
              ) : (
                /* Back Side */
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider">Clinical Definition</span>
                    <span className="text-slate-400 text-[11px]">Card {currentIndex + 1} of {flashcards.length}</span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                      "{card.definition}"
                    </p>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
                      <span className="font-bold text-blue-300">Clinical Scenario Example:</span>
                      <p className="text-slate-300 italic">{card.clinicalExample}</p>
                    </div>
                  </div>

                  <div className="text-center text-xs text-slate-400 pt-2">
                    Click to flip back
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handleMark(false)}
              className="px-6 py-3 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center space-x-2 transition-all shadow-sm"
            >
              <X className="w-4 h-4 text-rose-600" />
              <span>Need Review</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center space-x-2 transition-all"
            >
              <RotateCw className="w-4 h-4 text-slate-600" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={() => handleMark(true)}
              className="px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center space-x-2 transition-all shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Got It Mastered</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link href="/flashcards">
              <Button variant="primary" size="md" className="gap-2 shadow-md">
                <span>Explore Full 250+ ABA Term Deck</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
