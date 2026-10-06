/**
 * Cryptographically secure random helpers (Web Crypto).
 * Use these instead of Math.random() for OTP codes, API keys,
 * session identifiers and anything security-sensitive.
 */

export function secureRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 1) return 0;
  const array = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % maxExclusive;
}

export function secureRandomString(length: number, alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += alphabet[secureRandomInt(alphabet.length)];
  }
  return out;
}

/** Numeric one-time code, e.g. generateOtpCode(6) -> "042817" */
export function generateOtpCode(digits = 6): string {
  const max = 10 ** digits;
  return secureRandomInt(max).toString().padStart(digits, '0');
}
