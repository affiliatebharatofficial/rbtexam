import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Legal, Refund & Payment Compliance Pages Suite', () => {
  it('should verify /refund-policy page exists and contains subscription & refund disclosures', () => {
    const refundPagePath = path.join(process.cwd(), 'app', 'refund-policy', 'page.tsx');
    expect(fs.existsSync(refundPagePath)).toBe(true);

    const content = fs.readFileSync(refundPagePath, 'utf-8');
    expect(content).toContain('Refund & Cancellation Policy');
    expect(content).toContain('Subscription Plans & When Billing Occurs');
    expect(content).toContain('7-Day Free Trial Policy');
    expect(content).toContain('How to Cancel Your Subscription');
    expect(content).toContain('Refund Eligibility Criteria');
    expect(content).toContain('Pass-or-Refund Guarantee');
    expect(content).toContain('PCI-DSS');
    expect(content).toContain('hello@rbtpracticeai.com');
  });

  it('should verify /disclaimer page exists and contains BACB non-affiliation & AI disclosures', () => {
    const disclaimerPath = path.join(process.cwd(), 'app', 'disclaimer', 'page.tsx');
    expect(fs.existsSync(disclaimerPath)).toBe(true);

    const content = fs.readFileSync(disclaimerPath, 'utf-8');
    expect(content).toContain('Educational Disclaimer');
    expect(content).toContain('Behavior Analyst Certification Board');
    expect(content).toContain('NOT affiliated with');
    expect(content).toContain('Original Educational Content');
    expect(content).toContain('No Unauthorized Exam Content');
    expect(content).toContain('AI-Generated Educational Assistance Disclosure');
  });

  it('should verify /terms page exists and contains user obligations & refund cross-links', () => {
    const termsPath = path.join(process.cwd(), 'app', 'terms', 'page.tsx');
    expect(fs.existsSync(termsPath)).toBe(true);

    const content = fs.readFileSync(termsPath, 'utf-8');
    expect(content).toContain('Terms of Service');
    expect(content).toContain('/refund-policy');
    expect(content).toContain('/guarantee-terms');
    expect(content).toContain('/privacy');
    expect(content).toContain('State of Delaware');
    expect(content).toContain('Limitation of Liability');
  });

  it('should verify /privacy page exists and complies with GDPR/CCPA disclosure standards', () => {
    const privacyPath = path.join(process.cwd(), 'app', 'privacy', 'page.tsx');
    expect(fs.existsSync(privacyPath)).toBe(true);

    const content = fs.readFileSync(privacyPath, 'utf-8');
    expect(content).toContain('Privacy Policy');
    expect(content).toContain('Information We Collect');
    expect(content).toContain('PCI-DSS Level 1');
    expect(content).toContain('AES-256');
    expect(content).toContain('GDPR & CCPA Compliance');
    expect(content).toContain('Right to Erasure');
  });

  it('should verify sitemap includes /refund-policy and legal routes', () => {
    const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
    const content = fs.readFileSync(sitemapPath, 'utf-8');

    expect(content).toContain('${baseUrl}/refund-policy');
    expect(content).toContain('${baseUrl}/disclaimer');
    expect(content).toContain('${baseUrl}/terms');
    expect(content).toContain('${baseUrl}/privacy');
    expect(content).toContain('${baseUrl}/contact');
    expect(content).toContain('${baseUrl}/guarantee-terms');
  });

  it('should verify Footer includes links to all legal pages', () => {
    const footerPath = path.join(process.cwd(), 'components', 'layout', 'footer.tsx');
    const content = fs.readFileSync(footerPath, 'utf-8');

    expect(content).toContain('href="/privacy"');
    expect(content).toContain('href="/terms"');
    expect(content).toContain('href="/refund-policy"');
    expect(content).toContain('href="/guarantee-terms"');
    expect(content).toContain('href="/disclaimer"');
    expect(content).toContain('href="/contact"');
  });

  it('should verify PricingSection contains pre-checkout compliance disclosures', () => {
    const pricingPath = path.join(process.cwd(), 'components', 'landing', 'pricing-section.tsx');
    const content = fs.readFileSync(pricingPath, 'utf-8');

    expect(content).toContain('USD');
    expect(content).toContain('Automatic renewal');
    expect(content).toContain('Cancel anytime');
    expect(content).toContain('href="/terms"');
    expect(content).toContain('href="/privacy"');
    expect(content).toContain('href="/refund-policy"');
  });
});
