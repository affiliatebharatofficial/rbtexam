import { NextRequest, NextResponse } from 'next/server';
import { getDeveloperAPIKeys, generateAPIKey } from '@/lib/api-gateway';
import { APIScope } from '@/types/api-platform';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default_user';

    const keys = getDeveloperAPIKeys(userId);
    return NextResponse.json({ success: true, keys });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { name, scopes } = body;

    if (!name) {
      return NextResponse.json({ error: 'API Key name is required' }, { status: 400 });
    }

    const defaultScopes: APIScope[] = scopes || ['questions:read', 'flashcards:read', 'tutor:interact'];
    const result = generateAPIKey(name, defaultScopes);

    return NextResponse.json({
      success: true,
      apiKey: result.apiKey,
      rawSecretKey: result.rawSecretKey, // Shown ONLY ONCE upon creation
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to generate API Key' }, { status: 500 });
  }
}
