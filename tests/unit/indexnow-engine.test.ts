import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getIndexNowConfig,
  updateIndexNowConfig,
  formatUrlsForIndexNow,
  getAllSiteUrls,
  submitToIndexNow,
  submitAllSitemapUrls,
  getIndexNowSubmissionLogs,
  clearIndexNowSubmissionLogs,
} from '@/lib/indexnow-engine';

describe('Bing & Multi-Search-Engine IndexNow Engine', () => {
  beforeEach(() => {
    clearIndexNowSubmissionLogs();
    vi.restoreAllMocks();
  });

  it('should initialize with standard default IndexNow configuration', () => {
    const config = getIndexNowConfig();
    expect(config.key).toBeDefined();
    expect(config.key.length).toBeGreaterThanOrEqual(16);
    expect(config.host).toBeDefined();
    expect(config.keyLocation).toContain(config.key);
    expect(config.enabled).toBe(true);
    expect(config.autoSubmitOnPublish).toBe(true);
    expect(config.primaryEndpoint).toBe('https://api.indexnow.org/indexnow');
    expect(config.fallbackEndpoints).toContain('https://www.bing.com/indexnow');
  });

  it('should dynamically update IndexNow configuration and recalculate keyLocation', () => {
    const updated = updateIndexNowConfig(
      {
        key: 'test_key_abcdef1234567890',
        host: 'example.com',
        autoSubmitOnPublish: false,
      },
      'Test Admin'
    );

    expect(updated.key).toBe('test_key_abcdef1234567890');
    expect(updated.host).toBe('example.com');
    expect(updated.autoSubmitOnPublish).toBe(false);
    expect(updated.keyLocation).toBe('https://example.com/test_key_abcdef1234567890.txt');

    // Reset back for subsequent tests
    updateIndexNowConfig({
      key: 'e39f75ba5a894762b71efc5e3d748f21',
      host: 'www.rbtpracticeai.com',
      autoSubmitOnPublish: true,
    });
  });

  it('should correctly format and normalize relative and absolute URLs', () => {
    const host = 'www.rbtpracticeai.com';
    const rawUrls = [
      '/rbt/mock-exam',
      'about',
      'https://www.rbtpracticeai.com/flashcards',
      'https://www.rbtpracticeai.com/rbt/mock-exam', // duplicate
      '', // empty
      '   ', // whitespace
    ];

    const formatted = formatUrlsForIndexNow(rawUrls, host);

    expect(formatted).toEqual([
      'https://www.rbtpracticeai.com/rbt/mock-exam',
      'https://www.rbtpracticeai.com/about',
      'https://www.rbtpracticeai.com/flashcards',
    ]);
  });

  it('should discover all dynamic sitemap URLs across the platform', () => {
    const allUrls = getAllSiteUrls();
    expect(allUrls.length).toBeGreaterThanOrEqual(25);

    // Verify core static and programmatic pages are included
    expect(allUrls.some((u) => u.endsWith('/rbt'))).toBe(true);
    expect(allUrls.some((u) => u.endsWith('/task-list'))).toBe(true);
    expect(allUrls.some((u) => u.includes('/rbt/glossary/'))).toBe(true);
    expect(allUrls.some((u) => u.includes('/articles/'))).toBe(true);
  });

  it('should handle empty or invalid URL list gracefully without crashing', async () => {
    const result = await submitToIndexNow([], 'Unit Test');
    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(result.submittedCount).toBe(0);
    expect(result.error).toBe('Empty or invalid URL list');
  });

  it('should submit URLs successfully to IndexNow API when endpoint responds with 200/202', async () => {
    // Mock global fetch to return 200 OK
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve('OK'),
    });
    vi.stubGlobal('fetch', fetchMock);

    const urls = ['/rbt/mock-exam', '/flashcards'];
    const result = await submitToIndexNow(urls, 'Unit Test');

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(result.submittedCount).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Verify payload sent
    const callArgs = fetchMock.mock.calls[0];
    const payload = JSON.parse(callArgs[1].body);
    expect(payload.urlList.length).toBe(2);
    expect(payload.key).toBeDefined();

    // Verify log entry was recorded
    const logs = getIndexNowSubmissionLogs();
    expect(logs.length).toBe(1);
    expect(logs[0].urlsCount).toBe(2);
    expect(logs[0].triggeredBy).toBe('Unit Test');
  });

  it('should submit all platform sitemap URLs via submitAllSitemapUrls', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 202,
      text: () => Promise.resolve('Accepted'),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await submitAllSitemapUrls('Super Admin Test');
    expect(result.success).toBe(true);
    expect(result.submittedCount).toBeGreaterThanOrEqual(25);
    expect(result.status).toBe(202);
  });
});
