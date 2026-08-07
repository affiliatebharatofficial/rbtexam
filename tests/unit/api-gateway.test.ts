/**
 * Unit Tests — API Gateway (lib/api-gateway.ts)
 */

import { describe, it, expect } from 'vitest';
import {
  generateAPIKey,
  validateAPIKeyRequest,
  dispatchWebhookEvent,
  getDeveloperAPIKeys,
  getAPIMetricsSummary,
} from '@/lib/api-gateway';
import type { APIScope } from '@/types/api-platform';

describe('generateAPIKey()', () => {
  it('creates a key with the given name and scopes', () => {
    const scopes: APIScope[] = ['questions:read', 'flashcards:read'];
    const { apiKey, rawSecretKey } = generateAPIKey('Test App Key', scopes, 'user-gen-001');
    expect(apiKey.name).toBe('Test App Key');
    expect(apiKey.scopes).toEqual(scopes);
    expect(apiKey.userId).toBe('user-gen-001');
    expect(apiKey.isActive).toBe(true);
    expect(typeof rawSecretKey).toBe('string');
    expect(rawSecretKey.length).toBeGreaterThan(10);
  });

  it('key prefix starts with "rbt_live_"', () => {
    const { apiKey } = generateAPIKey('Prefix Test', ['questions:read']);
    expect(apiKey.keyPrefix).toMatch(/^rbt_live_/);
  });

  it('generated key id has key- prefix format', () => {
    const { apiKey } = generateAPIKey('Format Test Key', ['questions:read']);
    expect(typeof apiKey.id).toBe('string');
    expect(apiKey.id).toMatch(/^key-/);
    expect(apiKey.id.length).toBeGreaterThan(0);
  });

  it('adds generated key to developer keys list', () => {
    const countBefore = getDeveloperAPIKeys('unique-user-999').length;
    generateAPIKey('New Key', ['tutor:interact'], 'unique-user-999');
    expect(getDeveloperAPIKeys('unique-user-999').length).toBe(countBefore + 1);
  });
});

describe('validateAPIKeyRequest()', () => {
  it('validates a correct active key', () => {
    const { apiKey, rawSecretKey } = generateAPIKey('Valid Key', ['questions:read'], 'user-val-01');
    const { valid, message } = validateAPIKeyRequest(rawSecretKey, 'questions:read');
    expect(valid).toBe(true);
    expect(message).toContain('Authorized');
  });

  it('rejects an invalid / unknown key', () => {
    const { valid } = validateAPIKeyRequest('rbt_live_totally_fake_key_xyz', 'questions:read');
    expect(valid).toBe(false);
  });

  it('rejects when required scope is missing', () => {
    const { rawSecretKey } = generateAPIKey('Scoped Key', ['questions:read'], 'user-scope-01');
    const { valid } = validateAPIKeyRequest(rawSecretKey, 'billing:manage');
    expect(valid).toBe(false);
  });
});

describe('dispatchWebhookEvent()', () => {
  it('returns dispatchedCount >= 0', () => {
    const result = dispatchWebhookEvent('practice_test.completed', { score: 88 });
    expect(result.dispatchedCount).toBeGreaterThanOrEqual(0);
  });
});

describe('getAPIMetricsSummary()', () => {
  it('returns positive request count', () => {
    const metrics = getAPIMetricsSummary();
    expect(metrics.totalRequestsCount).toBeGreaterThan(0);
  });

  it('errorRatePercentage is between 0 and 100', () => {
    const { errorRatePercentage } = getAPIMetricsSummary();
    expect(errorRatePercentage).toBeGreaterThanOrEqual(0);
    expect(errorRatePercentage).toBeLessThanOrEqual(100);
  });

  it('topEndpoints is a non-empty array', () => {
    const { topEndpoints } = getAPIMetricsSummary();
    expect(Array.isArray(topEndpoints)).toBe(true);
    expect(topEndpoints.length).toBeGreaterThan(0);
    topEndpoints.forEach((ep) => {
      expect(ep).toHaveProperty('endpoint');
      expect(ep).toHaveProperty('requests');
    });
  });
});
