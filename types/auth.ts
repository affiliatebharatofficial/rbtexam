// Types definition for Auth Module in RBT Practice Questions

export type UserRole = 'student' | 'therapist' | 'clinic_admin' | 'instructor' | 'admin' | 'super_admin';

export type AccountStatus = 'active' | 'pending_verification' | 'pending_approval' | 'suspended';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  emailVerified: boolean;
  accountStatus?: AccountStatus;
  targetExamDate?: string;
  targetScore: number;
  readinessScore: number;
  estimatedPassLikelihood: number;
  clinicId?: string;
  clinicName?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserProfile;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  role?: UserRole;
  targetExamDate?: string;
  inviteCode?: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ConfirmResetPasswordData {
  token: string;
  newPassword: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}
