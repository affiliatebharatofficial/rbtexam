'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, RotateCw, Check, X, Sparkles, Volume2, ArrowRight, Play, Pause, Brain, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function FlashcardsPreview() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const flashcards = isEs
    ? [
        {
          id: 1,
          term: 'Estímulo Discriminativo (SD)',
          domain: 'Dominio C: Adquisición de Habilidades',
          code: 'C-02',
          definition: 'Un estímulo en presencia del cual una respuesta particular será reforzada y en ausencia del cual no será reforzada.',
          clinicalExample: 'El RBT dice "Toca el círculo rojo" mientras señala la tarjeta roja.',
          mnemonic: 'SD = Señal de Disponibilidad de Reforzamiento',
          leitnerBox: 4,
        },
        {
          id: 2,
          term: 'Reforzamiento Diferencial de Conducta Alternativa (DRA)',
          domain: 'Dominio D: Reducción de Conducta',
          code: 'D-02',
          definition: 'Reforzar una conducta alternativa deseable específica mientras se coloca la conducta problemática en extinción.',
          clinicalExample: 'Reforzar al niño cuando entrega una tarjeta de descanso en lugar de gritar.',
          mnemonic: 'DRA = Conducta Alternativa Adecuada',
          leitnerBox: 3,
        },
        {
          id: 3,
          term: 'Tiempo entre Respuestas (IRT)',
          domain: 'Dominio A: Medición',
          code: 'A-02',
          definition: 'El tiempo transcurrido entre el final de una respuesta y el inicio de la siguiente respuesta consecutiva.',
          clinicalExample: 'Registrar 45 segundos entre dos episodios consecutivos de llevarse la mano a la boca.',
          mnemonic: 'IRT = Intervalo entre Respuestas',
          leitnerBox: 5,
        },
      ]
    : [
        {
          id: 1,
          term: 'Discriminative Stimulus (SD)',
          domain: 'Domain C: Skill Acquisition',
          code: 'C-02',
          definition: 'A stimulus in the presence of which a particular response will be reinforced and in the absence of which that response will not be reinforced.',
          clinicalExample: 'RBT says "Touch red circle" while pointing to the red card.',
          mnemonic: 'SD = Signal for Delivery of Reinforcement',
          leitnerBox: 4,
        },
        {
          id: 2,
          term: 'Differential Reinforcement of Alternative Behavior (DRA)',
          domain: 'Domain D: Behavior Reduction',
          code: 'D-02',
          definition: 'Reinforcing a specific desirable alternative behavior while placing the problem behavior on extinction.',
          clinicalExample: 'Reinforcing a child when they hand a break card instead of screaming.',
          mnemonic: 'DRA = Alternative Appropriate Behavior',
          leitnerBox: 3,
        },
        {
          id: 3,
          term: 'Inter-Response Time (IRT)',
          domain: 'Domain A: Measurement',
          code: 'A-02',
          definition: 'The elapsed time between the end of one response and the beginning of the next adjacent response.',
          clinicalExample: 'Recording 45 seconds between two consecutive hand-mouthing instances.',
          mnemonic: 'IRT = In Between Responses Time',
          leitnerBox: 5,
        },
      ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [knownCount, setKnownCount] = useState<number>(0);

  const card = flashcards[currentIndex];

  // Auto-play demo animation loop
  useEffect(() => {
    if (!isPlayingDemo) return;

    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 2000);

    const nextCardTimer = setTimeout(() => {
      setIsFlipped(false);
      setKnownCount((prev) => prev + 1);
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 5500);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(nextCardTimer);
    };
  }, [isPlayingDemo, currentIndex]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="blue" className="gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>{isEs ? 'Tarjetas con Repetición Espaciada de IA' : 'Spaced Repetition AI Flashcards'}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            {isEs ? 'Tarjetas de Examen RBT y Sistema de Recuerdo Activo' : 'RBT Exam Flashcards & Active Recall System'}
          </h2>
          <p className="text-base text-slate-600">
            {isEs
              ? 'Fija la terminología esencial de ABA en tu memoria a largo plazo con nuestro algoritmo Leitner de 5 cajas de forma 100% gratuita.'
              : 'Lock essential ABA terminology into long-term memory with our Leitner 5-box spaced repetition algorithm.'}
          </p>
        </div>

        {/* 3-Step How It Works Workflow Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 relative group hover:border-blue-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-sm">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">{isEs ? 'Paso 1' : 'Step 1'}</div>
            <h3 className="text-base font-bold text-slate-900">{isEs ? 'Generador de Mazos por IA' : 'AI Topic Deck Generator'}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEs ? 'Escribe cualquier tema de ABA y la IA generará tarjetas de alto rendimiento al instante.' : 'Type any ABA topic and AI instantly generates high-yield BACB exam flashcards with clinical rationales.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 relative group hover:border-blue-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm">
              <RotateCw className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">{isEs ? 'Paso 2' : 'Step 2'}</div>
            <h3 className="text-base font-bold text-slate-900">{isEs ? 'Recuerdo Activo en 3D' : 'Interactive 3D Recall'}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEs ? 'Pon a prueba tu memoria volteando la tarjeta 3D para ver definiciones, ejemplos y trucos mnemotécnicos.' : 'Test your recall by flipping the 3D card to view BACB task list definitions, clinical scenarios, and mnemonic memory tricks.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 relative group hover:border-blue-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-sm">
              <Brain className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">{isEs ? 'Paso 3' : 'Step 3'}</div>
            <h3 className="text-base font-bold text-slate-900">{isEs ? 'Programación Espaciada Adaptativa' : 'Adaptive Spaced Scheduling'}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEs ? 'Califica tu recuerdo para que el algoritmo Leitner programe las fechas óptimas de repaso.' : 'Rate your recall to let the algorithm schedule optimal review dates (1D, 3D, 6D, 14D).'}
            </p>
          </div>
        </div>

        {/* INTERACTIVE DEMO ANIMATION CARD BOX */}
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-600">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interactive Live Demo Preview</span>
            </span>

            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlayingDemo(!isPlayingDemo)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isPlayingDemo ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
              }`}
            >
              {isPlayingDemo ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isPlayingDemo ? 'Pause Auto Demo' : 'Watch Live Demo Play'}</span>
            </button>
          </div>

          {/* Card Box Outer Perspective Wrapper */}
          <div
            role="button"
            tabIndex={0}
            aria-label={
              isFlipped
                ? `Flashcard back definition: ${card.definition}. Click or press Enter or Space to flip to front.`
                : `Flashcard front term: ${card.term}. Click or press Enter or Space to flip to back.`
            }
            aria-pressed={isFlipped}
            onClick={handleFlip}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip();
              }
            }}
            className="relative min-h-[360px] sm:min-h-[380px] w-full cursor-pointer touch-manipulation select-none [perspective:1000px] group focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-3xl"
          >
            {/* 3D Rotating Inner Card Body */}
            <div
              className={`relative w-full min-h-[360px] sm:min-h-[380px] rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
                isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
              }`}
            >
              {/* FRONT FACE OF CARD */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 text-white border border-slate-700/80 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between overflow-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-xl">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                    {card.code} • {card.domain}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-400 font-bold">
                    <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isEs ? 'Clic para voltear' : 'Click to flip'}</span>
                  </span>
                </div>

                <div className="text-center space-y-3 py-6 my-auto">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {card.term}
                  </h3>
                  <div className="inline-flex items-center space-x-1.5 text-xs text-slate-400">
                    <Volume2 className="w-4 h-4 text-[#2563EB]" />
                    <span>{isEs ? 'Término Clave BACB ABA' : 'BACB Core ABA Term'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400 font-medium">
                  <span>{isEs ? `Nivel Caja Leitner ${card.leitnerBox} de 5` : `Leitner Box Level ${card.leitnerBox} of 5`}</span>
                  <span className="text-emerald-400 font-bold">{isEs ? 'Tasa de Dominio: 94%' : 'Mastery Rate: 94%'}</span>
                </div>
              </div>

              {/* BACK FACE OF CARD */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white border border-slate-700/80 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between overflow-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-2xl">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">{isEs ? 'Definición Clínica y Nemotecnia' : 'Clinical Definition & Mnemonic'}</span>
                  <span className="text-slate-400 text-[11px]">{isEs ? `Tarjeta ${currentIndex + 1} de ${flashcards.length}` : `Card ${currentIndex + 1} of ${flashcards.length}`}</span>
                </div>

                <div className="space-y-3 my-auto text-xs">
                  <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                    "{card.definition}"
                  </p>

                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs space-y-0.5">
                    <span className="font-bold flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isEs ? 'Truco Mnemotécnico:' : 'Mnemonic Trick:'}</span>
                    </span>
                    <p>{card.mnemonic}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
                    <span className="font-bold text-blue-300">{isEs ? 'Ejemplo de Escenario Clínico:' : 'Clinical Scenario Example:'}</span>
                    <p className="text-slate-300 italic">{card.clinicalExample}</p>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span>{isEs ? 'Sistema Leitner SRS Activo' : 'Leitner SRS Active'}</span>
                  <span className="text-slate-300 font-bold flex items-center space-x-1">
                    <RotateCw className="w-3 h-3 text-emerald-400" />
                    <span>{isEs ? 'Clic para regresar' : 'Click to flip back'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleMark(false)}
              className="px-5 py-3 rounded-2xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <X className="w-4 h-4 text-rose-600" />
              <span>{isEs ? 'Repasar (1D)' : 'Again (1D)'}</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <RotateCw className="w-4 h-4 text-slate-600" />
              <span>{isEs ? 'Voltear' : 'Flip Card'}</span>
            </button>

            <button
              onClick={() => handleMark(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{isEs ? 'Dominado (14D)' : 'Easy (14D)'}</span>
            </button>
          </div>

          <div className="pt-4 text-center">
            <Link href="/flashcards">
              <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/20 font-extrabold">
                <span>{isEs ? 'Comenzar a Estudiar con Tarjetas' : 'Start Studying Smart Flashcards'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

