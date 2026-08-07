'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthSession, LoginCredentials, SignUpData } from '@/types/auth';

interface AuthContextType {
  user: UserProfile | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rbt_ai_auth_session';

const MOCK_DEMO_USER: UserProfile = {
  id: 'usr_rbt_2026_8891',
  email: 'candidate@rbttraining.ai',
  fullName: 'Sarah Jenkins',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  role: 'student',
  emailVerified: true,
  targetExamDate: '2026-09-15',
  targetScore: 90,
  readinessScore: 88,
  estimatedPassLikelihood: 94,
  clinicName: 'Apex Autism Care Center',
  createdAt: '2026-05-10T08:00:00.000Z',
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
        }
      } else {
        // Default demo session for smooth preview if not logged out explicitly
        const defaultSession: AuthSession = {
          accessToken: 'mock_jwt_access_token_2026',
          refreshToken: 'mock_jwt_refresh_token_2026',
          expiresAt: Date.now() + 86400 * 7 * 1000,
          user: MOCK_DEMO_USER,
        };
        setSession(defaultSession);
        setUser(MOCK_DEMO_USER);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultSession));
      }
    } catch (e) {
      console.error('Failed to parse auth session', e);
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
        ...MOCK_DEMO_USER,
        email: credentials.email,
        fullName: credentials.email.split('@')[0].replace('.', ' ').toUpperCase(),
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

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const googleUser: UserProfile = {
        id: `usr_google_${Math.random().toString(36).substring(2, 9)}`,
        email: 'alex.morgan@gmail.com',
        fullName: 'Alex Morgan',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'student',
        emailVerified: true,
        targetExamDate: '2026-10-01',
        targetScore: 92,
        readinessScore: 82,
        estimatedPassLikelihood: 89,
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: UserProfile = {
        id: `usr_new_${Math.random().toString(36).substring(2, 9)}`,
        email: data.email,
        fullName: data.fullName,
        role: data.role || 'student',
        emailVerified: false, // Requires email verification
        targetExamDate: data.targetExamDate || '2026-09-30',
        targetScore: 90,
        readinessScore: 45, // Baseline score
        estimatedPassLikelihood: 50,
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
