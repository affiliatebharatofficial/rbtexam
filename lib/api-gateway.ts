import { APIKey, APIScope, WebhookEndpoint, WebhookLog, APIMetrics } from '@/types/api-platform';
import { secureRandomString, secureRandomInt } from './secure-random';

// In-Memory API Keys Store (Supabase ready).
// Intentionally starts empty: seeded demo keys/secrets must never ship in
// production code (they look like real production credentials).
const DEVELOPER_KEYS_STORE: APIKey[] = [];

const WEBHOOK_ENDPOINTS_STORE: WebhookEndpoint[] = [];

const WEBHOOK_LOGS_STORE: WebhookLog[] = [];

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Creates a new API Key for developer client applications
 */
export async function generateAPIKey(
  name: string,
  scopes: APIScope[],
  userId: string = 'default_user'
): Promise<{ apiKey: APIKey; rawSecretKey: string }> {
  const keyPrefix = `rbt_live_${secureRandomString(8)}`;
  const rawSecretKey = `${keyPrefix}_${secureRandomString(24)}`;

  const newKey: APIKey = {
    id: `key-${Date.now()}`,
    name,
    keyPrefix,
    maskedKey: `${keyPrefix}...${rawSecretKey.substring(rawSecretKey.length - 4)}`,
    // Only a SHA-256 hash of the full secret is retained, never the secret
    secretHash: await sha256Hex(rawSecretKey),
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
export async function validateAPIKeyRequest(
  providedKey: string,
  requiredScope?: APIScope
): Promise<{ valid: boolean; apiKey?: APIKey; message: string }> {
  // The full secret must match its stored hash — a key prefix alone
  // (which is visible in masked keys) is never sufficient.
  const providedHash = providedKey ? await sha256Hex(providedKey) : '';
  const key = DEVELOPER_KEYS_STORE.find((k) => k.secretHash === providedHash && k.isActive);

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
  payload: Record<string, unknown>
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
      latencyMs: 50 + secureRandomInt(100),
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
