'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuestionEditorModal } from '@/components/admin/question-editor-modal';
import { CSVImportModal } from '@/components/admin/csv-import-modal';
import {
  getFilteredQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUpdateStatus,
  bulkDeleteQuestions,
  exportQuestionsToCSV,
  loadPersistentQuestions,
  MASTER_QUESTION_BANK,
} from '@/lib/master-question-bank';
import { MasterQuestion, QuestionFilterParams, QuestionPaginationResult, CertificationLevel, QuestionCategory, QuestionDifficulty, QuestionStatus } from '@/types/master-question';
import {
  Brain,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  Archive,
  FileText,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';

export default function AdminQuestionsPage() {
  const [filterParams, setFilterParams] = useState<QuestionFilterParams>({
    search: '',
    certification: 'ALL',
    category: 'ALL',
    difficulty: 'ALL',
    status: 'ALL',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<MasterQuestion | null | undefined>(undefined); // undefined means closed, null means new
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<MasterQuestion | null>(null);

  // AI Question Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCert, setAiCert] = useState<CertificationLevel>('RBT');
  const [aiDiff, setAiDiff] = useState<QuestionDifficulty>('medium');
  const [aiCount, setAiCount] = useState<number>(5);
  const [aiTaskCode, setAiTaskCode] = useState('A-01');
  const [aiProvider, setAiProvider] = useState('auto');
  const [aiApiKey, setAiApiKey] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState('');
  const [aiProgressStep, setAiProgressStep] = useState<string>('');
  const [aiErrorMsg, setAiErrorMsg] = useState<string>('');
  const [aiErrorDetails, setAiErrorDetails] = useState<{ provider?: string; reason?: string } | null>(null);

  const handleGenerateAiQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiGenerating(true);
    setAiErrorMsg('');
    setAiErrorDetails(null);
    setAiSuccessMsg('');
    setAiProgressStep('Connecting to AI Provider Router...');

    try {
      setAiProgressStep(`Sending generation request for ${aiCount} question(s) via ${aiProvider === 'auto' ? 'Auto-Detect' : aiProvider.toUpperCase()}...`);
      
      const res = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicPrompt: aiTopic,
          certification: aiCert,
          difficulty: aiDiff,
          count: aiCount,
          bacbTaskCode: aiTaskCode,
          provider: aiProvider,
          apiKey: aiApiKey || undefined,
        }),
      });

      setAiProgressStep('Validating 10-point JSON schema & verifying database persistence...');
      const data = await res.json();

      if (data.success && data.questions && Array.isArray(data.questions)) {
        setIsAiModalOpen(false);
        setAiSuccessMsg(`✅ ${data.insertedCount || data.questions.length} questions generated & inserted into Database via ${data.providerUsed} (${data.modelUsed})! Latency: ${data.latencyMs}ms | Tokens: ${data.totalTokens || 0}`);
        fetchQuestionsFromApi();
        setTimeout(() => setAiSuccessMsg(''), 10000);
      } else {
        setAiErrorMsg(data.error || 'AI Question Generation failed.');
        setAiErrorDetails({
          provider: data.providerUsed || aiProvider,
          reason: data.error || 'Provider returned error response.',
        });
      }
    } catch (err: any) {
      console.error('AI generation error:', err);
      setAiErrorMsg(err.message || 'Failed to connect to AI Generation API.');
    } finally {
      setIsAiGenerating(false);
      setAiProgressStep('');
    }
  };

  const [queryResult, setQueryResult] = useState<QuestionPaginationResult>(() => getFilteredQuestions(filterParams));
  const [allQuestions, setAllQuestions] = useState<MasterQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [statsSummary, setStatsSummary] = useState<{
    total: number;
    published: number;
    rbt: number;
    bcaba: number;
    bcba: number;
    featured: number;
  } | null>(null);

  const fetchQuestionsFromApi = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: filterParams.search || '',
        certification: filterParams.certification || 'ALL',
        category: filterParams.category || 'ALL',
        difficulty: filterParams.difficulty || 'ALL',
        status: filterParams.status || 'ALL',
        page: String(filterParams.page || 1),
        limit: String(filterParams.limit || 10),
        sortBy: filterParams.sortBy || 'createdAt',
        sortOrder: filterParams.sortOrder || 'desc',
      });
      const res = await fetch(`/api/questions?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
          setQueryResult(json);
        }
      }

      // Fetch exact DB statistics counters (no row caps)
      const statsRes = await fetch(`/api/questions/stats`);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData && typeof statsData.total === 'number') {
          setStatsSummary(statsData);
        }
      }

      // Fetch all questions for bulk actions and export CSV (batching up to 10,000)
      const allQRes = await fetch(`/api/questions?limit=10000&status=ALL`);
      if (allQRes.ok) {
        const allJson = await allQRes.json();
        if (allJson && Array.isArray(allJson.data)) {
          setAllQuestions(allJson.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch questions from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsFromApi();
  }, [filterParams]);

  // Bulk Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(queryResult.data.map((q: MasterQuestion) => q.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = async () => {
    bulkUpdateStatus(selectedIds, 'published');
    try {
      await fetch('/api/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', ids: selectedIds, status: 'published' }),
      });
    } catch (e) {
      console.error('Failed to sync bulk publish to server:', e);
    }
    setSelectedIds([]);
    setFilterParams({ ...filterParams });
  };

  const handleBulkArchive = async () => {
    bulkUpdateStatus(selectedIds, 'archived');
    try {
      await fetch('/api/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', ids: selectedIds, status: 'archived' }),
      });
    } catch (e) {
      console.error('Failed to sync bulk archive to server:', e);
    }
    setSelectedIds([]);
    setFilterParams({ ...filterParams });
  };

  const handleBulkDraft = async () => {
    bulkUpdateStatus(selectedIds, 'draft');
    try {
      await fetch('/api/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', ids: selectedIds, status: 'draft' }),
      });
    } catch (e) {
      console.error('Failed to sync bulk draft to server:', e);
    }
    setSelectedIds([]);
    setFilterParams({ ...filterParams });
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} question(s)?`)) {
      bulkDeleteQuestions(selectedIds);
      try {
        await fetch('/api/questions/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', ids: selectedIds }),
        });
      } catch (e) {
        console.error('Failed to sync bulk delete to server:', e);
      }
      setSelectedIds([]);
      setFilterParams({ ...filterParams });
    }
  };

  const handleExportCSV = () => {
    const csv = exportQuestionsToCSV(MASTER_QUESTION_BANK);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `master_questions_${Date.now()}.csv`;
    a.click();
  };

  const handleDuplicate = async (question: MasterQuestion) => {
    const dupData = {
      ...question,
      question: `[COPY] ${question.question}`,
      status: 'draft' as const,
    };
    const created = createQuestion(dupData);
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dupData),
      });
    } catch (e) {
      console.error('Failed to sync duplicate question to server:', e);
    }
    setFilterParams({ ...filterParams });
  };

  const handleSingleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
      try {
        await fetch(`/api/questions/${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error('Failed to sync delete to server:', e);
      }
      setFilterParams({ ...filterParams });
    }
  };

  const handleSaveQuestion = async (data: Partial<MasterQuestion>) => {
    data.taskListVersion = data.taskListVersion || '3rd_edition';
    if (editingQuestion && editingQuestion.id) {
      updateQuestion(editingQuestion.id, data);
      try {
        await fetch(`/api/questions/${encodeURIComponent(editingQuestion.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error('Failed to sync update to server:', e);
      }
    } else {
      createQuestion(data as any);
      try {
        await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error('Failed to sync create to server:', e);
      }
    }
    setEditingQuestion(undefined);
    setFilterParams({ ...filterParams });
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="mb-1">Centralized Item Bank Engine</Badge>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Master Question Management System
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage RBT, BCaBA, and BCBA practice questions, rich scenarios, distractors, and CSV imports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
            <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </Button>
            <Button onClick={() => setIsImportModalOpen(true)} variant="outline" size="sm" className="gap-1.5 text-xs">
              <Upload className="w-4 h-4" />
              <span>Import CSV</span>
            </Button>
            <Button
              onClick={() => setIsAiModalOpen(true)}
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-md shadow-indigo-500/25"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Question Generator</span>
            </Button>
            <Button onClick={() => setEditingQuestion(null)} variant="primary" size="sm" className="gap-1.5 text-xs shadow-md">
              <Plus className="w-4 h-4" />
              <span>Add New Question</span>
            </Button>
          </div>
        </div>

        {aiSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-900 flex items-center space-x-2 animate-fadeIn shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{aiSuccessMsg}</span>
          </div>
        )}

        {/* AI QUESTION GENERATOR HERO CARD */}
        <Card glass className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className="bg-amber-400 text-slate-950 font-black px-3 py-1 flex items-center space-x-1.5 shadow-md shadow-amber-400/20">
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>AI QUESTION GENERATOR ENGINE</span>
              </Badge>
              <span className="text-xs font-semibold text-indigo-200">BACB RBT 3rd Edition Multi-Model LLM</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Create & Publish Practice Questions with AI
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Instantly generate realistic RBT, BCaBA, and BCBA practice questions with 4 distractor options, correct answers, and clinical BCBA explanations using custom topic prompts.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              onClick={() => setIsAiModalOpen(true)}
              variant="primary"
              size="md"
              className="gap-2 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 font-extrabold shadow-xl shadow-indigo-500/40 text-xs px-5 py-3"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>⚡ Generate Questions with AI Now</span>
            </Button>
          </div>
        </Card>

        {/* Dashboard Statistics Bar */}
        {(() => {
          const statsSource = allQuestions.length > 0 ? allQuestions : (queryResult?.data || []);
          const displayTotal = statsSummary?.total ?? (allQuestions.length > 0 ? allQuestions.length : (queryResult?.total || 0));
          const displayPublished = statsSummary?.published ?? statsSource.filter((q) => q.status === 'published').length;
          const displayRbt = statsSummary?.rbt ?? statsSource.filter((q) => q.certification === 'RBT').length;
          const displayBcaba = statsSummary?.bcaba ?? statsSource.filter((q) => q.certification === 'BCaBA').length;
          const displayBcba = statsSummary?.bcba ?? statsSource.filter((q) => q.certification === 'BCBA').length;
          const displayFeatured = statsSummary?.featured ?? statsSource.filter((q) => q.isPremium || q.isFeatured).length;

          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              <Card className="p-4 space-y-1 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Total Questions</div>
                <div className="text-2xl font-black text-slate-900">{displayTotal}</div>
              </Card>
              <Card className="p-4 space-y-1 text-center bg-emerald-50/50 border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-700 uppercase">Published</div>
                <div className="text-2xl font-black text-emerald-600">{displayPublished}</div>
              </Card>
              <Card className="p-4 space-y-1 text-center bg-blue-50/50 border-blue-100">
                <div className="text-[10px] font-bold text-blue-700 uppercase">RBT Questions</div>
                <div className="text-2xl font-black text-[#2563EB]">{displayRbt}</div>
              </Card>
              <Card className="p-4 space-y-1 text-center bg-indigo-50/50 border-indigo-100">
                <div className="text-[10px] font-bold text-indigo-700 uppercase">BCaBA Questions</div>
                <div className="text-2xl font-black text-indigo-600">{displayBcaba}</div>
              </Card>
              <Card className="p-4 space-y-1 text-center bg-purple-50/50 border-purple-100">
                <div className="text-[10px] font-bold text-purple-700 uppercase">BCBA Questions</div>
                <div className="text-2xl font-black text-purple-600">{displayBcba}</div>
              </Card>
              <Card className="p-4 space-y-1 text-center bg-amber-50/50 border-amber-100">
                <div className="text-[10px] font-bold text-amber-700 uppercase">Featured / Premium</div>
                <div className="text-2xl font-black text-amber-600">{displayFeatured}</div>
              </Card>
            </div>
          );
        })()}

        {/* Filter Bar */}
        <Card glass className="p-4 space-y-4 shadow-lg border-white/90">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterParams.search || ''}
                onChange={(e) => setFilterParams({ ...filterParams, search: e.target.value, page: 1 })}
                placeholder="Search prompt, category, keywords..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
              />
            </div>

            {/* Select Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={filterParams.category || 'ALL'}
                onChange={(e) => setFilterParams({ ...filterParams, category: e.target.value as any, page: 1 })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="ALL">All Categories / Domains</option>
                <option value="Behavior Assessment">Domain B: Behavior Assessment</option>
                <option value="Measurement">Domain A: Measurement</option>
                <option value="Skill Acquisition">Domain C: Skill Acquisition</option>
                <option value="Behavior Reduction">Domain D: Behavior Reduction</option>
                <option value="Documentation and Reporting">Domain E: Documentation & Reporting</option>
                <option value="Ethics">Domain F: Professional Conduct & Ethics</option>
              </select>

              <select
                value={filterParams.certification}
                onChange={(e) => setFilterParams({ ...filterParams, certification: e.target.value as any, page: 1 })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="ALL">All Certifications</option>
                <option value="RBT">RBT Only</option>
                <option value="BCaBA">BCaBA Only</option>
                <option value="BCBA">BCBA Only</option>
              </select>

              <select
                value={filterParams.difficulty}
                onChange={(e) => setFilterParams({ ...filterParams, difficulty: e.target.value as any, page: 1 })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="ALL">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select
                value={filterParams.status}
                onChange={(e) => setFilterParams({ ...filterParams, status: e.target.value as any, page: 1 })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs animate-fadeIn">
              <span className="font-bold text-[#2563EB]">
                {selectedIds.length} Questions Selected
              </span>
              <div className="flex items-center space-x-2">
                <Button onClick={handleBulkPublish} variant="outline" size="sm" className="text-xs bg-white">
                  Publish Selected
                </Button>
                <Button onClick={handleBulkArchive} variant="outline" size="sm" className="text-xs bg-white">
                  Archive Selected
                </Button>
                <Button onClick={handleBulkDelete} variant="outline" size="sm" className="text-xs text-rose-600 bg-white">
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Master Question List Table */}
        <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
          {(!queryResult?.data || queryResult.data.length === 0) ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
                <Brain className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900">No Master Questions Found in Database</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your question bank is currently empty. Use the AI Question Generator, import questions from a CSV file, or seed default BACB questions to populate your database.
                </p>
              </div>
              <div className="flex justify-center space-x-3 pt-2">
                <Button variant="primary" size="sm" onClick={() => setIsAiModalOpen(true)} className="gap-1.5 font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate with AI</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsImportModalOpen(true)} className="gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Import CSV</span>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === (queryResult?.data?.length || 0) && (queryResult?.data?.length || 0) > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-slate-300"
                        />
                      </th>
                      <th className="py-3 px-3">Cert</th>
                      <th className="py-3 px-3">Question Prompt</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Diff</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {(queryResult?.data || []).map((q: MasterQuestion) => {
                      const isSel = selectedIds.includes(q.id);
                      return (
                        <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSel}
                              onChange={() => handleSelectOne(q.id)}
                              className="rounded border-slate-300"
                            />
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                              q.certification === 'RBT'
                                ? 'bg-blue-100 text-blue-800'
                                : q.certification === 'BCaBA'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {q.certification || 'RBT'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 max-w-xs sm:max-w-md">
                            <div className="font-bold text-slate-900 line-clamp-1">{q.question || 'Untitled Question'}</div>
                            {q.scenarioText && (
                              <div className="text-[11px] text-slate-400 line-clamp-1 italic">{q.scenarioText}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-slate-700">{q.category || 'General'}</td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              q.difficulty === 'easy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.difficulty === 'medium'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {(q.difficulty || 'medium').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              q.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {(q.status || 'draft').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <button
                                onClick={() => setPreviewQuestion(q)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                                title="Preview Question"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingQuestion(q)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit Question"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDuplicate(q)}
                                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
                                title="Duplicate Question"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleSingleDelete(q.id)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                                title="Delete Question"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <div>
                  Page <strong>{queryResult.page}</strong> of <strong>{queryResult.totalPages}</strong> ({queryResult.total} Total Questions)
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={queryResult.page === 1}
                    onClick={() => setFilterParams({ ...filterParams, page: queryResult.page - 1 })}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={queryResult.page >= queryResult.totalPages}
                    onClick={() => setFilterParams({ ...filterParams, page: queryResult.page + 1 })}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Question Editor Modal */}
        <QuestionEditorModal
          isOpen={editingQuestion !== undefined}
          question={editingQuestion}
          onClose={() => setEditingQuestion(undefined)}
          onSave={handleSaveQuestion}
        />

        {/* CSV Import Modal */}
        <CSVImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onSuccess={() => fetchQuestionsFromApi()}
          existingQuestions={allQuestions}
        />

        {/* Preview Drawer */}
        {previewQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <Card glass className="p-6 max-w-xl w-full space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-xs text-[#2563EB]">{previewQuestion.certification} • {previewQuestion.category}</span>
                <button onClick={() => setPreviewQuestion(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{previewQuestion.question}</h3>
              <div className="space-y-2 text-xs">
                {previewQuestion.options.map((opt) => (
                  <div key={opt.id} className={`p-2.5 rounded-lg border ${opt.isCorrect ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-slate-50 border-slate-200'}`}>
                    {opt.id}. {opt.text}
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-xs space-y-1">
                <div className="font-bold text-[#2563EB]">Socrates AI Rationale:</div>
                <p>{previewQuestion.clinicalExplanation || previewQuestion.answerExplanation}</p>
              </div>
            </Card>
          </div>
        )}

        {/* AI BULK QUESTION GENERATOR MODAL */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-[#0F172A] flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>AI Bulk Question Generator (Super Admin)</span>
                  </h3>
                  <p className="text-xs text-slate-500">Multi-Model LLM Exam Generation for BACB RBT 3rd Edition TCO</p>
                </div>
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {aiErrorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1.5 animate-fadeIn">
                  <div className="font-extrabold text-rose-800 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>AI Question Generation Failed</span>
                  </div>
                  <p className="text-[11px] text-rose-700 leading-relaxed">{aiErrorMsg}</p>
                  {aiErrorDetails && (
                    <div className="text-[10px] bg-white/70 p-2 rounded-lg border border-rose-200 text-slate-700 font-mono">
                      Provider: {aiErrorDetails.provider || 'Auto'} | Reason: {aiErrorDetails.reason || 'Failed'}
                    </div>
                  )}
                </div>
              )}

              {isAiGenerating && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs space-y-2 animate-pulse">
                  <div className="flex items-center space-x-2 font-bold text-indigo-700">
                    <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span>{aiProgressStep || 'Processing AI Question Generation...'}</span>
                  </div>
                  <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-2/3 animate-pulse rounded-full" />
                  </div>
                </div>
              )}

              <form onSubmit={handleGenerateAiQuestions} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Topic Prompt / Concept Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Differential Reinforcement (DRO vs DRA), Latency Data, BACB Ethics Dual Relationships"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Target Certification</label>
                    <select
                      value={aiCert}
                      onChange={(e) => setAiCert(e.target.value as CertificationLevel)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value="RBT">RBT (Registered Behavior Tech)</option>
                      <option value="BCaBA">BCaBA Assistant</option>
                      <option value="BCBA">BCBA Analyst</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">BACB Task List Code</label>
                    <select
                      value={aiTaskCode}
                      onChange={(e) => setAiTaskCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value="A-01">A-01 Data Collection Prep</option>
                      <option value="A-02">A-02 Continuous Measurement</option>
                      <option value="A-03">A-03 Discontinuous Measurement</option>
                      <option value="B-04">B-04 Verbal Operants</option>
                      <option value="C-01">C-01 Discrete Trial Teaching (DTT)</option>
                      <option value="D-04">D-04 Differential Reinforcement</option>
                      <option value="E-01">E-01 Functional Assessment</option>
                      <option value="F-02">F-02 BACB Ethics Code</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Question Difficulty</label>
                    <select
                      value={aiDiff}
                      onChange={(e) => setAiDiff(e.target.value as QuestionDifficulty)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value="easy">Easy (Fundamentals)</option>
                      <option value="medium">Medium (Standard Exam)</option>
                      <option value="hard">Hard (Tricky Scenario)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Questions Batch Count</label>
                    <select
                      value={aiCount}
                      onChange={(e) => setAiCount(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value={1}>1 Question</option>
                      <option value={3}>3 Questions</option>
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                      <option value={15}>15 Questions</option>
                      <option value={20}>20 Questions</option>
                      <option value={25}>25 Questions</option>
                      <option value={50}>50 Questions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">AI Model Provider</label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value="auto">⚡ Auto-Detect (Best Available Key)</option>
                      <option value="openai">OpenAI (GPT-4o-mini)</option>
                      <option value="gemini">Google Gemini (1.5 / 2.0 Flash)</option>
                      <option value="deepseek">DeepSeek V3</option>
                      <option value="openrouter">OpenRouter AI</option>
                      <option value="anthropic">Anthropic Claude 3.5</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Custom API Key (Optional)</label>
                    <input
                      type="password"
                      placeholder="sk-... or AI key override"
                      value={aiApiKey}
                      onChange={(e) => setAiApiKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <Button variant="outline" size="sm" type="button" onClick={() => setIsAiModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    disabled={isAiGenerating || !aiTopic.trim()}
                    className="font-extrabold gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-indigo-500/25"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isAiGenerating ? 'Generating Questions...' : `Generate & Publish ${aiCount} Questions`}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
