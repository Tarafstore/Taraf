import { cn } from '@/lib/utils';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <header className={cn('space-y-1', className)}>
      <h2 className="text-title-ar font-medium text-ink">{title}</h2>
      {subtitle ? <p className="text-sm text-ink-soft">{subtitle}</p> : null}
    </header>
  );
}
