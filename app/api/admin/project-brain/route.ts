import { NextResponse } from 'next/server';
import {
  getProjectBrainOverview,
  getFeatureRegistry,
  getAPIRegistry,
  getDatabaseRegistry,
  getEngineDependencyGraph,
} from '@/lib/project-brain-engine';

export async function GET() {
  try {
    const overview = getProjectBrainOverview();
    const features = getFeatureRegistry();
    const apis = getAPIRegistry();
    const tables = getDatabaseRegistry();
    const dependencies = getEngineDependencyGraph();

    return NextResponse.json({
      success: true,
      overview,
      features,
      apis,
      tables,
      dependencies,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch Project Brain intelligence' }, { status: 500 });
  }
}
