import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({
  value,
  colorClass = 'bg-[#2563EB]',
  size = 'md',
  className,
  ...props
}: ProgressProps) {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-4' : 'h-2.5';
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={twMerge(
        clsx('w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-100', heightClass, className)
      )}
      {...props}
    >
      <div
        className={twMerge(clsx('h-full rounded-full transition-all duration-500 ease-out', colorClass))}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
