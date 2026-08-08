'use client';

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flashcard, CertificationLevel, FlashcardCategory } from '@/types/flashcard';
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
  AlertCircle,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  Repeat,
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
  const [aiCategory, setAiCategory] = useState<FlashcardCategory>('Skill Acquisition');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [aiProvider, setAiProvider] = useState<string>('auto');
  const [aiApiKey, setAiApiKey] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [telemetry, setTelemetry] = useState<any>(null);

  // Manual Add Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [explanation, setExplanation] = useState('');
  const [clinicalExplanation, setClinicalExplanation] = useState('');
  const [category, setCategory] = useState('Measurement');
  const [reference, setReference] = useState('BACB Task List Standard');

  // CSV Import & Question Conversion State
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [isImportingCsv, setIsImportingCsv] = useState(false);
  const [isConvertingQuestions, setIsConvertingQuestions] = useState(false);

  const handleImportCSV = async () => {
    if (!csvText.trim()) return;
    setIsImportingCsv(true);
    setStatusMsg('');
    setGenerationError('');
    try {
      const res = await fetch('/api/flashcards/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg(`✅ ${data.message}`);
        setIsCsvModalOpen(false);
        setCsvText('');
        await fetchAllFlashcards();
      } else {
        setGenerationError(data.error || 'Failed to import CSV flashcards');
      }
    } catch (err: any) {
      setGenerationError(`Network error importing CSV: ${err.message}`);
    } finally {
      setIsImportingCsv(false);
    }
  };

  const handleConvertQuestions = async () => {
    if (!confirm('Are you sure you want to convert all system Question Bank items into Flashcards?')) return;
    setIsConvertingQuestions(true);
    setStatusMsg('');
    setGenerationError('');
    try {
      const res = await fetch('/api/flashcards/convert-questions', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg(`✅ ${data.message}`);
        await fetchAllFlashcards();
      } else {
        setGenerationError(data.error || 'Failed to convert questions to flashcards');
      }
    } catch (err: any) {
      setGenerationError(`Network error converting questions: ${err.message}`);
    } finally {
      setIsConvertingQuestions(false);
    }
  };

  // Multi-Select & Bulk Delete State
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const handleToggleSelectCard = (id: string) => {
    setSelectedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllFilteredCards = () => {
    if (selectedCardIds.length === filteredCards.length && filteredCards.length > 0) {
      setSelectedCardIds([]);
    } else {
      setSelectedCardIds(filteredCards.map((c) => c.id));
    }
  };

  const handleBulkDeleteSelected = async () => {
    if (selectedCardIds.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to delete all ${selectedCardIds.length} selected flashcards from the master database?`
      )
    )
      return;

    setIsBulkDeleting(true);
    setStatusMsg('');
    setGenerationError('');
    try {
      const res = await fetch('/api/flashcards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedCardIds }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg(`✅ Successfully deleted ${selectedCardIds.length} flashcards!`);
        setFlashcards((prev) => prev.filter((c) => !selectedCardIds.includes(c.id)));
        setSelectedCardIds([]);
      } else {
        setGenerationError(data.error || 'Failed to bulk delete flashcards');
      }
    } catch (err: any) {
      setGenerationError(`Network error bulk deleting flashcards: ${err.message}`);
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const fetchAllFlashcards = async () => {
    try {
      const res = await fetch('/api/flashcards?limit=200');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data) && data.data.length > 0) {
          setFlashcards(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin flashcards from database:', err);
    }
  };

  useEffect(() => {
    fetchAllFlashcards();
  }, []);

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
    setGenerationError('');
    setTelemetry(null);

    try {
      const res = await fetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          count: aiCount,
          certification: aiCert,
          category: aiCategory,
          difficulty: aiDifficulty,
          provider: aiProvider,
          apiKey: aiApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.cards)) {
        await fetchAllFlashcards();
        setTelemetry({
          providerUsed: data.providerUsed,
          modelUsed: data.modelUsed,
          insertedCount: data.insertedCount,
          generatedCount: data.generatedCount,
          validatedCount: data.validatedCount,
          duplicateCount: data.duplicateCount,
          totalTokens: data.totalTokens,
          estimatedCostUSD: data.estimatedCostUSD,
          latencyMs: data.latencyMs,
          batchCount: data.batchCount,
          batches: data.batches,
        });

        setStatusMsg(
          `✅ Successfully generated, validated & persisted ${data.insertedCount} Flashcards to Database & Global Bank!`
        );
      } else {
        const errorDetail = data.error || 'AI Flashcard generation failed.';
        setGenerationError(errorDetail);
      }
    } catch (err: any) {
      setGenerationError(`Network error generating flashcards: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Manual Flashcard Save Handler
  const handleSaveManualCard = async () => {
    if (!front.trim() || !back.trim()) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || 'Custom Flashcard',
          front: front.trim(),
          back: back.trim(),
          explanation: explanation.trim() || 'Socratic explanation',
          clinicalExplanation: clinicalExplanation.trim() || 'Clinical ABA implementation note',
          category,
          certification: aiCert,
          reference: reference.trim(),
          createdBy: 'super_admin',
        }),
      });
      await fetchAllFlashcards();
    } catch (err: any) {
      console.error('Error saving manual flashcard to database:', err);
    }
    setIsManualModalOpen(false);
    setTitle('');
    setFront('');
    setBack('');
    setExplanation('');
    setClinicalExplanation('');
  };

  const handleDeleteCard = async (id: string) => {
    if (confirm('Are you sure you want to delete this flashcard from the master bank?')) {
      try {
        await fetch(`/api/flashcards?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
        setFlashcards((prev) => prev.filter((c) => c.id !== id));
      } catch (err: any) {
        console.error('Error deleting flashcard:', err);
      }
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
              <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
                Smart Flashcard Bank & AI Generator
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Generate high-yield BACB Anki flashcards with multi-model AI or manage global published decks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleConvertQuestions}
              disabled={isConvertingQuestions}
              className="gap-2 font-bold border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              {isConvertingQuestions ? <Loader2 className="w-4 h-4 animate-spin" /> : <Repeat className="w-4 h-4 text-indigo-600" />}
              <span>Convert Questions</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCsvModalOpen(true)}
              className="gap-2 font-bold border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Import CSV</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsManualModalOpen(true)}
              className="gap-2 font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Manual Card</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsAiModalOpen(true);
                setStatusMsg('');
                setGenerationError('');
                setTelemetry(null);
              }}
              className="gap-2 shadow-lg shadow-blue-500/20 font-bold"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>AI Generator</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Cards in Master Bank</p>
                <p className="text-xl font-bold text-slate-900">{flashcards.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">AI Generated Cards</p>
                <p className="text-xl font-bold text-slate-900">
                  {flashcards.filter((c) => c.cardType === 'ai_generated').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Active RBT Task List Items</p>
                <p className="text-xl font-bold text-slate-900">42 / 42 Covered</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search flashcards by term, definition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto">
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="ALL">All Certifications</option>
              <option value="RBT">RBT</option>
              <option value="BCaBA">BCaBA</option>
              <option value="BCBA">BCBA</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="ALL">All Categories</option>
              <option value="Measurement">Measurement</option>
              <option value="Assessment">Assessment</option>
              <option value="Skill Acquisition">Skill Acquisition</option>
              <option value="Behavior Reduction">Behavior Reduction</option>
              <option value="Documentation">Documentation</option>
              <option value="Reinforcement">Reinforcement</option>
            </select>
          </div>
        </div>

        {/* Floating / Sticky Bulk Action Banner */}
        {selectedCardIds.length > 0 && (
          <div className="sticky top-4 z-40 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center justify-between animate-fadeIn border border-slate-700">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 text-xs">
                {selectedCardIds.length} Selected
              </span>
              <p className="text-xs text-slate-300">
                You have selected <strong className="text-white">{selectedCardIds.length}</strong> flashcard(s).
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCardIds([])}
                className="text-xs text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                Clear Selection
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleBulkDeleteSelected}
                disabled={isBulkDeleting}
                className="gap-2 bg-rose-600 hover:bg-rose-700 font-extrabold text-xs shadow-lg shadow-rose-600/30"
              >
                {isBulkDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting Cards...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected ({selectedCardIds.length})</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Flashcards Roster Table Card */}
        <Card className="border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-sm text-[#0F172A]">
                Global Published Flashcards ({filteredCards.length})
              </span>
            </div>
            <p className="text-xs text-slate-500">Live BACB Flashcard Bank active across candidate accounts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60 font-bold text-slate-600">
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedCardIds.length === filteredCards.length && filteredCards.length > 0}
                      onChange={handleSelectAllFilteredCards}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="p-3">Card Title & Front Prompt</th>
                  <th className="p-3">Back Answer Rationale</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Cert</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCards.map((card) => {
                  const isSelected = selectedCardIds.includes(card.id);
                  return (
                    <tr
                      key={card.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-50/70 hover:bg-blue-100/50' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectCard(card.id)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 max-w-xs">
                        <p className="font-bold text-slate-900 truncate">{card.title}</p>
                        <p className="text-slate-500 text-[11px] line-clamp-2 mt-0.5">{card.front}</p>
                      </td>
                    <td className="p-3 max-w-sm">
                      <p className="text-slate-700 line-clamp-2">{card.back}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{card.reference}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="slate" className="text-[10px] font-semibold bg-slate-50">
                        {card.category}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`text-[10px] font-bold ${
                          card.certification === 'RBT'
                            ? 'bg-blue-100 text-blue-800'
                            : card.certification === 'BCaBA'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {card.certification}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-semibold capitalize ${
                          card.difficulty === 'easy'
                            ? 'text-emerald-600'
                            : card.difficulty === 'medium'
                            ? 'text-amber-600'
                            : 'text-red-600'
                        }`}
                      >
                        {card.difficulty}
                      </span>
                    </td>
                    <td className="p-3">
                      {card.cardType === 'ai_generated' ? (
                        <span className="inline-flex items-center space-x-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>AI</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Manual</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

      </div>

      {/* AI FLASHCARD GENERATOR MODAL FOR ADMIN */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-[#0F172A]">AI Flashcard Generator (Multi-Model Engine)</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Telemetry Header */}
            {statusMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{statusMsg}</span>
                </div>

                {telemetry && (
                  <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-emerald-800">
                    <div>
                      <span className="text-slate-500 font-sans block">Provider/Model</span>
                      <span className="font-bold">{telemetry.providerUsed} ({telemetry.modelUsed})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans block">Batches</span>
                      <span className="font-bold">{telemetry.batchCount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans block">Total Tokens</span>
                      <span className="font-bold">{telemetry.totalTokens}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans block">Est. Cost</span>
                      <span className="font-bold">${telemetry.estimatedCostUSD.toFixed(5)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {generationError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-900 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-950">Generation Failed</p>
                  <p className="font-medium text-red-800 mt-0.5">{generationError}</p>
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">ABA Target Topic or Clinical Prompt</label>
                <input
                  type="text"
                  placeholder="e.g. Positive Reinforcement, Discrete Trial Training, DRO vs DRA"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none font-medium"
                />
              </div>

              {/* Quick Topic Presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Quick AI Topic Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Positive Reinforcement', 'Continuous Measurement', 'Extinction Burst', 'Preference Assessment', 'DRO vs DRA', 'BACB Ethics Item C-01'].map((preset) => (
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Certification Target</label>
                  <select
                    value={aiCert}
                    onChange={(e) => setAiCert(e.target.value as CertificationLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="RBT">RBT (Technician)</option>
                    <option value="BCaBA">BCaBA (Assistant)</option>
                    <option value="BCBA">BCBA (Analyst)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={aiCategory}
                    onChange={(e) => setAiCategory(e.target.value as FlashcardCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="Measurement">Measurement</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Skill Acquisition">Skill Acquisition</option>
                    <option value="Behavior Reduction">Behavior Reduction</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Ethics">Ethics</option>
                    <option value="Reinforcement">Reinforcement</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Difficulty Level</label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Cards Count</label>
                  <select
                    value={aiCount}
                    onChange={(e) => setAiCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value={3}>3 Cards</option>
                    <option value={5}>5 Cards (1 Batch)</option>
                    <option value={10}>10 Cards (2 Batches)</option>
                    <option value={15}>15 Cards (3 Batches)</option>
                    <option value={20}>20 Cards (4 Batches)</option>
                    <option value={30}>30 Cards (6 Batches)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">AI LLM Provider</label>
                  <select
                    value={aiProvider}
                    onChange={(e) => setAiProvider(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="auto">Auto / Dynamic Fallback</option>
                    <option value="openai">OpenAI (GPT-4o-mini)</option>
                    <option value="gemini">Google Gemini 1.5 Flash</option>
                    <option value="deepseek">DeepSeek V3</option>
                    <option value="anthropic">Anthropic (Claude 3.5 Haiku)</option>
                    <option value="openrouter">OpenRouter Auto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Custom API Key Override (Optional)</span>
                  <span className="text-[10px] font-normal text-slate-400">Leaves blank to use server environment key</span>
                </label>
                <input
                  type="password"
                  placeholder="sk-... or AIzaSy..."
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
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
                    <span>Executing AI Call & Persisting...</span>
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
                    <option value="Ethics">Ethics</option>
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
      {/* CSV BULK IMPORT MODAL FOR ADMIN */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-[#0F172A]">Import Flashcards from CSV</h3>
              </div>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="font-bold text-slate-800">CSV Header Format Required:</p>
                <p className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200 select-all">
                  term,definition,explanation,category,certification,difficulty
                </p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Example: <code>"DRO","Omission procedure","Reinforces zero target behavior","Behavior Reduction","RBT","medium"</code>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Upload CSV File</label>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        if (evt.target?.result) {
                          setCsvText(String(evt.target.result));
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Or Paste CSV Content Directly</label>
                <textarea
                  rows={6}
                  placeholder={`term,definition,explanation,category,certification,difficulty\n"Discriminative Stimulus","SD antecedent signal","Signals availability of reinforcement","Skill Acquisition","RBT","medium"`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px] focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsCsvModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleImportCSV}
                disabled={isImportingCsv || !csvText.trim()}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 font-extrabold"
              >
                {isImportingCsv ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Importing Cards...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Bulk Import to Database</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
