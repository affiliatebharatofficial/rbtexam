'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain, Layers, BarChart3, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export function Testimonials() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const methodologyPillars = isEs
    ? [
        {
          title: 'Práctica de Recuperación Activa',
          icon: Brain,
          iconBg: 'bg-blue-50 text-blue-600',
          badge: 'Ciencia Cognitiva',
          desc: 'La ciencia del aprendizaje demuestra que resolver preguntas clínicas basadas en escenarios produce una retención significativamente mayor que la lectura pasiva de manuales en PDF.',
          benefits: [
            'Distingue contingencias sutiles (DTT vs NET, DRA vs DRI)',
            'Construye velocidad y resistencia para 85 preguntas',
            'Explicaciones clínicas inmediatas tras cada respuesta',
          ],
        },
        {
          title: 'Repetición Espaciada Leitner',
          icon: Layers,
          iconBg: 'bg-emerald-50 text-emerald-600',
          badge: 'Algoritmo de 5 Cajas',
          desc: 'Las tarjetas de vocabulario ABA se distribuyen automáticamente en cajas según tu precisión, reforzando términos difíciles a intervalos crecientes para fijarlos en la memoria a largo plazo.',
          benefits: [
            'Domina más de 200 definiciones y abreviaturas operacionales',
            'Enfoca el tiempo de estudio en tus áreas de mayor debilidad',
            'Previene la curva de olvido antes del día del examen',
          ],
        },
        {
          title: 'Mapas de Diagnóstico por Dominio',
          icon: BarChart3,
          iconBg: 'bg-indigo-50 text-indigo-600',
          badge: 'BACB 3ª Edición TCO',
          desc: 'Los simulacros desglosan tu desempeño en los 6 dominios oficiales y 43 tareas, permitiéndote identificar con precisión quirúrgica dónde enfocar tus sesiones de repaso.',
          benefits: [
            'Ponderación exacta (A: 17%, B: 11%, C: 25%, D: 19%, E: 13%, F: 15%)',
            'Puntaje de preparación general con umbral del 80%+',
            'Simulación con interfaz idéntica a Pearson VUE',
          ],
        },
      ]
    : [
        {
          title: 'Active Retrieval Practice',
          icon: Brain,
          iconBg: 'bg-blue-50 text-blue-600',
          badge: 'Cognitive Science',
          desc: 'Research in cognitive psychology shows that answering scenario-based questions produces far higher conceptual retention and exam readiness than passively reading static PDF study guides.',
          benefits: [
            'Discriminate subtle contingencies (DTT vs NET, DRA vs DRI)',
            'Build pacing and cognitive stamina for 85 exam questions',
            'Immediate step-by-step clinical explanations for every option',
          ],
        },
        {
          title: 'Leitner Spaced Repetition',
          icon: Layers,
          iconBg: 'bg-emerald-50 text-emerald-600',
          badge: '5-Box Memory Engine',
          desc: 'Our flashcard system sorts Applied Behavior Analysis terminology into 5 distinct mastery boxes, prioritizing difficult concepts at expanding intervals to lock them into long-term recall.',
          benefits: [
            'Master key ABA definitions and operational criteria',
            'Focus your daily study time where your memory needs it most',
            'Counteract the forgetting curve prior to test day',
          ],
        },
        {
          title: 'Diagnostic Domain Analytics',
          icon: BarChart3,
          iconBg: 'bg-indigo-50 text-indigo-600',
          badge: 'BACB 3rd Edition TCO',
          desc: 'Every practice session and mock exam breaks down your accuracy across all 6 official domains and 43 task outlines, showing you exactly where to focus your review.',
          benefits: [
            'Exact TCO weighting (A: 17%, B: 11%, C: 25%, D: 19%, E: 13%, F: 15%)',
            'Objective 80%+ readiness benchmarks per task outline',
            'Familiarity with Pearson VUE computer-based test formats',
          ],
        },
      ];

  return (
    <section id="methodology" className="py-24 bg-slate-50/70 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEs ? 'Metodología de Estudio Basada en Evidencia' : 'Evidence-Based Learning Architecture'}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {isEs ? 'Cómo Nuestra Plataforma Desarrolla Competencia Clínica Real' : 'How Candidates Build Authentic Clinical Competency'}
          </h2>
          <p className="text-base text-slate-600">
            {isEs
              ? 'Combinamos ciencia cognitiva, el temario oficial BACB 3ª edición y tutoría socrática para transformar la teoría en preparación para el examen.'
              : 'Combining cognitive science, the official BACB 3rd Edition Test Content Outline, and Socratic clinical guidance to prepare candidates for exam day.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methodologyPillars.map((pillar, idx) => (
            <Card key={idx} glass className="p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border-white/80">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center font-bold shadow-sm`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="slate" className="text-xs font-semibold">
                    {pillar.badge}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {pillar.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
