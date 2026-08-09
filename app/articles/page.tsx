'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Article, ArticleCategory } from '@/types/article-cms';
import { getPublishedArticles } from '@/lib/article-cms-engine';
import {
  BookOpen,
  Search,
  Clock,
  Eye,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Brain,
  Tag,
  User,
  Calendar,
} from 'lucide-react';

const CATEGORIES: ArticleCategory[] = [
  'RBT Exam Guide',
  'ABA Techniques',
  'BACB Ethics',
  'Study Strategies',
  'Clinical Scenarios',
  'Career & Certification',
];

export default function PublicArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.articles && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        setArticles(getPublishedArticles());
      }
    } catch (e) {
      setArticles(getPublishedArticles());
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredArticle = articles.find((a) => a.category === 'RBT Exam Guide') || articles[0];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <Badge variant="blue" className="gap-1 px-3 py-1 text-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>BACB RBT Educational Knowledge Base</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          RBT Exam Articles, Study Guides & ABA Techniques
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Expert clinical guides, differential reinforcement breakdowns, ethics code compliance, and strategy tips written by BCBA clinical mentors.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featuredArticle && (
        <div className="max-w-6xl mx-auto">
          <Card glass className="p-6 sm:p-8 border-blue-200/80 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-2xl space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                Featured Article
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {featuredArticle.readTimeMinutes} min read
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{featuredArticle.authorName}</span>
                <span>•</span>
                <span>{new Date(featuredArticle.publishedAt || featuredArticle.createdAt).toLocaleDateString()}</span>
              </div>

              <Link href={`/articles/${featuredArticle.slug}`}>
                <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-[#0F172A] text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <Card
              key={art.id}
              glass
              className="p-6 flex flex-col justify-between space-y-4 border-white/90 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="blue" className="text-[10px] font-bold">
                    {art.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{art.authorName}</span>
                <Link
                  href={`/articles/${art.slug}`}
                  className="font-bold text-[#2563EB] hover:underline flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
