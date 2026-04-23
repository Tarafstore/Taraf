import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-soft border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-brand',
        className,
      )}
      {...props}
    />
  );
}
