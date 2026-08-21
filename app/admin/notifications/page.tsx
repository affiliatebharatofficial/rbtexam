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

type AdminTab = 'broadcast' | 'smtp' | 'templates' | 'workflows' | 'logs';

export default function AdminNotificationPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('smtp');
  const [title, setTitle] = useState('New BACB Task List Practice Questions Added!');
  const [message, setMessage] = useState('We have added 50 new RBT 3rd Edition TCO mock questions for RBT & BCBA candidates.');
  const [segment, setSegment] = useState('all');
  const [bcastResult, setBcastResult] = useState<number | null>(null);

  // SMTP Configuration State
  const [smtpProvider, setSmtpProvider] = useState<'resend' | 'smtp_relay' | 'sendgrid' | 'brevo'>('resend');
  const [smtpEnabled, setSmtpEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [smtpHost, setSmtpHost] = useState('smtp.resend.com');
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpUser, setSmtpUser] = useState('resend');
  const [smtpPass, setSmtpPass] = useState('');
  const [senderName, setSenderName] = useState('RBT Practice AI');
  const [senderEmail, setSenderEmail] = useState('verify@rbtpracticeai.com');
  const [testEmailRecipient, setTestEmailRecipient] = useState('');
  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isLoadingSmtp, setIsLoadingSmtp] = useState(false);

  const handleBroadcast = () => {
    const res = broadcastNotificationCampaign(title, message, segment);
    setBcastResult(res.count);
  };

  const handleSaveSMTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus(null);
    setIsLoadingSmtp(true);
    try {
      const res = await fetch('/api/admin/smtp/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: smtpEnabled,
          provider: smtpProvider,
          apiKey,
          host: smtpHost,
          port: smtpPort,
          username: smtpUser,
          password: smtpPass,
          senderName,
          senderEmail,
        }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        setSaveStatus('✅ SMTP & Email Delivery Settings saved successfully!');
      } else {
        setSaveStatus(`❌ Error: ${data.error || 'Failed to save SMTP settings'}`);
      }
    } catch (err: any) {
      setSaveStatus(`❌ Network error: ${err.message}`);
    } finally {
      setIsLoadingSmtp(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailRecipient || !testEmailRecipient.includes('@')) {
      setTestEmailStatus('❌ Please enter a valid test recipient email address.');
      return;
    }

    setTestEmailStatus('⏳ Dispatched test email... Waiting for delivery response...');
    try {
      const res = await fetch('/api/admin/smtp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: testEmailRecipient,
          config: {
            provider: smtpProvider,
            apiKey,
            host: smtpHost,
            port: smtpPort,
            username: smtpUser,
            password: smtpPass,
            senderName,
            senderEmail,
          },
        }),
      });
      const data = (await res.json()) as any;
      if (res.ok) {
        setTestEmailStatus(`✅ ${data.message}`);
      } else {
        setTestEmailStatus(`❌ Delivery failed: ${data.error}`);
      }
    } catch (err: any) {
      setTestEmailStatus(`❌ Test error: ${err.message}`);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
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
            { id: 'smtp', label: 'SMTP & Email Provider Setup', icon: Mail },
            { id: 'broadcast', label: 'Broadcast Campaign', icon: Send },
            { id: 'templates', label: 'Email Templates', icon: Layers },
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

        {/* TAB: SMTP & EMAIL PROVIDER SETUP */}
        {activeTab === 'smtp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-8 space-y-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">SMTP & Transactional Email Settings</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure your email dispatcher to send OTP verification codes, password resets, and candidate notifications.
                    </p>
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={smtpEnabled}
                      onChange={(e) => setSmtpEnabled(e.target.checked)}
                      className="w-4 h-4 text-[#2563EB] rounded"
                    />
                    <span className={smtpEnabled ? 'text-emerald-600' : 'text-slate-400'}>
                      {smtpEnabled ? 'SMTP Active' : 'SMTP Disabled'}
                    </span>
                  </label>
                </div>

                {saveStatus && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${saveStatus.includes('✅') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    {saveStatus}
                  </div>
                )}

                <form onSubmit={handleSaveSMTP} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Email Delivery Provider</label>
                      <select
                        value={smtpProvider}
                        onChange={(e) => setSmtpProvider(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-[#2563EB]/40"
                      >
                        <option value="resend">Resend API (Recommended - Ultra Fast Edge Delivery)</option>
                        <option value="smtp_relay">Custom SMTP Server (Host & Port)</option>
                        <option value="brevo">Brevo / SendInBlue API</option>
                        <option value="sendgrid">SendGrid API</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">API Key / Secret Token</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="re_123456789... or API key"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono text-slate-900 focus:ring-2 focus:ring-[#2563EB]/40"
                      />
                    </div>
                  </div>

                  {smtpProvider === 'smtp_relay' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">SMTP Host</label>
                        <input
                          type="text"
                          value={smtpHost}
                          onChange={(e) => setSmtpHost(e.target.value)}
                          placeholder="smtp.example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">SMTP Port</label>
                        <input
                          type="number"
                          value={smtpPort}
                          onChange={(e) => setSmtpPort(Number(e.target.value))}
                          placeholder="587"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">SMTP Username</label>
                        <input
                          type="text"
                          value={smtpUser}
                          onChange={(e) => setSmtpUser(e.target.value)}
                          placeholder="username or email"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">SMTP Password</label>
                        <input
                          type="password"
                          value={smtpPass}
                          onChange={(e) => setSmtpPass(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Sender Name (From Name)</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="RBT Practice AI"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Sender Email (From Email)</label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="verify@rbtpracticeai.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <Button type="submit" disabled={isLoadingSmtp} variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isLoadingSmtp ? 'Saving Settings...' : 'Save Email & SMTP Settings'}</span>
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Test Email Dispatch Card */}
            <div className="lg:col-span-4 space-y-6">
              <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-[#2563EB]" />
                  <span>Test Live Email Dispatch</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Send a live test verification email to any inbox to verify that SMTP delivery is working seamlessly.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Test Recipient Email</label>
                    <input
                      type="email"
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-900"
                    />
                  </div>

                  {testEmailStatus && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px] leading-relaxed break-words">
                      {testEmailStatus}
                    </div>
                  )}

                  <Button
                    onClick={handleTestEmail}
                    variant="outline"
                    size="md"
                    className="w-full gap-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Test Email</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

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
