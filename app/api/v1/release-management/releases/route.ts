import { NextRequest, NextResponse } from 'next/server';
import { getReleases, createRelease, generateChangelogMarkdown } from '@/lib/release-management-engine';

export async function GET() {
  try {
    const releases = getReleases();
    return NextResponse.json({
      success: true,
      count: releases.length,
      data: releases,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch releases' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { version, name, releaseType, environment, description, features, bugFixes } = body;

    if (!version || !name) {
      return NextResponse.json(
        { success: false, error: 'Version and name are required' },
        { status: 400 }
      );
    }

    const release = createRelease({
      version,
      name,
      releaseType: releaseType || 'minor',
      environment: environment || 'staging',
      status: 'pending_validation',
      description,
      releaseNotes: description,
    });

    const changelog = generateChangelogMarkdown({
      version,
      releaseDate: new Date().toISOString(),
      title: name,
      summary: description || 'New software update deployed.',
      features: features || ['Platform performance enhancements'],
      bugFixes: bugFixes || ['General bug fixes'],
      breakingChanges: [],
      migrationNotes: [],
      knownIssues: [],
    });

    return NextResponse.json({
      success: true,
      message: `Release v${version} created successfully.`,
      release,
      changelog,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create release' },
      { status: 500 }
    );
  }
}
