import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { getPublishedArticles } from '@/lib/article-cms-engine';
import { constructMetadata } from '@/utils/seo';
import { ArticlesClient } from '@/components/articles/articles-client';

export const metadata = constructMetadata({
  title: 'RBT Exam Articles & Guides | RBT Practice AI',
  description:
    'Explore comprehensive RBT exam prep articles, BACB study strategies, and Applied Behavior Analysis clinical techniques.',
  path: '/articles',
  keywords: [
    'rbt articles',
    'rbt study guides',
    'aba techniques',
    'rbt exam tips',
    'bacb ethics guide',
  ],
});

export default function PublicArticlesPage() {
  const initialArticles = getPublishedArticles();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Header (SSR H1) */}
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

      <ArticlesClient initialArticles={initialArticles} />
    </div>
  );
}
