/**
 * Server-signed session tokens for RBT Practice AI.
 *
 * Format: base64url(JSON payload) + "." + base64url(HMAC-SHA256 signature)
 * The signing secret is read from the AUTH_SESSION_SECRET (preferred) or
 * ADMIN_JWT_SECRET environment variable / Cloudflare secret. Tokens are
 * never trusted without a valid signature — unsigned client-side session
 * JSON is rejected by lib/server-auth.ts.
 */

export interface SessionTokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function getSessionSecret(): string {
  if (typeof process !== 'undefined' && process.env) {
    const fromEnv = process.env.AUTH_SESSION_SECRET || process.env.ADMIN_JWT_SECRET;
    if (fromEnv) return fromEnv;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCloudflareContext } = require('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    const fromCtx = ctx?.env?.AUTH_SESSION_SECRET || ctx?.env?.ADMIN_JWT_SECRET;
    if (fromCtx) return String(fromCtx);
  } catch {}
  return '';
}

export function isSessionSigningConfigured(): boolean {
  return getSessionSecret().length >= 16;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signSessionToken(user: {
  id: string;
  email: string;
  role: string;
}): Promise<string | null> {
  const secret = getSessionSecret();
  if (secret.length < 16) return null;

  const now = Date.now();
  const payload: SessionTokenPayload = {
    sub: user.id,
    email: user.email.toLowerCase().trim(),
    role: user.role || 'student',
    iat: now,
    exp: now + TOKEN_TTL_MS,
  };

  const payloadPart = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadPart));
  return `${payloadPart}.${base64UrlEncode(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string): Promise<SessionTokenPayload | null> {
  const secret = getSessionSecret();
  if (secret.length < 16 || !token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadPart, signaturePart] = parts;

  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(signaturePart) as BufferSource,
      new TextEncoder().encode(payloadPart)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadPart))) as SessionTokenPayload;
    if (!payload?.sub || !payload?.email || typeof payload.exp !== 'number') return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Cookie name used for the httpOnly session token set by auth routes. */
export const SESSION_COOKIE_NAME = 'rbt_ai_auth_token';

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: true,
    path: '/',
    maxAge: Math.floor(TOKEN_TTL_MS / 1000),
  };
}
