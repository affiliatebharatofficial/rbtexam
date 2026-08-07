'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSeedStatus, seedDemoData, clearDemoData, canSeedDemoData } from '@/lib/dev-seed-engine';
import { Database, Trash2, ShieldAlert, Sparkles } from 'lucide-react';

interface DevSeedBannerProps {
  onStatusChange?: () => void;
}

export function DevSeedBanner({ onStatusChange }: DevSeedBannerProps) {
  const isDev = canSeedDemoData();
  const [status, setStatus] = useState(getSeedStatus());

  if (!isDev) return null; // Never render in production

  const handleSeed = () => {
    try {
      const res = seedDemoData();
      setStatus(res.status);
      if (onStatusChange) onStatusChange();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleClear = () => {
    const res = clearDemoData();
    setStatus(res.status);
    if (onStatusChange) onStatusChange();
  };

  return (
    <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4 flex-wrap shadow-sm">
      <div className="flex items-center space-x-2">
        <Badge variant="amber" className="uppercase font-mono text-[9px]">
          Environment: {status.environment}
        </Badge>
        <span className="font-bold">
          {status.isDemoDataLoaded ? 'Sample Demo Data Loaded' : 'Clean State (No Demo Data)'}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {!status.isDemoDataLoaded ? (
          <Button
            onClick={handleSeed}
            variant="secondary"
            size="sm"
            className="h-8 text-[11px] font-bold gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Load Sample Data (1-Click)</span>
          </Button>
        ) : (
          <Button
            onClick={handleClear}
            variant="secondary"
            size="sm"
            className="h-8 text-[11px] font-bold gap-1 bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Sample Data (1-Click)</span>
          </Button>
        )}
      </div>
    </div>
  );
}
