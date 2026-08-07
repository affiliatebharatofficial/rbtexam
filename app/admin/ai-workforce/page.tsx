'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getAllAIAgents,
  getAgentByRole,
  getWorkforceJobs,
  getWorkforceMetricsSummary,
  executeOrchestrationPipeline,
  updateAgentModelRouting,
} from '@/lib/ai-workforce-engine';
import { AIAgent, WorkforceJob, AgentRole, AIModelProvider, ModelName } from '@/types/ai-workforce';
import {
  Bot,
  Users,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  Play,
  Settings,
  DollarSign,
  TrendingUp,
  FileCheck,
  Search,
  Shield,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

type Tab = 'agents' | 'orchestration' | 'queue' | 'routing';
type DepartmentFilter = 'all' | 'content' | 'learning' | 'seo' | 'quality' | 'operations' | 'technical';

const DEPARTMENTS: DepartmentFilter[] = ['all', 'content', 'learning', 'seo', 'quality', 'operations', 'technical'];

const MODEL_OPTIONS: Array<{ provider: AIModelProvider; name: ModelName; label: string }> = [
  { provider: 'openai', name: 'gpt-4o', label: 'OpenAI · GPT-4o' },
  { provider: 'openai', name: 'gpt-4o-mini', label: 'OpenAI · GPT-4o Mini' },
  { provider: 'gemini', name: 'gemini-1.5-pro', label: 'Google · Gemini 1.5 Pro' },
  { provider: 'anthropic', name: 'claude-3-5-sonnet', label: 'Anthropic · Claude 3.5 Sonnet' },
  { provider: 'deepseek', name: 'deepseek-v3', label: 'DeepSeek · V3' },
  { provider: 'deepseek', name: 'deepseek-r1', label: 'DeepSeek · R1 Reasoning' },
];

export default function AdminAIWorkforcePage() {
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const [selectedDept, setSelectedDept] = useState<DepartmentFilter>('all');
  const [agents, setAgents] = useState<AIAgent[]>(getAllAIAgents());
  const [jobs, setJobs] = useState<WorkforceJob[]>(getWorkforceJobs());
  const [metrics, setMetrics] = useState(getWorkforceMetricsSummary());

  // Orchestration form state
  const [selectedPipeline, setSelectedPipeline] = useState<AgentRole[]>([
    'question_writer',
    'fact_checker',
    'grammar_reviewer',
    'seo_specialist',
    'content_reviewer',
  ]);
  const [categoryInput, setCategoryInput] = useState('Behavior Reduction');
  const [taskListInput, setTaskListInput] = useState('B-01 (Differential Reinforcement)');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeJobResult, setActiveJobResult] = useState<WorkforceJob | null>(null);

  // Model Routing Modal
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);

  const filteredAgents = selectedDept === 'all'
    ? agents
    : agents.filter((a) => a.department === selectedDept);

  const handleRunPipeline = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const job = executeOrchestrationPipeline(
        selectedPipeline,
        { category: categoryInput, taskListCode: taskListInput, targetCertification: 'RBT' },
        'content_queue'
      );
      setActiveJobResult(job);
      setJobs(getWorkforceJobs());
      setMetrics(getWorkforceMetricsSummary());
      setIsExecuting(false);
    }, 600);
  };

  const handleUpdateModel = (role: AgentRole, provider: AIModelProvider, name: ModelName) => {
    const updated = updateAgentModelRouting(role, provider, name);
    if (updated) {
      setAgents(getAllAIAgents());
      setEditingAgent(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge variant="purple" className="gap-1 mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>Multi-Agent System · 29 AI Employees</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Enterprise AI Workforce Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Centralized AI Employee orchestration directory. Specialized agents collaborating in automated pipelines across content generation, quality control, SEO optimization, and candidate learning support.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Scorecard Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'AI Employees', value: metrics.totalAgents, color: 'text-indigo-600' },
            { label: 'Active', value: metrics.activeAgentsCount, color: 'text-emerald-600' },
            { label: 'In Queue', value: metrics.pendingJobsInQueue, color: 'text-amber-600' },
            { label: 'Success Rate', value: `${metrics.overallSuccessRatePercentage}%`, color: 'text-emerald-600' },
            { label: 'Tokens (24h)', value: `${(metrics.totalTokenUsage24h / 1000).toFixed(0)}k`, color: 'text-[#2563EB]' },
            { label: 'Cost (24h)', value: `$${metrics.totalCost24hUSD}`, color: 'text-slate-900' },
          ].map((kpi) => (
            <Card key={kpi.label} glass className="p-4 text-center space-y-1 border-white/90 shadow-xl">
              <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
          {[
            { id: 'agents', label: `Agent Directory (${agents.length})`, icon: Users },
            { id: 'orchestration', label: 'Multi-Agent Orchestrator', icon: Layers },
            { id: 'queue', label: `Work Queues (${jobs.length})`, icon: Clock },
            { id: 'routing', label: 'Model Router & Cost', icon: Cpu },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1 — AGENT DIRECTORY */}
        {activeTab === 'agents' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Department Filter Bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-bold text-[10px] uppercase flex items-center space-x-1 mr-1">
                <Filter className="w-3 h-3" />
                <span>Department:</span>
              </span>
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all capitalize ${
                    selectedDept === dept
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} glass className="p-5 border-white/90 shadow-xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide font-mono">
                          {agent.department}
                        </span>
                        <h3 className="text-sm font-extrabold text-[#0F172A]">{agent.displayName}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${agent.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {agent.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{agent.description}</p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Model</span>
                      <span className="font-extrabold text-slate-800 font-mono">{agent.modelName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Success Rate</span>
                      <span className="font-extrabold text-emerald-600">{agent.successRatePercentage}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Processed</span>
                      <span className="font-mono text-slate-700">{agent.totalJobsProcessed} jobs (${agent.totalCostUSD.toFixed(2)})</span>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <Button
                        onClick={() => setEditingAgent(agent)}
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs font-bold gap-1"
                      >
                        <Settings className="w-3 h-3" />
                        <span>Route Model</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2 — MULTI-AGENT ORCHESTRATOR */}
        {activeTab === 'orchestration' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A]">Run Multi-Agent Collaboration Pipeline</h3>
                <p className="text-xs text-slate-500">
                  Trigger sequential agent pipeline: Question Writer → Fact Checker → Grammar Reviewer → SEO Specialist → Content Reviewer.
                </p>
              </div>

              {/* Pipeline Step Visualiser */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Active Pipeline Sequence (5 Agents):</label>
                <div className="flex items-center space-x-2 overflow-x-auto py-2">
                  {selectedPipeline.map((role, idx) => {
                    const agent = getAgentByRole(role);
                    return (
                      <React.Fragment key={role}>
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100 flex-shrink-0">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-xs font-extrabold text-indigo-900">{agent?.displayName || role}</div>
                            <div className="text-[9px] text-indigo-600 font-mono">{agent?.modelName}</div>
                          </div>
                        </div>
                        {idx < selectedPipeline.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Payload Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">BACB Category</label>
                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Task List Code</label>
                  <input
                    type="text"
                    value={taskListInput}
                    onChange={(e) => setTaskListInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <Button
                onClick={handleRunPipeline}
                variant="primary"
                size="md"
                className="gap-2 shadow-lg shadow-indigo-500/25"
                disabled={isExecuting}
              >
                {isExecuting ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{isExecuting ? 'Orchestrating Agents…' : 'Execute Multi-Agent Pipeline'}</span>
              </Button>

              {/* Active Execution Output */}
              {activeJobResult && (
                <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 space-y-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-indigo-900 font-mono">Job ID: {activeJobResult.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase">
                      {activeJobResult.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Agent Step Results:</div>
                    {activeJobResult.stepResults.map((step, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-indigo-100 flex items-start justify-between gap-4">
                        <div>
                          <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{getAgentByRole(step.agentRole)?.displayName}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5">{step.output}</p>
                        </div>
                        <div className="text-right flex-shrink-0 text-[10px] font-mono text-slate-500">
                          <div>Score: <span className="font-bold text-emerald-600">{step.score}/100</span></div>
                          <div>{step.latencyMs}ms · {step.tokensUsed} tokens</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* TAB 3 — WORK QUEUES */}
        {activeTab === 'queue' && (
          <div className="space-y-4 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">Active Work Queue & Job History</h3>
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#2563EB]">{job.id}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[9px] uppercase">{job.queueType}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[9px]">
                          {job.pipelineRoles.length} Agent Pipeline
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                        job.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {job.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed">{job.finalOutput}</p>
                    <div className="text-[10px] text-slate-400 font-mono">Created: {new Date(job.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 4 — MODEL ROUTER & COST CENTER */}
        {activeTab === 'routing' && (
          <div className="space-y-6 animate-fadeIn">
            <Card glass className="p-6 shadow-xl border-white/90 space-y-4">
              <h3 className="text-sm font-extrabold text-[#0F172A]">AI Model Provider Routing Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {['openai', 'gemini', 'anthropic', 'deepseek'].map((provider) => {
                  const providerAgents = agents.filter((a) => a.modelProvider === provider);
                  const providerCost = providerAgents.reduce((sum, a) => sum + a.totalCostUSD, 0);
                  return (
                    <div key={provider} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold uppercase text-slate-900">{provider}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[9px]">
                          {providerAgents.length} Agents
                        </span>
                      </div>
                      <div className="text-slate-500">Cumulative Cost: <span className="font-extrabold text-slate-900">${providerCost.toFixed(2)}</span></div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* MODEL ROUTING MODAL */}
        {editingAgent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <Card glass className="p-6 max-w-md w-full border-white/90 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0F172A]">Route Model: {editingAgent.displayName}</h3>
                <button onClick={() => setEditingAgent(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-700">Select LLM Provider & Model:</label>
                {MODEL_OPTIONS.map((opt) => (
                  <button
                    key={`${opt.provider}-${opt.name}`}
                    onClick={() => handleUpdateModel(editingAgent.role, opt.provider, opt.name)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                      editingAgent.modelName === opt.name
                        ? 'border-indigo-600 bg-indigo-50/60 font-bold text-indigo-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {editingAgent.modelName === opt.name && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>
                ))}
              </div>

              <Button onClick={() => setEditingAgent(null)} variant="secondary" size="sm" className="w-full">
                Cancel
              </Button>
            </Card>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
