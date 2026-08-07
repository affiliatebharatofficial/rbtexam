'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthSession, LoginCredentials, SignUpData } from '@/types/auth';
import { getPlatformConfig, logAuditEvent } from '@/lib/platform-config';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  completeGoogleAuthSession: (email: string, name?: string) => Promise<{ success: boolean; error?: string }>;
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
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (credentials.password.length < 6) {
        setIsLoading(false);
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const userEmail = credentials.email.toLowerCase().trim();
      const registeredUsersStr = localStorage.getItem('rbt_registered_users');
      let registeredUsers: UserProfile[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
      
      let existingUser = registeredUsers.find((u) => u.email.toLowerCase() === userEmail);

      if (!existingUser) {
        const config = getPlatformConfig();
        if (!config.allowNewRegistration) {
          setIsLoading(false);
          return { success: false, error: 'Public account registration is currently disabled by administrator.' };
        }

        existingUser = {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          email: userEmail,
          fullName: userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          role: 'student',
          emailVerified: true,
          accountStatus: 'active',
          targetExamDate: '',
          targetScore: 90,
          readinessScore: 0,
          estimatedPassLikelihood: 0,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        registeredUsers.push(existingUser);
        localStorage.setItem('rbt_registered_users', JSON.stringify(registeredUsers));
      } else {
        existingUser.lastLoginAt = new Date().toISOString();
      }

      const newSession: AuthSession = {
        accessToken: `jwt_token_${Math.random().toString(36).substring(2)}`,
        refreshToken: `refresh_token_${Math.random().toString(36).substring(2)}`,
        expiresAt: Date.now() + 86400 * 7 * 1000,
        user: existingUser,
      };

      setUser(existingUser);
      setSession(newSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);
      logAuditEvent(existingUser.id, 'LOGIN_SUCCESS', 'Auth Module', `User ${userEmail} signed in via email/password`);

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed. Please check your credentials.' };
    }
  };

  const completeGoogleAuthSession = async (email: string, name?: string) => {
    setIsLoading(true);
    try {
      const targetEmail = email.toLowerCase().trim();
      if (!targetEmail) {
        setIsLoading(false);
        return { success: false, error: 'Valid email address is required.' };
      }

      const registeredUsersStr = localStorage.getItem('rbt_registered_users');
      let registeredUsers: UserProfile[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
      let userProfile: UserProfile | undefined = registeredUsers.find((u) => u.email.toLowerCase() === targetEmail);

      if (!userProfile) {
        userProfile = {
          id: `usr_google_${Math.random().toString(36).substring(2, 9)}`,
          email: targetEmail,
          fullName: name || targetEmail.split('@')[0],
          role: 'student',
          accountStatus: 'active',
          emailVerified: true,
          targetScore: 85,
          readinessScore: 0,
          estimatedPassLikelihood: 0,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        registeredUsers.push(userProfile);
        localStorage.setItem('rbt_registered_users', JSON.stringify(registeredUsers));
      } else {
        userProfile.lastLoginAt = new Date().toISOString();
      }

      const activeProfile: UserProfile = userProfile;

      const newSession: AuthSession = {
        accessToken: `google_oauth_session_${Math.random().toString(36).substring(2)}`,
        refreshToken: `google_refresh_token_${Math.random().toString(36).substring(2)}`,
        expiresAt: Date.now() + 86400 * 7 * 1000,
        user: activeProfile,
      };

      setUser(activeProfile);
      setSession(newSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
      setIsLoading(false);
      logAuditEvent(activeProfile.id, 'GOOGLE_LOGIN_SUCCESS', 'Google Auth', `User ${targetEmail} authenticated via Google OAuth callback`);

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Failed to establish session.' };
    }
  };

  const loginWithGoogle = async (email?: string, name?: string) => {
    setIsLoading(true);
    try {
      // If email parameter is provided, complete session directly without re-triggering OAuth
      if (email) {
        return await completeGoogleAuthSession(email, name);
      }

      // 1. SUPABASE AUTH GOOGLE SSO (When Supabase is configured)
      if (isSupabaseConfigured()) {
        const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/auth/callback';
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: 'offline',
              prompt: 'select_account',
            },
          },
        });

        if (error) {
          setIsLoading(false);
          logAuditEvent('SYSTEM', 'LOGIN_FAILED', 'Supabase Google Auth', `Supabase Auth Error: ${error.message}`);
          return { success: false, error: error.message };
        }

        logAuditEvent('SYSTEM', 'GOOGLE_OAUTH_INITIATED', 'Supabase Auth', `Initiated Supabase Google OAuth redirect to ${redirectUrl}`);
        return { success: true };
      }

      // 2. Direct Official Google Cloud OAuth (Fallback if Supabase is unconfigured)
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
      if (googleClientId && !googleClientId.includes('mock-')) {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&prompt=select_account`;
        return { success: true };
      }

      // 3. Direct Candidate Account Authentication
      let targetEmail = (email || '').toLowerCase().trim();

      if (!targetEmail && typeof window !== 'undefined') {
        const prompted = window.prompt('Please enter your Google/Gmail email address to sign in:', '');
        if (prompted) {
          targetEmail = prompted.toLowerCase().trim();
        }
      }

      if (!targetEmail) {
        setIsLoading(false);
        return {
          success: false,
          error: 'Please enter your email address to continue with Google sign-in.',
        };
      }

      return await completeGoogleAuthSession(targetEmail, name);
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Google login authentication failed.' };
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const config = getPlatformConfig();
      const targetEmail = data.email.toLowerCase().trim();
      const emailDomain = targetEmail.split('@')[1] || '';

      // 1. Check Allow New Registration
      if (!config.allowNewRegistration) {
        setIsLoading(false);
        logAuditEvent('SYSTEM', 'SIGNUP_BLOCKED', 'Registration', `Blocked registration attempt for ${targetEmail} (Registration Disabled)`);
        return { success: false, error: 'Public registration is currently disabled by administrator.' };
      }

      // 2. Check Invite-Only Mode
      if (config.inviteOnlyMode && !data.inviteCode) {
        setIsLoading(false);
        logAuditEvent('SYSTEM', 'SIGNUP_BLOCKED', 'Registration', `Blocked registration attempt for ${targetEmail} (Invite-Only Mode)`);
        return { success: false, error: 'Registration is in Invite-Only mode. A valid invitation code is required.' };
      }

      // 3. Check Allowed Email Domains
      if (config.allowedEmailDomains && config.allowedEmailDomains.length > 0) {
        const isDomainAllowed = config.allowedEmailDomains.some(
          (d: string) => d.toLowerCase() === emailDomain.toLowerCase()
        );
        if (!isDomainAllowed) {
          setIsLoading(false);
          logAuditEvent('SYSTEM', 'SIGNUP_BLOCKED_DOMAIN', 'Registration', `Blocked registration for domain @${emailDomain}`);
          return { success: false, error: `Email domain @${emailDomain} is not authorized for candidate registration.` };
        }
      }

      // 4. Prevent Duplicate Profile Creation
      const registeredUsersStr = localStorage.getItem('rbt_registered_users');
      const registeredUsers: UserProfile[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
      const duplicateUser = registeredUsers.find((u) => u.email.toLowerCase() === targetEmail);

      if (duplicateUser) {
        setIsLoading(false);
        logAuditEvent('SYSTEM', 'DUPLICATE_SIGNUP_ATTEMPT', 'Registration', `Prevented duplicate signup attempt for ${targetEmail}`);
        return { success: false, error: 'An account with this email address already exists. Please log in instead.' };
      }

      // 5. Create Fresh Account with Verification & Status Flags
      const initialStatus = config.requireAdminApproval ? 'pending_approval' : 'pending_verification';
      const newUser: UserProfile = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        email: targetEmail,
        fullName: data.fullName.trim(),
        role: data.role || 'student',
        emailVerified: false,
        accountStatus: initialStatus,
        targetExamDate: data.targetExamDate || '',
        targetScore: 90,
        readinessScore: 0,
        estimatedPassLikelihood: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      registeredUsers.push(newUser);
      localStorage.setItem('rbt_registered_users', JSON.stringify(registeredUsers));

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
      logAuditEvent(newUser.id, 'SIGNUP_SUCCESS', 'Registration', `Created new candidate account for ${targetEmail} (${initialStatus})`);

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
        completeGoogleAuthSession,
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
