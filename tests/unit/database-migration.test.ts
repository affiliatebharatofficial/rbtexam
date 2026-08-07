import { describe, it, expect } from 'vitest';
import { validateMasterMigrationSQL, getMasterMigrationSQL } from '@/scripts/migrate-database';

describe('Master Database Migration Engine', () => {
  it('should load master migration SQL file cleanly', () => {
    const sql = getMasterMigrationSQL();
    expect(sql).toBeDefined();
    expect(sql.length).toBeGreaterThan(1000);
  });

  it('should validate 25 master PostgreSQL tables and RLS policies', () => {
    const validation = validateMasterMigrationSQL();
    expect(validation.valid).toBe(true);
    expect(validation.tableCount).toBeGreaterThanOrEqual(25);
    expect(validation.statementCount).toBeGreaterThan(50);
  });

  it('should include pgvector extension and RLS policy statements', () => {
    const sql = getMasterMigrationSQL();
    expect(sql).toContain('CREATE EXTENSION IF NOT EXISTS "vector"');
    expect(sql).toContain('ENABLE ROW LEVEL SECURITY');
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.releases');
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.knowledge_chunks');
  });
});
