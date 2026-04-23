import * as React from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-soft border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand',
        className,
      )}
      {...props}
    />
  );
}
