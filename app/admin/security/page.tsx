'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getSecurityHealthSummary,
  getThreatLogs,
  getActiveSessions,
  getPrivacyRequests,
  revokeUserSession,
} from '@/lib/security-engine';
import { ActiveSession, SecurityThreatEvent, DataSubjectRequest } from '@/types/security';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  Users,
  Eye,
  Trash2,
  Download,
  CheckCircle2,
  Zap,
  Layers,
  Sparkles,
  Server,
  Activity,
} from 'lucide-react';

type SecTab = 'threats' | 'sessions' | 'privacy' | 'rbac';

export default function AdminSecurityCenterPage() {
  const [activeTab, setActiveTab] = useState<SecTab>('threats');
  const [sessions, setSessions] = useState<ActiveSession[]>(getActiveSessions());
  const threatLogs = getThreatLogs();
  const privacyRequests = getPrivacyRequests();
  const summary = getSecurityHealthSummary();

  const handleRevokeSession = (id: string) => {
    revokeUserSession(id);
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Trust Security Architecture</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Security Center & Compliance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Real-time threat protection, session management, prompt injection defense, and GDPR/CCPA privacy governance.
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

        {/* TOP KPI SCORECARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Security Health Score</div>
            <div className="text-3xl font-black text-emerald-600">{summary.overallSecurityScore}%</div>
            <div className="text-[10px] text-emerald-700 font-extrabold">Zero Critical Vulnerabilities</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Threats Blocked (Monthly)</div>
            <div className="text-3xl font-black text-slate-900">{summary.threatsBlockedMonthly.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-mono">100% Rate Limit Enforcement</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">Prompt Injection Mitigation</div>
            <div className="text-3xl font-black text-[#2563EB]">{summary.promptInjectionMitigationRate}%</div>
            <div className="text-[10px] text-slate-400 font-mono">Socrates AI Firewall Active</div>
          </Card>

          <Card glass className="p-5 space-y-2 border-white/90 shadow-xl">
            <div className="text-xs font-bold text-slate-500">MFA Adoption Rate</div>
            <div className="text-3xl font-black text-indigo-600">{summary.mfaAdoptionPercentage}%</div>
            <div className="text-[10px] text-slate-400 font-mono">2FA Authenticator & OTP</div>
          </Card>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'threats', label: 'Threat & Anomaly Stream', icon: AlertTriangle },
            { id: 'sessions', label: 'Active User Sessions', icon: Users },
            { id: 'privacy', label: 'Privacy (GDPR / CCPA)', icon: ShieldCheck },
            { id: 'rbac', label: 'Role Permission Matrix', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SecTab)}
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

        {/* TAB 1: THREAT & ANOMALY STREAM */}
        {activeTab === 'threats' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">Real-Time Threat Detection Stream</h3>
              <div className="space-y-3">
                {threatLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 font-bold text-slate-900">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase text-[10px]">
                          {log.severity}
                        </span>
                        <span>{log.eventType.replace('_', ' ').toUpperCase()}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{log.details}</p>
                    </div>

                    <div className="text-right text-[11px] text-slate-400 font-mono">
                      <div>IP: {log.sourceIp}</div>
                      <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: ACTIVE USER SESSIONS */}
        {activeTab === 'sessions' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">Active Concurrent User Sessions</h3>
              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div key={sess.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{sess.userName}</div>
                      <div className="text-slate-500">{sess.deviceInfo} • {sess.location}</div>
                      <div className="text-[10px] text-slate-400 font-mono">IP: {sess.ipAddress} • MFA: {sess.isMFAVerified ? 'Verified' : 'Pending'}</div>
                    </div>

                    <Button onClick={() => handleRevokeSession(sess.id)} variant="outline" size="sm" className="text-xs text-rose-600 border-rose-200">
                      Revoke Session
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 3: PRIVACY & DATA GOVERNANCE */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A]">GDPR / CCPA Data Subject Requests Queue</h3>
              <div className="space-y-3">
                {privacyRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{req.userEmail}</div>
                      <div className="text-slate-500">Request Type: <span className="font-bold uppercase text-[#2563EB]">{req.requestType}</span></div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {req.status.toUpperCase()}
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
