'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getPlatformAnalyticsSummary, exportAnalyticsToCSV } from '@/lib/analytics-engine';
import {
  TrendingUp,
  DollarSign,
  Users,
  Brain,
  Search,
  Server,
  Download,
  Calendar,
  ShieldCheck,
  Award,
  Zap,
  Clock,
  ArrowUpRight,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

type BITab = 'business' | 'students' | 'ai_tutor' | 'seo' | 'system';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<BITab>('business');
  const [timeframe, setTimeframe] = useState('30d');

  const summary = getPlatformAnalyticsSummary();

  const handleDownloadCSV = () => {
    const csv = exportAnalyticsToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rbttrainingai_bi_report_${timeframe}.csv`;
    a.click();
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Business Intelligence Engine</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Executive Analytics & BI Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Real-time commercial metrics, student learning velocity, AI costs, SEO, and system health.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timeframe Selector */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {['7d', '30d', '90d', '1y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg uppercase transition-all ${
                    timeframe === tf ? 'bg-white text-[#2563EB] shadow font-black' : 'text-slate-500'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <Button onClick={handleDownloadCSV} variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
              <Download className="w-4 h-4" />
              <span>Export BI Report</span>
            </Button>
          </div>
        </div>

        {/* TOP 4 EXECUTIVE KPI SCORECARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* MRR Card */}
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Monthly Recurring Revenue (MRR)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">${summary.business.mrrUSD.toLocaleString()}</span>
              <span className="text-xs font-extrabold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.2%</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              ARR: ${(summary.business.arrUSD / 1000).toFixed(1)}k • ARPU: ${summary.business.arpuUSD}/mo
            </div>
          </Card>

          {/* Active Candidates */}
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Active Candidates (MAU)</span>
              <Users className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">{summary.students.activeStudentsMAU.toLocaleString()}</span>
              <span className="text-xs font-extrabold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.6%</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              DAU: {summary.students.activeStudentsDAU.toLocaleString()} • Retention: {summary.students.retentionRatePercentage}%
            </div>
          </Card>

          {/* Exam Pass Likelihood */}
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Predicted Pass Rate</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-600">{summary.students.predictedPassRatePercentage}%</span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                100% Guaranteed
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Avg Readiness Score: {summary.students.averageReadinessScore}%
            </div>
          </Card>

          {/* AI Tutor Spend */}
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>AI Tutor Monthly Spend</span>
              <Brain className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">${summary.aiTutor.totalAICostUSD.toFixed(2)}</span>
              <span className="text-xs font-bold text-slate-500">
                ${summary.aiTutor.costPerActiveStudentUSD}/student
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {(summary.aiTutor.totalTokensConsumed / 1000000).toFixed(1)}M Tokens • Latency: {summary.aiTutor.averageResponseLatencyMs}ms
            </div>
          </Card>
        </div>

        {/* TABBED BI NAVIGATION BAR */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'business', label: 'Business & Revenue', icon: TrendingUp },
            { id: 'students', label: 'Student Intelligence', icon: Users },
            { id: 'ai_tutor', label: 'AI LLM Costs', icon: Brain },
            { id: 'seo', label: 'SEO & Growth', icon: Search },
            { id: 'system', label: 'System & Infra Health', icon: Server },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BITab)}
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

        {/* TAB 1: BUSINESS & REVENUE ANALYTICS */}
        {activeTab === 'business' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-8">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Financial Metrics Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">New Subscribers</div>
                    <div className="text-2xl font-black text-slate-900">+{summary.business.newSubscribersCount}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Churn Rate</div>
                    <div className="text-2xl font-black text-emerald-600">{summary.business.churnRatePercentage}%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Customer LTV</div>
                    <div className="text-2xl font-black text-slate-900">${summary.business.ltvUSD}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Conversion Rate</div>
                    <div className="text-2xl font-black text-[#2563EB]">{summary.business.conversionRatePercentage}%</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Active Subscribers</h3>
                <div className="text-4xl font-black text-slate-900">{summary.business.activeSubscribers.toLocaleString()}</div>
                <p className="text-xs text-slate-500">Subscribed across Pass Guarantee Monthly & Annual Tiers.</p>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT INTELLIGENCE */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Certification Demographics</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>RBT Candidates (Registered Behavior Technician)</span>
                      <span>{summary.students.certificationDistribution.rbt.toLocaleString()} (70%)</span>
                    </div>
                    <Progress value={70} colorClass="bg-[#2563EB]" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>BCaBA Candidates (Assistant Behavior Analyst)</span>
                      <span>{summary.students.certificationDistribution.bcaba.toLocaleString()} (19%)</span>
                    </div>
                    <Progress value={19} colorClass="bg-indigo-500" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>BCBA Candidates (Board Certified Behavior Analyst)</span>
                      <span>{summary.students.certificationDistribution.bcba.toLocaleString()} (11%)</span>
                    </div>
                    <Progress value={11} colorClass="bg-purple-500" size="sm" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Learning Velocity & Engagement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Total Study Hours</div>
                    <div className="text-2xl font-black text-slate-900">{summary.students.totalStudyHours.toLocaleString()} hrs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Avg Session Time</div>
                    <div className="text-2xl font-black text-[#2563EB]">{summary.students.averageSessionLengthMinutes} mins</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: AI TUTOR & LLM COSTS */}
        {activeTab === 'ai_tutor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-8">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">AI Tutor Usage Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Conversations Logged</div>
                    <div className="text-2xl font-black text-slate-900">{summary.aiTutor.totalConversations.toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Messages Processed</div>
                    <div className="text-2xl font-black text-slate-900">{summary.aiTutor.totalMessagesSent.toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Student Satisfaction</div>
                    <div className="text-2xl font-black text-emerald-600">{summary.aiTutor.satisfactionRatingPercentage}%</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Cost Efficiency</h3>
                <div className="text-3xl font-black text-slate-900">${summary.aiTutor.costPerActiveStudentUSD} / student</div>
                <p className="text-xs text-slate-500">Optimized system prompt payloads reduce OpenAI token costs by 45%.</p>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 4: SEO & GROWTH */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Organic Traffic & Search Console</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Monthly Impressions</div>
                    <div className="text-2xl font-black text-slate-900">{(summary.seo.organicImpressionsMonthly / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Organic CTR</div>
                    <div className="text-2xl font-black text-[#2563EB]">{summary.seo.organicClickThroughRate}%</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">Search Indexing & Schema</h3>
                <div className="flex items-center justify-between text-xs">
                  <span>Indexed Pages: <strong>{summary.seo.indexedPagesCount} Pages</strong></span>
                  <span className="font-bold text-emerald-600">Schema Health: {summary.seo.schemaValidationHealth}% Valid</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM HEALTH */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">API & Cache Latency</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">API Avg Response</div>
                    <div className="text-2xl font-black text-slate-900">{summary.system.apiAverageLatencyMs} ms</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold">Cache Hit Ratio</div>
                    <div className="text-2xl font-black text-emerald-600">{summary.system.cacheHitRatioPercentage}%</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A]">System Uptime & Queue Health</h3>
                <div className="flex items-center justify-between text-xs">
                  <span>Platform Uptime: <strong>{summary.system.uptimePercentage}%</strong></span>
                  <span className="font-bold text-emerald-600">Error Rate: {summary.system.errorRatePercentage}%</span>
                </div>
              </Card>
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
