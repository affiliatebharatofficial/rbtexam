'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Article } from '@/types/article-cms';
import { getArticleBySlug } from '@/lib/article-cms-engine';
import {
  BookOpen,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Bookmark,
  User,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function PublicArticleDetailPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === 'string' ? params.slug : '';

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugParam) {
      fetchArticle();
    }
  }, [slugParam]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?slug=${encodeURIComponent(slugParam)}`);
      const data = await res.json();
      if (data.article) {
        setArticle(data.article);
      } else {
        const local = getArticleBySlug(slugParam);
        setArticle(local);
      }
    } catch (e) {
      const local = getArticleBySlug(slugParam);
      setArticle(local);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Loading Article & Study Guide...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center space-y-6">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Article Not Found</h2>
          <p className="text-xs text-slate-600">
            The requested article slug &quot;{slugParam}&quot; could not be found or is not currently published.
          </p>
          <Link href="/articles">
            <Button variant="primary" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles Directory</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/articles">
          <Button variant="outline" size="sm" className="gap-2 text-xs font-bold text-slate-700">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Button>
        </Link>

        <div className="flex items-center space-x-2">
          <Badge variant="blue" className="text-xs font-bold">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card glass className="p-6 sm:p-10 shadow-2xl border-white/90 space-y-8">
          {/* Header Info */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {article.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-slate-900">{article.authorName}</span>
                <span>•</span>
                <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="font-mono text-slate-600">{article.readTimeMinutes} min read</span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                <Eye className="w-3.5 h-3.5" />
                <span>{(article.viewsCount || 0) + 1} Reads</span>
              </div>
            </div>
          </div>

          {/* Article Markdown Body Renderer */}
          <div className="py-2">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Article Tags & Footer */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex items-center flex-wrap gap-2 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Topics:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] font-bold text-[11px] border border-blue-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
