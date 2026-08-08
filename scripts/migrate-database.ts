/**
 * RBT Practice Questions - Database Migration Script
 * Reads database/full_master_migration.sql and provides a CLI runner
 * Usage: npx ts-node scripts/migrate-database.ts
 */

import fs from 'fs';
import path from 'path';

export function getMasterMigrationSQL(): string {
  const filePath = path.join(process.cwd(), 'database', 'full_master_migration.sql');
  return fs.readFileSync(filePath, 'utf-8');
}

export function validateMasterMigrationSQL(): { valid: boolean; tableCount: number; statementCount: number } {
  const sql = getMasterMigrationSQL();
  const tableMatches = sql.match(/CREATE TABLE IF NOT EXISTS/gi) || [];
  const statementMatches = sql.split(';').filter((s) => s.trim().length > 0);

  return {
    valid: tableMatches.length > 0,
    tableCount: tableMatches.length,
    statementCount: statementMatches.length,
  };
}

if (require.main === module) {
  const validation = validateMasterMigrationSQL();
  console.log('====================================================');
  console.log('RBT Practice Questions Master Database Migration Summary');
  console.log('====================================================');
  console.log(`Status: ${validation.valid ? 'READY' : 'INVALID'}`);
  console.log(`Master Tables Defined: ${validation.tableCount}`);
  console.log(`SQL Statements: ${validation.statementCount}`);
  console.log('\nTo execute migration on Supabase:');
  console.log('1. Open https://app.supabase.com -> SQL Editor');
  console.log('2. Copy contents of database/full_master_migration.sql');
  console.log('3. Click "RUN" to execute 100% of tables & RLS policies.');
  console.log('====================================================');
}
