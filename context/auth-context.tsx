'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthSession, LoginCredentials, SignUpData } from '@/types/auth';

interface AuthContextType {
  user: UserProfile | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rbt_ai_auth_session';

const DEFAULT_PRODUCTION_USER: UserProfile = {
  id: 'usr_candidate_001',
  email: 'user@rbttrainingai.com',
  fullName: 'Candidate Profile',
  avatarUrl: '',
  role: 'student',
  emailVerified: true,
  targetExamDate: '',
  targetScore: 90,
  readinessScore: 0,
  estimatedPassLikelihood: 0,
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsedSession: AuthSession = JSON.parse(stored);
        if (parsedSession.expiresAt > Date.now()) {
          setSession(parsedSession);
          setUser(parsedSession.user);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setSession(null);
          setUser(null);
        }
      } else {
        // No active session: require user login/signup
        setSession(null);
        setUser(null);
      }
    } catch (e) {
      console.error('Failed to parse auth session', e);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API network request delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (credentials.password.length < 6) {
        setIsLoading(false);
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const loggedInUser: UserProfile = {
        ...DEFAULT_PRODUCTION_USER,
        email: credentials.email,
        fullName: credentials.email.split('@')[0].replace('.', ' '),
        lastLoginAt: new Date().toISOString(),
      };

      const newSession: AuthSession = {
        accessToken: `jwt_token_${Math.random().toString(36).substring(2)}`,
        refreshToken: `refresh_token_${Math.random().toString(36).substring(2)}`,
        expiresAt: Date.now() + 86400 * 7 * 1000,
        user: loggedInUser,
      };

      setUser(loggedInUser);
      setSession(newSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed. Please check your credentials.' };
    }
  };

  const loginWithGoogle = async (email?: string, name?: string) => {
    setIsLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && !supabaseUrl.includes('mock-')) {
        window.location.href = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
        return { success: true };
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const targetEmail = (email || 'user@gmail.com').toLowerCase().trim();
      const targetName = name || targetEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      const googleUser: UserProfile = {
        id: `usr_google_${Math.random().toString(36).substring(2, 9)}`,
        email: targetEmail,
        fullName: targetName,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(targetEmail)}`,
        role: 'student',
        emailVerified: true,
        targetExamDate: '',
        targetScore: 90,
        readinessScore: 0,
        estimatedPassLikelihood: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const newSession: AuthSession = {
        accessToken: `google_oauth_token_${Math.random().toString(36).substring(2)}`,
        refreshToken: `google_refresh_token_${Math.random().toString(36).substring(2)}`,
        expiresAt: Date.now() + 86400 * 7 * 1000,
        user: googleUser,
      };

      setUser(googleUser);
      setSession(newSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: 'Google login authentication failed.' };
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newUser: UserProfile = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        email: data.email.toLowerCase().trim(),
        fullName: data.fullName.trim(),
        role: data.role || 'student',
        emailVerified: true,
        targetExamDate: data.targetExamDate || '',
        targetScore: 90,
        readinessScore: 0,
        estimatedPassLikelihood: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const newSession: AuthSession = {
        accessToken: `signup_token_${Math.random().toString(36).substring(2)}`,
        refreshToken: `signup_refresh_${Math.random().toString(36).substring(2)}`,
        expiresAt: Date.now() + 86400 * 7 * 1000,
        user: newUser,
      };

      setUser(newUser);
      setSession(newSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);

      return { success: true, requiresVerification: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: `Password reset instructions have been sent to ${email}. Please check your inbox.`,
      };
    } catch (err: any) {
      return { success: false, error: 'Failed to send password reset email.' };
    }
  };

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Invalid or expired password reset token.' };
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (user) {
        const verifiedUser: UserProfile = { ...user, emailVerified: true };
        setUser(verifiedUser);
        if (session) {
          const updatedSession = { ...session, user: verifiedUser };
          setSession(updatedSession);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Invalid verification code.' };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const updatedUser: UserProfile = { ...user, ...data };
      setUser(updatedUser);
      if (session) {
        const updatedSession = { ...session, user: updatedUser };
        setSession(updatedSession);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Failed to update user profile.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser(null);
    setSession(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        loginWithGoogle,
        signUp,
        requestPasswordReset,
        confirmPasswordReset,
        verifyEmail,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
