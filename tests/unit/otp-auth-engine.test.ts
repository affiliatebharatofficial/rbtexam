import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSecureOTP,
  sendOTPToEmail,
  verifyOTPCode,
} from '@/lib/otp-auth-engine';

describe('OTP Authentication & Verification Engine', () => {
  const testEmail = 'candidate.test@rbtpracticeai.com';

  it('generateSecureOTP() should produce a valid 6-digit numeric string', () => {
    const code = generateSecureOTP();
    expect(code).toBeDefined();
    expect(typeof code).toBe('string');
    expect(code.length).toBe(6);
    expect(/^\d{6}$/.test(code)).toBe(true);
  });

  it('sendOTPToEmail() should dispatch OTP and return success message', async () => {
    const res = await sendOTPToEmail(testEmail, 'Test Candidate');
    expect(res.success).toBe(true);
    expect(res.message).toContain('Verification code sent');
  });

  it('verifyOTPCode() should REJECT incorrect 6-digit codes', async () => {
    const res = await verifyOTPCode(testEmail, '999999');
    expect(res.success).toBe(false);
    expect(res.error).toContain('Invalid verification code');
  });

  it('verifyOTPCode() should REJECT incomplete or non-6-digit input', async () => {
    const res1 = await verifyOTPCode(testEmail, '123');
    expect(res1.success).toBe(false);
    expect(res1.error).toContain('6 digits');

    const res2 = await verifyOTPCode(testEmail, '');
    expect(res2.success).toBe(false);
  });

  it('verifyOTPCode() should REJECT unknown emails without active OTP', async () => {
    const res = await verifyOTPCode('nonexistent.user@randomdomain.com', '123456');
    expect(res.success).toBe(false);
    expect(res.error).toContain('No active verification code found');
  });
});
