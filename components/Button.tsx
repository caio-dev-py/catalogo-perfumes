'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function PrimaryButton({
  onClick,
  children,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full overflow-hidden bg-amber-950 text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-amber-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_20px_-5px_rgba(69,39,0,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(69,39,0,0.5)]"
    >
      {/* Efeito de brilho interno no hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export function SecondaryButton({
  onClick,
  children,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full border border-amber-900/30 text-amber-900 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest bg-transparent transition-all duration-300 hover:bg-amber-50/50 hover:border-amber-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
    >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}