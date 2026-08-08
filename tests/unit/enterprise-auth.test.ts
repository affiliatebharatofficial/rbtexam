import { describe, it, expect, beforeEach } from 'vitest';
import { getPlatformConfig, updatePlatformConfig } from '../../lib/platform-config';

describe('Enterprise Authentication & Security Safeguards', () => {
  beforeEach(() => {
    // Reset default configuration
    updatePlatformConfig('allowNewRegistration', true);
    updatePlatformConfig('inviteOnlyMode', false);
    updatePlatformConfig('allowedEmailDomains', []);
    updatePlatformConfig('requireAdminApproval', false);
  });

  it('should maintain configuration flags for admin registration controls', () => {
    const config = getPlatformConfig();
    expect(config.allowNewRegistration).toBe(true);
    expect(config.inviteOnlyMode).toBe(false);
    expect(config.allowedEmailDomains).toEqual([]);
    expect(config.requireAdminApproval).toBe(false);
  });

  it('should allow toggling allowNewRegistration to false', () => {
    updatePlatformConfig('allowNewRegistration', false);
    const config = getPlatformConfig();
    expect(config.allowNewRegistration).toBe(false);
  });

  it('should allow setting allowedEmailDomains whitelist', () => {
    updatePlatformConfig('allowedEmailDomains', ['gmail.com', 'rbtpracticequestions.com']);
    const config = getPlatformConfig();
    expect(config.allowedEmailDomains).toEqual(['gmail.com', 'rbtpracticequestions.com']);
  });

  it('should allow enabling inviteOnlyMode', () => {
    updatePlatformConfig('inviteOnlyMode', true);
    const config = getPlatformConfig();
    expect(config.inviteOnlyMode).toBe(true);
  });

  it('should allow enabling requireAdminApproval', () => {
    updatePlatformConfig('requireAdminApproval', true);
    const config = getPlatformConfig();
    expect(config.requireAdminApproval).toBe(true);
  });
});
