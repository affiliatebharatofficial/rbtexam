'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Check, ArrowRight, Unlock, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// RBT Practice AI is 100% free only. This section is the free-access summary.
export function PricingSection() {
  const { t } = useLanguage();

  const included = [
    '85-question 90-minute timed mock exams',
    'Socrates AI Tutor',
    'Leitner flashcards',
    'Domain diagnostic heatmaps',
    'BACB 3rd Edition task list guide',
  ];

  return (
    <section id="free-access" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="emerald">
            {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio'
              ? '🎉 Acceso Completo 100% Gratis para Todos los Candidatos'
              : '🎉 100% Free Complete Access Unlocked for All Candidates'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio'
              ? 'Practica Gratis Hoy — Domina tu Examen BACB RBT'
              : 'Practice Free Today — Master Your BACB RBT Exam'}
          </h2>
          <p className="text-base font-bold text-emerald-700">
            100% Free Complete Access. No payment required. No credit card required.
          </p>
          <p className="text-base text-slate-600">
            {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio'
              ? 'Todas las herramientas, exámenes de 85 preguntas, mapas de calor por dominio y justificaciones de IA son gratuitos.'
              : 'All tools, 85-question timed mock exams, domain-by-domain diagnostic heatmaps, and AI tutor rationales are currently free for all candidates.'}
          </p>
        </div>

        <Card glass className="p-8 max-w-3xl mx-auto border-white/80 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-600/10 text-emerald-600 shrink-0">
              <Unlock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0F172A]">What free access includes</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800 font-medium">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 px-8 py-4 font-bold">
                <span>Start 100% Free Practice</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/rbt/mock-exam" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-6 py-4 font-bold border-slate-300">
                <Brain className="w-5 h-5 text-[#2563EB]" />
                <span>Take a Free Mock Exam</span>
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-500 text-center pt-6">
            Questions? Contact support at{' '}
            <a href="mailto:hello@rbtpracticeai.com" className="text-[#2563EB] font-bold hover:underline">
              hello@rbtpracticeai.com
            </a>
            .
          </p>
        </Card>
      </div>
    </section>
  );
}
