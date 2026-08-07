/**
 * Integration Tests — Security API (/api/security/summary + /api/privacy/request)
 */

import { describe, it, expect } from 'vitest';
import { GET as SecurityGET } from '@/app/api/security/summary/route';
import { POST as PrivacyPOST } from '@/app/api/privacy/request/route';
import { NextRequest } from 'next/server';

describe('GET /api/security/summary', () => {
  it('returns 200 with security health metrics', async () => {
    const req = new NextRequest('http://localhost:3000/api/security/summary');
    const res = await SecurityGET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('overallSecurityScore');
    expect(json).toHaveProperty('threatsBlockedMonthly');
    expect(json).toHaveProperty('promptInjectionMitigationRate');
    expect(json.promptInjectionMitigationRate).toBe(100);
  });

  it('security score is a positive number', async () => {
    const res = await SecurityGET();
    const json = await res.json();
    expect(typeof json.overallSecurityScore).toBe('number');
    expect(json.overallSecurityScore).toBeGreaterThan(0);
  });
});

describe('POST /api/privacy/request', () => {
  it('returns 200 and creates a pending request', async () => {
    const req = new NextRequest('http://localhost:3000/api/privacy/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', requestType: 'export_data' }),
    });
    const res = await PrivacyPOST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.request.status).toBe('pending');
    expect(json.request.requestType).toBe('export_data');
  });

  it('returns 400 for missing email or requestType', async () => {
    const req = new NextRequest('http://localhost:3000/api/privacy/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }), // missing requestType
    });
    const res = await PrivacyPOST(req);
    expect(res.status).toBe(400);
  });
});
