import { describe, it, expect } from 'vitest';
import {
  getActiveSMTPConfig,
  saveSMTPConfig,
  sendTransactionalEmail,
  testSMTPConnection,
} from '@/lib/smtp-engine';

describe('SMTP & Universal Transactional Email Engine', () => {
  it('getActiveSMTPConfig() returns valid configuration object with defaults', async () => {
    const config = await getActiveSMTPConfig();
    expect(config).toBeDefined();
    expect(config.enabled).toBe(true);
    expect(config.senderEmail).toBeDefined();
    expect(config.senderName).toBeDefined();
  });

  it('saveSMTPConfig() updates and persists SMTP settings', async () => {
    const updated = await saveSMTPConfig(
      {
        provider: 'resend',
        senderName: 'RBT Practice Pro',
        senderEmail: 'support@rbtpracticeai.com',
      },
      'Test Admin'
    );

    expect(updated.senderName).toBe('RBT Practice Pro');
    expect(updated.senderEmail).toBe('support@rbtpracticeai.com');
  });

  it('sendTransactionalEmail() handles recipient email dispatch', async () => {
    const res = await sendTransactionalEmail({
      to: 'candidate@testdomain.com',
      subject: 'Your Verification Code',
      html: '<h1>123456</h1>',
    });

    expect(res.success).toBe(true);
    expect(res.provider).toBeDefined();
  });

  it('sendTransactionalEmail() rejects empty recipient', async () => {
    const res = await sendTransactionalEmail({
      to: '',
      subject: 'Test',
      html: '<p>Test</p>',
    });

    expect(res.success).toBe(false);
    expect(res.error).toContain('Recipient email address is required');
  });

  it('testSMTPConnection() sends test email successfully', async () => {
    const res = await testSMTPConnection('admin@testdomain.com', {
      enabled: true,
      provider: 'resend',
      senderEmail: 'test@rbtpracticeai.com',
      senderName: 'Test Sender',
    });
    expect(res.success).toBe(true);
    expect(res.latencyMs).toBeGreaterThanOrEqual(0);
  }, 20000);
});
