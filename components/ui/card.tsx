import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  children: React.ReactNode;
}

export function Card({
  hoverEffect = true,
  glass = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl p-6 transition-all duration-300',
          glass
            ? 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50'
            : 'bg-white border border-slate-100 shadow-sm shadow-slate-200/60',
          hoverEffect && 'hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
