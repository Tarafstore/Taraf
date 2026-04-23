import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ProductNotFound() {
  return (
    <StorefrontShell>
      <Card className="rounded-soft border border-line bg-surface p-8 text-center">
        <p className="mb-4 text-ink-soft">المنتج غير موجود.</p>
        <Link href="/products">
          <Button className="h-9 min-w-[124px] px-8 text-[13px]">العودة للمتجر</Button>
        </Link>
      </Card>
    </StorefrontShell>
  );
}
