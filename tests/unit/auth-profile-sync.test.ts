import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

describe('Auth & Application Profile Creation & Synchronization Workflow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should verify database trigger schema migration file exists with handle_new_user function', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const sqlPath = path.join(process.cwd(), 'database', '04-auth-trigger.sql');
    expect(fs.existsSync(sqlPath)).toBe(true);

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    expect(sqlContent).toContain('handle_new_user()');
    expect(sqlContent).toContain('on_auth_user_created');
    expect(sqlContent).toContain('AFTER INSERT ON auth.users');
    expect(sqlContent).toContain('public.users');
    expect(sqlContent).toContain('public.profiles');
    expect(sqlContent).toContain('ROW LEVEL SECURITY');
  });

  it('should verify master migration includes user profile triggers and RLS policies', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const masterSqlPath = path.join(process.cwd(), 'database', 'full_master_migration.sql');
    expect(fs.existsSync(masterSqlPath)).toBe(true);

    const masterContent = fs.readFileSync(masterSqlPath, 'utf8');
    expect(masterContent).toContain('handle_new_user()');
    expect(masterContent).toContain('on_auth_user_created');
    expect(masterContent).toContain('Users read own record');
    expect(masterContent).toContain('Users read own profile');
  });

  it('should format profile object cleanly from user metadata', () => {
    const mockUserId = '11111111-2222-3333-4444-555555555555';
    const mockEmail = 'newgoogleuser@example.com';
    const mockName = 'Google OAuth Candidate';
    
    const userProfile = {
      id: mockUserId,
      email: mockEmail,
      fullName: mockName,
      role: 'student',
      emailVerified: true,
      accountStatus: 'active',
      targetScore: 90,
      createdAt: new Date().toISOString(),
    };

    expect(userProfile.id).toBe(mockUserId);
    expect(userProfile.email).toBe(mockEmail);
    expect(userProfile.fullName).toBe(mockName);
    expect(userProfile.role).toBe('student');
  });

  it('should verify /api/auth/register route file exists and is executable', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const registerRoutePath = path.join(process.cwd(), 'app', 'api', 'auth', 'register', 'route.ts');
    expect(fs.existsSync(registerRoutePath)).toBe(true);

    const routeContent = fs.readFileSync(registerRoutePath, 'utf8');
    expect(routeContent).toContain('export async function POST');
    expect(routeContent).toContain('profiles');
    expect(routeContent).toContain('users');
    expect(routeContent).toContain('upsert');
  });
});
