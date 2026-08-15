'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { LanguageSelector } from '@/components/layout/language-selector';
import { UserProfileModal } from '@/components/auth/user-profile-modal';
import { Sparkles, Brain, BookOpen, Layers, BarChart2, Users, Menu, X, ArrowRight, User, LogOut, Settings, ShieldCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, isAuthenticated, logout, homeRoute } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const isAdmin = Boolean(user && (user.role === 'admin' || user.role === 'super_admin'));
  const homeLabel = isAuthenticated ? (isAdmin ? t('nav.adminCms', 'Admin Panel') : t('nav.home', 'Home')) : t('nav.home', 'Home');
  const homeIcon = isAdmin ? ShieldCheck : Brain;

  const navLinks = [
    { href: homeRoute, label: homeLabel, icon: homeIcon },
    { href: '/exam', label: t('nav.practiceQuestions', 'Practice Questions'), icon: Sparkles },
    { href: '/rbt/mock-exam', label: t('nav.mockExams', 'Mock Exams'), icon: Sparkles },
    { href: '/flashcards', label: t('nav.flashcards', 'Flashcards'), icon: Layers },
    { href: '/task-list', label: t('nav.studyGuides', 'Study Guides'), icon: BookOpen },
    { href: '/tutor', label: t('nav.aiTutor', 'AI Tutor'), icon: BookOpen },
    { href: '/pricing', label: t('nav.pricing', 'Pricing'), icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href={homeRoute} className="flex items-center space-x-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-lg font-bold text-[#0F172A] tracking-tight whitespace-nowrap">
                RBT <span className="text-[#2563EB]">Practice AI</span>
              </span>
              <span className="hidden xl:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200/60 whitespace-nowrap">
                3rd Ed BACB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#2563EB] hover:bg-slate-50 transition-colors flex items-center space-x-1.5 whitespace-nowrap"
              >
                <link.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Auth Action Area */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <LanguageSelector />

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-sm overflow-hidden">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      user.fullName.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="text-left text-xs font-semibold text-slate-800">
                    <span className="block truncate max-w-[100px]">{user.fullName.split(' ')[0]}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{user.fullName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      <div className="mt-1 flex items-center space-x-1 text-[10px] font-bold text-emerald-600">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Readiness Score: {user.readinessScore}%</span>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]"
                    >
                      <Brain className="w-4 h-4 text-slate-400" />
                      <span>Candidate Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Account Profile Settings</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await logout();
                        }}
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-xs">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm" className="gap-1.5 text-xs shadow-md shadow-blue-500/20">
                    <span>Start Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]"
            >
              <link.icon className="w-5 h-5 text-slate-400" />
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="pt-2 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Language / Idioma:</span>
            <LanguageSelector />
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="p-3 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>{user.fullName}</span>
                  <span className="text-emerald-600 font-bold">{user.readinessScore}% Ready</span>
                </div>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="outline" size="md" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <span>Start Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
}
