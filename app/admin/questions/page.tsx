'use client';

import React, { useState } from 'react';
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
  MASTER_QUESTION_BANK,
} from '@/lib/master-question-bank';
import { MasterQuestion, QuestionFilterParams, CertificationLevel, QuestionCategory, QuestionDifficulty, QuestionStatus } from '@/types/master-question';
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

  const queryResult = getFilteredQuestions(filterParams);

  // Bulk Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(queryResult.data.map((q) => q.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = () => {
    bulkUpdateStatus(selectedIds, 'published');
    setSelectedIds([]);
  };

  const handleBulkArchive = () => {
    bulkUpdateStatus(selectedIds, 'archived');
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    bulkDeleteQuestions(selectedIds);
    setSelectedIds([]);
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

  const handleDuplicate = (question: MasterQuestion) => {
    createQuestion({
      ...question,
      question: `[COPY] ${question.question}`,
      status: 'draft',
    });
    setFilterParams({ ...filterParams });
  };

  const handleSaveQuestion = (data: Partial<MasterQuestion>) => {
    if (editingQuestion && editingQuestion.id) {
      updateQuestion(editingQuestion.id, data);
    } else {
      createQuestion(data as any);
    }
    setEditingQuestion(undefined);
    setFilterParams({ ...filterParams });
  };

  return (
    <ProtectedRoute>
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
            <Button onClick={() => setEditingQuestion(null)} variant="primary" size="sm" className="gap-1.5 text-xs shadow-md">
              <Plus className="w-4 h-4" />
              <span>Add New Question</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="p-4 space-y-1 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Total Questions</div>
            <div className="text-2xl font-black text-slate-900">{MASTER_QUESTION_BANK.length}</div>
          </Card>
          <Card className="p-4 space-y-1 text-center bg-emerald-50/50 border-emerald-100">
            <div className="text-[10px] font-bold text-emerald-700 uppercase">Published</div>
            <div className="text-2xl font-black text-emerald-600">
              {MASTER_QUESTION_BANK.filter((q) => q.status === 'published').length}
            </div>
          </Card>
          <Card className="p-4 space-y-1 text-center bg-blue-50/50 border-blue-100">
            <div className="text-[10px] font-bold text-blue-700 uppercase">RBT Questions</div>
            <div className="text-2xl font-black text-[#2563EB]">
              {MASTER_QUESTION_BANK.filter((q) => q.certification === 'RBT').length}
            </div>
          </Card>
          <Card className="p-4 space-y-1 text-center bg-indigo-50/50 border-indigo-100">
            <div className="text-[10px] font-bold text-indigo-700 uppercase">BCaBA Questions</div>
            <div className="text-2xl font-black text-indigo-600">
              {MASTER_QUESTION_BANK.filter((q) => q.certification === 'BCaBA').length}
            </div>
          </Card>
          <Card className="p-4 space-y-1 text-center bg-purple-50/50 border-purple-100">
            <div className="text-[10px] font-bold text-purple-700 uppercase">BCBA Questions</div>
            <div className="text-2xl font-black text-purple-600">
              {MASTER_QUESTION_BANK.filter((q) => q.certification === 'BCBA').length}
            </div>
          </Card>
          <Card className="p-4 space-y-1 text-center bg-amber-50/50 border-amber-100">
            <div className="text-[10px] font-bold text-amber-700 uppercase">Featured / Premium</div>
            <div className="text-2xl font-black text-amber-600">
              {MASTER_QUESTION_BANK.filter((q) => q.isPremium || q.isFeatured).length}
            </div>
          </Card>
        </div>

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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === queryResult.data.length && queryResult.data.length > 0}
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
                {queryResult.data.map((q) => {
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
                          {q.certification}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 max-w-xs sm:max-w-md">
                        <div className="font-bold text-slate-900 line-clamp-1">{q.question}</div>
                        {q.scenarioText && (
                          <div className="text-[11px] text-slate-400 line-clamp-1 italic">{q.scenarioText}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">{q.category}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.difficulty === 'easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.difficulty === 'medium'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {q.difficulty.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {q.status.toUpperCase()}
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
                            onClick={() => {
                              deleteQuestion(q.id);
                              setFilterParams({ ...filterParams });
                            }}
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

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div>
              Page <strong>{queryResult.page}</strong> of <strong>{queryResult.totalPages}</strong> ({queryResult.total} Total Questions)
            </div>
            <div className="flex items-center space-x-2">
              <Button
                disabled={queryResult.page === 1}
                onClick={() => setFilterParams({ ...filterParams, page: queryResult.page - 1 })}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </Button>
              <Button
                disabled={queryResult.page >= queryResult.totalPages}
                onClick={() => setFilterParams({ ...filterParams, page: queryResult.page + 1 })}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
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
          onSuccess={() => setFilterParams({ ...filterParams })}
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

      </div>
    </ProtectedRoute>
  );
}
