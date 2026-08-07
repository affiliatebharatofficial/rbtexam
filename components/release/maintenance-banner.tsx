'use client';

import React from 'react';

interface MaintenanceBannerProps {
  message?: string;
  isEmergency?: boolean;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  message = 'System maintenance in progress. All study progress is securely saved.',
  isEmergency = false,
}) => {
  return (
    <div
      className={`w-full py-2.5 px-4 text-center text-xs md:text-sm font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 ${
        isEmergency
          ? 'bg-rose-600 text-white shadow-lg animate-pulse'
          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md'
      }`}
    >
      <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
      <span>{message}</span>
    </div>
  );
};
