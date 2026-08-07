import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    environment: 'jsdom',

    // Setup files run before each test suite
    setupFiles: ['./tests/setup.ts'],

    // Global test utilities (describe, it, expect, etc.)
    globals: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      thresholds: {
        global: {
          branches: 80,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '.next/**',
        'public/**',
      ],
      include: ['lib/**', 'types/**', 'app/api/**', 'components/**'],
    },

    // Test file patterns
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx', 'tests/**/*.spec.ts'],
    exclude: ['node_modules', '.next', 'tests/e2e/**'],

    // Timeout per test
    testTimeout: 10000,
    hookTimeout: 10000,

    // Reporters
    reporters: ['verbose', 'json', 'html'],
    outputFile: {
      json: './tests/reports/test-results.json',
      html: './tests/reports/test-report.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
