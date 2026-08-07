'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EMAIL_TEMPLATES, AUTOMATION_WORKFLOWS, broadcastNotificationCampaign } from '@/lib/notification-engine';
import {
  Bell,
  Mail,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Users,
  BarChart2,
  Clock,
  ArrowRight,
} from 'lucide-react';

type AdminTab = 'broadcast' | 'templates' | 'workflows' | 'logs';

export default function AdminNotificationPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('broadcast');
  const [title, setTitle] = useState('New BACB Task List Practice Questions Added!');
  const [message, setMessage] = useState('We have added 50 new 2nd Edition Task List mock questions for RBT & BCBA candidates.');
  const [segment, setSegment] = useState('all');
  const [bcastResult, setBcastResult] = useState<number | null>(null);

  const handleBroadcast = () => {
    const res = broadcastNotificationCampaign(title, message, segment);
    setBcastResult(res.count);
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Event-Driven Engagement Engine</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Notification & Email Automation Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Multi-channel push, in-app notifications, email automation workflows, and broadcast campaigns.
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

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Messages Dispatched (Monthly)</div>
            <div className="text-3xl font-black text-slate-900">148,500</div>
            <div className="text-[10px] text-emerald-600 font-bold">99.8% Delivery Success Rate</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Email Open Rate</div>
            <div className="text-3xl font-black text-[#2563EB]">78.4%</div>
            <div className="text-[10px] text-slate-400 font-mono">Industry Avg: 24.2%</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Click-Through Rate (CTR)</div>
            <div className="text-3xl font-black text-emerald-600">32.1%</div>
            <div className="text-[10px] text-slate-400 font-mono">High Engagement Workflows</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Active Workflows</div>
            <div className="text-3xl font-black text-indigo-600">{AUTOMATION_WORKFLOWS.length} Rules</div>
            <div className="text-[10px] text-slate-400 font-mono">Trigger-Condition-Action Pipeline</div>
          </Card>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'broadcast', label: 'Broadcast Campaign', icon: Send },
            { id: 'templates', label: 'Email Templates', icon: Mail },
            { id: 'workflows', label: 'Automation Workflows', icon: Zap },
            { id: 'logs', label: 'Delivery Logs', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
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

        {/* TAB 1: BROADCAST CAMPAIGN */}
        {activeTab === 'broadcast' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-8">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
                <h3 className="text-base font-bold text-[#0F172A]">Broadcast Notification Campaign</h3>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Campaign Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Notification Message</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Audience Segment Target</label>
                    <select
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900"
                    >
                      <option value="all">All Registered Candidates (14,850 Users)</option>
                      <option value="rbt">RBT Candidates Only (10,400 Users)</option>
                      <option value="inactive">Inactive &gt; 3 Days (2,100 Users)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  {bcastResult !== null && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Campaign Dispatched to {bcastResult.toLocaleString()} Candidates!</span>
                    </span>
                  )}

                  <Button onClick={handleBroadcast} variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                    <Send className="w-4 h-4" />
                    <span>Dispatch Campaign Now</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: EMAIL TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">System Email Templates</h3>
              <div className="space-y-4">
                {EMAIL_TEMPLATES.map((tpl) => (
                  <div key={tpl.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{tpl.subject}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-mono text-[10px]">
                        {tpl.templateCode}
                      </span>
                    </div>
                    <div className="text-slate-500 font-mono text-[11px] bg-slate-50 p-2 rounded-lg">{tpl.bodyHTML}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 3: AUTOMATION WORKFLOWS */}
        {activeTab === 'workflows' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">Trigger-Condition-Action Automation Rules</h3>
              <div className="space-y-4">
                {AUTOMATION_WORKFLOWS.map((wf) => (
                  <div key={wf.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{wf.name}</div>
                      <div className="text-slate-500">
                        Trigger: <span className="font-mono text-[#2563EB]">{wf.triggerEvent}</span> • Action Channel: <span className="font-bold">{wf.actionChannel.toUpperCase()}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
