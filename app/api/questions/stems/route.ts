import { NextResponse } from 'next/server';
import { getAllQuestionStemsAsync } from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // 60s ISR cache on edge

export async function GET() {
  try {
    const stems = await getAllQuestionStemsAsync();
    return NextResponse.json(
      { success: true, count: stems.length, stems },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error: any) {
    console.error('Failed to fetch question stems:', error?.message);
    return NextResponse.json({ success: false, stems: [], error: error?.message }, { status: 500 });
  }
}
