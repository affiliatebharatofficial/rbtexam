'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, Zap, ArrowRight, HelpCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export function PracticeTestPreview() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const questions = [
    {
      id: 1,
      domain: isEs ? 'Dominio C: Adquisición de Habilidades' : 'Domain C: Skill Acquisition',
      code: 'C-04',
      question: isEs
        ? 'Un RBT presenta una tarjeta con un círculo rojo, modela de inmediato la palabra "Rojo" y refuerza al cliente cuando repite "Rojo". Con el tiempo, el RBT retrasa decir "Rojo" para permitir que el cliente responda de forma independiente. ¿Qué procedimiento se está utilizando?'
        : 'An RBT presents a flashcard of a red circle, immediately models the word "Red", and reinforces the client when they repeat "Red". Over successive trials, the RBT delays saying "Red" to allow the client to respond independently. What procedure is being used?',
      options: [
        { id: 'A', text: isEs ? 'Desvanecimiento de Ayuda (Más a Menos / Demora de Tiempo)' : 'Prompt Fading (Most-to-Least / Time Delay)', correct: true },
        { id: 'B', text: isEs ? 'Generalización del Estímulo' : 'Stimulus Generalization', correct: false },
        { id: 'C', text: isEs ? 'Protocolo de Explosión de Extinción' : 'Extinction Burst Protocol', correct: false },
        { id: 'D', text: isEs ? 'Evaluación de Preferencias de Operante Libre' : 'Free Operant Preference Assessment', correct: false },
      ],
      explanation: isEs
        ? '¡Correcto! Retrasar la ayuda en ensayos sucesivos para permitir la respuesta independiente es el desvanecimiento por demora de tiempo (Time Delay), un procedimiento clave de adquisición de habilidades bajo la tarea BACB C-04.'
        : 'Correct! Delaying the prompt over successive trials to allow independent responding is Time Delay Prompt Fading, a key skill acquisition procedure under BACB Task Item C-04.',
    },
    {
      id: 2,
      domain: isEs ? 'Dominio A: Medición' : 'Domain A: Measurement',
      code: 'A-02',
      question: isEs
        ? 'Un RBT registra el tiempo exacto que transcurre desde que el BCBA da la instrucción "Siéntate" hasta que el cliente comienza físicamente a sentarse. ¿Qué dimensión de medición continua se está registrando?'
        : 'An RBT records the exact time that elapses from when the BCBA delivers the instruction "Sit down" until the client physically begins to sit down. What continuous measurement dimension is being recorded?',
      options: [
        { id: 'A', text: isEs ? 'Duración' : 'Duration', correct: false },
        { id: 'B', text: isEs ? 'Tiempo entre Respuestas (IRT)' : 'Inter-Response Time (IRT)', correct: false },
        { id: 'C', text: isEs ? 'Latencia' : 'Latency', correct: true },
        { id: 'D', text: isEs ? 'Frecuencia / Tasa' : 'Frequency / Rate', correct: false },
      ],
      explanation: isEs
        ? '¡Correcto! La latencia mide el tiempo transcurrido desde la presentación del estímulo (instrucción SD) hasta el inicio de la conducta de respuesta.'
        : 'Correct! Latency measures the elapsed time from the onset of a stimulus (SD instruction) to the initiation of the response behavior.',
    },
    {
      id: 3,
      domain: isEs ? 'Dominio F: Conducta Profesional' : 'Domain F: Professional Conduct',
      code: 'F-02',
      question: isEs
        ? 'Durante una sesión domiciliaria, el padre del cliente le pide al RBT consejo sobre cómo cambiar el horario de terapia de lenguaje del niño. ¿Cómo debe responder el RBT según las pautas de la BACB?'
        : 'During a home session, the client\'s parent asks the RBT for advice regarding changing the child\'s speech therapy schedule. How should the RBT respond under BACB guidelines?',
      options: [
        { id: 'A', text: isEs ? 'Dar consejo personal basado en su propia experiencia' : 'Provide personal advice based on experience', correct: false },
        { id: 'B', text: isEs ? 'Redirigir cortésmente al padre para que consulte los cambios de tratamiento con el supervisor BCBA' : 'Politely redirect the parent to discuss treatment changes with the supervising BCBA', correct: true },
        { id: 'C', text: isEs ? 'Cambiar el horario de la sesión de ABA por su cuenta' : 'Change the ABA session schedule independently', correct: false },
        { id: 'D', text: isEs ? 'Ignorar la pregunta del padre' : 'Ignore the parent\'s question', correct: false },
      ],
      explanation: isEs
        ? '¡Correcto! Los RBT deben mantener los límites profesionales (Dominio F-02) y redirigir todas las preguntas de programación clínica o interdisciplinaria a su BCBA supervisor.'
        : 'Correct! RBTs must maintain professional boundaries (Domain F-02) and redirect all clinical programming or cross-disciplinary questions to their supervising BCBA.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    setSelectedOption(optId);
  };

  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);

    const chosen = currentQ.options.find((o) => o.id === selectedOption);
    if (chosen?.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <section id="practice-test" className="py-24 bg-slate-50/80 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1 font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('testPreview.badge', 'Interactive Exam Simulator')}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('testPreview.heading', 'Try a Live Practice Question Sample')}
          </h2>
          <p className="text-base text-slate-600">
            {t('testPreview.subheading', 'Experience our computer-based exam simulator with instant clinical feedback and domain tagging.')}
          </p>
        </div>

        <Card glass className="p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl border-white/90">
          {/* Question Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#2563EB] text-xs font-bold">
                {currentQ.code}
              </span>
              <span className="text-xs font-bold text-slate-600 hidden sm:inline">{currentQ.domain}</span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1 font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEs ? '01:14 restante' : '01:14 remaining'}</span>
              </div>
              <span className="font-bold text-[#2563EB]">{isEs ? 'Puntuación' : 'Score'}: {score}/{questions.length}</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-4 mb-6">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {t('exam.question', 'Question')} {currentIndex + 1} {t('exam.of', 'of')} {questions.length}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

              if (hasSubmitted) {
                if (opt.correct) {
                  btnStyle = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !opt.correct) {
                  btnStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-900 font-medium';
                }
              } else if (isSelected) {
                btnStyle = 'border-2 border-[#2563EB] bg-blue-50/60 text-[#2563EB] font-semibold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {hasSubmitted && opt.correct && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                  {hasSubmitted && isSelected && !opt.correct && <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Socratic Rationale Box */}
          {hasSubmitted && (
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 space-y-2 mb-6 animate-fadeIn">
              <div className="flex items-center space-x-2 font-bold text-[#2563EB]">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Socrates AI Rationale:</span>
              </div>
              <p className="leading-relaxed font-normal">{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {!hasSubmitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedOption}
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-8 gap-2"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} variant="primary" size="md" className="w-full sm:w-auto px-8 gap-2">
                <span>Next Sample Question</span>
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}

            <Link href="/exam" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm" className="text-xs text-slate-600 hover:text-[#2563EB] gap-1">
                <span>Full 85-Q Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
