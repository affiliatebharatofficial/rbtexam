/**
 * Comprehensive Verification Script for P0/P1 Security Fixes
 */
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as UsersGET } from '@/app/api/admin/users/route';
import { POST as UsersUpdatePOST } from '@/app/api/admin/users/update/route';
import { POST as WebhookPOST } from '@/app/api/billing/webhook/route';
import { requireAdminAuth } from '@/lib/server-auth';
import { verifyLemonSqueezyWebhookSignature } from '@/lib/lemon-squeezy';
import crypto from 'crypto';

describe('P0-1 Security: Server-Side Admin Authentication Enforcement', () => {
  it('GET /api/admin/users returns 401 Unauthorized when no auth header or cookie is provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/users');
    const res = await UsersGET(req);
    const json = (await res.json()) as any;

    expect(res.status).toBe(401);
    expect(json.error).toMatch(/Unauthorized/i);
  });

  it('POST /api/admin/users/update returns 401 Unauthorized when called anonymously', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'target@test.com', role: 'admin' }),
    });
    const res = await UsersUpdatePOST(req);
    const json = (await res.json()) as any;

    expect(res.status).toBe(401);
    expect(json.error).toMatch(/Unauthorized/i);
  });

  it('requireAdminAuth correctly identifies unauthenticated requests', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/config');
    const authResult = await requireAdminAuth(req);

    expect(authResult.authorized).toBe(false);
    expect(authResult.response?.status).toBe(401);
  });
});

describe('P0-2 Security: Lemon Squeezy Webhook Raw Body HMAC Signature Verification', () => {
  const secret = 'test-lemon-squeezy-secret-key-12345';
  const samplePayload = JSON.stringify({
    meta: { event_name: 'subscription_created', custom_data: { user_id: 'usr-123' } },
    data: { id: 'sub_999', type: 'subscriptions' },
  });

  it('rejects webhook with missing signature header with 401', async () => {
    const req = new NextRequest('http://localhost:3000/api/billing/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: samplePayload,
    });
    const res = await WebhookPOST(req);
    const json = (await res.json()) as any;

    expect(res.status).toBe(401);
    expect(json.error).toMatch(/signature/i);
  });

  it('rejects webhook with forged/invalid HMAC signature with 401', async () => {
    const req = new NextRequest('http://localhost:3000/api/billing/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': '0000000000000000000000000000000000000000000000000000000000000000',
      },
      body: samplePayload,
    });
    const res = await WebhookPOST(req);
    const json = (await res.json()) as any;

    expect(res.status).toBe(401);
    expect(json.error).toMatch(/signature/i);
  });

  it('accepts correctly calculated HMAC signature and verifies raw payload', () => {
    const validSignature = crypto.createHmac('sha256', secret).update(samplePayload).digest('hex');
    const isValid = verifyLemonSqueezyWebhookSignature(samplePayload, validSignature, secret);

    expect(isValid).toBe(true);
  });

  it('rejects signature when raw payload is tampered by even a single byte', () => {
    const validSignature = crypto.createHmac('sha256', secret).update(samplePayload).digest('hex');
    const tamperedPayload = samplePayload + ' ';
    const isValid = verifyLemonSqueezyWebhookSignature(tamperedPayload, validSignature, secret);

    expect(isValid).toBe(false);
  });
});
