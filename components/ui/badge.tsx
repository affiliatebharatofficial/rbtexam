import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'slate' | 'emerald' | 'amber' | 'purple' | 'rose';
  children: React.ReactNode;
}

export function Badge({ variant = 'blue', className, children, ...props }: BadgeProps) {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60',
    slate: 'bg-slate-100 text-slate-800 border-slate-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/60',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
