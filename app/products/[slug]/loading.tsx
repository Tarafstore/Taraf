import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';

export default function ProductDetailsLoading() {
  return (
    <StorefrontShell>
      <Card className="rounded-soft border border-line bg-surface p-8 text-center text-ink-soft">جاري تحميل تفاصيل المنتج...</Card>
    </StorefrontShell>
  );
}
