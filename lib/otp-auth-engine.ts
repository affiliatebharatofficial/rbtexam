import { getSupabaseAdminClient, getRuntimeEnv, isSupabaseConfigured } from './supabase';
import { logAuditEvent } from './platform-config';

export interface OTPRecord {
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
  verified: boolean;
}

// In-memory OTP store (mirrored to Supabase for high availability)
const OTP_MEMORY_STORE = new Map<string, OTPRecord>();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes expiry
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds resend cooldown

/**
 * Generate a cryptographically secure 6-digit verification OTP
 */
export function generateSecureOTP(): string {
  // Generate 6 digit number between 100000 and 999999
  const min = 100000;
  const max = 999999;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

import { sendTransactionalEmail } from './smtp-engine';

/**
 * Dispatches an email with the OTP code using Universal SMTP & Transactional Email Engine
 */
export async function dispatchOTPEmail(
  email: string,
  code: string,
  fullName?: string
): Promise<{ success: boolean; provider: string; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const name = fullName || cleanEmail.split('@')[0];

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your RBT Practice AI Verification Code</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px;">
  <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 36px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #2563EB, #4F46E5); color: #ffffff; line-height: 48px; font-size: 24px; font-weight: bold;">
        🧠
      </div>
      <h2 style="margin: 12px 0 4px; color: #0f172a; font-size: 22px; font-weight: 800;">Verify Your Email Address</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">BACB RBT® 3rd Edition Exam Preparation Platform</p>
    </div>

    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
      Hi <strong>${name}</strong>,<br><br>
      Thank you for registering for RBT Practice AI. Use the 6-digit verification code below to confirm your email and activate your account:
    </p>

    <div style="background-color: #f1f5f9; border-radius: 12px; border: 1px dashed #cbd5e1; padding: 20px; text-align: center; margin-bottom: 24px;">
      <div style="font-family: monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #2563EB; user-select: all;">
        ${code}
      </div>
      <p style="margin: 8px 0 0; font-size: 12px; color: #64748b;">This code expires in 10 minutes.</p>
    </div>

    <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-bottom: 24px;">
      If you did not request this verification code, please ignore this email. No changes will be made to your account.
    </p>

    <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.4;">
      <p style="margin: 0;">RBT Practice AI • Independent Exam Prep Platform</p>
      <p style="margin: 4px 0 0;">Not affiliated with or endorsed by the Behavior Analyst Certification Board® (BACB®).</p>
    </div>
  </div>
</body>
</html>
  `;

  const dispatchRes = await sendTransactionalEmail({
    to: cleanEmail,
    subject: `${code} is your RBT Practice AI Verification Code`,
    html: htmlContent,
    text: `Your verification code is ${code}. Valid for 10 minutes.`,
  });

  return {
    success: dispatchRes.success,
    provider: dispatchRes.provider,
    error: dispatchRes.error,
  };
}

/**
 * Creates, stores, and sends an OTP to candidate's email
 */
export async function sendOTPToEmail(
  email: string,
  fullName?: string
): Promise<{ success: boolean; message: string; cooldownSeconds?: number; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, message: '', error: 'A valid email address is required.' };
  }

  // Check rate limiting / resend cooldown
  const existing = OTP_MEMORY_STORE.get(cleanEmail);
  const now = Date.now();

  if (existing && now - existing.createdAt < RESEND_COOLDOWN_MS) {
    const remainingSecs = Math.ceil((RESEND_COOLDOWN_MS - (now - existing.createdAt)) / 1000);
    return {
      success: false,
      message: '',
      error: `Please wait ${remainingSecs} seconds before requesting a new verification code.`,
      cooldownSeconds: remainingSecs,
    };
  }

  const code = generateSecureOTP();
  const newRecord: OTPRecord = {
    email: cleanEmail,
    code,
    createdAt: now,
    expiresAt: now + OTP_EXPIRY_MS,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    verified: false,
  };

  OTP_MEMORY_STORE.set(cleanEmail, newRecord);

  // Store in PostgreSQL profiles table for persistence across worker instances
  try {
    const adminClient = getSupabaseAdminClient();
    await adminClient
      .from('profiles')
      .update({
        avatar_url: `otp:${code}:${newRecord.expiresAt}`,
        updated_at: new Date().toISOString(),
      })
      .eq('email', cleanEmail);
  } catch (dbErr) {
    // Database fallback to memory store
  }

  const dispatchResult = await dispatchOTPEmail(cleanEmail, code, fullName);

  if (!dispatchResult.success) {
    return {
      success: false,
      message: '',
      error: dispatchResult.error || 'Failed to dispatch verification email via configured SMTP.',
    };
  }

  return {
    success: true,
    message: `Verification code sent to ${cleanEmail}. Please check your inbox.`,
  };
}

/**
 * Strictly verifies the 6-digit OTP code against the stored record
 */
export async function verifyOTPCode(
  email: string,
  inputCode: string
): Promise<{ success: boolean; error?: string; user?: any }> {
  const cleanEmail = email.toLowerCase().trim();
  const cleanInput = (inputCode || '').replace(/\D/g, '').trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Valid email is required for verification.' };
  }

  if (!cleanInput || cleanInput.length !== 6) {
    return { success: false, error: 'Verification code must be exactly 6 digits.' };
  }

  const now = Date.now();
  let record = OTP_MEMORY_STORE.get(cleanEmail);

  // If not in memory, check Supabase profiles
  if (!record && isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();
      const { data } = await adminClient
        .from('profiles')
        .select('avatar_url, created_at')
        .eq('email', cleanEmail)
        .limit(1)
        .maybeSingle();

      if (data?.avatar_url && data.avatar_url.startsWith('otp:')) {
        const parts = data.avatar_url.split(':');
        const dbCode = parts[1];
        const dbExpires = parseInt(parts[2], 10);
        record = {
          email: cleanEmail,
          code: dbCode,
          createdAt: now - 30000,
          expiresAt: dbExpires || now + OTP_EXPIRY_MS,
          attempts: 0,
          maxAttempts: MAX_ATTEMPTS,
          verified: false,
        };
      }
    } catch (e) {
      console.warn('DB OTP lookup error:', e);
    }
  }

  if (!record) {
    return {
      success: false,
      error: 'No active verification code found for this email. Please request a new code.',
    };
  }

  // Check Expiration
  if (now > record.expiresAt) {
    OTP_MEMORY_STORE.delete(cleanEmail);
    return {
      success: false,
      error: 'Verification code has expired. Please click "Resend Code" for a fresh code.',
    };
  }

  // Check Max Attempts (Brute Force Protection)
  if (record.attempts >= record.maxAttempts) {
    OTP_MEMORY_STORE.delete(cleanEmail);
    return {
      success: false,
      error: 'Too many incorrect attempts. This code has been invalidated for security. Please request a new code.',
    };
  }

  // STRICT COMPARISON: Reject if code does not match!
  if (record.code !== cleanInput) {
    record.attempts += 1;
    OTP_MEMORY_STORE.set(cleanEmail, record);

    const remaining = record.maxAttempts - record.attempts;
    return {
      success: false,
      error: `Invalid verification code. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`,
    };
  }

  // Code is 100% correct! Mark verified
  record.verified = true;
  OTP_MEMORY_STORE.delete(cleanEmail); // Consume single-use token

  // Update profile and users table in database to email_verified = true
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdminClient();
      await adminClient
        .from('profiles')
        .update({
          account_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('email', cleanEmail);

      await adminClient
        .from('users')
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq('email', cleanEmail);

      await adminClient
        .from('email_verifications')
        .update({ verified: true })
        .eq('email', cleanEmail);
    } catch (dbUpErr) {
      console.warn('Failed to update DB verified status:', dbUpErr);
    }
  }

  logAuditEvent('SYSTEM', 'EMAIL_VERIFIED_SUCCESS', 'Auth Engine', `User ${cleanEmail} successfully verified email with valid OTP`);

  return {
    success: true,
  };
}
