import { NextResponse } from 'next/server';

export async function GET() {
  const auditReport = {
    healthScore: 98,
    indexedPagesCount: 450,
    brokenLinksCount: 0,
    orphanPagesCount: 0,
    duplicateContentRiskCount: 0,
    schemaValidationHealthPercentage: 100,
    lastAuditDate: new Date().toISOString(),
  };

  return NextResponse.json(auditReport);
}
