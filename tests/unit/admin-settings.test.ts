import { describe, it, expect } from 'vitest';
import { getPlatformConfig, updatePlatformConfig, isPricingSectionVisible, isFreeAccessActive } from '@/lib/platform-config';

describe('Super Admin Platform Configuration Settings', () => {
  it('should initialize with complete Lemon Squeezy, SMTP, Branding, and Landing CMS defaults', () => {
    const config = getPlatformConfig();
    expect(config.lemonSqueezy).toBeDefined();
    expect(config.lemonSqueezy.environment).toBe('live');
    expect(config.smtp).toBeDefined();
    expect(config.smtp.host).toBe('smtp.sendgrid.net');
    expect(config.companyName).toBe('RBT Practice AI Inc.');
    expect(config.landing).toBeDefined();
    expect(config.landing.heroTitle).toContain('RBT Exam');
    expect(config.language.defaultLocale).toBe('en-US');
  });

  it('should update Lemon Squeezy configuration dynamically', () => {
    updatePlatformConfig('lemonSqueezy', {
      storeId: '123456',
      apiKeyMasked: 'ls_api_test_updated_123',
      webhookSecretMasked: 'ls_whsec_test_789',
      environment: 'test',
      currency: 'USD',
    });

    const updated = getPlatformConfig();
    expect(updated.lemonSqueezy.storeId).toBe('123456');
    expect(updated.lemonSqueezy.environment).toBe('test');
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

  it('should support dynamic Landing Page Pricing Section hide/show toggle', () => {
    // Hide pricing section
    updatePlatformConfig('showPricingSection', false, 'Super Admin');
    expect(isPricingSectionVisible()).toBe(false);
    expect(getPlatformConfig().showPricingSection).toBe(false);

    // Show pricing section
    updatePlatformConfig('showPricingSection', true, 'Super Admin');
    expect(isPricingSectionVisible()).toBe(true);
    expect(getPlatformConfig().showPricingSection).toBe(true);
  });

  it('should support Free Access Mode (Sabke Liye Free) master switch', () => {
    updatePlatformConfig('freeAccessMode', true, 'Super Admin');
    expect(isFreeAccessActive()).toBe(true);
  });
});
