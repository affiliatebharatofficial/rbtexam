/**
 * Unit Tests — Master Project Brain (lib/project-brain-engine.ts)
 */

import { describe, it, expect } from 'vitest';
import {
  getProjectBrainOverview,
  getFeatureRegistry,
  getAPIRegistry,
  getDatabaseRegistry,
  getEngineDependencyGraph,
} from '@/lib/project-brain-engine';

describe('getProjectBrainOverview()', () => {
  it('returns valid overview metrics with positive counts', () => {
    const overview = getProjectBrainOverview();
    expect(overview.totalFeatures).toBeGreaterThan(0);
    expect(overview.totalEngines).toBeGreaterThan(0);
    expect(overview.totalAPIRoutes).toBeGreaterThan(0);
    expect(overview.totalDatabaseTables).toBeGreaterThan(0);
    expect(overview.totalDocsFiles).toBeGreaterThan(0);
    expect(overview.implementationCompletionPercentage).toBe(100);
    expect(overview.systemHealthScore).toBeGreaterThan(90);
  });
});

describe('getFeatureRegistry()', () => {
  it('returns feature registry array with required properties', () => {
    const features = getFeatureRegistry();
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);

    features.forEach((feat) => {
      expect(feat).toHaveProperty('id');
      expect(feat).toHaveProperty('name');
      expect(feat).toHaveProperty('owner');
      expect(feat).toHaveProperty('version');
      expect(feat).toHaveProperty('status');
      expect(feat.status).toBe('production');
      expect(feat).toHaveProperty('documentationPath');
    });
  });
});

describe('getAPIRegistry()', () => {
  it('returns API registry array', () => {
    const apis = getAPIRegistry();
    expect(Array.isArray(apis)).toBe(true);
    expect(apis.length).toBeGreaterThan(0);

    apis.forEach((api) => {
      expect(api).toHaveProperty('endpoint');
      expect(api).toHaveProperty('method');
      expect(api).toHaveProperty('authentication');
      expect(api).toHaveProperty('consumerModules');
    });
  });
});

describe('getDatabaseRegistry()', () => {
  it('returns database registry array with RLS flags', () => {
    const db = getDatabaseRegistry();
    expect(Array.isArray(db)).toBe(true);
    expect(db.length).toBeGreaterThan(0);

    db.forEach((table) => {
      expect(table).toHaveProperty('tableName');
      expect(table).toHaveProperty('schema');
      expect(table).toHaveProperty('hasRLS');
    });
  });
});

describe('getEngineDependencyGraph()', () => {
  it('returns engine dependency nodes', () => {
    const graph = getEngineDependencyGraph();
    expect(Array.isArray(graph)).toBe(true);
    expect(graph.length).toBeGreaterThan(0);

    graph.forEach((node) => {
      expect(node).toHaveProperty('engineName');
      expect(node).toHaveProperty('fileLocation');
      expect(node).toHaveProperty('consumedBy');
    });
  });
});
