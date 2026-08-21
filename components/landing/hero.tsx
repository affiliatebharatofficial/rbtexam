'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Star, Award, Zap, Brain, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const { t } = useLanguage();
  const [freeAccessMode, setFreeAccessMode] = useState(true);
  const [freeAccessBanner, setFreeAccessBanner] = useState(
    '🎉 100% Free Complete Access — All 85-Question Mock Exams & AI Study Tools Unlocked for Everyone!'
  );

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json() as Promise<any>)
      .then((data: any) => {
        if (data && data.freeAccessMode !== undefined) {
          setFreeAccessMode(Boolean(data.freeAccessMode));
        }
        if (data && data.freeAccessBannerText) {
          setFreeAccessBanner(data.freeAccessBannerText);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-100">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Announcement Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-sm animate-fadeIn">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('hero.badge', 'BACB RBT 3rd Edition Test Outline')}</span>
              <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                {freeAccessMode ? t('hero.bullet1', '100% Free For Everyone') : '7-Day Free Trial'}
              </span>
            </div>

            {/* Single Primary H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              {t('hero.titlePrefix', 'RBT Practice &')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-600">
                {t('hero.titleHighlight', 'RBT Exam Prep')}
              </span>{' '}
              {t('hero.titleSuffix', 'for 2026')}
            </h1>

            {/* Sub-headline with clear 100% Free / Sabke Liye Free value proposition */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t('hero.subtitle', 'Practice freely with realistic RBT exam questions, full 85-question timed mock exams, Socrates AI clinical explanations, and Leitner flashcards designed around the current BACB 3rd Edition outline.')}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-slate-700 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-bold text-slate-900">{t('hero.bullet1', '100% Free Access — Zero Cost')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t('hero.bullet2', 'Full 85-Question Mock Exams')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t('hero.bullet3', 'Socrates AI Tutor & Ethics Rationale')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t('hero.bullet4', 'Domains A–F Task List Coverage')}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 text-base px-8 py-4 shadow-xl shadow-blue-500/25 font-bold">
                  <Unlock className="w-5 h-5 text-white" />
                  <span>{t('hero.startPractice', 'Start 100% Free Practice')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/rbt/mock-exam" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-6 py-4 font-bold border-slate-300">
                  <Brain className="w-5 h-5 text-[#2563EB]" />
                  <span>{t('hero.mockExamBtn', 'Take a Free Mock Exam')}</span>
                </Button>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">JD</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">SK</div>
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">AM</div>
                </div>
                <span className="font-semibold text-slate-800">{t('stats.candidates', '14,200+ RBTs Prepared')}</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-800">4.9/5</span>
                <span className="text-slate-400">({t('stats.ratingSub', '2,100+ Reviews')})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Apple-Level Product Card */}
          <div className="lg:col-span-5">
            <Card glass className="p-6 relative shadow-2xl shadow-blue-500/10 border-white/80">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live AI Exam Engine</span>
                </div>
                <Badge variant="emerald">
                  {freeAccessMode ? (t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? '100% Acceso Gratuito' : '100% Free Open Access') : 'Real-Time Scoring'}
                </Badge>
              </div>

              {/* Sample Question Preview */}
              <div className="py-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-[#2563EB]">BACB Task List C-04</span>
                  <span>{t('exam.question', 'Question')} 42 {t('exam.of', 'of')} 85</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio'
                    ? 'Un RBT presenta un Estímulo Discriminativo (SD), proporciona guía física inmediata y entrega un reforzador de alto valor. ¿Qué procedimiento se demuestra?'
                    : 'An RBT delivers a Discriminative Stimulus (SD), provides immediate physical guidance, and delivers high-value reinforcer upon completion. What procedure is being demonstrated?'}
                </p>

                {/* Simulated Options */}
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-between">
                    <span>{t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'A. Observación de Operante Libre Naturalista' : 'A. Naturalistic Free Operant Observation'}</span>
                  </div>
                  <div className="p-3 rounded-xl border-2 border-[#22C55E] bg-emerald-50/60 text-emerald-900 font-semibold flex items-center justify-between">
                    <span>{t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'B. Enseñanza por Ensayos Discretos (DTT) con Ayuda de Más a Menos' : 'B. Discrete Trial Teaching (DTT) with Most-to-Least Prompting'}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-between">
                    <span>{t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'C. Respuesta de Explosión de Extinción' : 'C. Extinction Burst Response'}</span>
                  </div>
                </div>

                {/* AI Rationale Snippet */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs space-y-1 text-slate-700">
                  <div className="flex items-center space-x-1.5 font-bold text-[#2563EB]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t('tutor.clinicalRationale', 'Socrates AI Rationale')}:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio'
                      ? '¡Correcto! DTT utiliza ciclos estructurados SD -> Ayuda -> Respuesta -> Reforzamiento para garantizar el éxito inicial.'
                      : 'Correct! DTT uses structured SD -> Prompt -> Response -> Reinforcement cycles. Most-to-least prompting ensures initial success.'}
                  </p>
                </div>
              </div>

              {/* Simulated Readiness Gauge */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 p-3 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">{t('dashboard.readinessTitle', 'Exam Pass Likelihood')}</div>
                  <div className="text-lg font-extrabold text-[#22C55E]">96.4% {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'Preparado' : 'Ready'}</div>
                </div>
                <Award className="w-8 h-8 text-[#2563EB]" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
