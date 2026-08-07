'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Building2, UserPlus, CheckCircle2, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';

export default function ClinicPage() {
  const trainees = [
    { name: 'Sarah Jenkins', email: 's.jenkins@autismcenter.org', readiness: 94, mocks: 5, status: 'Ready' },
    { name: 'Marcus Vance', email: 'm.vance@autismcenter.org', readiness: 88, mocks: 4, status: 'Ready' },
    { name: 'Emily Rodriguez', email: 'e.rodriguez@autismcenter.org', readiness: 74, mocks: 3, status: 'Needs Support' },
    { name: 'David Kim', email: 'd.kim@autismcenter.org', readiness: 91, mocks: 6, status: 'Ready' },
    { name: 'Jessica Taylor', email: 'j.taylor@autismcenter.org', readiness: 82, mocks: 4, status: 'On Track' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Clinic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] via-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge variant="blue" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
              Enterprise B2B SaaS
            </Badge>
            <span className="text-xs text-slate-300 font-medium">Cohort ID: #AUTISM-CENTER-US-402</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Apex ABA Clinic & Training Hub</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            BCBA Supervisor Oversight Portal. Monitor trainee exam readiness, assign mock exams, and audit pass probabilities.
          </p>
        </div>

        <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/30">
          <UserPlus className="w-4 h-4" />
          <span>Invite Trainee RBT</span>
        </Button>
      </div>

      {/* Cohort High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card glass className="p-6 space-y-2 border-emerald-200 bg-emerald-50/30">
          <div className="text-xs font-bold text-slate-500">Predicted Cohort Pass Rate</div>
          <div className="text-3xl font-extrabold text-emerald-600">96.0%</div>
          <div className="text-[11px] text-emerald-700 font-semibold">4 of 5 trainees exam ready</div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-xs font-bold text-slate-500">Total Active Trainees</div>
          <div className="text-3xl font-extrabold text-slate-900">5</div>
          <div className="text-[11px] text-slate-500">Seat capacity: 15 trainees</div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-xs font-bold text-slate-500">Avg Readiness Score</div>
          <div className="text-3xl font-extrabold text-[#2563EB]">87.8 / 100</div>
          <Progress value={88} colorClass="bg-[#2563EB]" size="sm" />
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-xs font-bold text-slate-500">Supervision Log Audits</div>
          <div className="text-3xl font-extrabold text-slate-900">100%</div>
          <div className="text-[11px] text-slate-500">5% Monthly BACB Compliant</div>
        </Card>
      </div>

      {/* Trainees Progress Table */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">RBT Trainee Cohort Status</h2>
            <p className="text-xs text-slate-500">Individual student scores and weak domain alerts</p>
          </div>
          <Badge variant="slate">5 Active Trainees</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Trainee Name</th>
                <th className="py-3 px-4">Exam Readiness</th>
                <th className="py-3 px-4">Mocks Completed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {trainees.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    <div>{t.name}</div>
                    <div className="text-xs text-slate-400 font-normal">{t.email}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">
                    <div className="flex items-center space-x-3">
                      <span className="w-10 text-right">{t.readiness}%</span>
                      <Progress value={t.readiness} colorClass={t.readiness >= 85 ? 'bg-emerald-500' : 'bg-amber-500'} className="w-24" size="sm" />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">{t.mocks} Mock Exams</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        t.status === 'Ready'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'On Track'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]">
                      View Audit Log
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
