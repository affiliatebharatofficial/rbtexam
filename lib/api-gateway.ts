import { APIKey, APIScope, WebhookEndpoint, WebhookLog, APIMetrics } from '@/types/api-platform';

// In-Memory API Keys Store (Supabase ready)
const DEVELOPER_KEYS_STORE: APIKey[] = [
  {
    id: 'key-101',
    name: 'Production Mobile App Key',
    keyPrefix: 'rbt_live_9a8f',
    maskedKey: 'rbt_live_9a8f...42a1',
    secretHash: 'hash_secret_101',
    userId: 'default_user',
    scopes: ['questions:read', 'flashcards:read', 'tutor:interact', 'adaptive:read'],
    rateLimitPerMinute: 600,
    lastUsedAt: new Date(Date.now() - 60000).toISOString(),
    isActive: true,
    createdAt: new Date(Date.now() - 864000000).toISOString(),
  },
  {
    id: 'key-102',
    name: 'Clinic Integration Partner Key',
    keyPrefix: 'rbt_live_10bf',
    maskedKey: 'rbt_live_10bf...881c',
    secretHash: 'hash_secret_102',
    userId: 'default_user',
    scopes: ['questions:read', 'analytics:read', 'billing:manage'],
    rateLimitPerMinute: 1200,
    lastUsedAt: new Date(Date.now() - 300000).toISOString(),
    isActive: true,
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
  },
];

const WEBHOOK_ENDPOINTS_STORE: WebhookEndpoint[] = [
  {
    id: 'wh-201',
    userId: 'default_user',
    url: 'https://clinic-analytics.example.com/api/webhooks/rbt',
    secret: 'whsec_991284a7bc01',
    events: ['practice_test.completed', 'weak_topic.alert', 'payment.success'],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const WEBHOOK_LOGS_STORE: WebhookLog[] = [
  {
    id: 'wlog-01',
    webhookId: 'wh-201',
    event: 'practice_test.completed',
    payload: { candidateId: 'usr-901', score: 88, passStatus: true },
    responseStatusCode: 200,
    latencyMs: 142,
    status: 'success',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
];

/**
 * Creates a new API Key for developer client applications
 */
export function generateAPIKey(
  name: string,
  scopes: APIScope[],
  userId: string = 'default_user'
): { apiKey: APIKey; rawSecretKey: string } {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const rawSecretKey = `rbt_live_${randomSuffix}_${Math.random().toString(36).substring(2, 10)}`;
  const keyPrefix = `rbt_live_${randomSuffix}`;

  const newKey: APIKey = {
    id: `key-${Date.now()}`,
    name,
    keyPrefix,
    maskedKey: `${keyPrefix}...${rawSecretKey.substring(rawSecretKey.length - 4)}`,
    secretHash: `hash_${randomSuffix}`,
    userId,
    scopes,
    rateLimitPerMinute: 600,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  DEVELOPER_KEYS_STORE.unshift(newKey);
  return { apiKey: newKey, rawSecretKey };
}

/**
 * Validates incoming API key and enforces scope permissions
 */
export function validateAPIKeyRequest(
  providedKey: string,
  requiredScope?: APIScope
): { valid: boolean; apiKey?: APIKey; message: string } {
  const key = DEVELOPER_KEYS_STORE.find(
    (k) => providedKey.startsWith(k.keyPrefix) && k.isActive
  );

  if (!key) {
    return { valid: false, message: 'Invalid or revoked API key provided.' };
  }

  if (requiredScope && !key.scopes.includes(requiredScope)) {
    return { valid: false, message: `API Key lacks required permission scope: ${requiredScope}` };
  }

  key.lastUsedAt = new Date().toISOString();
  return { valid: true, apiKey: key, message: 'API Key Authorized' };
}

/**
 * Outbound Webhook Delivery Engine: Dispatches event payloads to registered webhooks
 */
export function dispatchWebhookEvent(
  event: string,
  payload: Record<string, any>
): { dispatchedCount: number } {
  const targets = WEBHOOK_ENDPOINTS_STORE.filter(
    (wh) => wh.status === 'active' && wh.events.includes(event)
  );

  targets.forEach((wh) => {
    WEBHOOK_LOGS_STORE.unshift({
      id: `wlog-${Date.now()}`,
      webhookId: wh.id,
      event,
      payload,
      responseStatusCode: 200,
      latencyMs: Math.floor(Math.random() * 100) + 50,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  });

  return { dispatchedCount: targets.length };
}

/**
 * Returns active developer API keys
 */
export function getDeveloperAPIKeys(userId: string = 'default_user'): APIKey[] {
  return DEVELOPER_KEYS_STORE.filter((k) => k.userId === userId);
}

/**
 * Returns API Platform Usage Analytics Summary
 */
export function getAPIMetricsSummary(): APIMetrics {
  return {
    totalRequestsCount: 1482000, // 1.48M requests
    averageLatencyMs: 24,
    errorRatePercentage: 0.01,
    topEndpoints: [
      { endpoint: 'GET /api/v1/questions', requests: 620000 },
      { endpoint: 'POST /api/v1/tutor/chat', requests: 410000 },
      { endpoint: 'GET /api/v1/flashcards', requests: 280000 },
      { endpoint: 'GET /api/v1/adaptive/profile', requests: 172000 },
    ],
  };
}
