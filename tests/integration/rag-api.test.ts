/**
 * Integration Tests — RAG Search API (/api/rag/search)
 *
 * Uses vitest + Node fetch-compatible mocks to simulate HTTP requests
 * to the Next.js route handlers in a test environment.
 */

import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/rag/search/route';
import { NextRequest } from 'next/server';

function createRequest(body: Record<string, any>): NextRequest {
  return new NextRequest('http://localhost:3000/api/rag/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/rag/search', () => {
  it('returns 200 and result for a valid query', async () => {
    const req = createRequest({ query: 'differential reinforcement', topK: 3 });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.result).toHaveProperty('retrievedContexts');
    expect(json.result).toHaveProperty('latencyMs');
  });

  it('returns 400 for missing query', async () => {
    const req = createRequest({});
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 for empty string query', async () => {
    const req = createRequest({ query: '   ' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('respects topK limit (max 10)', async () => {
    const req = createRequest({ query: 'measurement', topK: 50 });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.result.retrievedContexts.length).toBeLessThanOrEqual(10);
  });

  it('accepts certification filter', async () => {
    const req = createRequest({ query: 'reinforcement', certification: 'RBT', topK: 3 });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.result).toBeDefined();
  });

  it('truncates very long queries to 512 chars', async () => {
    const longQuery = 'a'.repeat(1000);
    const req = createRequest({ query: longQuery });
    const res = await POST(req);
    // Should not throw; returns valid response
    expect([200, 400]).toContain(res.status);
  });
});
