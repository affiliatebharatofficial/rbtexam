/**
 * Platform Health Check Engine
 * Aggregates health of all critical services and returns a unified status object.
 * Called by: GET /api/health, Admin Infrastructure Dashboard.
 */

export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface ServiceHealth {
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
  lastCheckedAt: string;
}

export interface PlatformHealthReport {
  overall: HealthStatus;
  version: string;
  environment: string;
  uptime: number;
  timestamp: string;
  services: ServiceHealth[];
}

// Simulate service health checks — in production these ping real endpoints.
async function checkSupabase(): Promise<ServiceHealth> {
  const start = Date.now();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    return { name: 'Supabase Database', status: 'unhealthy', message: 'NEXT_PUBLIC_SUPABASE_URL not configured', lastCheckedAt: new Date().toISOString() };
  }
  try {
    const res = await fetch(`${url}/rest/v1/`, { signal: AbortSignal.timeout(5000) });
    const latencyMs = Date.now() - start;
    return {
      name: 'Supabase Database',
      status: res.ok || res.status === 401 ? 'healthy' : 'degraded', // 401 = auth required = DB is up
      latencyMs,
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return { name: 'Supabase Database', status: 'unhealthy', message: 'Connection failed', lastCheckedAt: new Date().toISOString() };
  }
}

async function checkOpenAI(): Promise<ServiceHealth> {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key.includes('test')) {
    return { name: 'OpenAI API', status: 'healthy', message: 'Test mode', lastCheckedAt: new Date().toISOString() };
  }
  try {
    const start = Date.now();
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    return {
      name: 'OpenAI API',
      status: res.ok ? 'healthy' : 'degraded',
      latencyMs: Date.now() - start,
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return { name: 'OpenAI API', status: 'degraded', message: 'Check connectivity', lastCheckedAt: new Date().toISOString() };
  }
}

function checkEnvironmentVars(): ServiceHealth {
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'OPENAI_API_KEY'];
  const missing = required.filter((k) => !process.env[k]);
  return {
    name: 'Environment Variables',
    status: missing.length === 0 ? 'healthy' : 'unhealthy',
    message: missing.length > 0 ? `Missing: ${missing.join(', ')}` : 'All required vars present',
    lastCheckedAt: new Date().toISOString(),
  };
}

function checkRAGEngine(): ServiceHealth {
  // Import dynamically to avoid circular deps
  try {
    const { getRAGEngineMetrics } = require('@/lib/rag-engine');
    const metrics = getRAGEngineMetrics();
    return {
      name: 'RAG Knowledge Engine',
      status: metrics.totalChunks > 0 ? 'healthy' : 'degraded',
      message: `${metrics.totalChunks} chunks · ${metrics.indexedChunks} indexed`,
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return { name: 'RAG Knowledge Engine', status: 'unhealthy', message: 'Engine load failed', lastCheckedAt: new Date().toISOString() };
  }
}

export async function getPlatformHealthReport(): Promise<PlatformHealthReport> {
  const [supabaseHealth, openaiHealth] = await Promise.all([checkSupabase(), checkOpenAI()]);

  const envHealth = checkEnvironmentVars();
  const ragHealth = checkRAGEngine();

  const services: ServiceHealth[] = [supabaseHealth, openaiHealth, envHealth, ragHealth];

  // Determine overall status
  const hasUnhealthy = services.some((s) => s.status === 'unhealthy');
  const hasDegraded = services.some((s) => s.status === 'degraded');
  const overall: HealthStatus = hasUnhealthy ? 'unhealthy' : hasDegraded ? 'degraded' : 'healthy';

  return {
    overall,
    version: process.env.npm_package_version ?? '2.7.0',
    environment: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
    uptime: process.uptime ? Math.floor(process.uptime()) : 0,
    timestamp: new Date().toISOString(),
    services,
  };
}
