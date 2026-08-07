'use client';

import React from 'react';

interface ReadOnlyGuardProps {
  isReadOnly: boolean;
  children: React.ReactNode;
  fallbackMessage?: string;
}

export const ReadOnlyGuard: React.FC<ReadOnlyGuardProps> = ({
  isReadOnly,
  children,
  fallbackMessage = 'System is currently in Read-Only mode during database migration. Data creation is temporarily paused.',
}) => {
  if (isReadOnly) {
    return (
      <div className="relative group">
        <div className="opacity-60 pointer-events-none select-none">{children}</div>
        <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-medium flex items-center justify-between">
          <span>{fallbackMessage}</span>
          <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Read Only
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
