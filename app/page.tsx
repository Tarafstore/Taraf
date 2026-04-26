import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { ProductCard } from '@/components/product/product-card';
import { Card } from '@/components/ui/card';
import { getFeaturedProducts } from '@/lib/products';

export default async function Home() {
  try {
    const featuredProducts = await getFeaturedProducts();

    if (featuredProducts.length === 0) {
      return (
        <StorefrontShell showHero>
          <Card className="rounded-soft border border-line bg-surface p-6 text-center text-ink-soft">لا توجد منتجات مميزة حالياً.</Card>
        </StorefrontShell>
      );
    }

    return (
      <StorefrontShell showHero>
        <section className="space-y-4 md:space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-ink md:text-xl">منتجات مميزة</h2>
            <Link href="/products" className="text-sm text-brand transition-colors hover:text-[#2a1b10]">
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </StorefrontShell>
    );
  } catch {
    return (
      <StorefrontShell showHero>
        <Card className="rounded-soft border border-line bg-surface p-6 text-center text-ink-soft">
          تعذر تحميل المنتجات المميزة حالياً. حاول مرة أخرى بعد قليل.
        </Card>
      </StorefrontShell>
    );
  }
}
