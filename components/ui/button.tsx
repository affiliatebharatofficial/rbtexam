import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#2563EB] hover:bg-blue-700 text-white focus:ring-blue-500 shadow-blue-500/20',
    secondary: 'bg-[#0F172A] hover:bg-slate-800 text-white focus:ring-slate-700 shadow-slate-900/20',
    accent: 'bg-[#22C55E] hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-emerald-500/20',
    outline: 'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400 shadow-none',
    glass: 'bg-white/80 backdrop-blur-md border border-white/40 text-slate-900 hover:bg-white/90 focus:ring-blue-400 shadow-lg',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs tracking-wide',
    md: 'px-4 py-2.5 text-sm font-medium',
    lg: 'px-6 py-3.5 text-base font-semibold',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
}
