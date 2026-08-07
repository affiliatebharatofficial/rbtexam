// Enterprise Security, Privacy & Compliance Engine - Core Types

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export type PrivacyRequestType = 'export_data' | 'delete_account' | 'opt_out';

export type PrivacyRequestStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface SecurityThreatEvent {
  id: string;
  eventType: 'prompt_injection' | 'brute_force' | 'rate_limit_exceeded' | 'invalid_jwt' | 'csrf_attempt';
  severity: ThreatSeverity;
  sourceIp: string;
  userId?: string;
  requestPath: string;
  details: string;
  timestamp: string;
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  deviceInfo: string;
  ipAddress: string;
  location: string;
  isMFAVerified: boolean;
  lastActiveAt: string;
  createdAt: string;
}

export interface PrivacyConsentRecord {
  userId: string;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  necessaryCookies: boolean;
  updatedAt: string;
}

export interface DataSubjectRequest {
  id: string;
  userId: string;
  userEmail: string;
  requestType: PrivacyRequestType;
  status: PrivacyRequestStatus;
  requestedAt: string;
  completedAt?: string;
}

export interface SecurityHealthSummary {
  overallSecurityScore: number; // e.g. 99.8%
  activeSessionsCount: number;
  threatsBlockedMonthly: number;
  promptInjectionMitigationRate: number; // 100%
  mfaAdoptionPercentage: number;
  pendingPrivacyRequestsCount: number;
}
