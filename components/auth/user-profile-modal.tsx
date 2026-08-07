'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, User, Mail, Calendar, Award, ShieldCheck, Check, RefreshCw, LogOut } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, updateProfile, logout } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [targetExamDate, setTargetExamDate] = useState(user?.targetExamDate || '2026-09-15');
  const [targetScore, setTargetScore] = useState(user?.targetScore || 90);
  const [role, setRole] = useState<UserRole>(user?.role || 'student');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await updateProfile({
      fullName,
      targetExamDate,
      targetScore,
      role,
    });

    setIsSaving(false);
    if (res.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg relative">
        <Card glass className="p-6 sm:p-8 shadow-2xl border-white/90 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.fullName.substring(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">{user.fullName}</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{user.email}</span>
                  {user.emailVerified && (
                    <span className="inline-flex items-center space-x-0.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#2563EB]/40 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="student">RBT Candidate</option>
                  <option value="therapist">Behavior Technician</option>
                  <option value="clinic_admin">BCBA / Clinic Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Exam Date
                </label>
                <input
                  type="date"
                  value={targetExamDate}
                  onChange={(e) => setTargetExamDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#2563EB]">Pass Readiness Rating</div>
                <div className="text-slate-600 font-medium">Domain A-F Accuracy Weight</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-emerald-600">{user.readinessScore}% Ready</div>
                <div className="text-[10px] text-slate-400 font-bold">100% Pass Guaranteed</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center space-x-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

              <Button type="submit" disabled={isSaving} variant="primary" size="md" className="gap-2">
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved Changes!</span>
                  </>
                ) : (
                  <span>Save Profile</span>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
