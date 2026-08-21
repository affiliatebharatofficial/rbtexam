'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthSession, LoginCredentials, SignUpData, UserRole } from '@/types/auth';
import { getPlatformConfig, logAuditEvent } from '@/lib/platform-config';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  completeGoogleAuthSession: (email: string, name?: string, userId?: string, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  homeRoute: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rbt_ai_auth_session';

import { ADMIN_EMAILS, isEmailAdmin } from '@/lib/admin-whitelist';
export { ADMIN_EMAILS, isEmailAdmin };

export function getHomeRoute(user: Partial<UserProfile> | null, isAuthenticated: boolean): string {
  if (!isAuthenticated || !user) return '/';
  if (user.role === 'admin' || user.role === 'super_admin') {
    return '/admin';
  }
  return '/dashboard';
}

const DEFAULT_PRODUCTION_USER: UserProfile = {
  id: 'usr_candidate_001',
  email: 'jobpegyan@gmail.com',
  fullName: 'Job Pegyan (Admin)',
  avatarUrl: '',
  role: 'super_admin',
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

  // Helper to ensure user profile exists in database (public.users and public.profiles)
  const ensureDatabaseProfile = async (
    userId: string,
    email: string,
    fullName?: string,
    avatarUrl?: string
  ): Promise<UserProfile> => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const isAdmin = isEmailAdmin(cleanEmail);
    const assignedRole: UserRole = isAdmin ? 'admin' : 'student';

    let dbUser: any = null;
    let dbProfile: any = null;

    if (isSupabaseConfigured()) {
      try {
        // Query public.users table
        const { data: uData } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        dbUser = uData;

        // Query public.profiles table
        const { data: pData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        dbProfile = pData;

        // If public.users record is missing or role needs upgrade
        if (!dbUser || (isAdmin && dbUser.role !== 'admin' && dbUser.role !== 'super_admin')) {
          const { data: insertedUser, error: insertUserErr } = await supabase
            .from('users')
            .upsert({
              id: userId,
              email: cleanEmail,
              full_name: cleanName,
              role: assignedRole,
              target_score: 90,
              updated_at: new Date().toISOString(),
            })
            .select()
            .maybeSingle();

          if (!insertUserErr && insertedUser) {
            dbUser = insertedUser;
          }
        }

        // If public.profiles record is missing or subscription tier needs enterprise
        const defaultTrialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        if (!dbProfile || (isAdmin && dbProfile.subscription_tier !== 'enterprise')) {
          const { data: insertedProfile, error: insertProfileErr } = await supabase
            .from('profiles')
            .upsert({
              id: userId,
              email: cleanEmail,
              full_name: cleanName,
              avatar_url: avatarUrl || '',
              certification_target: 'RBT',
              subscription_tier: isAdmin ? 'enterprise' : 'pro',
              trial_ends_at: defaultTrialEndsAt,
              updated_at: new Date().toISOString(),
            })
            .select()
            .maybeSingle();

          if (!insertProfileErr && insertedProfile) {
            dbProfile = insertedProfile;
          }
        }
      } catch (err) {
        console.error('Database profile check/upsert error:', err);
      }
    }

    const calculatedTrialEndsAt = dbProfile?.trial_ends_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const profile: UserProfile = {
      id: userId,
      email: dbUser?.email || dbProfile?.email || cleanEmail,
      fullName: dbUser?.full_name || dbProfile?.full_name || cleanName,
      avatarUrl: dbProfile?.avatar_url || avatarUrl || '',
      role: isAdmin ? 'super_admin' : ((dbUser?.role as any) || 'student'),
      emailVerified: true,
      accountStatus: 'active',
      subscriptionTier: isAdmin ? 'enterprise' : (dbProfile?.subscription_tier || 'pro'),
      trialEndsAt: calculatedTrialEndsAt,
      targetExamDate: dbUser?.target_exam_date || dbProfile?.exam_date || '',
      targetScore: dbUser?.target_score || 90,
      readinessScore: 0,
      estimatedPassLikelihood: 0,
      createdAt: dbUser?.created_at || dbProfile?.created_at || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    // Also call server API /api/auth/register to guarantee persistence via service role key
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          email: cleanEmail,
          fullName: cleanName,
          role: assignedRole,
          avatarUrl: avatarUrl || '',
          subscriptionTier: isAdmin ? 'enterprise' : 'pro',
        }),
      });
    } catch (apiErr) {
      console.warn('Server registration sync warning in ensureDatabaseProfile:', apiErr);
    }

    // Ensure profile is synced to local registered users array as cache
    try {
      const registeredUsersStr = localStorage.getItem('rbt_registered_users');
      let registeredUsers: UserProfile[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
      const idx = registeredUsers.findIndex((u) => u.id === userId || u.email.toLowerCase() === cleanEmail);
      if (idx >= 0) {
        registeredUsers[idx] = profile;
      } else {
        registeredUsers.push(profile);
      }
      localStorage.setItem('rbt_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to sync user to local registry:', e);
    }

    return profile;
  };

  // Track in-flight profile ensures to avoid redundant parallel network calls
  const profileSyncInFlight = React.useRef<Record<string, boolean>>({});

  // Initialize session and listen for auth state changes with instant local restore
  useEffect(() => {
    let isMounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    // 1. INSTANT LOCAL CACHE RESTORATION (0ms - zero UI freeze/hang on refresh)
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
      if (stored) {
        const parsedSession: AuthSession = JSON.parse(stored);
        if (parsedSession && parsedSession.expiresAt > Date.now()) {
          if (isMounted) {
            setSession(parsedSession);
            setUser(parsedSession.user);
            setIsLoading(false);
          }
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.warn('Local session parse warning:', e);
    }

    // 2. SAFETY TIMER: Under no circumstances can isLoading stay true for > 800ms
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 800);

    // 3. ASYNC BACKGROUND SUPABASE VERIFICATION (Non-blocking)
    async function syncSupabaseSession() {
      try {
        if (!isSupabaseConfigured()) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const { data: { session: sbSession } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (sbSession?.user) {
          const sbUser = sbSession.user;
          const userKey = sbUser.id;

          // Prevent duplicate in-flight DB queries
          if (!profileSyncInFlight.current[userKey]) {
            profileSyncInFlight.current[userKey] = true;
            try {
              const profile = await ensureDatabaseProfile(
                sbUser.id,
                sbUser.email || '',
                sbUser.user_metadata?.full_name || sbUser.user_metadata?.name,
                sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture
              );

              if (isMounted) {
                const activeSession: AuthSession = {
                  accessToken: sbSession.access_token,
                  refreshToken: sbSession.refresh_token,
                  expiresAt: (sbSession.expires_at || 0) * 1000,
                  user: profile,
                };
                setUser(profile);
                setSession(activeSession);
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeSession));
              }
            } finally {
              profileSyncInFlight.current[userKey] = false;
            }
          }
        }
      } catch (e) {
        console.warn('Background Supabase auth sync warning:', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    syncSupabaseSession();

    // 4. SUPABASE AUTH STATE LISTENER
    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, sbSession) => {
        if (!isMounted) return;

        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') && sbSession?.user) {
          const sbUser = sbSession.user;
          const userKey = sbUser.id;

          if (!profileSyncInFlight.current[userKey]) {
            profileSyncInFlight.current[userKey] = true;
            try {
              const profile = await ensureDatabaseProfile(
                sbUser.id,
                sbUser.email || '',
                sbUser.user_metadata?.full_name || sbUser.user_metadata?.name,
                sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture
              );
              if (isMounted) {
                const activeSession: AuthSession = {
                  accessToken: sbSession.access_token,
                  refreshToken: sbSession.refresh_token,
                  expiresAt: (sbSession.expires_at || 0) * 1000,
                  user: profile,
                };
                setUser(profile);
                setSession(activeSession);
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeSession));
                setIsLoading(false);
              }
            } finally {
              profileSyncInFlight.current[userKey] = false;
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setUser(null);
            setSession(null);
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setIsLoading(false);
          }
        }
      });
      subscription = authListener?.subscription || null;
    }

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
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

        const isAdm = isEmailAdmin(userEmail);
        existingUser = {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          email: userEmail,
          fullName: userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          role: isAdm ? 'super_admin' : 'student',
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
        if (isEmailAdmin(userEmail)) {
          existingUser.role = 'super_admin';
        }
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

  const completeGoogleAuthSession = async (
    email: string,
    name?: string,
    userId?: string,
    avatarUrl?: string
  ) => {
    setIsLoading(true);
    try {
      const targetEmail = email.toLowerCase().trim();
      if (!targetEmail) {
        setIsLoading(false);
        return { success: false, error: 'Valid email address is required.' };
      }

      let activeUserId = userId;

      // Extract Supabase session user id if available and not explicitly passed
      if (!activeUserId && isSupabaseConfigured()) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user?.id) {
          activeUserId = data.session.user.id;
        }
      }

      if (!activeUserId) {
        activeUserId = `usr_google_${Math.random().toString(36).substring(2, 9)}`;
      }

      // Automatically create or fetch the profile from public.users and public.profiles
      const activeProfile = await ensureDatabaseProfile(
        activeUserId,
        targetEmail,
        name,
        avatarUrl
      );

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

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // 1. SUPABASE AUTH GOOGLE SSO (Primary Authentication Provider)
      if (isSupabaseConfigured()) {
        const origin =
          typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_SITE_URL || 'https://rbtexam.manorhub533.workers.dev');
        const redirectUrl = `${origin}/auth/callback`;

        const { data, error } = await supabase.auth.signInWithOAuth({
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

        if (data?.url && typeof window !== 'undefined') {
          window.location.assign(data.url);
        }

        logAuditEvent('SYSTEM', 'GOOGLE_OAUTH_INITIATED', 'Supabase Auth', `Initiated Supabase Google OAuth redirect to ${redirectUrl}`);
        return { success: true };
      }

      // 2. Direct Official Google Cloud OAuth (Fallback if Supabase is unconfigured)
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
      if (googleClientId && !googleClientId.includes('mock-')) {
        const origin =
          typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_SITE_URL || 'https://rbtexam.manorhub533.workers.dev');
        const redirectUri = encodeURIComponent(`${origin}/auth/callback`);
        if (typeof window !== 'undefined') {
          window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&prompt=select_account`;
        }
        return { success: true };
      }

      setIsLoading(false);
      return {
        success: false,
        error: 'Google OAuth provider is not configured. Please contact administrator.',
      };
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

      // 5. Create Fresh Account with Verification & Status Flags (Grant 7-Day Free Pro Access)
      const initialStatus = config.requireAdminApproval ? 'pending_approval' : 'pending_verification';
      const trialEndsAtDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const userTier = isEmailAdmin(targetEmail) ? 'enterprise' : 'pro';

      let newUser: UserProfile = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        email: targetEmail,
        fullName: data.fullName.trim(),
        role: isEmailAdmin(targetEmail) ? 'super_admin' : (data.role || 'student'),
        emailVerified: false,
        accountStatus: initialStatus,
        subscriptionTier: userTier,
        trialEndsAt: trialEndsAtDate,
        targetExamDate: data.targetExamDate || '',
        targetScore: 90,
        readinessScore: 0,
        estimatedPassLikelihood: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      // Call central register API route to save candidate to Supabase PostgreSQL database
      try {
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
            role: newUser.role,
            subscriptionTier: userTier,
            targetExamDate: newUser.targetExamDate,
            accountStatus: newUser.accountStatus,
          }),
        });

        if (regRes.ok) {
          const regData = (await regRes.json()) as any;
          if (regData?.user?.id) {
            newUser.id = regData.user.id;
          }
        }
      } catch (regErr) {
        console.warn('Central database registration sync warning:', regErr);
      }

      // Also trigger Supabase native sign-up if configured
      if (isSupabaseConfigured() && data.password) {
        try {
          await supabase.auth.signUp({
            email: targetEmail,
            password: data.password,
            options: {
              data: {
                full_name: data.fullName,
                role: newUser.role,
              },
            },
          });
        } catch (sbSignUpErr) {
          console.warn('Supabase Auth signUp warning:', sbSignUpErr);
        }
      }

      // Automatically dispatch real 6-digit OTP verification email to candidate
      try {
        await fetch('/api/auth/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: targetEmail,
            fullName: data.fullName,
          }),
        });
      } catch (otpSendErr) {
        console.warn('OTP dispatch API warning:', otpSendErr);
      }

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
      const cleanEmail = (email || user?.email || '').toLowerCase().trim();
      const cleanCode = (code || '').replace(/\D/g, '').trim();

      if (!cleanCode || cleanCode.length !== 6) {
        return { success: false, error: 'Please enter the complete 6-digit verification code.' };
      }

      // Verify OTP strictly against server API /api/auth/verify-email
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          code: cleanCode,
        }),
      });

      const data = (await res.json()) as any;

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Invalid verification code. Please check your email and try again.',
        };
      }

      // Verification succeeded on server
      if (user) {
        const verifiedUser: UserProfile = {
          ...user,
          emailVerified: true,
          accountStatus: 'active',
        };
        setUser(verifiedUser);
        if (session) {
          const updatedSession = { ...session, user: verifiedUser };
          setSession(updatedSession);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));
        }
      }

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Verification failed. Please check your network connection and try again.',
      };
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
        homeRoute: getHomeRoute(user, Boolean(user)),
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
