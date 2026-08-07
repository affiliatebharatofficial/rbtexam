import { describe, it, expect } from 'vitest';
import { getPlatformConfig, updatePlatformConfig } from '@/lib/platform-config';

describe('Super Admin Platform Configuration Settings', () => {
  it('should initialize with complete Stripe, SMTP, Branding, and Landing CMS defaults', () => {
    const config = getPlatformConfig();
    expect(config.stripe).toBeDefined();
    expect(config.stripe.environment).toBe('live');
    expect(config.smtp).toBeDefined();
    expect(config.smtp.host).toBe('smtp.sendgrid.net');
    expect(config.companyName).toBe('RBTTrainingAI Inc.');
    expect(config.landing).toBeDefined();
    expect(config.landing.heroTitle).toContain('BACB RBT');
    expect(config.language.defaultLocale).toBe('en-US');
  });

  it('should update Stripe configuration dynamically', () => {
    updatePlatformConfig('stripe', {
      publishableKey: 'pk_test_updated_123',
      secretKeyMasked: 'sk_test_updated_456',
      webhookSecretMasked: 'whsec_test_789',
      environment: 'test',
      currency: 'USD',
    });

    const updated = getPlatformConfig();
    expect(updated.stripe.publishableKey).toBe('pk_test_updated_123');
    expect(updated.stripe.environment).toBe('test');
  });

  it('should update Landing CMS headline dynamically', () => {
    updatePlatformConfig('landing', {
      heroTitle: 'New Dynamic Hero Headline for BACB Exam',
      heroSubtitle: 'Updated dynamic subtext',
      ctaButtonText: 'Join Now',
    });

    const updated = getPlatformConfig();
    expect(updated.landing.heroTitle).toBe('New Dynamic Hero Headline for BACB Exam');
  });
});
