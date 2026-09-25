/**
 * Cloudflare D1 Native Database Client for RBT Practice AI
 * Provides edge-native, zero-latency SQLite access via Cloudflare D1
 */

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[]; success: boolean; meta: any }>;
  run(): Promise<{ success: boolean; meta: { changes: number; last_row_id: number } }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<{ results: T[]; success: boolean }[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

/**
 * Retrieves the Cloudflare D1 Database binding safely
 */
export function getD1Database(): D1Database | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    if (ctx && ctx.env && ctx.env.DB) {
      return ctx.env.DB as D1Database;
    }
  } catch {
    // Context unavailable during static build or outside worker isolate
  }
  return null;
}

/**
 * Checks if Cloudflare D1 is actively available in the current runtime context
 */
export function isD1Available(): boolean {
  return getD1Database() !== null;
}

/**
 * Execute a parameterized SELECT query returning an array of typed rows
 */
export async function d1Query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = getD1Database();
  if (!db) return [];

  try {
    const stmt = params.length > 0 ? db.prepare(sql).bind(...params) : db.prepare(sql);
    const { results } = await stmt.all<T>();
    return results || [];
  } catch (err) {
    console.error('D1 Query Error:', err, 'SQL:', sql);
    return [];
  }
}

/**
 * Execute a parameterized query returning the first row or null
 */
export async function d1QueryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const db = getD1Database();
  if (!db) return null;

  try {
    const stmt = params.length > 0 ? db.prepare(sql).bind(...params) : db.prepare(sql);
    const result = await stmt.first<T>();
    return result || null;
  } catch (err) {
    console.error('D1 QueryFirst Error:', err, 'SQL:', sql);
    return null;
  }
}

/**
 * Execute an INSERT, UPDATE, or DELETE statement
 */
export async function d1Run(
  sql: string,
  params: any[] = []
): Promise<{ success: boolean; changes: number; lastRowId: number }> {
  const db = getD1Database();
  if (!db) return { success: false, changes: 0, lastRowId: 0 };

  try {
    const stmt = params.length > 0 ? db.prepare(sql).bind(...params) : db.prepare(sql);
    const res = await stmt.run();
    return {
      success: res.success,
      changes: res.meta?.changes ?? 0,
      lastRowId: res.meta?.last_row_id ?? 0,
    };
  } catch (err) {
    console.error('D1 Run Error:', err, 'SQL:', sql);
    return { success: false, changes: 0, lastRowId: 0 };
  }
}

/**
 * Execute batch operations in an atomic transaction
 */
export async function d1Batch(statements: { sql: string; params?: any[] }[]): Promise<boolean> {
  const db = getD1Database();
  if (!db || statements.length === 0) return false;

  try {
    const preparedStmts = statements.map((s) =>
      s.params && s.params.length > 0 ? db.prepare(s.sql).bind(...s.params) : db.prepare(s.sql)
    );
    await db.batch(preparedStmts);
    return true;
  } catch (err) {
    console.error('D1 Batch Error:', err);
    return false;
  }
}
