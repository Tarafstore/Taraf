import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mock-data';

export function ProductsPreview() {
  return (
    <section className="container-base pb-8 pt-6">
      <div className="rounded-[6px] border border-line bg-surface px-6 py-7">
        <div className="mb-6 flex items-start justify-between">
          <div className="text-right">
            <p className="text-xs text-ink-soft">الرئيسية / المتجر</p>
            <h2 className="mt-2 text-[44px] font-medium leading-tight text-ink">كل المخاوير</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-soft">
            <span className="rounded-soft border border-line bg-canvas px-3 py-2">التصنيفات</span>
            <span className="rounded-soft border border-line bg-canvas px-3 py-2">ترتيب</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Button className="min-w-[130px] rounded-soft bg-brand px-8 py-2.5 text-sm text-surface hover:bg-brand">عرض المزيد</Button>
        </div>
      </div>
    </section>
  );
}
