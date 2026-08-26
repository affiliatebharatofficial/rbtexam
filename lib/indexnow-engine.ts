import {
  IndexNowPayload,
  IndexNowSubmissionResult,
  IndexNowConfig,
  IndexNowLog,
} from '@/types/indexnow';
import { SAMPLE_BACB_QUESTIONS } from './sample-questions';
import { ABA_GLOSSARY_TERMS } from './seo-engine';
import { getAllArticles } from './article-cms-engine';
import { logAuditEvent } from './platform-config';

const DEFAULT_INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'e39f75ba5a894762b71efc5e3d748f21';
const DEFAULT_HOST =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '').replace(/\/$/, '') ||
  'www.rbtpracticeai.com';

const DEFAULT_PRIMARY_ENDPOINT = 'https://api.indexnow.org/indexnow';
const FALLBACK_ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

const LOCAL_STORAGE_KEY = 'rbt_indexnow_config';
const LOGS_STORAGE_KEY = 'rbt_indexnow_logs';

let runtimeConfig: IndexNowConfig = {
  key: DEFAULT_INDEXNOW_KEY,
  host: DEFAULT_HOST,
  enabled: true,
  autoSubmitOnPublish: true,
  keyLocation: `https://${DEFAULT_HOST}/${DEFAULT_INDEXNOW_KEY}.txt`,
  primaryEndpoint: DEFAULT_PRIMARY_ENDPOINT,
  fallbackEndpoints: FALLBACK_ENDPOINTS,
};

let submissionLogsBuffer: IndexNowLog[] = [];

/**
 * Returns current IndexNow Engine configuration
 */
export function getIndexNowConfig(): IndexNowConfig {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        runtimeConfig = { ...runtimeConfig, ...parsed };
      }
    } catch {
      // fallback to memory state
    }
  }
  return { ...runtimeConfig };
}

/**
 * Updates dynamic IndexNow Engine configuration
 */
export function updateIndexNowConfig(
  updates: Partial<IndexNowConfig>,
  updatedBy: string = 'Super Admin'
): IndexNowConfig {
  const current = getIndexNowConfig();
  const next: IndexNowConfig = {
    ...current,
    ...updates,
  };

  // Re-calculate keyLocation if key or host updated
  if (updates.key || updates.host) {
    const host = updates.host || current.host;
    const key = updates.key || current.key;
    next.keyLocation = `https://${host}/${key}.txt`;
  }

  runtimeConfig = next;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage error
    }
  }

  logAuditEvent(
    updatedBy,
    'CONFIG_UPDATE',
    'Bing IndexNow Engine',
    `Updated IndexNow configuration: ${JSON.stringify(updates)}`
  );

  return { ...runtimeConfig };
}

/**
 * Returns all site URLs from Core routes, BACB Questions, Glossary, and Articles
 */
export function getAllSiteUrls(customHost?: string): string[] {
  const host = customHost || getIndexNowConfig().host;
  const baseUrl = `https://${host}`;

  const staticPaths = [
    '/',
    '/rbt',
    '/task-list',
    '/rbt/mock-exam',
    '/rbt/questions',
    '/flashcards',
    '/rbt/flashcards',
    '/rbt/glossary',
    '/rbt/study-guide',
    '/rbt/practice-test',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/disclaimer',
    '/guarantee-terms',
    '/rbt/about',
  ];

  const staticUrls = staticPaths.map((p) => (p === '/' ? baseUrl : `${baseUrl}${p}`));

  const questionUrls = SAMPLE_BACB_QUESTIONS.map(
    (q) => `${baseUrl}/rbt/question/${q.id}`
  );

  const glossaryUrls = ABA_GLOSSARY_TERMS.map(
    (g) => `${baseUrl}/rbt/glossary/${g.slug}`
  );

  let articleUrls: string[] = [];
  try {
    const articles = getAllArticles();
    articleUrls = articles
      .filter((a) => a.status === 'published')
      .map((a) => `${baseUrl}/articles/${a.slug}`);
  } catch {
    // fallback if articles engine not yet loaded
  }

  // Deduplicate and filter
  const allUrls = Array.from(
    new Set([...staticUrls, ...questionUrls, ...glossaryUrls, ...articleUrls])
  );

  return allUrls;
}

/**
 * Normalizes and formats URL array for IndexNow payload
 */
export function formatUrlsForIndexNow(urls: string | string[], host: string): string[] {
  const inputList = Array.isArray(urls) ? urls : [urls];
  const formatted: string[] = [];

  for (const raw of inputList) {
    if (!raw || typeof raw !== 'string') continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;

    let fullUrl = trimmed;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${host}${fullUrl.startsWith('/') ? fullUrl : `/${fullUrl}`}`;
    }

    formatted.push(fullUrl);
  }

  return Array.from(new Set(formatted));
}

/**
 * Submits URL list to IndexNow API (Bing, Yandex, etc.)
 */
export async function submitToIndexNow(
  urls: string | string[],
  triggeredBy: string = 'System Workflow',
  customHost?: string,
  customKey?: string
): Promise<IndexNowSubmissionResult> {
  const config = getIndexNowConfig();
  const host = customHost || config.host;
  const key = customKey || config.key;
  const keyLocation = `https://${host}/${key}.txt`;

  const formattedUrls = formatUrlsForIndexNow(urls, host);

  if (formattedUrls.length === 0) {
    return {
      success: false,
      status: 400,
      submittedCount: 0,
      urls: [],
      message: 'No valid URLs provided for IndexNow submission.',
      timestamp: new Date().toISOString(),
      error: 'Empty or invalid URL list',
    };
  }

  // IndexNow API specification allows max 10,000 URLs per batch
  const batchLimit = 10000;
  const targetUrls = formattedUrls.slice(0, batchLimit);

  const payload: IndexNowPayload = {
    host,
    key,
    keyLocation,
    urlList: targetUrls,
  };

  const endpointsToTry = [
    config.primaryEndpoint,
    ...config.fallbackEndpoints,
  ];

  let lastStatus = 0;
  let lastResponseText = '';
  let successfulEndpoint = '';
  let isSuccess = false;

  for (const endpoint of endpointsToTry) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'RBT-Practice-AI-IndexNow-Bot/1.0',
        },
        body: JSON.stringify(payload),
      });

      lastStatus = response.status;
      lastResponseText = await response.text().catch(() => '');

      // HTTP 200 = OK, HTTP 202 = Accepted (standard IndexNow success response)
      if (response.ok || response.status === 200 || response.status === 202) {
        isSuccess = true;
        successfulEndpoint = endpoint;
        break;
      }
    } catch (err: any) {
      lastResponseText = err?.message || 'Network error';
    }
  }

  const timestamp = new Date().toISOString();
  const logEntry: IndexNowLog = {
    id: `idx-log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp,
    urlsCount: targetUrls.length,
    sampleUrls: targetUrls.slice(0, 5),
    status: lastStatus,
    success: isSuccess,
    responseText: lastResponseText || (isSuccess ? 'Accepted' : 'Failed'),
    triggeredBy,
    endpoint: successfulEndpoint || endpointsToTry[0],
  };

  recordIndexNowLog(logEntry);

  if (isSuccess) {
    logAuditEvent(
      triggeredBy,
      'INDEXNOW_SUBMIT_SUCCESS',
      'Bing IndexNow Engine',
      `Successfully submitted ${targetUrls.length} URLs to IndexNow (${successfulEndpoint}). Status: ${lastStatus}`
    );

    return {
      success: true,
      status: lastStatus,
      submittedCount: targetUrls.length,
      urls: targetUrls,
      message: `Successfully submitted ${targetUrls.length} URLs to Bing & IndexNow search engines.`,
      timestamp,
      endpoint: successfulEndpoint,
    };
  }

  logAuditEvent(
    triggeredBy,
    'INDEXNOW_SUBMIT_FAILED',
    'Bing IndexNow Engine',
    `Failed to submit ${targetUrls.length} URLs to IndexNow. Status: ${lastStatus}. Error: ${lastResponseText}`
  );

  return {
    success: false,
    status: lastStatus,
    submittedCount: targetUrls.length,
    urls: targetUrls,
    message: `IndexNow submission returned status ${lastStatus}: ${lastResponseText || 'Unknown error'}`,
    timestamp,
    error: lastResponseText || `HTTP ${lastStatus}`,
    endpoint: endpointsToTry[0],
  };
}

/**
 * Submits all sitemap and dynamic URLs to IndexNow
 */
export async function submitAllSitemapUrls(
  triggeredBy: string = 'Super Admin One-Click Index'
): Promise<IndexNowSubmissionResult> {
  const allUrls = getAllSiteUrls();
  return submitToIndexNow(allUrls, triggeredBy);
}

/**
 * Records IndexNow submission log
 */
function recordIndexNowLog(log: IndexNowLog) {
  submissionLogsBuffer.unshift(log);
  if (submissionLogsBuffer.length > 100) {
    submissionLogsBuffer.pop();
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(submissionLogsBuffer));
    } catch {
      // ignore
    }
  }
}

/**
 * Returns recent IndexNow submission logs
 */
export function getIndexNowSubmissionLogs(): IndexNowLog[] {
  if (typeof window !== 'undefined' && submissionLogsBuffer.length === 0) {
    try {
      const stored = localStorage.getItem(LOGS_STORAGE_KEY);
      if (stored) {
        submissionLogsBuffer = JSON.parse(stored);
      }
    } catch {
      // fallback
    }
  }
  return [...submissionLogsBuffer];
}

/**
 * Clears IndexNow submission history
 */
export function clearIndexNowSubmissionLogs(): void {
  submissionLogsBuffer = [];
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LOGS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
