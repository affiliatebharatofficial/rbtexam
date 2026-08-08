/**
 * RBT Practice Questions - Release Management & Go-Live Engine Types
 * Strict Enterprise Type Definitions
 */

export type ReleaseEnvironment =
  | 'development'
  | 'staging'
  | 'private_beta'
  | 'public_beta'
  | 'production'
  | 'hotfix';

export type ReleaseType = 'major' | 'minor' | 'patch' | 'hotfix' | 'emergency';

export type ReleaseStatus =
  | 'draft'
  | 'pending_validation'
  | 'approved'
  | 'deploying'
  | 'deployed'
  | 'rolled_back'
  | 'failed';

export type DeploymentStatus =
  | 'queued'
  | 'validating'
  | 'in_progress'
  | 'successful'
  | 'failed'
  | 'rolled_back';

export interface Release {
  id: string;
  version: string;
  name: string;
  releaseType: ReleaseType;
  environment: ReleaseEnvironment;
  status: ReleaseStatus;
  description?: string;
  releaseNotes?: string;
  breakingChanges?: string;
  migrationNotes?: string;
  releaseDate?: string;
  deployedBy?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deployment {
  id: string;
  releaseId: string;
  environment: ReleaseEnvironment;
  deploymentStatus: DeploymentStatus;
  commitSha?: string;
  buildNumber?: string;
  triggeredBy?: string;
  verificationReport?: Record<string, any>;
  startedAt: string;
  completedAt?: string;
}

export type FlagStatus = 'enabled' | 'disabled' | 'percentage' | 'targeted';
export type FlagType = 'boolean' | 'string' | 'json' | 'percentage';

export interface TargetingRule {
  betaOnly?: boolean;
  internalOnly?: boolean;
  premiumOnly?: boolean;
  allowedRoles?: string[];
  allowedCountries?: string[];
  percentageRollout?: number; // 0 to 100
  startTime?: string | null;
  endTime?: string | null;
}

export interface FeatureFlag {
  id: string;
  flagKey: string;
  name: string;
  description?: string;
  status: FlagStatus;
  flagType: FlagType;
  targetingRules: TargetingRule;
  fallbackValue: any;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureEvaluationContext {
  userId?: string;
  role?: string;
  email?: string;
  country?: string;
  isBetaUser?: boolean;
  isInternal?: boolean;
  isPremium?: boolean;
}

export interface LaunchChecklistItem {
  id: string;
  name: string;
  category:
    | 'Build'
    | 'TypeScript'
    | 'ESLint'
    | 'Tests'
    | 'SEO'
    | 'Accessibility'
    | 'Performance'
    | 'Security'
    | 'Environment'
    | 'Database'
    | 'API'
    | 'Email'
    | 'AI'
    | 'Stripe'
    | 'Supabase'
    | 'Storage'
    | 'Workers'
    | 'Cron';
  status: 'passed' | 'failed' | 'warning' | 'skipped';
  message: string;
  details?: string;
  executionTimeMs: number;
}

export interface ValidationResult {
  passed: boolean;
  score: number; // 0 - 100
  passedCount: number;
  failedCount: number;
  warningCount: number;
  totalChecks: number;
  items: LaunchChecklistItem[];
  timestamp: string;
  environment: ReleaseEnvironment;
}

export type SubsystemStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface SubsystemHealth {
  name: string;
  category:
    | 'application'
    | 'api'
    | 'database'
    | 'storage'
    | 'auth'
    | 'billing'
    | 'ai_providers'
    | 'email'
    | 'workers'
    | 'queues'
    | 'webhooks';
  status: SubsystemStatus;
  latencyMs: number;
  message: string;
  lastCheckedAt: string;
}

export interface DeepHealthReport {
  overall: SubsystemStatus;
  version: string;
  environment: ReleaseEnvironment;
  uptimeSeconds: number;
  timestamp: string;
  subsystems: SubsystemHealth[];
}

export type BetaUserStatus = 'invited' | 'active' | 'suspended' | 'graduated';
export type BetaGroup = 'internal_testers' | 'early_access' | 'power_users' | 'enterprise_beta' | 'general';

export interface BetaUser {
  id: string;
  userId?: string;
  email: string;
  betaCode?: string;
  status: BetaUserStatus;
  betaGroup: BetaGroup;
  joinedAt: string;
  feedbackCount: number;
  lastActiveAt?: string;
}

export interface BetaInvite {
  id: string;
  code: string;
  email?: string;
  betaGroup: BetaGroup;
  maxUses: number;
  currentUses: number;
  expiresAt?: string;
  createdBy?: string;
  createdAt: string;
}

export type FeedbackType = 'feedback' | 'bug_report' | 'feature_request' | 'performance_issue';

export interface BetaFeedback {
  id: string;
  userId?: string;
  email?: string;
  feedbackType: FeedbackType;
  title: string;
  description: string;
  rating?: number;
  screenshotUrl?: string;
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  createdAt: string;
}

export type ErrorSeverity = 'warning' | 'error' | 'critical' | 'fatal';

export interface CrashReport {
  id: string;
  userId?: string;
  errorName: string;
  errorMessage: string;
  stackTrace?: string;
  severity: ErrorSeverity;
  componentStack?: string;
  environment: ReleaseEnvironment;
  metadata?: Record<string, any>;
  status: 'unresolved' | 'investigating' | 'resolved' | 'ignored';
  createdAt: string;
}

export type RollbackType = 'application' | 'database' | 'feature' | 'configuration' | 'full_release';

export interface RollbackRecord {
  id: string;
  releaseId?: string;
  deploymentId?: string;
  rollbackType: RollbackType;
  targetVersion: string;
  reason: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  executedBy?: string;
  details?: Record<string, any>;
  executedAt: string;
}

export interface MaintenanceState {
  isMaintenanceMode: boolean;
  isReadOnlyMode: boolean;
  isEmergencyBannerActive: boolean;
  emergencyBannerMessage?: string;
  allowedIpAddresses?: string[];
  redirectUrl?: string;
  updatedAt: string;
}

export interface ChangelogEntry {
  version: string;
  releaseDate: string;
  title: string;
  summary: string;
  features: string[];
  bugFixes: string[];
  breakingChanges: string[];
  migrationNotes: string[];
  knownIssues: string[];
}
