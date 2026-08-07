'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flashcard, LearningMode, CertificationLevel, FlashcardCategory } from '@/types/flashcard';
import { getFilteredFlashcards, updateUserCardRating } from '@/lib/flashcard-bank';
import {
  Layers,
  RotateCw,
  Sparkles,
  Star,
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Bookmark,
  Volume2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function FlashcardsPage() {
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [mode, setMode] = useState<LearningMode>('study');
  const [category, setCategory] = useState<string>('ALL');

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [userNoteText, setUserNoteText] = useState('');
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Metrics
  const [dueCount, setDueCount] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);

  useEffect(() => {
    loadDeck();
  }, [certification, mode, category]);

  const loadDeck = () => {
    const result = getFilteredFlashcards({
      certification,
      category: category as any,
      learningMode: mode,
    });
    setCards(result.data);
    setDueCount(result.dueCount);
    setMasteredCount(result.masteredCount);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  const currentCard = cards[currentIndex];

  const handleRatingSubmit = (rating: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    // Update SM-2 state
    updateUserCardRating(currentCard.id, rating);

    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const toggleFavorite = () => {
    if (!currentCard || !currentCard.userState) return;
    currentCard.userState.isFavorite = !currentCard.userState.isFavorite;
    setCards([...cards]);
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Anki-Style Spaced Repetition Engine</span>
            </Badge>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Smart Spaced Flashcards
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Adaptive Leitner 5-box memory engine for BACB RBT, BCaBA, and BCBA terminology.
            </p>
          </div>

          {/* Certification Switcher */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            {(['RBT', 'BCaBA', 'BCBA'] as CertificationLevel[]).map((cert) => (
              <button
                key={cert}
                onClick={() => setCertification(cert)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  certification === cert ? 'bg-white text-[#2563EB] shadow font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'study', label: 'Study Deck', icon: Layers },
            { id: 'review', label: `Due Today (${dueCount})`, icon: RotateCw },
            { id: 'weak_topics', label: 'Weak Topics', icon: Brain },
            { id: 'favorite', label: 'Favorites', icon: Star },
            { id: 'ai_recommended', label: 'AI Recommended', icon: Zap },
            { id: 'shuffle', label: 'Shuffle Deck', icon: Shuffle },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as LearningMode)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                mode === m.id
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <m.icon className={`w-3.5 h-3.5 ${mode === m.id ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Deck Progress Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>
              Card {cards.length > 0 ? currentIndex + 1 : 0} of {cards.length}
            </span>
            <span className="text-emerald-600 font-mono">
              {masteredCount} Mastered Cards
            </span>
          </div>
          <Progress
            value={cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0}
            colorClass="bg-[#2563EB]"
            size="sm"
          />
        </div>

        {/* MAIN FLASHCARD STACK & 3D FLIP CONTAINER */}
        {!sessionCompleted && currentCard ? (
          <div className="space-y-6">
            {/* 3D Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative min-h-[380px] w-full cursor-pointer perspective-1000 group"
            >
              <div
                className={`w-full min-h-[380px] rounded-3xl p-8 transition-all duration-500 transform-style-3d shadow-2xl border ${
                  isFlipped
                    ? 'bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 text-white border-slate-800'
                    : 'bg-white text-slate-900 border-slate-200/80'
                }`}
              >
                {/* Header Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#2563EB] dark:text-blue-400 text-[10px] font-extrabold">
                      {currentCard.category} • {currentCard.cardType.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{currentCard.reference}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite();
                      }}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${currentCard.userState?.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Card Content Area */}
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div className="py-8 space-y-4 flex flex-col justify-center min-h-[220px]">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                      Front Prompt
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      {currentCard.front}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium pt-4">
                      Click anywhere or press Spacebar to flip card and inspect Socratic rationale
                    </p>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="py-6 space-y-4 text-xs animate-fadeIn">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                      Back Answer & Socratic AI Explanation
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                      <h3 className="text-lg font-extrabold text-emerald-300">
                        {currentCard.back}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {currentCard.explanation}
                      </p>
                    </div>

                    {/* Mnemonic / Memory Tip */}
                    {currentCard.memoryTip && (
                      <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 space-y-1">
                        <div className="font-extrabold flex items-center space-x-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Mnemonic Memory Trick:</span>
                        </div>
                        <p>{currentCard.memoryTip}</p>
                      </div>
                    )}

                    {/* Clinical ABA Rationale */}
                    <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-200 space-y-1">
                      <div className="font-extrabold flex items-center space-x-1">
                        <Brain className="w-3.5 h-3.5 text-blue-400" />
                        <span>Clinical ABA Rationale:</span>
                      </div>
                      <p>{currentCard.clinicalExplanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SM-2 FEEDBACK RATING BAR (Shown when flipped) */}
            {isFlipped && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-lg space-y-3 animate-fadeIn">
                <div className="text-center text-xs font-bold text-slate-600">
                  Rate your recall difficulty to update Spaced Repetition interval:
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleRatingSubmit(1)}
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-extrabold text-xs transition-all"
                  >
                    <div>Again</div>
                    <div className="text-[10px] font-normal text-rose-500">1 Day</div>
                  </button>

                  <button
                    onClick={() => handleRatingSubmit(2)}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 font-extrabold text-xs transition-all"
                  >
                    <div>Hard</div>
                    <div className="text-[10px] font-normal text-amber-500">3 Days</div>
                  </button>

                  <button
                    onClick={() => handleRatingSubmit(3)}
                    className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] hover:bg-blue-100 font-extrabold text-xs transition-all"
                  >
                    <div>Good</div>
                    <div className="text-[10px] font-normal text-blue-500">6 Days</div>
                  </button>

                  <button
                    onClick={() => handleRatingSubmit(4)}
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-extrabold text-xs transition-all"
                  >
                    <div>Easy</div>
                    <div className="text-[10px] font-normal text-emerald-500">14 Days</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SESSION COMPLETED SCREEN */
          <Card glass className="p-8 text-center space-y-6 shadow-2xl border-white/90">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                Flashcard Session Completed!
              </h2>
              <p className="text-xs text-slate-600">
                All scheduled flashcards for this deck have been processed. Spaced repetition dates updated.
              </p>
            </div>

            <div className="flex justify-center space-x-3">
              <Button onClick={loadDeck} variant="primary" size="lg" className="gap-2">
                <RotateCw className="w-4 h-4" />
                <span>Restart Study Session</span>
              </Button>
            </div>
          </Card>
        )}

      </div>
    </ProtectedRoute>
  );
}
