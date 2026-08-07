import '@testing-library/jest-dom';
import { vi, afterEach, beforeAll, afterAll } from 'vitest';

// ─── Global Mocks ────────────────────────────────────────────────────────────

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
    query: {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const React = require('react');
    return React.createElement('a', { href }, children);
  },
}));

// Mock environment variables
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key');
vi.stubEnv('OPENAI_API_KEY', 'sk-test-key');

// ─── Cleanup ─────────────────────────────────────────────────────────────────
afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});

// ─── Console filtering (suppress noisy Next.js warnings in tests) ─────────────
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('ReactDOMTestUtils') || args[0].includes('Warning:'))
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});
afterAll(() => {
  console.error = originalConsoleError;
});
