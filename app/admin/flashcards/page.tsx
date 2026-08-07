'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flashcard, CertificationLevel } from '@/types/flashcard';
import { MASTER_FLASHCARDS, addCustomFlashcard } from '@/lib/flashcard-bank';
import {
  Layers,
  Sparkles,
  Zap,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit,
  Download,
  Upload,
  Brain,
  Star,
  Lock,
  Loader2,
  ArrowLeft,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminFlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(MASTER_FLASHCARDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCertification, setSelectedCertification] = useState('ALL');

  // AI Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [aiCert, setAiCert] = useState<CertificationLevel>('RBT');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Manual Add Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [explanation, setExplanation] = useState('');
  const [clinicalExplanation, setClinicalExplanation] = useState('');
  const [category, setCategory] = useState('Measurement');
  const [reference, setReference] = useState('BACB Task List Standard');

  // Search and Filtered Cards
  const filteredCards = flashcards.filter((fc) => {
    const matchesSearch =
      fc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || fc.category === selectedCategory;
    const matchesCert = selectedCertification === 'ALL' || fc.certification === selectedCertification;
    return matchesSearch && matchesCategory && matchesCert;
  });

  // AI Flashcard Generation Handler for Admin
  const handleAdminAIGenerate = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          count: aiCount,
          certification: aiCert,
        }),
      });

      const data = await res.json();
      if (data.cards && Array.isArray(data.cards)) {
        const newCards: Flashcard[] = data.cards.map((c: any) => addCustomFlashcard({ ...c, createdBy: 'super_admin_ai' }));
        setFlashcards((prev) => [...newCards, ...prev]);
        setStatusMsg(`✅ Successfully generated & published ${data.cards.length} AI Flashcards to Global Master Bank!`);
        setTimeout(() => {
          setIsAiModalOpen(false);
          setAiTopic('');
          setStatusMsg('');
        }, 1200);
      } else {
        alert(data.error || 'Failed to generate AI flashcards');
      }
    } catch (err: any) {
      alert('Error generating flashcards: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Manual Flashcard Save Handler
  const handleSaveManualCard = () => {
    if (!front.trim() || !back.trim()) return;
    const created = addCustomFlashcard({
      title: title.trim() || 'Custom Flashcard',
      front: front.trim(),
      back: back.trim(),
      explanation: explanation.trim() || 'Socratic explanation',
      clinicalExplanation: clinicalExplanation.trim() || 'Clinical ABA implementation note',
      category: category as any,
      certification: aiCert,
      reference: reference.trim(),
      createdBy: 'super_admin',
    });
    setFlashcards((prev) => [created, ...prev]);
    setIsManualModalOpen(false);
    setTitle('');
    setFront('');
    setBack('');
    setExplanation('');
    setClinicalExplanation('');
  };

  const handleDeleteCard = (id: string) => {
    if (confirm('Are you sure you want to delete this flashcard from the master bank?')) {
      setFlashcards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Badge variant="emerald" className="gap-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Super Admin CMS</span>
              </Badge>
            </div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mt-1">
              Smart Flashcard Bank & AI Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Generate high-yield BACB Anki flashcards with multi-model AI or manage global published decks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsAiModalOpen(true)}
              variant="primary"
              size="sm"
              className="gap-2 shadow-lg shadow-blue-500/20 font-extrabold"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>AI Bulk Flashcard Generator</span>
            </Button>

            <Button
              onClick={() => setIsManualModalOpen(true)}
              variant="outline"
              size="sm"
              className="gap-1.5 border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
            >
              <Plus className="w-4 h-4" />
              <span>Create Manual Card</span>
            </Button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 flex items-center space-x-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Search by title, prompt, answer, or task list item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-transparent focus:outline-none text-slate-800 font-medium"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs font-bold px-3 py-2.5 bg-white rounded-2xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="ALL">All Categories</option>
            <option value="Measurement">Measurement</option>
            <option value="Assessment">Assessment</option>
            <option value="Skill Acquisition">Skill Acquisition</option>
            <option value="Behavior Reduction">Behavior Reduction</option>
            <option value="Documentation">Documentation & Reporting</option>
            <option value="Professional Conduct">Ethics & Conduct</option>
          </select>

          <select
            value={selectedCertification}
            onChange={(e) => setSelectedCertification(e.target.value)}
            className="w-full text-xs font-bold px-3 py-2.5 bg-white rounded-2xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="ALL">All Certification Levels</option>
            <option value="RBT">RBT (Registered Behavior Technician)</option>
            <option value="BCaBA">BCaBA (Assistant Behavior Analyst)</option>
            <option value="BCBA">BCBA (Board Certified Behavior Analyst)</option>
          </select>
        </div>

        {/* Flashcards Roster Table Card */}
        <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#2563EB]" />
                <span>Global Published Flashcards ({filteredCards.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Live BACB Flashcard Bank active across candidate accounts.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider bg-slate-50/50">
                  <th className="p-3">Card Title & Task Reference</th>
                  <th className="p-3">Front Prompt</th>
                  <th className="p-3">Back Answer</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Cert</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCards.map((card) => (
                  <tr key={card.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 space-y-1">
                      <div className="font-extrabold text-slate-900">{card.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">{card.reference}</div>
                    </td>

                    <td className="p-3 font-medium text-slate-800 max-w-xs truncate">
                      {card.front}
                    </td>

                    <td className="p-3 text-slate-600 max-w-xs truncate">
                      {card.back}
                    </td>

                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-extrabold">
                        {card.category}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {card.certification}
                      </span>
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>

      {/* AI FLASHCARD GENERATOR MODAL FOR ADMIN */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-[#0F172A]">AI Flashcard Generator (Super Admin)</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {statusMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">ABA Target Topic or Clinical Prompt</label>
                <input
                  type="text"
                  placeholder="e.g. Discrete Trial Training (DTT), Preference Assessments, BACB Ethics Code"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none font-medium"
                />
              </div>

              {/* Quick Topic Presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Quick AI Topic Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Continuous Measurement', 'Extinction Burst', 'Preference Assessment', 'DRO vs DRA', 'BACB Ethics Item C-01'].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setAiTopic(preset)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px]"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Certification Target Level</label>
                  <select
                    value={aiCert}
                    onChange={(e) => setAiCert(e.target.value as CertificationLevel)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="RBT">RBT (Technician)</option>
                    <option value="BCaBA">BCaBA (Assistant)</option>
                    <option value="BCBA">BCBA (Analyst)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Cards Count</label>
                  <select
                    value={aiCount}
                    onChange={(e) => setAiCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value={3}>3 Cards</option>
                    <option value={5}>5 Cards</option>
                    <option value={10}>10 Cards</option>
                    <option value={15}>15 Cards</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsAiModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAdminAIGenerate}
                disabled={isGenerating || !aiTopic.trim()}
                className="gap-2 shadow-lg shadow-blue-500/20 font-extrabold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating & Publishing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Generate & Publish Flashcards</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL FLASHCARD CREATION MODAL FOR ADMIN */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-[#0F172A]">Create Manual Flashcard</h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Discontinuous Measurement: Partial Interval"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Front Prompt</label>
                <textarea
                  rows={2}
                  placeholder="What is partial interval recording?"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Back Answer</label>
                <textarea
                  rows={2}
                  placeholder="Scores an occurrence if behavior occurs at any moment during interval."
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="Measurement">Measurement</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Skill Acquisition">Skill Acquisition</option>
                    <option value="Behavior Reduction">Behavior Reduction</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Professional Conduct">Ethics</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">BACB Task List Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. BACB Task List Item A-03"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsManualModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveManualCard}
                disabled={!front.trim() || !back.trim()}
                className="font-extrabold"
              >
                Save & Publish Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
