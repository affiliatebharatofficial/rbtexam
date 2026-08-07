/**
 * Unit Tests — Enterprise AI Workforce System (lib/ai-workforce-engine.ts)
 */

import { describe, it, expect } from 'vitest';
import {
  getAllAIAgents,
  getAgentByRole,
  executeOrchestrationPipeline,
  getWorkforceMetricsSummary,
  updateAgentModelRouting,
  getWorkforceJobs,
} from '@/lib/ai-workforce-engine';
import { AgentRole } from '@/types/ai-workforce';

describe('getAllAIAgents()', () => {
  it('returns all 29 specialized AI employees', () => {
    const agents = getAllAIAgents();
    expect(Array.isArray(agents)).toBe(true);
    expect(agents.length).toBe(29);
  });

  it('each agent has role, displayName, modelProvider, modelName, and department', () => {
    getAllAIAgents().forEach((agent) => {
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('role');
      expect(agent).toHaveProperty('displayName');
      expect(agent).toHaveProperty('modelProvider');
      expect(agent).toHaveProperty('modelName');
      expect(agent).toHaveProperty('department');
    });
  });
});

describe('getAgentByRole()', () => {
  it('retrieves question_writer agent', () => {
    const agent = getAgentByRole('question_writer');
    expect(agent).toBeDefined();
    expect(agent?.displayName).toContain('Question Writer');
  });

  it('returns undefined for non-existent role', () => {
    const agent = getAgentByRole('fake_role_xyz' as AgentRole);
    expect(agent).toBeUndefined();
  });
});

describe('executeOrchestrationPipeline()', () => {
  it('executes a multi-agent pipeline and returns a job', () => {
    const pipeline: AgentRole[] = ['question_writer', 'fact_checker', 'grammar_reviewer'];
    const job = executeOrchestrationPipeline(pipeline, { category: 'Measurement' });

    expect(job).toHaveProperty('id');
    expect(job.pipelineRoles).toEqual(pipeline);
    expect(job.stepResults.length).toBe(3);
    expect(job.status).toBe('in_review'); // because question_writer requires human approval
  });

  it('each step result has latency, token count, and cost', () => {
    const job = executeOrchestrationPipeline(['seo_specialist', 'grammar_reviewer'], { category: 'Ethics' });
    job.stepResults.forEach((step) => {
      expect(step.latencyMs).toBeGreaterThan(0);
      expect(step.tokensUsed).toBeGreaterThan(0);
      expect(step.costUSD).toBeGreaterThanOrEqual(0);
    });
  });

  it('adds job to the workforce job queue', () => {
    const countBefore = getWorkforceJobs().length;
    executeOrchestrationPipeline(['flashcard_writer'], { category: 'Test' });
    expect(getWorkforceJobs().length).toBe(countBefore + 1);
  });
});

describe('updateAgentModelRouting()', () => {
  it('updates agent model provider and name', () => {
    const updated = updateAgentModelRouting('seo_specialist', 'deepseek', 'deepseek-v3');
    expect(updated).toBeDefined();
    expect(updated?.modelProvider).toBe('deepseek');
    expect(updated?.modelName).toBe('deepseek-v3');
  });

  it('returns undefined for unknown agent role', () => {
    const result = updateAgentModelRouting('unknown_role' as AgentRole, 'openai', 'gpt-4o');
    expect(result).toBeUndefined();
  });
});

describe('getWorkforceMetricsSummary()', () => {
  it('returns summary with totalAgents = 29', () => {
    const summary = getWorkforceMetricsSummary();
    expect(summary.totalAgents).toBe(29);
    expect(summary.activeAgentsCount).toBeGreaterThan(0);
    expect(summary.overallSuccessRatePercentage).toBeGreaterThan(90);
  });
});
