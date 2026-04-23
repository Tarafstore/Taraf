import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-soft border px-5 text-sm font-medium transition-colors',
        variant === 'primary' && 'border-brand bg-brand text-white hover:bg-[#2f2218]',
        variant === 'secondary' && 'border-line bg-surface text-ink hover:bg-surface-muted',
        variant === 'ghost' && 'border-transparent bg-transparent text-ink hover:bg-surface-muted',
        className,
      )}
      {...props}
    />
  );
}
