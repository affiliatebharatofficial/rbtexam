import { NextResponse } from 'next/server';
import { getRuntimeEnv } from '@/lib/supabase';

export async function GET() {
  const clientId =
    getRuntimeEnv('GOOGLE_CLIENT_ID') ||
    getRuntimeEnv('NEXT_PUBLIC_GOOGLE_CLIENT_ID') ||
    process.env.GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '';

  return NextResponse.json({
    clientId,
    configured: Boolean(clientId),
  });
}
