'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, ShieldCheck, Award, Calendar, Lock, CheckCircle2, RefreshCw, LogOut, Brain, Layers } from 'lucide-react';
import { UserRole } from '@/types/auth';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [targetExamDate, setTargetExamDate] = useState(user?.targetExamDate || '2026-09-15');
  const [targetScore, setTargetScore] = useState(user?.targetScore || 90);
  const [role, setRole] = useState<UserRole>(user?.role || 'student');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('');
    setIsSaving(true);

    const res = await updateProfile({
      fullName,
      targetExamDate,
      targetScore,
      role,
    });

    setIsSaving(false);
    if (res.success) {
      setSaveMessage('Profile information updated successfully!');
    }
  };

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="py-12 bg-slate-50/50 min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="blue" className="mb-2">Verified RBT Candidate Account</Badge>
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                User Profile & Account Settings
              </h1>
              <p className="text-sm text-slate-600">
                Manage your candidate details, BACB exam target dates, and security preferences.
              </p>
            </div>

            <Button onClick={logout} variant="outline" size="sm" className="gap-2 text-rose-600 border-rose-200 hover:bg-rose-50">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: User Card & Pass Guarantee Summary */}
            <div className="lg:col-span-4 space-y-6">
              <Card glass className="p-6 text-center space-y-4 border-white/90">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-extrabold text-3xl flex items-center justify-center mx-auto shadow-xl">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.fullName.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  {user.emailVerified && (
                    <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-white shadow">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{user.fullName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                </div>

                <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold border border-blue-100">
                  <Badge variant="blue">{user.role.toUpperCase()}</Badge>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3 text-left text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>BACB Readiness Score:</span>
                    <span className="font-extrabold text-emerald-600 text-sm">{user.readinessScore}%</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Estimated Pass Probability:</span>
                    <span className="font-bold text-slate-900">{user.estimatedPassLikelihood}%</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Pass Guarantee Protection:</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                </div>
              </Card>

              <Card glass className="p-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-100">
                <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                  <Award className="w-5 h-5 text-[#2563EB]" />
                  <span>100% Pass Guarantee Terms</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your candidate profile is backed by our full money-back guarantee. Pass 3 diagnostic mock exams with 85%+ readiness prior to your exam date.
                </p>
              </Card>
            </div>

            {/* Right Column: Edit Profile Form */}
            <div className="lg:col-span-8">
              <Card glass className="p-8 space-y-6 border-white/90">
                <h3 className="text-lg font-bold text-[#0F172A] pb-4 border-b border-slate-100">
                  Edit Profile Information
                </h3>

                {saveMessage && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{saveMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#2563EB]/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address (Verified)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Primary Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      >
                        <option value="student">RBT Candidate</option>
                        <option value="therapist">Behavior Technician</option>
                        <option value="clinic_admin">BCBA / Clinic Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Scheduled BACB Exam Date
                      </label>
                      <input
                        type="date"
                        value={targetExamDate}
                        onChange={(e) => setTargetExamDate(e.target.value)}
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <Button type="submit" disabled={isSaving} variant="primary" size="md" className="gap-2 px-8">
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Saving Profile...</span>
                        </>
                      ) : (
                        <span>Save Account Changes</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
