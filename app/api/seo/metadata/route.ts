import { NextRequest, NextResponse } from 'next/server';
import { buildSEOMetadata, generateCourseJSONLD } from '@/lib/seo-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/rbt';

    const metadata = buildSEOMetadata('RBT Certification Exam Prep 2026', 'Official BACB 2nd Edition Task List prep with 85-question mocks.', path);
    const jsonLd = generateCourseJSONLD('RBT');

    return NextResponse.json({ metadata, jsonLd });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to generate SEO metadata' }, { status: 500 });
  }
}
