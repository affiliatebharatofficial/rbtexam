import { NextResponse } from 'next/server';
import { getRuntimeEnv } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId =
    getRuntimeEnv('GOOGLE_CLIENT_ID') ||
    getRuntimeEnv('NEXT_PUBLIC_GOOGLE_CLIENT_ID') ||
    process.env.GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '';

  const callbackUrl =
    getRuntimeEnv('NEXT_PUBLIC_GOOGLE_CALLBACK_URL') ||
    process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL ||
    `${url.origin}/auth/callback`;

  return NextResponse.json({
    clientId,
    configured: Boolean(clientId),
    callbackUrl,
  });
}
