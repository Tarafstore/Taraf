import { StorefrontShell } from '@/components/layout/storefront-shell';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { getActiveProducts } from '@/lib/products';

export default async function ProductsPage() {
  let products = [] as Awaited<ReturnType<typeof getActiveProducts>>;
  let errorMessage: string | null = null;

  try {
    products = await getActiveProducts();
  } catch {
    errorMessage = 'تعذر تحميل المنتجات حالياً. حاول مرة أخرى بعد قليل.';
  }

  return (
    <StorefrontShell>
      <section className="rounded-soft border border-line bg-surface px-4 py-5 md:px-6 md:py-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-title-ar font-medium text-ink">كل المخاوير</h1>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap">
            <div className="relative min-w-[220px] flex-1 md:w-[260px] md:flex-none">
              <Input placeholder="ابحث عن مخور..." className="h-9 bg-surface ps-9" />
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="5" />
                <path d="m15 15 4 4" />
              </svg>
            </div>

            <Select className="h-9 w-[145px] bg-surface text-[13px]">
              <option>التصنيفات</option>
              <option>العبايات</option>
              <option>الكلاسيك</option>
              <option>المجموعة الجديدة</option>
            </Select>

            <Select className="h-9 w-[120px] bg-surface text-[13px]">
              <option>ترتيب</option>
              <option>الأحدث</option>
              <option>الأعلى سعراً</option>
              <option>الأقل سعراً</option>
            </Select>
          </div>
        </div>

        {errorMessage && (
          <Card className="mb-5 rounded-soft border border-line bg-surface p-6 text-center text-ink-soft">{errorMessage}</Card>
        )}

        {!errorMessage && products.length === 0 && (
          <Card className="mb-5 rounded-soft border border-line bg-surface p-6 text-center text-ink-soft">لا توجد منتجات متاحة حالياً.</Card>
        )}

        {!errorMessage && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Button className="h-9 min-w-[124px] px-8 text-[13px]">عرض المزيد</Button>
        </div>
      </section>
    </StorefrontShell>
  );
}
