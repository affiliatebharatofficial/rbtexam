'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MaintenanceBanner } from '@/components/release/maintenance-banner';
import { ProtectedRoute } from '@/components/auth/protected-route';
import {
  Release,
  FeatureFlag,
  ValidationResult,
  DeepHealthReport,
  MaintenanceState,
  RollbackRecord,
  BetaFeedback,
} from '@/types/release-management';

export default function AdminLaunchControlPage() {
  const [activeTab, setActiveTab] = useState<
    'releases' | 'validation' | 'flags' | 'health' | 'beta' | 'emergency' | 'changelog'
  >('releases');

  const [releases, setReleases] = useState<Release[]>([]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [validationReport, setValidationReport] = useState<ValidationResult | null>(null);
  const [healthReport, setHealthReport] = useState<DeepHealthReport | null>(null);
  const [maintenanceState, setMaintenanceState] = useState<MaintenanceState>({
    isMaintenanceMode: false,
    isReadOnlyMode: false,
    isEmergencyBannerActive: false,
    emergencyBannerMessage: 'Platform maintenance scheduled.',
    updatedAt: new Date().toISOString(),
  });
  const [rollbackLogs, setRollbackLogs] = useState<RollbackRecord[]>([]);
  const [betaFeedbacks, setBetaFeedbacks] = useState<BetaFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Release Form
  const [newVersion, setNewVersion] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'major' | 'minor' | 'patch' | 'hotfix'>('minor');

  // Rollback Form
  const [rollbackVersion, setRollbackVersion] = useState('2.7.0');
  const [rollbackReason, setRollbackReason] = useState('');

  // Feature Flag Form
  const [flagKey, setFlagKey] = useState('');
  const [flagName, setFlagName] = useState('');
  const [flagStatus, setFlagStatus] = useState<'enabled' | 'disabled' | 'targeted'>('enabled');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [relRes, flagRes, healthRes, maintRes, rollbackRes, betaRes] = await Promise.all([
        fetch('/api/v1/release-management/releases').then((r) => r.json() as Promise<any>),
        fetch('/api/v1/release-management/feature-flags').then((r) => r.json() as Promise<any>),
        fetch('/api/v1/health/system').then((r) => r.json() as Promise<any>),
        fetch('/api/v1/release-management/maintenance').then((r) => r.json() as Promise<any>),
        fetch('/api/v1/release-management/rollback').then((r) => r.json() as Promise<any>),
        fetch('/api/v1/beta/invites').then((r) => r.json() as Promise<any>),
      ]);

      if (relRes && relRes.success) setReleases(relRes.data);
      if (flagRes && flagRes.success) setFeatureFlags(flagRes.data);
      if (healthRes && healthRes.success) setHealthReport(healthRes.report);
      if (maintRes && maintRes.success) setMaintenanceState(maintRes.state);
      if (rollbackRes && rollbackRes.success) setRollbackLogs(rollbackRes.logs);
      if (betaRes && betaRes.success) setBetaFeedbacks(betaRes.feedbacks);
    } catch (err) {
      console.error('Failed to load launch control data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunValidation = async () => {
    setLoading(true);
    setStatusMessage('Running 20-Point Pre-Launch Validation Matrix...');
    try {
      const res = await fetch('/api/v1/release-management/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ environment: 'production' }),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setValidationReport(data.report);
        setStatusMessage('Validation matrix run complete!');
      }
    } catch (err) {
      setStatusMessage('Validation failed to execute.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersion || !newName) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/release-management/releases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: newVersion,
          name: newName,
          description: newDescription,
          releaseType: newType,
        }),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setStatusMessage(`Release v${newVersion} created successfully!`);
        setNewVersion('');
        setNewName('');
        setNewDescription('');
        fetchInitialData();
      }
    } catch (err) {
      setStatusMessage('Failed to create release.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFlag = async (flag: FeatureFlag) => {
    const nextStatus = flag.status === 'enabled' ? 'disabled' : 'enabled';
    try {
      const res = await fetch('/api/v1/release-management/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...flag, status: nextStatus }),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setFeatureFlags((prev) => prev.map((f) => (f.id === flag.id ? data.flag : f)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagKey || !flagName) return;
    try {
      const res = await fetch('/api/v1/release-management/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flagKey,
          name: flagName,
          status: flagStatus,
          flagType: 'boolean',
          targetingRules: { percentageRollout: 100 },
        }),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setFlagKey('');
        setFlagName('');
        fetchInitialData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteRollback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollbackReason) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/release-management/rollback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetVersion: rollbackVersion,
          rollbackType: 'full_release',
          reason: rollbackReason,
        }),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setStatusMessage(`Rollback to v${rollbackVersion} completed.`);
        setRollbackReason('');
        fetchInitialData();
      }
    } catch (err) {
      setStatusMessage('Rollback failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMaintenance = async (updates: Partial<MaintenanceState>) => {
    try {
      const res = await fetch('/api/v1/release-management/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = (await res.json()) as any;
      if (data && data.success) {
        setMaintenanceState(data.state);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Emergency Banner Header if Active */}
      {maintenanceState.isEmergencyBannerActive && (
        <MaintenanceBanner
          message={maintenanceState.emergencyBannerMessage}
          isEmergency={maintenanceState.isMaintenanceMode}
        />
      )}

      {/* Main Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-lg sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              🚀
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Launch Control & Go-Live CMS
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v2.8.0 Enterprise
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Production Readiness, Beta Deployments, Feature Flags & Emergency Controls
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <span>&larr;</span>
              <span>Back to Admin CMS</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <span>Go to Dashboard</span>
            </Link>

            <button
              onClick={handleRunValidation}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>{loading ? 'Validating...' : 'Run 20-Point Validation'}</span>
            </button>

            <button
              onClick={() =>
                handleUpdateMaintenance({
                  isMaintenanceMode: !maintenanceState.isMaintenanceMode,
                })
              }
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                maintenanceState.isMaintenanceMode
                  ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {maintenanceState.isMaintenanceMode ? 'Exit Maintenance Mode' : 'Enter Maintenance Mode'}
            </button>
          </div>
        </div>
      </header>

      {statusMessage && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium rounded-xl flex justify-between items-center">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <nav className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'releases', label: 'Release Control', icon: '📦' },
            { id: 'validation', label: 'Pre-Launch Matrix', icon: '✅' },
            { id: 'flags', label: 'Feature Flags', icon: '🚩' },
            { id: 'health', label: 'Subsystem Health', icon: '🩺' },
            { id: 'beta', label: 'Beta Program', icon: '🧪' },
            { id: 'emergency', label: 'Emergency & Rollback', icon: '🛡️' },
            { id: 'changelog', label: 'Changelog Notes', icon: '📝' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* TAB 1: RELEASES */}
        {activeTab === 'releases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Release Form */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🆕</span> Create New Release Candidate
                </h2>
                <form onSubmit={handleCreateRelease} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">SemVer Version</label>
                    <input
                      type="text"
                      placeholder="e.g. 2.8.1"
                      value={newVersion}
                      onChange={(e) => setNewVersion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Release Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Adaptive Learning & AI Tutor Hotfix"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Release Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="patch">Patch (2.8.1)</option>
                      <option value="minor">Minor Feature (2.9.0)</option>
                      <option value="major">Major Architectural (3.0.0)</option>
                      <option value="hotfix">Emergency Hotfix</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Summary of features, fixes, & migrations..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Generate Release Candidate
                  </button>
                </form>
              </div>

              {/* Active & Historical Releases Table */}
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span>📚</span> Release History & Deployments
                  </span>
                  <span className="text-xs text-slate-400 font-normal">{releases.length} Recorded Releases</span>
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                      <tr>
                        <th className="pb-3">Version</th>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Environment</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {releases.map((rel) => (
                        <tr key={rel.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 font-bold text-indigo-400">v{rel.version}</td>
                          <td className="py-3 text-slate-200">{rel.name}</td>
                          <td className="py-3 capitalize text-slate-400">{rel.environment}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                              {rel.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">
                            {new Date(rel.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRE-LAUNCH VALIDATION MATRIX */}
        {activeTab === 'validation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-white">20-Point Automated Pre-Launch Readiness Matrix</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluates strict build, security, accessibility, database, SEO, and provider integrity before production deployment.
                </p>
              </div>
              <button
                onClick={handleRunValidation}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {loading ? 'Running Audit...' : 'Execute Full Audit'}
              </button>
            </div>

            {validationReport ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Readiness Score</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{validationReport.score}%</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Passed Checks</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{validationReport.passedCount} / {validationReport.totalChecks}</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Warnings</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">{validationReport.warningCount}</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Failed Checks</div>
                    <div className="text-2xl font-black text-rose-400 mt-1">{validationReport.failedCount}</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                  <h3 className="text-sm font-bold text-white">Validation Audit Log Items</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {validationReport.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-xs text-white">{item.name}</span>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{item.message}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'passed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs">
                No validation run triggered yet. Click &quot;Execute Full Audit&quot; to verify all 20 production readiness checks.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FEATURE FLAGS */}
        {activeTab === 'flags' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Flag Form */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🚩</span> Add New Feature Flag
                </h2>
                <form onSubmit={handleCreateFlag} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Flag Key</label>
                    <input
                      type="text"
                      placeholder="e.g. ai_tutor_voice"
                      value={flagKey}
                      onChange={(e) => setFlagKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Flag Display Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Tutor Voice Interaction"
                      value={flagName}
                      onChange={(e) => setFlagName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Initial Status</label>
                    <select
                      value={flagStatus}
                      onChange={(e) => setFlagStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="enabled">Enabled Global (100%)</option>
                      <option value="disabled">Disabled Global</option>
                      <option value="targeted">Targeted Rules Only</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Create Feature Flag
                  </button>
                </form>
              </div>

              {/* Active Flags List */}
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Dynamic Platform Feature Flags</span>
                  <span className="text-xs text-slate-400">{featureFlags.length} Registered Flags</span>
                </h2>

                <div className="space-y-3">
                  {featureFlags.map((flag) => (
                    <div
                      key={flag.id}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-white">{flag.name}</span>
                          <code className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                            {flag.flagKey}
                          </code>
                        </div>
                        <p className="text-xs text-slate-400">{flag.description || 'No description provided.'}</p>
                      </div>

                      <button
                        onClick={() => handleToggleFlag(flag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          flag.status === 'enabled'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {flag.status === 'enabled' ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUBSYSTEM HEALTH */}
        {activeTab === 'health' && healthReport && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🩺</span> 11-Subsystem Deep Health Diagnostics
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Monitors real-time status & latency across database, auth, storage, payment, AI models, & workers.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                    healthReport.overall === 'healthy'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}
                >
                  System {healthReport.overall}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthReport.subsystems.map((sub, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{sub.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">{sub.latencyMs}ms</span>
                  </div>
                  <p className="text-xs text-slate-400">{sub.message}</p>
                  <div className="text-[10px] text-slate-500">
                    Checked: {new Date(sub.lastCheckedAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BETA PROGRAM */}
        {activeTab === 'beta' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🧪</span> Beta Program Invites & Feedback Engine
              </h2>
              <p className="text-xs text-slate-400">
                Manage private & public beta tester access codes, user feedback, and bug submissions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-indigo-400">Active Beta Invite Code</h3>
                  <div className="text-base font-mono font-bold text-white">RBTBETA2026</div>
                  <p className="text-xs text-slate-400">Target Group: Early Access Testers (14 / 100 Redeemed)</p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-indigo-400">Internal Testers Code</h3>
                  <div className="text-base font-mono font-bold text-white">VIPTESTER</div>
                  <p className="text-xs text-slate-400">Target Group: Internal QA Team (5 / 20 Redeemed)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EMERGENCY & ROLLBACK */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Emergency Controls Panel */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <span>🚨</span> Emergency System Safety Controls
                </h2>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Read-Only Mode</div>
                      <div className="text-slate-400">Pauses database writes during database migrations</div>
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateMaintenance({ isReadOnlyMode: !maintenanceState.isReadOnlyMode })
                      }
                      className={`px-3 py-1.5 rounded-xl font-semibold border ${
                        maintenanceState.isReadOnlyMode
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {maintenanceState.isReadOnlyMode ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Emergency Top Banner</div>
                      <div className="text-slate-400">Displays global notice across all student dashboards</div>
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateMaintenance({
                          isEmergencyBannerActive: !maintenanceState.isEmergencyBannerActive,
                        })
                      }
                      className={`px-3 py-1.5 rounded-xl font-semibold border ${
                        maintenanceState.isEmergencyBannerActive
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {maintenanceState.isEmergencyBannerActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Single-Click Rollback Panel */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>↩️</span> Single-Click Production Rollback
                </h2>
                <form onSubmit={handleExecuteRollback} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Target Version to Restore</label>
                    <input
                      type="text"
                      value={rollbackVersion}
                      onChange={(e) => setRollbackVersion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Rollback Justification / Reason</label>
                    <textarea
                      rows={3}
                      placeholder="Explain why rollback is required..."
                      value={rollbackReason}
                      onChange={(e) => setRollbackReason(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all shadow-lg shadow-rose-600/30"
                  >
                    Execute Immediate Rollback
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CHANGELOG */}
        {activeTab === 'changelog' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📝</span> Automated Release Notes & Changelog Markdown
            </h2>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 whitespace-pre-wrap">
              {`# RBT Practice Questions Release Notes - v2.8.0
Released on August 7, 2026

## 🚀 Production Launch, Beta Release & Go-Live Engine
Integrated enterprise-grade deployment controls, 20-point pre-launch validation matrix, 11-subsystem health diagnostics, and emergency safety mechanisms.

### ✨ New Features
- Multi-environment release orchestrator (Dev -> Staging -> Private Beta -> Public Beta -> Prod).
- Dynamic Feature Flags targeting by Role, Country, Percentage, & Beta groups.
- 20-Point automated pre-launch readiness validation engine.
- 11-Subsystem real-time health monitoring probes.

### 🐛 Bug Fixes & Stability
- Zero-downtime deployment safety checks.
- Automated single-click rollback for application, database, and configuration layers.`}
            </div>
          </div>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
}
