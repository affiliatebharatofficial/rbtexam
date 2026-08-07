import {
  SecurityThreatEvent,
  ActiveSession,
  DataSubjectRequest,
  SecurityHealthSummary,
  PrivacyRequestType,
} from '@/types/security';

const THREAT_LOGS_STORE: SecurityThreatEvent[] = [
  {
    id: 'th-101',
    eventType: 'prompt_injection',
    severity: 'high',
    sourceIp: '198.51.100.42',
    requestPath: '/api/v1/tutor/chat',
    details: 'System prompt override attempt detected ("Ignore previous instructions..."). Intercepted by Socrates AI Security Guard.',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'th-102',
    eventType: 'rate_limit_exceeded',
    severity: 'medium',
    sourceIp: '203.0.113.15',
    requestPath: '/api/v1/questions',
    details: 'Exceeded 600 req/min API rate limit. Temporary 15-minute IP cooling block applied.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

const ACTIVE_SESSIONS_STORE: ActiveSession[] = [
  {
    id: 'sess-8901',
    userId: 'default_user',
    userName: 'Candidate Alex',
    deviceInfo: 'Chrome on macOS (Macintosh)',
    ipAddress: '192.168.1.45',
    location: 'Austin, TX, USA',
    isMFAVerified: true,
    lastActiveAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sess-8902',
    userId: 'default_user',
    userName: 'Candidate Alex',
    deviceInfo: 'Safari on iPhone (iOS 17)',
    ipAddress: '172.56.21.90',
    location: 'Austin, TX, USA',
    isMFAVerified: true,
    lastActiveAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const PRIVACY_REQUESTS_STORE: DataSubjectRequest[] = [
  {
    id: 'dsr-301',
    userId: 'usr-991',
    userEmail: 'candidate@example.com',
    requestType: 'export_data',
    status: 'completed',
    requestedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

/**
 * Sanitizes input prompt against system prompt injection attacks
 */
export function sanitizeAIPromptInput(userPrompt: string): { safe: boolean; sanitizedText: string } {
  const suspiciousPatterns = [
    /ignore previous instructions/i,
    /system prompt/i,
    /you are now Dan/i,
    /jailbreak/i,
    /reveal system key/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(userPrompt)) {
      logThreatEvent('prompt_injection', 'high', '127.0.0.1', '/api/v1/tutor/chat', `Matched suspicious pattern: ${pattern}`);
      return { safe: false, sanitizedText: '[REDACTED: Malicious Prompt Structure]' };
    }
  }

  return { safe: true, sanitizedText: userPrompt };
}

/**
 * Logs a security threat event
 */
export function logThreatEvent(
  eventType: SecurityThreatEvent['eventType'],
  severity: SecurityThreatEvent['severity'],
  sourceIp: string,
  requestPath: string,
  details: string
) {
  const event: SecurityThreatEvent = {
    id: `th-${Date.now()}`,
    eventType,
    severity,
    sourceIp,
    requestPath,
    details,
    timestamp: new Date().toISOString(),
  };

  THREAT_LOGS_STORE.unshift(event);
}

/**
 * Revokes an active user session
 */
export function revokeUserSession(sessionId: string) {
  const index = ACTIVE_SESSIONS_STORE.findIndex((s) => s.id === sessionId);
  if (index !== -1) {
    ACTIVE_SESSIONS_STORE.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Submits a GDPR / CCPA Data Subject Request (Data Export or Account Erasure)
 */
export function submitDataSubjectRequest(
  userEmail: string,
  requestType: PrivacyRequestType,
  userId: string = 'default_user'
): DataSubjectRequest {
  const req: DataSubjectRequest = {
    id: `dsr-${Date.now()}`,
    userId,
    userEmail,
    requestType,
    status: 'pending',
    requestedAt: new Date().toISOString(),
  };

  PRIVACY_REQUESTS_STORE.unshift(req);
  return req;
}

/**
 * Returns Security Health Summary Metrics
 */
export function getSecurityHealthSummary(): SecurityHealthSummary {
  return {
    overallSecurityScore: 99.8,
    activeSessionsCount: ACTIVE_SESSIONS_STORE.length,
    threatsBlockedMonthly: 1420,
    promptInjectionMitigationRate: 100,
    mfaAdoptionPercentage: 84.5,
    pendingPrivacyRequestsCount: PRIVACY_REQUESTS_STORE.filter((r) => r.status === 'pending').length,
  };
}

export function getThreatLogs(): SecurityThreatEvent[] {
  return [...THREAT_LOGS_STORE];
}

export function getActiveSessions(): ActiveSession[] {
  return [...ACTIVE_SESSIONS_STORE];
}

export function getPrivacyRequests(): DataSubjectRequest[] {
  return [...PRIVACY_REQUESTS_STORE];
}
