import { NextResponse } from 'next/server';
import { getMasterMigrationSQL, validateMasterMigrationSQL } from '@/scripts/migrate-database';

export async function GET() {
  try {
    const summary = validateMasterMigrationSQL();
    const sql = getMasterMigrationSQL();

    return NextResponse.json({
      success: true,
      summary,
      sql,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to load master migration SQL' },
      { status: 500 }
    );
  }
}
