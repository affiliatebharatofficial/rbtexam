'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Check, X, ShieldCheck, Zap, Sparkles, Brain, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyChooseUs() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const comparisonItems = [
    {
      feature: isEs ? 'Alineación con el Temario BACB RBT 3ª Edición' : 'BACB RBT 3rd Edition Task List Alignment',
      usText: isEs ? '100% Estándares 2026 Actualizados (Dominios A-F)' : '100% Updated 2026 Standards (Domains A-F)',
      themText: isEs ? 'Contenido desactualizado de 1ª/2ª edición' : 'Often outdated 1st Edition content',
    },
    {
      feature: isEs ? 'Exámenes Simulados Cronometrados de 85 Preguntas y 90 Min' : '85-Question 90-Min Timed Practice Exams',
      usText: isEs ? 'Simulación en computadora con cuadrícula de revisión' : 'Computer-based simulation with review grid',
      themText: isEs ? 'PDFs estáticos o cuestionarios genéricos sin tiempo' : 'Static PDFs or untimed generic quizzes',
    },
    {
      feature: isEs ? 'Tutor de IA Conversacional en Tiempo Real' : 'Real-Time Conversational AI Tutor',
      usText: isEs ? 'Sócrates IA explica por qué las respuestas son incorrectas 24/7' : 'Socrates AI explains why wrong answers are incorrect 24/7',
      themText: isEs ? 'Explicaciones en texto estático o sin explicaciones' : 'Static text explanations or none',
    },
    {
      feature: isEs ? 'Mapas de Calor de Dominio de Áreas Débiles' : 'Adaptive Domain Mastery Heatmaps',
      usText: isEs ? 'Identifica debilidades exactas por tarea (ej. C-04, D-02)' : 'Pinpoints exact sub-task weaknesses (e.g. C-04, D-02)',
      themText: isEs ? 'Puntaje de porcentaje total genérico sin desglose' : 'Generic total percentage score',
    },
    {
      feature: isEs ? 'Tarjetas de Repetición Espaciada Leitner' : 'Leitner Spaced Repetition Flashcards',
      usText: isEs ? 'Algoritmo de 5 cajas para memorización duradera de ABA' : 'Algorithmic 5-box memory lock for ABA terms',
      themText: isEs ? 'Listas en PDF estáticas o tarjetas de papel imprimibles' : 'Static PDF lists or printable paper cards',
    },
    {
      feature: isEs ? 'Acceso 100% Gratuito y Completo' : '100% Free Complete Access',
      usText: isEs ? 'Acceso total a simulacros, tutor de IA y tarjetas' : 'Full access to mocks, AI tutor & flashcards',
      themText: isEs ? 'Muros de pago iniciales o compras no reembolsables' : 'Upfront paywalls or non-refundable purchases',
    },
    {
      feature: isEs ? 'Garantía de Aprobación o Reembolso' : 'Pass-or-Refund Guarantee Protection',
      usText: isEs ? 'Reembolso si repruebas tras 85% de preparación' : 'Refund if you fail after 85% readiness (Terms apply)',
      themText: isEs ? 'Sin garantía ni soporte de aprobación' : 'No guarantee or support',
    },
  ];

  return (
    <section className="py-24 bg-slate-50/70 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue">{t('whyUs.badge', 'The Smart Choice for RBT Candidates')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('whyUs.heading', 'Why Use RBT Practice AI for Your Exam Prep?')}
          </h2>
          <p className="text-base text-slate-600">
            {t('whyUs.subheading', 'Compare our next-generation adaptive AI preparation platform against legacy static video courses and PDF question banks.')}
          </p>
        </div>

        {/* Comparison Table Card */}
        <Card glass className="p-6 sm:p-8 max-w-4xl mx-auto shadow-xl border-white/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-2/5">
                    {t('whyUs.table.feature', 'Feature Comparison')}
                  </th>
                  <th className="py-4 px-4 text-sm font-extrabold text-[#2563EB] w-3/10 bg-blue-50/60 rounded-t-xl text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Sparkles className="w-4 h-4 text-[#2563EB]" />
                      <span>{t('whyUs.table.us', 'RBT Practice AI')}</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 w-3/10 text-center">
                    {t('whyUs.table.them', 'Traditional Prep Courses')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {item.feature}
                    </td>
                    <td className="py-4 px-4 bg-blue-50/30 text-center font-semibold text-slate-900 border-x border-blue-100/60">
                      <div className="flex items-center justify-center space-x-1.5 text-emerald-600 font-bold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs text-slate-800">{item.usText}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-slate-500">
                      <div className="flex items-center justify-center space-x-1.5 text-rose-500">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span className="text-xs text-slate-500">{item.themText}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isEs ? 'Garantía de Aprobación Respaldada' : 'Pass Guarantee Backed'}
                </h4>
                <p className="text-xs text-slate-600">
                  {isEs ? 'Si alcanzas el 85% en nuestros simulacros y no apruebas el examen BACB, obtén 100% de reembolso.' : 'If you pass our readiness exam and fail the BACB exam, get 100% refund.'}
                </p>
              </div>
            </div>
            <Link href="/exam">
              <Button variant="primary" size="sm" className="whitespace-nowrap shadow-md">
                {isEs ? 'Comenzar Diagnóstico Gratis' : 'Start Free Diagnostic'}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
