/**
 * Password hashing for RBT Practice AI (Web Crypto, Cloudflare Workers safe).
 *
 * New hashes use PBKDF2-HMAC-SHA256 with a random per-password salt:
 *   pbkdf2_sha256$<iterations>$<base64 salt>$<base64 derived key>
 *
 * Legacy hashes (single SHA-256 with the old static salt, 64 hex chars)
 * are still verified so existing users can log in; login upgrades them
 * to the new format on first successful sign-in (see needsPasswordRehash).
 */

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_PREFIX = 'pbkdf2_sha256';
const LEGACY_SALT = ':rbt_app_secure_salt_2026';

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await pbkdf2(password || '', salt, PBKDF2_ITERATIONS);
  return `${PBKDF2_PREFIX}$${PBKDF2_ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(derived)}`;
}

async function legacyHash(password: string): Promise<string> {
  const data = new TextEncoder().encode((password || '') + LEGACY_SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function isLegacyPasswordHash(storedHash: string): boolean {
  return /^[a-f0-9]{64}$/i.test(storedHash || '');
}

export function needsPasswordRehash(storedHash: string): boolean {
  if (isLegacyPasswordHash(storedHash)) return true;
  if ((storedHash || '').startsWith(`${PBKDF2_PREFIX}$`)) {
    const iterations = parseInt(storedHash.split('$')[1] || '0', 10);
    return !Number.isFinite(iterations) || iterations < PBKDF2_ITERATIONS;
  }
  return true;
}

export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  if (!password || !expectedHash) return false;

  if (expectedHash.startsWith(`${PBKDF2_PREFIX}$`)) {
    const parts = expectedHash.split('$');
    if (parts.length !== 4) return false;
    const iterations = parseInt(parts[1], 10);
    if (!Number.isFinite(iterations) || iterations <= 0) return false;
    try {
      const salt = base64ToBytes(parts[2]);
      const expected = base64ToBytes(parts[3]);
      const computed = await pbkdf2(password, salt, iterations);
      return timingSafeEqual(computed, expected);
    } catch {
      return false;
    }
  }

  // Legacy format: single-round SHA-256 hex (verify only, then upgrade on login)
  if (isLegacyPasswordHash(expectedHash)) {
    const computed = await legacyHash(password);
    return timingSafeEqual(new TextEncoder().encode(computed), new TextEncoder().encode(expectedHash.toLowerCase()));
  }

  return false;
}
