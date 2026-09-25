/**
 * Web-Crypto compliant password hashing and verification for RBT Practice AI
 * Runs seamlessly on Cloudflare Workers, Edge Runtime, Node.js, and browser
 */

const AUTH_SALT = ':rbt_app_secure_salt_2026';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode((password || '') + AUTH_SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  if (!password || !expectedHash) return false;
  const computed = await hashPassword(password);
  return computed === expectedHash;
}
