/**
 * Integration Tests — Notifications API (/api/notifications)
 */

import { describe, it, expect } from 'vitest';
import { GET, POST } from '@/app/api/notifications/route';
import { NextRequest } from 'next/server';

function makeGetRequest(userId: string): NextRequest {
  return new NextRequest(`http://localhost:3000/api/notifications?userId=${userId}`, {
    method: 'GET',
  });
}

function makePostRequest(body: Record<string, any>): NextRequest {
  return new NextRequest('http://localhost:3000/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('GET /api/notifications', () => {
  it('returns 200 with notifications array', async () => {
    const res = await GET(makeGetRequest('default_user'));
    const json = (await res.json()) as any;
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.notifications)).toBe(true);
  });

  it('returns empty array for unknown user', async () => {
    const res = await GET(makeGetRequest('totally-unknown-user-xyz-9999'));
    const json = (await res.json()) as any;
    expect(res.status).toBe(200);
    expect(json.notifications).toEqual([]);
  });
});

describe('POST /api/notifications (mark read)', () => {
  it('returns 400 for missing notificationId', async () => {
    const res = await POST(makePostRequest({}));
    expect(res.status).toBe(400);
  });
});
