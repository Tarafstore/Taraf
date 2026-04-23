import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';

export default function ProductsLoading() {
  return (
    <StorefrontShell>
      <Card className="rounded-soft border border-line bg-surface p-8 text-center text-ink-soft">جاري تحميل المنتجات...</Card>
    </StorefrontShell>
  );
}
