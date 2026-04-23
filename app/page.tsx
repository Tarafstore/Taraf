import { StorefrontShell } from '@/components/layout/storefront-shell';
import { ProductCard } from '@/components/product/product-card';
import { Card } from '@/components/ui/card';
import { getFeaturedProducts } from '@/lib/products';

export default async function Home() {
  try {
    const featuredProducts = await getFeaturedProducts();

    if (featuredProducts.length === 0) {
      return (
        <StorefrontShell>
          <Card className="rounded-soft border border-line bg-surface p-8 text-center text-ink-soft">لا توجد منتجات مميزة حالياً.</Card>
        </StorefrontShell>
      );
    }

    return (
      <StorefrontShell>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </StorefrontShell>
    );
  } catch {
    return (
      <StorefrontShell>
        <Card className="rounded-soft border border-line bg-surface p-8 text-center text-ink-soft">
          تعذر تحميل المنتجات المميزة حالياً. حاول مرة أخرى بعد قليل.
        </Card>
      </StorefrontShell>
    );
  }
}
