import { Card } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="p-4 text-center">
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="mt-1 text-2xl font-medium text-ink">{value}</p>
    </Card>
  );
}
