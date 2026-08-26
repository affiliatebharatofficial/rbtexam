import { describe, it, expect } from 'vitest';
import { isEmailAdmin, ADMIN_EMAILS } from '@/lib/admin-whitelist';

describe('Admin User Deletion & Whitelist Protection', () => {
  it('should identify protected administrator accounts', () => {
    expect(isEmailAdmin('jobpegyan@gmail.com')).toBe(true);
    expect(isEmailAdmin('JOBPEGYAN@GMAIL.COM')).toBe(true);
    expect(isEmailAdmin('manorhub533@gmail.com')).toBe(true);
    expect(isEmailAdmin('affiliatebharatofficial@gmail.com')).toBe(true);
  });

  it('should not mark standard candidate emails as admin', () => {
    expect(isEmailAdmin('student@example.com')).toBe(false);
    expect(isEmailAdmin('testuser@gmail.com')).toBe(false);
    expect(isEmailAdmin('')).toBe(false);
    expect(isEmailAdmin(null)).toBe(false);
  });

  it('should protect all listed admin accounts in ADMIN_EMAILS', () => {
    ADMIN_EMAILS.forEach((email) => {
      expect(isEmailAdmin(email)).toBe(true);
    });
  });
});
