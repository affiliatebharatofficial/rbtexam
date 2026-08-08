import { NextRequest, NextResponse } from 'next/server';
import { getPlatformAnalyticsSummary, exportAnalyticsToCSV } from '@/lib/analytics-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    if (format === 'csv') {
      const csv = exportAnalyticsToCSV();
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="rbtpracticequestions_bi_summary.csv"',
        },
      });
    }

    const summary = getPlatformAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch executive analytics summary' }, { status: 500 });
  }
}
