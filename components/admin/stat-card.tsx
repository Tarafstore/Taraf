import { Card } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="bg-surface p-4 text-right shadow-[0_14px_34px_-28px_rgba(52,36,23,0.95)]">
      <p className="text-[11px] font-medium text-ink-soft">{label}</p>
      <p className="mt-2 text-3xl font-bold leading-none text-brand">{value}</p>
    </Card>
  );
}
