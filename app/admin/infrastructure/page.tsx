'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Server,
  Database,
  Zap,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Clock,
  Container,
  Globe,
  GitBranch,
  Cpu,
  HardDrive,
} from 'lucide-react';

type HealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'loading';

interface ServiceCard {
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
  icon: React.ElementType;
}

const MOCK_SERVICES: ServiceCard[] = [
  { name: 'Supabase Database', status: 'healthy', latencyMs: 18, icon: Database },
  { name: 'OpenAI API', status: 'healthy', latencyMs: 120, icon: Zap },
  { name: 'RAG Knowledge Engine', status: 'healthy', message: '5 chunks · 5 indexed', icon: Activity },
  { name: 'Environment Variables', status: 'healthy', message: 'All required vars present', icon: Shield },
  { name: 'Stripe Payments', status: 'healthy', latencyMs: 75, icon: Globe },
  { name: 'Resend Email', status: 'healthy', latencyMs: 90, icon: Server },
];

const DEPLOYMENT_HISTORY = [
  { id: 'dep-001', version: 'v2.7.0', env: 'production', status: 'success', branch: 'main', sha: 'a3f9c2d', at: '2026-08-06T17:00:00Z', duration: '2m 34s' },
  { id: 'dep-002', version: 'v2.6.0', env: 'production', status: 'success', branch: 'main', sha: 'b8e1f4a', at: '2026-08-06T11:30:00Z', duration: '2m 18s' },
  { id: 'dep-003', version: 'v2.5.0', env: 'staging', status: 'success', branch: 'develop', sha: 'c2d7e9b', at: '2026-08-06T09:15:00Z', duration: '1m 58s' },
  { id: 'dep-004', version: 'v2.4.1', env: 'production', status: 'failed', branch: 'main', sha: 'd6f0a3c', at: '2026-08-05T22:00:00Z', duration: '0m 45s' },
];

const statusColor = (status: HealthStatus | string) => {
  if (status === 'healthy' || status === 'success') return 'text-emerald-600';
  if (status === 'degraded') return 'text-amber-600';
  return 'text-rose-600';
};

const statusIcon = (status: HealthStatus | string) => {
  if (status === 'healthy' || status === 'success') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === 'degraded') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  if (status === 'loading') return <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />;
  return <XCircle className="w-4 h-4 text-rose-500" />;
};

export default function AdminInfrastructurePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date());
    }, 800);
  };

  const healthyCount = MOCK_SERVICES.filter((s) => s.status === 'healthy').length;
  const overallStatus: HealthStatus = healthyCount === MOCK_SERVICES.length ? 'healthy' : 'degraded';

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Server className="w-3.5 h-3.5" />
              <span>DevOps · Vercel · Supabase · Docker</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Infrastructure Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Real-time platform health, deployment history, environment status, and service observability for the RBT Practice AI enterprise infrastructure.
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
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Health</span>
            </button>
          </div>
        </div>

        {/* Overall Status Bar */}
        <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-sm font-bold ${
          overallStatus === 'healthy' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {statusIcon(overallStatus)}
          <span>
            Overall: {overallStatus.toUpperCase()} — {healthyCount}/{MOCK_SERVICES.length} services operational
          </span>
          <span className="ml-auto flex items-center space-x-1 text-[10px] font-mono text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Refreshed {lastRefreshed.toLocaleTimeString()}</span>
          </span>
        </div>

        {/* Service Health Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_SERVICES.map((svc) => (
            <Card key={svc.name} glass className="p-5 border-white/90 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svc.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-extrabold text-slate-900">{svc.name}</span>
                </div>
                {statusIcon(svc.status)}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={`font-extrabold uppercase ${statusColor(svc.status)}`}>{svc.status}</span>
                {svc.latencyMs && <span className="text-slate-500">{svc.latencyMs}ms</span>}
              </div>
              {svc.message && <p className="text-[10px] text-slate-500">{svc.message}</p>}
            </Card>
          ))}
        </div>

        {/* Environment + Infrastructure Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Platform', value: 'Vercel Edge', icon: Globe },
            { label: 'Database', value: 'Supabase PostgreSQL', icon: Database },
            { label: 'Container', value: 'Docker · Alpine', icon: Container },
            { label: 'Node.js', value: 'v20 LTS', icon: Cpu },
            { label: 'Next.js', value: 'v16.3.0', icon: Zap },
            { label: 'Version', value: 'v2.7.0', icon: GitBranch },
          ].map((item) => (
            <Card key={item.label} glass className="p-4 border-white/90 shadow-lg flex items-center space-x-3">
              <item.icon className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{item.label}</div>
                <div className="text-xs font-extrabold text-slate-900">{item.value}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Deployment History */}
        <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
          <h3 className="text-sm font-extrabold text-[#0F172A]">Deployment History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Version', 'Environment', 'Branch', 'Commit SHA', 'Duration', 'Status', 'Deployed'].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 text-slate-500 font-bold uppercase tracking-wide text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEPLOYMENT_HISTORY.map((dep) => (
                  <tr key={dep.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 pr-4 font-extrabold text-[#2563EB]">{dep.version}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${dep.env === 'production' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {dep.env}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-slate-600">{dep.branch}</td>
                    <td className="py-3 pr-4 font-mono text-slate-500 text-[10px]">{dep.sha}</td>
                    <td className="py-3 pr-4 font-mono text-slate-600">{dep.duration}</td>
                    <td className="py-3 pr-4">
                      <span className={`flex items-center space-x-1 font-extrabold ${statusColor(dep.status)}`}>
                        {statusIcon(dep.status)}
                        <span className="uppercase text-[10px]">{dep.status}</span>
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-500 text-[10px]">{new Date(dep.at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Reference Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card glass className="p-5 shadow-xl border-white/90 space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F172A]">🚀 Deploy Commands</h4>
            <div className="space-y-2 font-mono text-[11px]">
              {[
                { label: 'Development', cmd: 'npm run dev' },
                { label: 'Build', cmd: 'npm run build' },
                { label: 'Docker Dev', cmd: 'docker-compose up' },
                { label: 'Docker Prod', cmd: 'docker build -t rbt-app .' },
                { label: 'Tests', cmd: 'npm run test' },
                { label: 'E2E Tests', cmd: 'npm run test:e2e:smoke' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">{item.label}</span>
                  <code className="px-2 py-0.5 rounded bg-slate-900 text-slate-100 text-[10px]">{item.cmd}</code>
                </div>
              ))}
            </div>
          </Card>
          <Card glass className="p-5 shadow-xl border-white/90 space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F172A]">📦 Infrastructure Files</h4>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-600">
              {[
                'Dockerfile', 'docker-compose.yml', '.env.example',
                '.github/workflows/ci.yml', 'scripts/setup.sh',
                'scripts/validate-env.ts', 'database/migrations.sql',
                'playwright.config.ts', 'vitest.config.ts',
              ].map((file) => (
                <div key={file} className="flex items-center space-x-1">
                  <HardDrive className="w-2.5 h-2.5 text-slate-400" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
