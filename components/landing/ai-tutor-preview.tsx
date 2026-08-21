'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Send, User, Bot, RefreshCw, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AiTutorPreview() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const samplePrompts = [
    {
      label: isEs ? 'Dilema Ético' : 'Ethics Dilemma',
      query: isEs
        ? '¿Qué debe hacer un RBT si los padres del cliente lo invitan a una fiesta de cumpleaños y le ofrecen una tarjeta de regalo?'
        : 'What should an RBT do if a client parent invites them to a birthday party and offers a gift card?',
      response: isEs
        ? 'Bajo el Código de Ética de la BACB para RBTs (Sección 1.06), los RBTs deben abstenerse de aceptar regalos o mantener relaciones duales con clientes o sus familias. Debes rechazar cortésmente la tarjeta de regalo, explicar que las pautas éticas prohíben regalos personales para mantener límites profesionales, e informar a tu supervisor BCBA.'
        : 'Under the BACB Ethics Code for RBTs (Section 1.06), RBTs must refrain from accepting gifts or engaging in dual relationships with clients or their families. You should politely decline the gift card, explain that BACB ethical guidelines prohibit accepting personal gifts to maintain professional boundaries, and inform your supervising BCBA.',
      taskDomain: isEs ? 'Dominio F: Conducta Profesional' : 'Domain F: Professional Conduct',
    },
    {
      label: isEs ? 'Explosión de Extinción' : 'Extinction Burst',
      query: isEs
        ? '¿Puedes explicar qué es una explosión de extinción con un ejemplo clínico de la vida real?'
        : 'Can you explain an extinction burst with a real-life clinical example?',
      response: isEs
        ? 'Una explosión de extinción es un aumento inmediato y temporal en la frecuencia, duración o intensidad de una conducta objetivo cuando se suspende por primera vez el reforzador. Ejemplo: Un niño que grita para obtener dulces en la caja grita más fuerte y por más tiempo cuando el padre deja de comprárselos.'
        : 'An extinction burst is an immediate, temporary increase in the frequency or intensity of a target behavior when reinforcement is first withheld. Example: A child who screams to get candy at the checkout line screams louder and longer when the parent first stops buying the candy. If the parent holds firm, the screaming will eventually drop to zero.',
      taskDomain: isEs ? 'Dominio D: Reducción de Conducta' : 'Domain D: Behavior Reduction',
    },
    {
      label: isEs ? 'DTT vs NET' : 'DTT vs NET',
      query: isEs
        ? '¿Cuál es la diferencia clave entre la Enseñanza por Ensayos Discretos (DTT) y la Enseñanza Naturalista (NET)?'
        : 'What is the key difference between Discrete Trial Teaching (DTT) and Naturalistic Teaching (NET)?',
      response: isEs
        ? 'DTT es estructurada, rápida, dirigida por el terapeuta y ocurre generalmente en mesa sin distracciones con reforzadores artificiales. NET es dirigida por el niño, ocurre en el entorno natural y usa reforzadores naturales vinculados a la motivación actual del niño.'
        : 'DTT is structured, fast-paced, teacher-initiated, and usually occurs in a distraction-free table environment with artificial reinforcers. NET (Naturalistic Environmental Teaching) is child-led, occurs in the natural setting, and uses natural reinforcers inherently tied to the child\'s current motivation.',
      taskDomain: isEs ? 'Dominio C: Adquisición de Habilidades' : 'Domain C: Skill Acquisition',
    },
    {
      label: isEs ? 'DRO vs DRA' : 'DRO vs DRA',
      query: isEs
        ? '¿Cómo distingo entre Reforzamiento Diferencial de Otra Conducta (DRO) y Conducta Alternativa (DRA)?'
        : 'How do I distinguish between Differential Reinforcement of Other Behavior (DRO) and Alternative Behavior (DRA)?',
      response: isEs
        ? 'En DRO (Otra conducta), el refuerzo se entrega si el problema NO ocurre en un intervalo de tiempo específico. En DRA (Alternativa), se refuerza específicamente una conducta de reemplazo funcional (ej. pedir un descanso en vez de golpear).'
        : 'In DRO (Other behavior), reinforcement is delivered if the target problem behavior does NOT occur during a specific time interval, regardless of what other behavior occurs. In DRA (Alternative behavior), reinforcement is delivered specifically when a functional alternative replacement behavior is demonstrated (e.g. asking for break instead of hitting).',
      taskDomain: isEs ? 'Dominio D: Reducción de Conducta' : 'Domain D: Behavior Reduction',
    },
  ];

  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; domain?: string }>>([
    { role: 'user', text: samplePrompts[0].query },
    { role: 'assistant', text: samplePrompts[0].response, domain: samplePrompts[0].taskDomain },
  ]);

  const handleSelectPrompt = (index: number) => {
    setActivePromptIndex(index);
    const selected = samplePrompts[index];
    setIsTyping(true);
    setMessages([
      { role: 'user', text: selected.query },
    ]);

    setTimeout(() => {
      setMessages([
        { role: 'user', text: selected.query },
        { role: 'assistant', text: selected.response, domain: selected.taskDomain },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput('');
    setIsTyping(true);
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: isEs
            ? `Análisis de Sócrates IA para "${userText}": En la práctica clínica de ABA, consulta siempre los estándares del temario BACB 3ª edición. Verifica la definición operacional de la conducta y consulta a tu supervisor BCBA.`
            : `Socrates AI Analysis for "${userText}": In ABA clinical practice, always refer to the BACB 3rd Edition TCO standards. Verify the target behavior definition, ensure proper data measurement (Domain A), and consult your supervising BCBA for protocol approval.`,
          domain: isEs ? 'Orientación BACB RBT 3ª Edición' : 'BACB RBT 3rd Edition Guidance',
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section id="ai-tutor" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1.5">
            <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{t('aiTutorPreview.badge', '24/7 Socratic AI Tutor')}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('aiTutorPreview.heading', 'Practice Clinical Scenarios with Socrates AI')}
          </h2>
          <p className="text-base text-slate-600">
            {t('aiTutorPreview.subheading', 'Get instant clinical rationales, roleplay ethical dilemmas, and clear up difficult ABA concepts with our 24/7 AI tutor.')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Sample Topic Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs font-bold text-slate-500 mr-2">{t('aiTutorPreview.trySample', 'Try Sample Scenario Prompts:')}</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  activePromptIndex === idx
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Chat Window Container */}
          <Card glass className="p-6 shadow-2xl border-white/90 overflow-hidden relative">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-extrabold text-[#0F172A]">Socrates AI RBT Tutor</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-slate-500">Trained on RBT Ethics Code 2.0 & Clinical TCO</span>
                </div>
              </div>

              <Link href="/tutor">
                <Button variant="outline" size="sm" className="text-xs gap-1.5">
                  <span>Open Full Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Chat Messages Body */}
            <div className="space-y-4 min-h-[260px] max-h-[380px] overflow-y-auto p-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${
                    msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                      msg.role === 'user'
                        ? 'bg-slate-800'
                        : 'bg-gradient-to-tr from-[#2563EB] to-indigo-600 shadow-md'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm max-w-[85%] sm:max-w-[75%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] text-white font-medium rounded-tr-none shadow-sm'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-sm space-y-2'
                    }`}
                  >
                    {msg.domain && (
                      <div className="flex items-center space-x-1 text-[10px] font-extrabold text-[#2563EB] uppercase tracking-wider">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>{msg.domain}</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-xs text-slate-400 p-2 italic">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
                  <span>Socrates AI is generating response...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendCustom} className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask Socrates AI a question about RBT exam topics..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
              />
              <Button type="submit" variant="primary" size="md" className="gap-1 px-5">
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
