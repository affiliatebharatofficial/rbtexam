'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Shield,
  Zap,
  Code,
  BarChart2,
  FileText,
  AlertTriangle,
} from 'lucide-react';

// ── Simulated QA metrics (replace with DB queries in production) ──────────────
const QA_SUMMARY = {
  unitCoverage: 94.2,
  integrationCoverage: 91.8,
  e2ePassRate: 98.5,
  promptRegressionPassRate: 100,
  totalTestsRun: 87,
  lastRunStatus: 'passed' as 'passed' | 'failed',
  lastRunAt: new Date(Date.now() - 1800000).toISOString(),
  openFailures: 0,
};

const TEST_SUITES = [
  { suite: 'RAG Engine', file: 'tests/unit/rag-engine.test.ts', tests: 18, status: 'passed' },
  { suite: 'Security Engine', file: 'tests/unit/security-engine.test.ts', tests: 16, status: 'passed' },
  { suite: 'Notification Engine', file: 'tests/unit/notification-engine.test.ts', tests: 12, status: 'passed' },
  { suite: 'API Gateway', file: 'tests/unit/api-gateway.test.ts', tests: 13, status: 'passed' },
  { suite: 'Subscription Engine', file: 'tests/unit/subscription-engine.test.ts', tests: 9, status: 'passed' },
  { suite: 'RAG Search API', file: 'tests/integration/rag-api.test.ts', tests: 6, status: 'passed' },
  { suite: 'Notifications API', file: 'tests/integration/notifications-api.test.ts', tests: 4, status: 'passed' },
  { suite: 'Security & Privacy API', file: 'tests/integration/security-api.test.ts', tests: 5, status: 'passed' },
  { suite: 'Prompt Regression', file: 'tests/ai/prompt-regression.test.ts', tests: 10, status: 'passed' },
  { suite: 'RAG Quality', file: 'tests/ai/rag-quality.test.ts', tests: 5, status: 'passed' },
];

export default function AdminQADashboardPage() {
  const coverageColor = (pct: number) =>
    pct >= 90 ? 'text-emerald-600' : pct >= 75 ? 'text-amber-600' : 'text-rose-600';

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Vitest · Playwright · CI/CD</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              QA & Quality Assurance Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Enterprise-grade automated testing across unit, integration, AI regression, E2E, and performance layers. Target: 95%+ unit coverage · 90%+ integration coverage.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Scorecard Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Unit Coverage', value: `${QA_SUMMARY.unitCoverage}%`, color: coverageColor(QA_SUMMARY.unitCoverage), icon: Code },
            { label: 'Integration Coverage', value: `${QA_SUMMARY.integrationCoverage}%`, color: coverageColor(QA_SUMMARY.integrationCoverage), icon: Zap },
            { label: 'E2E Pass Rate', value: `${QA_SUMMARY.e2ePassRate}%`, color: coverageColor(QA_SUMMARY.e2ePassRate), icon: Activity },
            { label: 'Prompt Regression', value: `${QA_SUMMARY.promptRegressionPassRate}%`, color: 'text-emerald-600', icon: Shield },
          ].map((kpi) => (
            <Card key={kpi.label} glass className="p-5 space-y-2 border-white/90 shadow-xl">
              <div className="flex items-center space-x-2">
                <kpi.icon className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</span>
              </div>
              <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
            </Card>
          ))}
        </div>

        {/* Last Build Status Bar */}
        <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-sm font-bold ${
          QA_SUMMARY.lastRunStatus === 'passed'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {QA_SUMMARY.lastRunStatus === 'passed'
            ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            : <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          }
          <span>
            Last CI Run: {QA_SUMMARY.lastRunStatus.toUpperCase()} —
            {QA_SUMMARY.totalTestsRun} tests · {QA_SUMMARY.openFailures} failures ·
            Completed {new Date(QA_SUMMARY.lastRunAt).toLocaleTimeString()}
          </span>
        </div>

        {/* Test Suite Table */}
        <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Test Suite Registry ({TEST_SUITES.length} suites · {QA_SUMMARY.totalTestsRun} tests)</h3>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Last: {new Date(QA_SUMMARY.lastRunAt).toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-slate-500 font-bold uppercase tracking-wide text-[10px]">Suite</th>
                  <th className="text-left py-2 text-slate-500 font-bold uppercase tracking-wide text-[10px]">File</th>
                  <th className="text-right py-2 text-slate-500 font-bold uppercase tracking-wide text-[10px]">Tests</th>
                  <th className="text-right py-2 text-slate-500 font-bold uppercase tracking-wide text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TEST_SUITES.map((suite) => (
                  <tr key={suite.file} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 font-bold text-slate-900">{suite.suite}</td>
                    <td className="py-3 text-slate-500 font-mono text-[10px]">{suite.file}</td>
                    <td className="py-3 text-right font-mono text-slate-700">{suite.tests}</td>
                    <td className="py-3 text-right">
                      {suite.status === 'passed' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASS</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-600 font-extrabold">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>FAIL</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Coverage & CI/CD Architecture Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card glass className="p-6 shadow-xl border-white/90 space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F172A] flex items-center space-x-2">
              <BarChart2 className="w-4 h-4" />
              <span>Coverage Targets</span>
            </h4>
            {[
              { layer: 'Unit (lib/ + types/)', target: '95%', actual: QA_SUMMARY.unitCoverage },
              { layer: 'Integration (API routes)', target: '90%', actual: QA_SUMMARY.integrationCoverage },
              { layer: 'E2E Smoke (Playwright)', target: '100% Critical Paths', actual: QA_SUMMARY.e2ePassRate },
              { layer: 'AI Prompt Regression', target: '100%', actual: QA_SUMMARY.promptRegressionPassRate },
            ].map((row) => (
              <div key={row.layer} className="flex items-center justify-between">
                <span className="text-slate-600">{row.layer}</span>
                <span className={`font-extrabold ${coverageColor(row.actual)}`}>{row.actual}% / {row.target}</span>
              </div>
            ))}
          </Card>

          <Card glass className="p-6 shadow-xl border-white/90 space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F172A] flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>CI/CD Pipeline Triggers</span>
            </h4>
            {[
              { trigger: 'Push to main/develop', jobs: 'tsc · unit · build' },
              { trigger: 'Pull Request', jobs: 'tsc · unit · integration · build' },
              { trigger: 'Merge to main', jobs: 'All + E2E smoke' },
              { trigger: 'Nightly (01:00 UTC)', jobs: 'Full suite + AI regression' },
            ].map((row) => (
              <div key={row.trigger} className="flex items-start justify-between gap-2">
                <span className="text-slate-600 font-medium">{row.trigger}</span>
                <span className="text-[#2563EB] font-mono font-bold text-right">{row.jobs}</span>
              </div>
            ))}
          </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
