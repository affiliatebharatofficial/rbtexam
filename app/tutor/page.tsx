'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { ChatMessage, CertificationLevel, PromptMode } from '@/types/ai-tutor';
import { buildCandidateSystemContext } from '@/lib/ai-candidate-memory';
import {
  Brain,
  Sparkles,
  Send,
  Plus,
  Trash2,
  Copy,
  Zap,
  CheckCircle2,
  ShieldCheck,
  FileText,
  ChevronRight,
  Award,
  Globe,
} from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';

function TutorContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get('topic');

  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [mode, setMode] = useState<PromptMode>('socratic_mentor');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Candidate Context State
  const candidateName = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Candidate');
  const candidateContext = buildCandidateSystemContext(user?.id || 'default_user', certification, user);

  // Find task list item if topic parameter was passed from Study Hub
  let matchedTaskItem: any = null;
  if (topicParam) {
    for (const domain of BACB_TASK_LIST_3RD_EDITION) {
      const found = domain.items.find((it) => it.id.toLowerCase() === topicParam.toLowerCase());
      if (found) {
        matchedTaskItem = found;
        break;
      }
    }
  }

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (matchedTaskItem) {
      return [
        {
          id: `msg-welcome-topic-${Date.now()}`,
          sender: 'assistant',
          content: `🎯 **BACB Task List Mentorship Active: Item ${matchedTaskItem.id} — ${matchedTaskItem.title}**\n\n${matchedTaskItem.description}\n\n**Key Concepts to Master**: ${matchedTaskItem.keyConcepts.join(', ')}.\n\nAsk me any Socratic question, clinical scenario, or exam item strategy for **Item ${matchedTaskItem.id}**!`,
          timestamp: new Date().toISOString(),
          clinicalInsight: {
            concept: `BACB Task List Item ${matchedTaskItem.id}`,
            simpleExplanation: matchedTaskItem.description,
            clinicalExample: `Clinical Session Practice: Implement ${matchedTaskItem.title} according to BCBA operational criteria.`,
            examTip: `BACB ${certification} Exam Weight: ~${matchedTaskItem.examWeightPercentage}% of total score.`,
            mnemonicTip: `Key Terms: ${matchedTaskItem.keyConcepts.join(' • ')}`,
          },
        },
      ];
    }

    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: `Welcome, **${candidateName}**! I am **Socrates AI**, your Board Certified Behavior Analyst (BCBA) clinical mentor. I'm here to help you master the **${certification} Exam** with Socratic guidance, clinical scenario deconstructions, and exam strategies.\n\nI see your current exam readiness rating is **${candidateContext.readinessScore}%**. Let me help you turn your weak topics into strengths!`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Candidate Focus Recommendation',
          simpleExplanation: `Your current top weakness target is ${candidateContext.weakTopics[0]}.`,
          clinicalExample: 'Ask me: "Explain DRO vs DRA with a clinical scenario" or "Deconstruct a transition tantrum scenario".',
          examTip: 'Mastering Differential Reinforcement (Domain D) accounts for ~24% of your official BACB exam grade.',
          mnemonicTip: 'DRO = ZERO occurrences. DRA = Alternative Card.',
        },
      },
    ];
  });

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
          userName: candidateName,
          userEmail: user?.email,
          language,
        }),
      });

      const data = (await apiRes.json()) as any;
      if (data && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'assistant',
            content: `⚠️ **Socrates AI Notice**: ${data?.error || data?.message || 'Unable to generate response. Please try again with another ABA question.'}`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (e: any) {
      console.error('Socrates AI Tutor Chat Error:', e);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: '⚠️ **Network Notice**: Connection interrupted. Please check your internet or retry your question.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const getStarterChipsForMode = (activeMode: PromptMode, cert: CertificationLevel) => {
    if (cert === 'BCBA') {
      if (activeMode === 'scenario_analyzer') {
        return [
          'Analyze: BCBA conducts analogue Functional Analysis (FA) for self-injurious behavior',
          'Deconstruct: System-wide OBM performance management feedback loop failure',
          'Analyze: Component analysis of 3-token reinforcement schedule vs DRO',
          'Deconstruct: BCBA supervisor handling RBT procedural drift in clinic setting',
        ];
      }
      if (activeMode === 'question_explainer') {
        return [
          'Explain Question: Differentiate Component vs Parametric Analysis in behavior change plans',
          'Deconstruct: Reversal vs Multiple Baseline experimental design threats to internal validity',
          'Explain Question: BCBA supervision requirements for RBTs and BCaBAs under Ethics Code',
          'Deconstruct: Functional Analysis vs Indirect Assessment interpretation traps',
        ];
      }
      return [
        'Explain Component vs Parametric Analysis with a clinical example',
        'How to design an OBM Performance Diagnostic Checklist (PDC-HS)',
        'Differentiate Reversal vs Multiple Baseline experimental designs',
        'Explain BCBA ethical responsibilities for RBT and BCaBA supervision',
      ];
    }

    if (cert === 'BCaBA') {
      if (activeMode === 'scenario_analyzer') {
        return [
          'Analyze: BCaBA assists in conducting Attention vs Escape Functional Analysis conditions',
          'Deconstruct: BCaBA designing token economy backup reinforcer exchange schedule',
          'Analyze: BCaBA observing RBT implementing discrete trial training protocol',
          'Deconstruct: BCaBA evaluating indirect FAI assessment data from caregiver',
        ];
      }
      if (activeMode === 'question_explainer') {
        return [
          'Explain Question: What are the BCaBA RBT supervision percentage requirements?',
          'Deconstruct: Functional Analysis Attention condition vs Demand condition triggers',
          'Explain Question: How to establish backup reinforcers in a clinic token economy',
          'Deconstruct: Indirect vs Direct behavior assessment methods for BCaBA candidates',
        ];
      }
      return [
        'Explain Functional Analysis (FA) Attention vs Escape conditions',
        'What are the BCaBA RBT supervision requirements under the BACB?',
        'Design a token economy backup reinforcer system for a classroom',
        'Explain Indirect vs Direct behavioral assessment methods',
      ];
    }

    // Default RBT
    if (activeMode === 'scenario_analyzer') {
      return [
        'Analyze: Learner screams and hits when transition timer goes off',
        'Deconstruct: Learner flops to floor during math worksheet presentation',
        'Analyze: Learner engages in self-stimulatory hand flapping during downtime',
        'Deconstruct: Learner grabs peer\'s toy without asking during free play',
      ];
    }
    if (activeMode === 'question_explainer') {
      return [
        'Explain Question: An RBT records data every 15 seconds regardless of behavior. What measurement is this?',
        'Deconstruct: Why is DRO selected over extinction for self-injurious behavior?',
        'Explain Question: A BCBA asks RBT to modify BIP without parent consent. What ethical code item applies?',
        'Deconstruct: Differentiate continuous vs discontinuous measurement items',
      ];
    }
    return [
      'Explain DRO vs DRA with a clinical example',
      'Deconstruct a flopping transition scenario for ABC data',
      'What are the 4 functions of behavior?',
      'Explain Discrete Trial Teaching (DTT) 5 steps',
      'Explain BACB ethical rules on client gift acceptance',
    ];
  };

  const getInputPlaceholder = (activeMode: PromptMode, cert: string) => {
    if (activeMode === 'scenario_analyzer') {
      return `Describe or paste a clinical scenario for ABC deconstruction (${cert} Exam)...`;
    }
    if (activeMode === 'question_explainer') {
      return `Paste a practice question or question stem to break down distractors (${cert} Exam)...`;
    }
    return `Ask Socrates AI any ${cert} question, ABA concept, or clinical scenario...`;
  };

  const getModeInfo = (activeMode: PromptMode) => {
    if (activeMode === 'scenario_analyzer') {
      return {
        title: 'Clinical ABC Scenario Analyzer',
        badge: 'ABC Deconstruction Engine',
        color: 'bg-purple-100 text-purple-700',
        dotColor: 'bg-purple-500',
        icon: FileText,
      };
    }
    if (activeMode === 'question_explainer') {
      return {
        title: 'Question & Distractor Explainer',
        badge: 'Option Elimination Engine',
        color: 'bg-amber-100 text-amber-800',
        dotColor: 'bg-amber-500',
        icon: Zap,
      };
    }
    return {
      title: 'Socrates AI Mentor',
      badge: 'Socratic Dialogue Engine',
      color: 'bg-emerald-100 text-emerald-700',
      dotColor: 'bg-emerald-500',
      icon: Brain,
    };
  };

  const handleCertificationChange = (newCert: CertificationLevel) => {
    if (newCert === certification) return;
    setCertification(newCert);

    let certNotice = '';
    if (newCert === 'BCBA') {
      certNotice = `🎓 **Target Certification Changed to BCBA (Board Certified Behavior Analyst)**\n\nTargeting the **BACB 6th Edition BCBA Test Content Outline (TCO)**. Socrates AI is now configured for advanced behavior analysis, Functional Analysis (FA) interpretation, component/parametric analysis, OBM performance management, and clinical supervision.`;
    } else if (newCert === 'BCaBA') {
      certNotice = `🎓 **Target Certification Changed to BCaBA (Board Certified Assistant Behavior Analyst)**\n\nTargeting the **BACB 6th Edition BCaBA Test Content Outline (TCO)**. Socrates AI is now configured for assistant behavior analyst competencies, FA conditions, RBT supervision rules, and program modification under BCBA oversight.`;
    } else {
      certNotice = `🎓 **Target Certification Changed to RBT (Registered Behavior Technician)**\n\nTargeting the **BACB RBT 3rd Edition Test Content Outline (TCO)**. Socrates AI is now configured for 1-on-1 direct therapy implementation, measurement data collection, prompt fading, and session documentation.`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-cert-switch-${Date.now()}`,
        sender: 'assistant',
        content: certNotice,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleModeChange = (newMode: PromptMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    let modeWelcome = '';
    if (newMode === 'scenario_analyzer') {
      modeWelcome = `📋 **Clinical ABC Analyzer Mode Activated**\n\nSend me any clinical case study, transition challenge, or problem behavior scenario. I will break it down into Antecedent (A), Behavior (B), Consequence (C), Function, Replacement Behavior (FCT), and BACB Ethical Safeguards (${certification} Exam).`;
    } else if (newMode === 'question_explainer') {
      modeWelcome = `⚡ **Question & Distractor Explainer Mode Activated**\n\nPaste any practice exam question or BACB Task List item. I will identify the correct option, explain why it is correct, and perform a Distractor Elimination Analysis on options A, B, C, and D (${certification} Exam).`;
    } else {
      modeWelcome = `🧠 **Socratic Mentor Mode Activated**\n\nAsk me any ABA concept, measurement method, or ethical dilemma. I will guide you step-by-step through Socratic mentorship for your **${certification} Exam**.`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-mode-switch-${Date.now()}`,
        sender: 'assistant',
        content: modeWelcome,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const currentModeInfo = getModeInfo(mode);
  const activeStarterChips = getStarterChipsForMode(mode, certification);

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
                      onClick={() => handleCertificationChange(cert)}
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
                      onClick={() => handleModeChange(m.id as PromptMode)}
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                <currentModeInfo.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                  <span>{currentModeInfo.title}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center space-x-1 ${currentModeInfo.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentModeInfo.dotColor}`}></span>
                    <span>{currentModeInfo.badge}</span>
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Target: {certification} Exam • Active Mode: {mode.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
          </Card>

          {/* CHAT MESSAGE STREAM CONTAINER */}
          <Card glass className="flex-1 p-6 overflow-y-auto shadow-2xl border-white/90 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl max-w-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-none font-medium'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-900 rounded-bl-none font-normal shadow-lg'
                  }`}
                >
                  <MarkdownRenderer content={msg.content} />

                  {/* STRUCTURED CLINICAL INSIGHT CARD */}
                  {msg.clinicalInsight && (
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-white space-y-2 border border-indigo-500/30">
                      <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
                        <span className="text-blue-300 flex items-center space-x-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Clinical Concept: {msg.clinicalInsight.concept}</span>
                        </span>
                        <Badge variant="blue" className="text-[10px] bg-blue-500/20 text-blue-300 border-none">
                          BACB 3rd Ed
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-300 font-sans">{msg.clinicalInsight.simpleExplanation}</p>

                      {msg.clinicalInsight.clinicalExample && (
                        <div className="text-xs p-2.5 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700">
                          <strong className="text-emerald-400 block mb-0.5">Real-World ABA Session Scenario:</strong>
                          {msg.clinicalInsight.clinicalExample}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-amber-400 font-semibold">🎯 Exam Tip: {msg.clinicalInsight.examTip}</span>
                        {msg.clinicalInsight.mnemonicTip && (
                          <span className="text-blue-300 font-mono text-[10px] bg-blue-900/60 px-2 py-0.5 rounded">
                            {msg.clinicalInsight.mnemonicTip}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SCENARIO ANALYSIS BOX */}
                  {msg.scenarioAnalysis && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
                      <div className="text-xs font-extrabold text-emerald-400 flex items-center space-x-1 border-b border-slate-800 pb-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span>Clinical ABC Scenario Deconstruction</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-[11px]">
                        <div><strong className="text-blue-400">Target Behavior:</strong> {msg.scenarioAnalysis.problemBehavior}</div>
                        <div><strong className="text-emerald-400">Antecedent (SD):</strong> {msg.scenarioAnalysis.antecedent}</div>
                        <div><strong className="text-amber-300">Consequence:</strong> {msg.scenarioAnalysis.consequence}</div>
                        <div><strong className="text-purple-300">Replacement Behavior:</strong> {msg.scenarioAnalysis.replacementBehavior}</div>
                        <div><strong className="text-indigo-300">Ethical Rule:</strong> {msg.scenarioAnalysis.ethicalConsiderations}</div>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 font-semibold px-1">
                  {msg.sender === 'user' ? 'You' : 'Socrates AI'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 p-3 rounded-2xl bg-slate-100 text-slate-500 text-xs font-bold animate-pulse w-48">
                <Brain className="w-4 h-4 text-purple-600 animate-spin" />
                <span>Socrates AI is typing live...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </Card>

          {/* STARTER CHIPS */}
          <div className="flex flex-wrap gap-2">
            {activeStarterChips.map((chip, idx) => (
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
                placeholder={getInputPlaceholder(mode, certification)}
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

export default function TutorPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-xs font-bold text-slate-500">Loading AI Mentor...</div>}>
      <TutorContent />
    </React.Suspense>
  );
}
