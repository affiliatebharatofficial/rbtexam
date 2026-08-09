'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Article, ArticleCategory, ArticleStatus } from '@/types/article-cms';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/lib/article-cms-engine';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Globe,
  Tag,
  ArrowRight,
  BookOpen,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';

const CATEGORIES: ArticleCategory[] = [
  'RBT Exam Guide',
  'ABA Techniques',
  'BACB Ethics',
  'Study Strategies',
  'Clinical Scenarios',
  'Career & Certification',
];

export default function AdminArticlesCMSPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [activeWriterTab, setActiveWriterTab] = useState<'edit' | 'preview'>('edit');
  const [msg, setMsg] = useState('');

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState<ArticleCategory>('RBT Exam Guide');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('/banner-rbt-hero.png');
  const [formAuthor, setFormAuthor] = useState('Jobpe gyan');
  const [formTags, setFormTags] = useState('RBT, Study Guide');
  const [formStatus, setFormStatus] = useState<ArticleStatus>('published');

  useEffect(() => {
    loadArticlesData();
  }, []);

  const loadArticlesData = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      if (data.articles && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        setArticles(getAllArticles());
      }
    } catch (e) {
      setArticles(getAllArticles());
    }
  };

  const handleOpenNewModal = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormSummary('');
    setFormCategory('RBT Exam Guide');
    setFormContent(`# Sample Article Title\n\nWrite your educational article here with **bold text**, bullet points, and markdown tables!\n\n| Domain | Weight | Focus |\n| --- | --- | --- |\n| Skill Acquisition | 28% | High |\n| Behavior Reduction | 24% | High |`);
    setFormCoverImage('/banner-rbt-hero.png');
    setFormAuthor('Jobpe gyan');
    setFormTags('RBT, Exam Prep');
    setFormStatus('published');
    setActiveWriterTab('edit');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: Article) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormSummary(article.summary);
    setFormCategory(article.category);
    setFormContent(article.content);
    setFormCoverImage(article.coverImageUrl || '/banner-rbt-hero.png');
    setFormAuthor(article.authorName || 'Jobpe gyan');
    setFormTags((article.tags || []).join(', '));
    setFormStatus(article.status);
    setActiveWriterTab('edit');
    setIsModalOpen(true);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingArticle) {
      const updated = updateArticle({
        id: editingArticle.id,
        title: formTitle,
        summary: formSummary,
        content: formContent,
        category: formCategory,
        tags: tagsArray,
        coverImageUrl: formCoverImage,
        authorName: formAuthor,
        status: formStatus,
      });

      if (updated) {
        setMsg(`✅ Article "${updated.title}" updated successfully!`);
      }
    } else {
      const created = createArticle({
        title: formTitle,
        summary: formSummary,
        content: formContent,
        category: formCategory,
        tags: tagsArray,
        coverImageUrl: formCoverImage,
        authorName: formAuthor,
        status: formStatus,
      });
      setMsg(`✅ New Article "${created.title}" created & published!`);
    }

    setIsModalOpen(false);
    loadArticlesData();
    setTimeout(() => setMsg(''), 4000);
  };

  const handleToggleStatus = (article: Article) => {
    const nextStatus: ArticleStatus = article.status === 'published' ? 'draft' : 'published';
    updateArticle({ id: article.id, status: nextStatus });
    loadArticlesData();
    setMsg(`Article status changed to ${nextStatus.toUpperCase()}`);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteArticle(id);
      loadArticlesData();
      setMsg(`Deleted article "${title}"`);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesStat = selectedStatus === 'ALL' || a.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + (a.viewsCount || 0), 0);

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Educational Content CMS v3.2</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Blog & Article CMS Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Write, edit, and publish markdown study guides, ABA technique breakdowns, and BACB ethics articles with table formatting.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/admin">
              <Button variant="outline" size="md" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/articles" target="_blank">
              <Button variant="outline" size="md" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <span>View Live Blog</span>
              </Button>
            </Link>
            <Button
              onClick={handleOpenNewModal}
              variant="primary"
              size="md"
              className="gap-2 shadow-lg shadow-blue-500/25 font-extrabold"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Article</span>
            </Button>
          </div>
        </div>

        {msg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{msg}</span>
          </div>
        )}

        {/* TOP SCORECARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Articles</span>
              <FileText className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-3xl font-black text-slate-900">{articles.length}</div>
            <div className="text-[10px] text-slate-400 font-mono">Managed articles in CMS</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Published & Live</span>
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{publishedCount}</div>
            <div className="text-[10px] text-slate-400 font-mono">Visible on /articles</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Draft In-Progress</span>
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">{draftCount}</div>
            <div className="text-[10px] text-slate-400 font-mono">Pending editorial review</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Reader Views</span>
              <Eye className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl font-black text-indigo-600">{totalViews.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-mono">Reader engagements</div>
          </Card>
        </div>

        {/* ARTICLES ROSTER CARD */}
        <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                <Layers className="w-5 h-5 text-[#2563EB]" />
                <span>Articles Roster & Publishing CMS</span>
              </h3>
              <p className="text-xs text-slate-500">
                Manage candidate study guides, clinical tutorials, and BACB ethics breakdowns with markdown table support.
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by title, summary, or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-bold p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-bold p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="ALL">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Article Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="p-3">Article Title & Slug</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author & Read Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Views</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 space-y-1 max-w-sm">
                      <span className="font-extrabold text-slate-900 block truncate text-xs sm:text-sm">
                        {art.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block truncate">
                        /articles/{art.slug}
                      </span>
                    </td>

                    <td className="p-3">
                      <Badge variant="blue" className="text-[10px] font-bold">
                        {art.category}
                      </Badge>
                    </td>

                    <td className="p-3 text-slate-600 space-y-0.5">
                      <div className="font-semibold text-slate-800">{art.authorName}</div>
                      <div className="text-[10px] text-slate-400">{art.readTimeMinutes} min read</div>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStatus(art)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          art.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {art.status.toUpperCase()}
                      </button>
                    </td>

                    <td className="p-3 font-mono font-bold text-slate-700">
                      {art.viewsCount || 0}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      {art.status === 'published' && (
                        <Link href={`/articles/${art.slug}`} target="_blank">
                          <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all" title="View Published Article">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                      )}

                      <button
                        onClick={() => handleOpenEditModal(art)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold transition-all"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(art.id, art.title)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ARTICLE WRITER & MARKDOWN EDITOR MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <Card glass className="max-w-4xl w-full max-h-[90vh] flex flex-col p-6 space-y-4 bg-white shadow-2xl border-white/90 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  <span>{editingArticle ? 'Edit Educational Article' : 'Write New Article & Study Guide'}</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Writer Tabs: Edit vs Preview */}
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-bold flex-shrink-0">
                <button
                  onClick={() => setActiveWriterTab('edit')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    activeWriterTab === 'edit' ? 'bg-[#0F172A] text-white shadow' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Markdown Writer
                </button>
                <button
                  onClick={() => setActiveWriterTab('preview')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    activeWriterTab === 'preview' ? 'bg-[#0F172A] text-white shadow' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Live Markdown & Table Preview
                </button>
              </div>

              <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                {activeWriterTab === 'edit' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Article Title</label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g. Mastering Continuous vs Discontinuous Measurement"
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Category</label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as ArticleCategory)}
                          className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Summary / SEO Subtitle</label>
                      <input
                        type="text"
                        required
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                        placeholder="Brief 1-2 sentence overview of the article for candidate search previews..."
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Author */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Author Name</label>
                        <input
                          type="text"
                          value={formAuthor}
                          onChange={(e) => setFormAuthor(e.target.value)}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={formTags}
                          onChange={(e) => setFormTags(e.target.value)}
                          placeholder="RBT, Exam Prep, Domain A"
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>

                      {/* Status */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Publishing Status</label>
                        <select
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value as ArticleStatus)}
                          className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="published">Published (Live)</option>
                          <option value="draft">Draft (Private)</option>
                        </select>
                      </div>
                    </div>

                    {/* Markdown Content Field */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-700">
                          Article Markdown Content (Supports Tables, Headings, Code)
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">Use | Header 1 | Header 2 | for tables</span>
                      </div>
                      <textarea
                        required
                        rows={12}
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                        placeholder="Write article markdown content..."
                        className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded-xl focus:outline-none border border-slate-800"
                      />
                    </div>
                  </>
                ) : (
                  /* LIVE MARKDOWN PREVIEW TAB */
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="border-b border-slate-200 pb-3">
                      <Badge variant="blue">{formCategory}</Badge>
                      <h1 className="text-xl font-black text-slate-900 mt-2">{formTitle || 'Untitled Article'}</h1>
                      <p className="text-xs text-slate-500 mt-1">{formSummary}</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                      <MarkdownRenderer content={formContent} />
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2 flex-shrink-0">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="gap-2 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save & Publish Article</span>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
