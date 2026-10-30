'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

// This is the homepage's only FAQ section. Every answer is rendered
// unconditionally so it is present in the page source, not only after
// a click expands an accordion item.
export function FAQSection() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const faqs = isEs
    ? [
        {
          q: '¿Qué es la práctica de RBT y cómo me ayuda RBT Practice AI a prepararme?',
          a: 'La práctica de RBT implica trabajar con preguntas de práctica realistas basadas en escenarios y exámenes simulados cronometrados alineados con el Temario BACB RBT. RBT Practice AI combina un simulador de 85 preguntas, tarjetas de repetición espaciada Leitner, explicaciones del tutor de IA Sócrates y seguimiento del dominio en las 6 áreas de la 3ª edición.',
        },
        {
          q: '¿El acceso a la plataforma es 100% gratuito?',
          a: '¡Sí! Toda la plataforma ofrece acceso completo gratuito que incluye preguntas de práctica realistas, exámenes simulados cronometrados de 85 preguntas y 90 minutos, explicaciones con Sócrates IA y tarjetas didácticas de repetición espaciada.',
        },
        {
          q: '¿Está alineada la plataforma con el Temario BACB RBT 3ª Edición?',
          a: 'Sí. El 100% de nuestras preguntas, tarjetas y módulos están mapeados directamente a los 6 dominios del temario oficial: Recolección de Datos y Gráficos, Evaluación de la Conducta, Adquisición de la Conducta, Reducción de la Conducta, Documentación y Reportes, y Ética.',
        },
        {
          q: '¿Son las preguntas de RBT Practice AI preguntas oficiales del examen BACB?',
          a: 'No. La BACB no publica ni licencia preguntas de examen oficiales. Todas las preguntas de RBT Practice AI son preguntas de práctica originales diseñadas para reflejar la dificultad, estructura y escenarios clínicos del Temario de Contenido de la Prueba RBT 3ª Edición.',
        },
        {
          q: '¿Puedo tomar un examen de práctica completo de 85 preguntas en línea?',
          a: '¡Sí! RBT Practice AI incluye simulacros completos de 85 preguntas y 90 minutos con ponderación por dominios que replica la distribución oficial del examen.',
        },
        {
          q: '¿Cómo funciona el Tutor de IA Sócrates?',
          a: 'Sócrates IA es un asistente conversacional educativo configurado con principios de análisis de conducta aplicada y el Código Ético 2.0. Proporciona justificaciones clínicas paso a paso de por qué las opciones son correctas o distractores.',
        },
        {
          q: '¿Cómo coincide el examen simulado con las condiciones de prueba de Pearson VUE?',
          a: 'El examen oficial se realiza en centros Pearson VUE. Nuestro simulador replica estas condiciones con temporizador de 90 minutos, marcado de preguntas, cuadrícula de navegación y desglose inmediato por dominios.',
        },
        {
          q: '¿Cómo funciona el sistema de tarjetas didácticas con repetición espaciada Leitner?',
          a: 'Nuestro motor organiza los términos de ABA en 5 cajas Leitner según tu precisión de recuerdo. Los conceptos difíciles aparecen con mayor frecuencia para refuerzo activo.',
        },
        {
          q: '¿Pueden las clínicas de ABA y supervisores BCBA monitorear el progreso de los estudiantes?',
          a: 'Sí. Nuestro portal Enterprise permite a los directores clínicos y BCBA gestionar cohortes de aprendices, asignar exámenes y verificar la preparación del equipo.',
        },
      ]
    : [
        {
          q: 'What is RBT practice and how does RBT Practice AI help me prepare?',
          a: 'RBT practice involves working through realistic, scenario-based practice questions and timed mock exams aligned with the BACB RBT Test Content Outline. RBT Practice AI combines an 85-question exam simulator, Leitner spaced repetition flashcards, Socrates AI tutor explanations, and domain mastery tracking across all 6 BACB 3rd Edition content areas.',
        },
        {
          q: 'What does the 100% free complete access include?',
          a: 'Free access gives you complete access to the platform, including realistic practice questions, full 85-question 90-minute timed mock exams, Socrates AI tutor explanations, spaced repetition flashcards, and personalized domain diagnostic heatmaps.',
        },
        {
          q: 'Is the platform aligned with the BACB RBT 3rd Edition Test Content Outline?',
          a: 'Yes. 100% of our practice questions, flashcards, and study modules are mapped directly to the current BACB RBT 3rd Edition Test Content Outline across Domains A through F: Data Collection and Graphing, Behavior Assessment, Behavior Acquisition, Behavior Reduction, Documentation and Reporting, and Ethics.',
        },
        {
          q: 'Are RBT Practice AI questions official BACB exam questions?',
          a: 'No. The BACB does not publish or license official exam questions. All questions on RBT Practice AI are original practice questions crafted to mirror the difficulty, structure, clinical scenarios, and cognitive levels of the current BACB RBT 3rd Edition Test Content Outline.',
        },
        {
          q: 'Can I take a full 85-question RBT practice exam online?',
          a: 'Yes! RBT Practice AI includes full 85-question, 90-minute timed mock exams with question weighting that mirrors the official exam distribution across all 6 BACB 3rd Edition domains.',
        },
        {
          q: 'How does the Socrates AI Tutor work?',
          a: 'Socrates AI is an educational conversational assistant configured with Applied Behavior Analysis principles and the RBT Ethics Code 2.0 framework. It provides instant step-by-step rationales for why correct options are right and why distractors are incorrect, helps you practice clinical roleplay, and clears up difficult concepts in real time.',
        },
        {
          q: 'How does the practice exam match Pearson VUE testing conditions?',
          a: 'The actual BACB RBT exam is administered via computer at Pearson VUE test centers. Our mock exam simulator replicates these conditions with an 85-question 90-minute timer, question flagging, navigation review grid, and instant post-exam domain score breakdowns.',
        },
        {
          q: 'How does the Leitner Spaced Repetition Flashcard system work?',
          a: 'Our flashcard engine sorts ABA terms into 5 Leitner boxes based on your recall accuracy. Challenging concepts appear frequently for active reinforcement, while mastered terms appear at expanding intervals to guarantee long-term memory retention.',
        },
        {
          q: 'Can ABA Clinics and BCBA supervisors monitor student progress?',
          a: 'Yes. Our Clinic Enterprise portal allows clinical directors and BCBA supervisors to manage trainee cohorts, assign mock exams, track domain readiness heatmaps, and verify exam preparedness across their organization.',
        },
      ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-[#2563EB]" />
            <span>{t('faq.badge', 'Got Questions?')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('faq.heading', 'Frequently Asked Questions About the RBT Exam & RBT Practice')}
          </h2>
          <p className="text-base text-slate-600">
            {t('faq.subheading', 'Everything you need to know about preparing for the RBT certification exam with RBT Practice AI.')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="p-6 border-slate-200 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between text-left">
                <h3 className="text-base font-bold text-[#0F172A] pr-4">{faq.q}</h3>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
