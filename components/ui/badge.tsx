import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'success' | 'muted';
};

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-soft border px-2 py-0.5 text-xs font-medium',
        tone === 'default' && 'border-brand-soft bg-[#f0e7de] text-brand',
        tone === 'success' && 'border-[#b6c8b7] bg-[#edf3ed] text-[#466148]',
        tone === 'muted' && 'border-line bg-surface-muted text-ink-soft',
        className,
      )}
      {...props}
    />
  );
}
