import { NextRequest, NextResponse } from 'next/server';
import { getMasterMigrationSQL, validateMasterMigrationSQL } from '@/scripts/migrate-database';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

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
