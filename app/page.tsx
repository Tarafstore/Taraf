import { Card } from '@/components/ui/card';
import { StorefrontShell } from '@/components/layout/storefront-shell';

export default function Home() {
  return (
    <StorefrontShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="min-h-[380px] border-dashed bg-surface/80" />
        <Card className="min-h-[380px] border-dashed bg-surface/80" />
      </div>
    </StorefrontShell>
  );
}
