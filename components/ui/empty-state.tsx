'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  badgeLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onLoadSampleData?: () => void;
  isDemoDataLoaded?: boolean;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  badgeLabel = 'No Records Found',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}: EmptyStateProps) {
  return (
    <Card glass className="p-8 sm:p-12 text-center border-slate-200/80 shadow-2xl space-y-5 max-w-xl mx-auto my-6 bg-slate-900/60 backdrop-blur-xl text-slate-100 rounded-3xl">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-lg">
        <Icon className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <Badge variant="purple" className="mb-1 text-[10px] tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
          {badgeLabel}
        </Badge>
        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary" size="md" className="gap-2 shadow-lg shadow-indigo-600/30 font-semibold text-xs">
            <Plus className="w-4 h-4" />
            <span>{actionLabel}</span>
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button
            onClick={onSecondaryAction}
            variant="outline"
            size="md"
            className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
          >
            <span>{secondaryActionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
