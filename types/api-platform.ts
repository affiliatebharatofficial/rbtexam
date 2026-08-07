// Enterprise API Platform & Developer Ecosystem - Core Types

export type APIScope =
  | 'questions:read'
  | 'questions:write'
  | 'flashcards:read'
  | 'tutor:interact'
  | 'adaptive:read'
  | 'analytics:read'
  | 'billing:manage';

export type SDKLanguage = 'typescript' | 'python' | 'go' | 'flutter' | 'curl';

export interface APIKey {
  id: string;
  name: string;
  keyPrefix: string; // e.g. "rbt_live_9a8f..."
  maskedKey: string;
  secretHash: string;
  userId: string;
  scopes: APIScope[];
  rateLimitPerMinute: number;
  allowedOrigins?: string[];
  allowedIPs?: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
}

export interface WebhookEndpoint {
  id: string;
  userId: string;
  url: string;
  secret: string; // HMAC secret
  events: string[]; // e.g. ["user.created", "practice_test.completed"]
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  event: string;
  payload: Record<string, any>;
  responseStatusCode: number;
  latencyMs: number;
  status: 'success' | 'failed';
  timestamp: string;
}

export interface APIMetrics {
  totalRequestsCount: number;
  averageLatencyMs: number;
  errorRatePercentage: number;
  topEndpoints: { endpoint: string; requests: number }[];
}
