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
  Settings,
  Key,
  Globe,
  X,
  Cpu,
} from 'lucide-react';

export default function TutorPage() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [mode, setMode] = useState<PromptMode>('socratic_mentor');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Live LLM Engine Settings State
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<string>('auto');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [lastTelemetry, setLastTelemetry] = useState<{
    providerUsed: string;
    modelUsed: string;
    latencyMs: number;
    isLive: boolean;
  } | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('rbt_socrates_api_key');
    if (savedKey) setApiKey(savedKey);
    const savedProv = localStorage.getItem('rbt_socrates_provider');
    if (savedProv) setProvider(savedProv);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('rbt_socrates_api_key', apiKey.trim());
    localStorage.setItem('rbt_socrates_provider', provider);
    setShowKeyModal(false);
  };

  const candidateName = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Candidate');
  const candidateContext = buildCandidateSystemContext(user?.id || 'default_user', certification, user);

  const [messages, setMessages] = useState<ChatMessage[]>([
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
          apiKey: apiKey.trim() || undefined,
          provider,
          userName: candidateName,
          userEmail: user?.email,
          language,
        }),
      });

      const data = await apiRes.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
        setLastTelemetry({
          providerUsed: data.providerUsed || 'AI Model',
          modelUsed: data.modelUsed || 'live',
          latencyMs: data.latencyMs || 0,
          isLive: Boolean(data.isLive),
        });
      }
    } catch (e) {
      console.error('Socrates AI Tutor Chat Error:', e);
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

              {/* Live AI API Settings Card (Admin Only) */}
              {user && (user.role === 'admin' || user.role === 'super_admin') && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-600" />
                      <span>LLM Engine API</span>
                    </span>
                    <button
                      onClick={() => setShowKeyModal(true)}
                      className="p-1 rounded text-blue-600 hover:bg-blue-50 font-extrabold"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {lastTelemetry?.isLive ? (
                      <span className="text-emerald-700 font-bold flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Live: {lastTelemetry.providerUsed}</span>
                      </span>
                    ) : (
                      <span>Provider: {provider === 'auto' ? 'Auto-Detect' : provider.toUpperCase()}</span>
                    )}
                  </div>
                  <Button
                    onClick={() => setShowKeyModal(true)}
                    variant="outline"
                    size="sm"
                    className="w-full text-[11px] py-1 font-bold h-7 gap-1"
                  >
                    <Key className="w-3 h-3 text-amber-500" />
                    <span>{apiKey ? 'API Key Saved' : 'Configure Custom API Key'}</span>
                  </Button>
                </div>
              )}

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
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                  <span>Socrates AI Mentor</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live AI Clinical Mentor</span>
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Target: {certification} Exam • Mode: {mode.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {lastTelemetry && (
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center space-x-1.5 ${
                  lastTelemetry.isLive ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>{lastTelemetry.isLive ? `Live: ${lastTelemetry.providerUsed} (${lastTelemetry.modelUsed}) • ${lastTelemetry.latencyMs}ms` : `Dynamic Engine`}</span>
                </div>
              )}

              <Button
                onClick={() => setShowKeyModal(true)}
                variant="outline"
                size="sm"
                className="gap-1 text-xs font-bold"
              >
                <Key className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">AI Settings</span>
              </Button>
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
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}

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

                      {msg.clinicalInsight.clinicalExample && (
                        <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-200 text-[11px] space-y-0.5">
                          <div className="font-bold text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            Clinical ABA Example
                          </div>
                          <div>{msg.clinicalInsight.clinicalExample}</div>
                        </div>
                      )}

                      {msg.clinicalInsight.examTip && (
                        <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-[11px] space-y-0.5">
                          <div className="font-bold text-[10px] text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>BACB Exam Strategy Tip</span>
                          </div>
                          <div>{msg.clinicalInsight.examTip}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SCENARIO ANALYSIS BOX */}
                  {msg.scenarioAnalysis && (
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-3 mt-3 shadow-inner">
                      <div className="font-bold text-amber-400 text-xs flex items-center space-x-1.5">
                        <FileText className="w-4 h-4" />
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
          {messages.length < 3 && (
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

      {/* API KEY CONFIGURATION MODAL */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md relative">
            <Card glass className="p-6 shadow-2xl border-white/90 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">Socrates AI Live Model Settings</h3>
                </div>
                <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">LLM Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="auto">Auto-Detect (Server Env Keys)</option>
                    <option value="gemini">Google Gemini 2.0 / 1.5 Flash</option>
                    <option value="openai">OpenAI GPT-4o / GPT-4o-mini</option>
                    <option value="deepseek">DeepSeek Chat V3</option>
                    <option value="anthropic">Anthropic Claude 3.5</option>
                    <option value="openrouter">OpenRouter Multi-Model</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Custom LLM API Key (Optional)</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-... or AIzaSy..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
                  />
                  <p className="text-[11px] text-slate-500">
                    If set, Socrates AI will connect directly to your custom API key for 100% real-time AI responses. If blank, server default environment key is used.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setShowKeyModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSaveSettings} className="gap-1 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save AI Settings</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
