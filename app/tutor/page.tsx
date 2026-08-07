'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChatMessage, CertificationLevel, PromptMode } from '@/types/ai-tutor';
import { processAITutorMessage } from '@/lib/ai-prompt-manager';
import { buildCandidateSystemContext } from '@/lib/ai-candidate-memory';
import {
  Brain,
  Sparkles,
  Send,
  Plus,
  Pin,
  Trash2,
  Copy,
  RotateCw,
  Zap,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Mic,
  MessageSquare,
  ChevronRight,
  BookOpen,
  Layers,
  Award,
} from 'lucide-react';

export default function TutorPage() {
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [mode, setMode] = useState<PromptMode>('socratic_mentor');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const candidateContext = buildCandidateSystemContext('default_user', certification);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Welcome! I am **Socrates AI**, your Board Certified Behavior Analyst (BCBA) clinical mentor. I'm here to help you master the **${certification} Exam** with Socratic guidance, clinical scenario deconstructions, and exam strategies.\n\nI see your current exam readiness rating is **${candidateContext.readinessScore}%**. Let me help you turn your weak topics into strengths!`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Candidate Focus Recommendation',
        simpleExplanation: `Your current top weakness target is ${candidateContext.weakTopics[0]}.`,
        clinicalExample: 'Ask me: "Explain DRO vs DRA with a clinical scenario" or "Deconstruct a transition tantrum scenario".',
        examTip: 'Mastering Differential Reinforcement (Domain D) accounts for ~24% of your official BACB exam grade.',
        mnemonicTip: 'DRO = ZERO occurrences. DRA = Alternative Card.',
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    try {
      const apiRes = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: textToSend,
          history: messages,
          mode,
          certification,
        }),
      });

      const data = await apiRes.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        const responseMsg = await processAITutorMessage(textToSend, messages, mode, certification);
        setMessages((prev) => [...prev, responseMsg]);
      }
    } catch (e) {
      console.error(e);
      const responseMsg = await processAITutorMessage(textToSend, messages, mode, certification);
      setMessages((prev) => [...prev, responseMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const starterChips = [
    'Explain DRO vs DRA with a clinical example',
    'Deconstruct a flopping transition scenario for ABC data',
    'What are the 4 functions of behavior?',
    'Explain Discrete Trial Teaching (DTT) 5 steps',
    'Explain BACB ethical rules on client gift acceptance',
  ];

  return (
    <ProtectedRoute>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex gap-6">

        {/* SIDEBAR: CONVERSATION HISTORY & MODES (3 Cols) */}
        <div className="hidden lg:flex flex-col w-72 flex-shrink-0 space-y-4">
          <Card glass className="p-4 shadow-xl border-white/90 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <Button
                onClick={() => {
                  setMessages([messages[0]]);
                }}
                variant="primary"
                size="md"
                className="w-full justify-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>New AI Socratic Chat</span>
              </Button>

              {/* Certification Selector */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Certification
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(['RBT', 'BCaBA', 'BCBA'] as CertificationLevel[]).map((cert) => (
                    <button
                      key={cert}
                      onClick={() => setCertification(cert)}
                      className={`py-1.5 rounded-lg transition-all ${
                        certification === cert ? 'bg-white text-[#2563EB] shadow font-black' : 'text-slate-500'
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selector */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  AI Mentorship Mode
                </label>
                <div className="space-y-1">
                  {[
                    { id: 'socratic_mentor', label: 'Socratic Mentor', icon: Brain },
                    { id: 'scenario_analyzer', label: 'Clinical ABC Analyzer', icon: FileText },
                    { id: 'question_explainer', label: 'Question Explainer', icon: Zap },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as PromptMode)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center space-x-2 border transition-all ${
                        mode === m.id
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <m.icon className={`w-4 h-4 ${mode === m.id ? 'text-blue-400' : 'text-slate-400'}`} />
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Readiness Context Badge */}
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs space-y-1">
                <div className="font-bold text-[#2563EB] flex items-center justify-between">
                  <span>Candidate Focus</span>
                  <span>{candidateContext.readinessScore}% Ready</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Targeting weak topic: <strong>{candidateContext.weakTopics[0]}</strong>
                </p>
              </div>
            </div>

            {/* Bottom Safety Disclaimer */}
            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 font-bold text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Educational Purpose Only</span>
              </div>
              <p>Does not constitute medical advice or official BACB affiliation.</p>
            </div>
          </Card>
        </div>

        {/* MAIN CHAT CANVAS (9 Cols) */}
        <div className="flex-1 flex flex-col h-full space-y-4">
          {/* Top Bar Banner */}
          <Card glass className="p-4 flex items-center justify-between shadow-lg border-white/90">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                  <span>Socrates AI Mentor</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    BCBA Certified AI Agent
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Target: {certification} Exam • Mode: {mode.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="blue" className="hidden sm:flex">
                {candidateContext.weakTopics.length} Priority Weak Topics Tracked
              </Badge>
            </div>
          </Card>

          {/* CHAT MESSAGE STREAM CONTAINER */}
          <Card glass className="flex-1 p-6 overflow-y-auto shadow-2xl border-white/90 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-2xl p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-none shadow-md font-medium'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none shadow-lg space-y-4'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* STRUCTURED CLINICAL INSIGHT CARD */}
                  {msg.clinicalInsight && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-xs space-y-3 mt-3">
                      <div className="flex items-center justify-between font-bold text-[#2563EB]">
                        <span className="flex items-center space-x-1.5">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Clinical ABA Insight: {msg.clinicalInsight.concept}</span>
                        </span>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {msg.clinicalInsight.simpleExplanation}
                      </p>

                      {/* Clinical Example Box */}
                      <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-slate-800 dark:text-blue-200">
                        <div className="font-bold text-[#2563EB] mb-0.5">Clinical Real-World Scenario:</div>
                        <p className="italic">{msg.clinicalInsight.clinicalExample}</p>
                      </div>

                      {/* Mnemonic Memory Trick */}
                      {msg.clinicalInsight.mnemonicTip && (
                        <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900 text-slate-800 dark:text-amber-200">
                          <div className="font-bold text-amber-600 mb-0.5">Mnemonic Memory Trick:</div>
                          <p>{msg.clinicalInsight.mnemonicTip}</p>
                        </div>
                      )}

                      {/* BACB Exam Pro Tip */}
                      <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
                        <div className="font-bold text-emerald-700 mb-0.5">BACB Exam Strategy Tip:</div>
                        <p>{msg.clinicalInsight.examTip}</p>
                      </div>
                    </div>
                  )}

                  {/* STRUCTURED ABC SCENARIO BREAKDOWN BOX */}
                  {msg.scenarioAnalysis && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 text-xs space-y-3 mt-3">
                      <div className="font-bold text-[#2563EB] flex items-center space-x-1.5">
                        <FileText className="w-4 h-4 text-[#2563EB]" />
                        <span>Clinical ABC Functional Analysis Breakdown</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                          <div className="font-bold text-amber-800 uppercase text-[10px]">1. Antecedent (SD)</div>
                          <p className="text-slate-800">{msg.scenarioAnalysis.antecedent}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                          <div className="font-bold text-rose-800 uppercase text-[10px]">2. Target Behavior</div>
                          <p className="text-slate-800">{msg.scenarioAnalysis.behavior}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                          <div className="font-bold text-blue-800 uppercase text-[10px]">3. Consequence</div>
                          <p className="text-slate-800">{msg.scenarioAnalysis.consequence}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                        <div className="font-bold text-emerald-800">Functional Replacement Behavior (DRA):</div>
                        <p className="text-emerald-900">{msg.scenarioAnalysis.replacementBehavior}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 space-y-1">
                        <div className="font-bold text-purple-800">Ethical Considerations (BACB Ethics Code 2.01):</div>
                        <p className="text-purple-900">{msg.scenarioAnalysis.ethicalConsiderations}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Action Controls */}
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => navigator.clipboard.writeText(msg.content)}
                      className="p-1 hover:text-slate-700 flex items-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-slate-400 animate-pulse p-3 bg-slate-50 rounded-xl w-48">
                <Brain className="w-4 h-4 text-[#2563EB] animate-spin" />
                <span>Socrates AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </Card>

          {/* STARTER CHIPS (Shown when few messages) */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2">
              {starterChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-blue-400 hover:text-[#2563EB] transition-all shadow-sm flex items-center space-x-1"
                >
                  <span>{chip}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* INPUT BAR CONTAINER */}
          <Card glass className="p-3 shadow-xl border-white/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-3"
            >
              <textarea
                rows={1}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Ask Socrates AI any ${certification} question, concept, or scenario...`}
                className="flex-1 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 resize-none"
              />

              <Button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                variant="primary"
                size="md"
                className="gap-2 shadow-lg shadow-blue-500/25 px-6 rounded-2xl"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
