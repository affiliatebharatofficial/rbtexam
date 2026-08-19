'use client';

import React, { useEffect } from 'react';
import { useAuth, isEmailAdmin } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { Brain, RefreshCw } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, requireAdmin = false, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      if (requireAdmin) {
        const isAdmin = user?.role === 'admin' || user?.role === 'super_admin' || isEmailAdmin(user?.email);
        if (!isAdmin) {
          router.push('/dashboard');
          return;
        }
      }

      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = user?.role || 'student';
        const isExemptAdmin = isEmailAdmin(user?.email);
        if (!isExemptAdmin && !allowedRoles.includes(userRole)) {
          router.push('/dashboard');
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requireAdmin, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 animate-pulse">
          <Brain className="w-7 h-7" />
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
          <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
          <span>Verifying BACB Authentication Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin) {
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
    if (!isAdmin) {
      return null;
    }
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role || 'student';
    if (!allowedRoles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}
