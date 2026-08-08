import { describe, it, expect } from 'vitest';
import {
  evaluateFeatureFlag,
  getAllFeatureFlags,
  upsertFeatureFlag,
  runPreLaunchValidation,
  runDeepSystemHealthCheck,
  validateBetaInviteCode,
  redeemBetaInvite,
  submitBetaFeedback,
  logCrashReport,
  getMaintenanceState,
  updateMaintenanceState,
  executeRollback,
  generateChangelogMarkdown,
  createRelease,
} from '@/lib/release-management-engine';

describe('Production Launch & Go-Live Engine', () => {
  it('should evaluate feature flags accurately based on targeting rules', () => {
    // Enabled Flag
    const isAdaptiveOn = evaluateFeatureFlag('adaptive_learning_v2');
    expect(isAdaptiveOn).toBe(true);

    // Beta / Role Targeted Flag
    const voiceForStandardUser = evaluateFeatureFlag('ai_tutor_voice', { role: 'student', isBetaUser: false });
    expect(voiceForStandardUser).toBe(false);

    const voiceForBetaAdmin = evaluateFeatureFlag('ai_tutor_voice', { role: 'admin', isBetaUser: true });
    expect(voiceForBetaAdmin).toBe(true);

    // Non-existent Flag
    const isUnknownOn = evaluateFeatureFlag('unknown_flag');
    expect(isUnknownOn).toBe(false);
  });

  it('should create and update feature flags dynamically', () => {
    const newFlag = upsertFeatureFlag({
      flagKey: 'experimental_dark_theme',
      name: 'Experimental Dark Theme',
      status: 'enabled',
    });
    expect(newFlag.flagKey).toBe('experimental_dark_theme');

    const flags = getAllFeatureFlags();
    expect(flags.some((f) => f.flagKey === 'experimental_dark_theme')).toBe(true);
  });

  it('should execute 20-Point Pre-Launch Validation Matrix with high pass score', async () => {
    const report = await runPreLaunchValidation('production');
    expect(report.totalChecks).toBe(20);
    expect(report.passed).toBe(true);
    expect(report.score).toBeGreaterThanOrEqual(90);
    expect(report.passedCount).toBe(20);
  });

  it('should run deep 11-subsystem health diagnostics', async () => {
    const health = await runDeepSystemHealthCheck('production');
    expect(health.subsystems.length).toBe(11);
    expect(health.overall).toBe('healthy');
  });

  it('should validate and redeem beta invite codes', () => {
    const validCheck = validateBetaInviteCode('RBTBETA2026');
    expect(validCheck.valid).toBe(true);

    const invalidCheck = validateBetaInviteCode('INVALIDCODE');
    expect(invalidCheck.valid).toBe(false);

    const redemption = redeemBetaInvite('RBTBETA2026', 'tester@example.com');
    expect(redemption.success).toBe(true);
    expect(redemption.user?.email).toBe('tester@example.com');
  });

  it('should handle beta feedback submission and crash reports', () => {
    const fb = submitBetaFeedback({
      title: 'Practice test feedback',
      description: 'The instant feedback feature is brilliant!',
      feedbackType: 'feedback',
      rating: 5,
    });
    expect(fb.id).toBeDefined();

    const crash = logCrashReport({
      errorName: 'NetworkError',
      errorMessage: 'Failed to fetch model weights',
      severity: 'error',
      environment: 'production',
    });
    expect(crash.id).toBeDefined();
  });

  it('should toggle maintenance state and execute single-click rollbacks', () => {
    const updatedMaint = updateMaintenanceState({ isMaintenanceMode: true });
    expect(updatedMaint.isMaintenanceMode).toBe(true);

    const rollback = executeRollback('2.7.0', 'full_release', 'Regression in API route');
    expect(rollback.targetVersion).toBe('2.7.0');
    expect(rollback.status).toBe('completed');
  });

  it('should create release candidates and generate SemVer changelog markdown', () => {
    const rel = createRelease({
      version: '3.0.0',
      name: 'Major Go-Live Engine Release',
      releaseType: 'major',
      environment: 'production',
      status: 'deployed',
    });
    expect(rel.version).toBe('3.0.0');

    const changelog = generateChangelogMarkdown({
      version: '3.0.0',
      releaseDate: new Date().toISOString(),
      title: 'Major Go-Live Engine Release',
      summary: 'Production readiness layer integrated.',
      features: ['20-point validation matrix', 'Feature flags'],
      bugFixes: ['Zero downtime deployment checks'],
      breakingChanges: [],
      migrationNotes: ['Ran launch-engine-schema.sql'],
      knownIssues: [],
    });

    expect(changelog).toContain('# RBT Practice Questions Release Notes - v3.0.0');
    expect(changelog).toContain('20-point validation matrix');
  });
});
