'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDeveloperAPIKeys, generateAPIKey, getAPIMetricsSummary } from '@/lib/api-gateway';
import { APIKey, SDKLanguage } from '@/types/api-platform';
import {
  Code,
  Key,
  Webhook,
  Terminal,
  Copy,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Activity,
} from 'lucide-react';

type DevTab = 'keys' | 'explorer' | 'sdks' | 'webhooks';

export default function DeveloperPortalPage() {
  const [activeTab, setActiveTab] = useState<DevTab>('keys');
  const [keys, setKeys] = useState<APIKey[]>(getDeveloperAPIKeys());
  const [newKeyName, setNewKeyName] = useState('');
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SDKLanguage>('typescript');
  const [copied, setCopied] = useState(false);

  const metrics = getAPIMetricsSummary();

  const handleCreateKey = () => {
    if (!newKeyName) return;
    const res = generateAPIKey(newKeyName, ['questions:read', 'flashcards:read', 'tutor:interact']);
    setKeys([res.apiKey, ...keys]);
    setCreatedSecret(res.rawSecretKey);
    setNewKeyName('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets: Record<SDKLanguage, string> = {
    typescript: `import { RBTTrainingAI } from '@rbttrainingai/sdk';\n\nconst client = new RBTTrainingAI({ apiKey: 'rbt_live_9a8f...' });\nconst questions = await client.questions.list({ limit: 10, category: 'Measurement' });`,
    python: `from rbttrainingai import RBTTrainingAI\n\nclient = RBTTrainingAI(api_key="rbt_live_9a8f...")\nquestions = client.questions.list(limit=10, category="Measurement")`,
    curl: `curl -X GET "https://rbttrainingai.com/api/v1/questions?limit=10" \\\n  -H "Authorization: Bearer rbt_live_9a8f..."`,
    go: `package main\n\nimport "github.com/rbttrainingai/sdk-go"\n\nclient := rbttrainingai.NewClient("rbt_live_9a8f...")\nquestions, err := client.Questions.List(ctx, &ListOptions{Limit: 10})`,
    flutter: `final client = RBTTrainingAI(apiKey: 'rbt_live_9a8f...');\nfinal questions = await client.questions.list(limit: 10);`,
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Code className="w-3.5 h-3.5" />
              <span>Developer Ecosystem v1.0</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Developer Portal & API Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Build custom integrations, mobile apps, and partner platforms using enterprise REST & Webhook APIs.
            </p>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">API Requests (Monthly)</div>
            <div className="text-3xl font-black text-slate-900">{(metrics.totalRequestsCount / 1000000).toFixed(2)}M</div>
            <div className="text-[10px] text-emerald-600 font-bold">99.99% Gateway Uptime</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Average Gateway Latency</div>
            <div className="text-3xl font-black text-emerald-600">{metrics.averageLatencyMs} ms</div>
            <div className="text-[10px] text-slate-400 font-mono font-bold">Global Edge Distribution</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Error Rate</div>
            <div className="text-3xl font-black text-[#2563EB]">{metrics.errorRatePercentage}%</div>
            <div className="text-[10px] text-slate-400 font-mono">Rate Limit: 600 reqs / min</div>
          </Card>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'keys', label: 'Developer API Keys', icon: Key },
            { id: 'explorer', label: 'Interactive API Explorer', icon: Terminal },
            { id: 'sdks', label: 'SDK Code Snippets', icon: Code },
            { id: 'webhooks', label: 'Webhook Subscriptions', icon: Webhook },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DevTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: API KEYS MANAGER */}
        {activeTab === 'keys' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Create Key Card */}
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">Create New Developer API Key</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Key Name (e.g. Mobile App Production)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs text-slate-900"
                />
                <Button onClick={handleCreateKey} variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                  <Plus className="w-4 h-4" />
                  <span>Generate Key</span>
                </Button>
              </div>

              {createdSecret && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                  <div className="font-extrabold text-amber-900 flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Copy Secret Key (Shown Only Once):</span>
                  </div>
                  <div className="flex items-center justify-between font-mono bg-white p-2.5 rounded-xl border border-amber-300">
                    <span className="text-slate-900 font-bold">{createdSecret}</span>
                    <button onClick={() => copyToClipboard(createdSecret)} className="text-amber-700 font-bold hover:underline flex items-center space-x-1">
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}
            </Card>

            {/* Active Keys List */}
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">Active Developer API Keys</h3>
              <div className="space-y-3">
                {keys.map((k) => (
                  <div key={k.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">{k.name}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{k.maskedKey}</div>
                      <div className="flex items-center space-x-1 pt-1">
                        {k.scopes.map((sc) => (
                          <span key={sc} className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-mono text-[9px] font-bold">
                            {sc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400 font-mono">
                      <div>Rate Limit: {k.rateLimitPerMinute} reqs/min</div>
                      <div>Last Used: {new Date(k.lastUsedAt || Date.now()).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: INTERACTIVE API EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">API v1 Endpoint Explorer</h3>
              <div className="space-y-3 text-xs">
                {[
                  { method: 'GET', path: '/api/v1/questions', desc: 'Query Master Question Bank items with pagination & domain filters' },
                  { method: 'POST', path: '/api/v1/tutor/chat', desc: 'Interact with Socrates AI Tutor Engine' },
                  { method: 'GET', path: '/api/v1/flashcards', desc: 'Fetch Leitner 5-box spaced repetition decks' },
                  { method: 'GET', path: '/api/v1/adaptive/profile', desc: 'Fetch candidate readiness & weak topic queue' },
                ].map((ep, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between font-mono">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] ${
                        ep.method === 'GET' ? 'bg-blue-100 text-[#2563EB]' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="font-bold text-slate-900">{ep.path}</span>
                    </div>

                    <span className="text-slate-500 font-sans text-xs">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 3: SDK CODE SNIPPETS */}
        {activeTab === 'sdks' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0F172A]">Client SDK Quickstart</h3>
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(['typescript', 'python', 'curl', 'go', 'flutter'] as SDKLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-lg uppercase transition-all ${
                        selectedLanguage === lang ? 'bg-[#0F172A] text-white shadow' : 'text-slate-500'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                <pre>{codeSnippets[selectedLanguage]}</pre>
              </div>
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
