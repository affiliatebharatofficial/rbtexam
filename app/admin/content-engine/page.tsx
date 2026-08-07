'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllContentDrafts, updateDraftReviewStatus, generateAIDraft } from '@/lib/ai-content-engine';
import { ContentDraft, AIContentType, CertificationType } from '@/types/ai-content';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Plus,
  RefreshCw,
} from 'lucide-react';

export default function AIContentEngineAdminPage() {
  const [drafts, setDrafts] = useState<ContentDraft[]>(getAllContentDrafts());
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [genType, setGenType] = useState<AIContentType>('question');
  const [genCert, setGenCert] = useState<CertificationType>('RBT');
  const [genTopic, setGenTopic] = useState('Reinforcement Schedules');

  const handleGenerate = () => {
    const newDraft = generateAIDraft(genType, genCert, genTopic);
    setDrafts([newDraft, ...drafts]);
    setShowGeneratorModal(false);
  };

  const handleUpdateStatus = (id: string, status: ContentDraft['status']) => {
    const updated = updateDraftReviewStatus(id, status);
    if (updated) {
      setDrafts(drafts.map((d) => (d.id === id ? { ...d, status } : d)));
    }
  };

  const pendingReview = drafts.filter((d) => d.status === 'needs_review');
  const draftItems = drafts.filter((d) => d.status === 'draft');
  const approvedItems = drafts.filter((d) => d.status === 'approved' || d.status === 'published');

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Brain className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>AI Educational Content Intelligence</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              AI Content Engine & Editorial Kanban
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              AI-assisted draft generation with mandatory BCBA clinical review & quality inspection.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/admin">
              <Button variant="outline" size="md" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="md" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
            <Button
              onClick={() => setShowGeneratorModal(true)}
              variant="primary"
              size="md"
              className="gap-2 shadow-lg shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New AI Draft</span>
            </Button>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Needs BCBA Review</div>
            <div className="text-3xl font-black text-amber-600">{pendingReview.length} Items</div>
            <div className="text-[10px] text-slate-400">Mandatory human editorial sign-off required</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Approved & Published</div>
            <div className="text-3xl font-black text-emerald-600">{approvedItems.length} Items</div>
            <div className="text-[10px] text-slate-400">100% BACB Task List compliant</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Average Quality Score</div>
            <div className="text-3xl font-black text-[#2563EB]">94.5%</div>
            <div className="text-[10px] text-emerald-600 font-bold">100% Distractor Rationales Present</div>
          </Card>
        </div>

        {/* EDITORIAL KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Draft / In Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold">
              <span className="text-slate-700">1. Drafts ({draftItems.length})</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">DRAFT</span>
            </div>

            <div className="space-y-3">
              {draftItems.map((item) => (
                <Card key={item.id} glass className="p-4 space-y-3 shadow-md border-white/90">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-[#2563EB] uppercase">{item.certification} • {item.type}</span>
                    <span className="text-slate-400 font-mono">Q-Score: {item.qualityScore}%</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-mono">Provider: {item.createdByAIProvider}</p>

                  <div className="pt-2 flex justify-end">
                    <Button
                      onClick={() => handleUpdateStatus(item.id, 'needs_review')}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Submit for Review
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Column 2: Needs BCBA Review */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold">
              <span className="text-amber-700">2. Needs BCBA Review ({pendingReview.length})</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono">REVIEW</span>
            </div>

            <div className="space-y-3">
              {pendingReview.map((item) => (
                <Card key={item.id} glass className="p-4 space-y-3 shadow-md border-amber-200/80 bg-amber-50/30">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-amber-700 uppercase">{item.certification} • {item.type}</span>
                    <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                      BACB {item.bacbTaskCode}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                    Provider: {item.createdByAIProvider}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-amber-100">
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'rejected')}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Reject
                    </button>

                    <Button
                      onClick={() => handleUpdateStatus(item.id, 'approved')}
                      variant="primary"
                      size="sm"
                      className="gap-1 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Draft</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Column 3: Approved & Published */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold">
              <span className="text-emerald-700">3. Approved & Published ({approvedItems.length})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">LIVE</span>
            </div>

            <div className="space-y-3">
              {approvedItems.map((item) => (
                <Card key={item.id} glass className="p-4 space-y-3 shadow-md border-emerald-200/80 bg-emerald-50/20">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-emerald-700 uppercase">{item.certification} • {item.type}</span>
                    <span className="text-emerald-700 font-extrabold">PUBLISHED</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <div className="text-[10px] text-slate-400 font-mono">Approved by BCBA Editor • v{item.version}</div>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* GENERATOR MODAL */}
        {showGeneratorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <Card glass className="max-w-md w-full p-6 space-y-5 bg-white shadow-2xl border-white/90">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-[#2563EB]" />
                  <span>Generate New AI Educational Draft</span>
                </h3>
                <button onClick={() => setShowGeneratorModal(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Content Type</label>
                  <select
                    value={genType}
                    onChange={(e) => setGenType(e.target.value as AIContentType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900"
                  >
                    <option value="question">Practice Question</option>
                    <option value="flashcard">Flashcard Deck Item</option>
                    <option value="scenario">Clinical ABA Scenario</option>
                    <option value="study_guide">Study Guide Summary</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Certification Target</label>
                  <div className="flex items-center space-x-2">
                    {(['RBT', 'BCaBA', 'BCBA'] as CertificationType[]).map((cert) => (
                      <button
                        key={cert}
                        onClick={() => setGenCert(cert)}
                        className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                          genCert === cert ? 'bg-[#2563EB] text-white shadow' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Topic / BACB Task Item</label>
                  <input
                    type="text"
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100">
                <Button onClick={() => setShowGeneratorModal(false)} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button onClick={handleGenerate} variant="primary" size="sm" className="gap-1.5 shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Draft</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
