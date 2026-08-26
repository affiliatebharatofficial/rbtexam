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
        provider: 'smtp_relay',
        host: 'smtp.gmail.com',
        port: 465,
        senderName: 'RBT Practice Pro',
        senderEmail: 'support@rbtpracticeai.com',
      },
      'Test Admin'
    );

    expect(updated.senderName).toBe('RBT Practice Pro');
    expect(updated.senderEmail).toBe('support@rbtpracticeai.com');
    expect(updated.provider).toBe('smtp_relay');
    expect(updated.host).toBe('smtp.gmail.com');
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

  it('testSMTPConnection() returns diagnostics when unconfigured or empty credentials provided', async () => {
    const res = await testSMTPConnection('admin@testdomain.com', {
      enabled: true,
      provider: 'resend',
      apiKey: '',
      password: '',
      senderEmail: 'test@rbtpracticeai.com',
      senderName: 'Test Sender',
    });

    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});

