import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StorefrontShell } from '@/components/layout/storefront-shell';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProductById, getRelatedProducts, products, Product } from '@/lib/mock-data';

const toneClasses: Record<Product['tone'], string> = {
  ivory: 'from-[#d9c7b5] via-[#cdbba9] to-[#e8ddd0]',
  rose: 'from-[#c79a91] via-[#b18179] to-[#dfc3bb]',
  olive: 'from-[#7f8571] via-[#6f7661] to-[#adb29d]',
  black: 'from-[#353432] via-[#272624] to-[#696663]',
};

const productFeatures = [
  'خامة ناعمة وانسيابية تناسب جميع المناسبات.',
  'تطريز يدوي دقيق يمنح القطعة فخامة هادئة.',
  'تصميم بقصة مريحة يمنح أناقة يومية.',
  'تفاصيل متوازنة بإطلالة راقية.',
];

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const selectedProduct = product;
  const relatedProducts = getRelatedProducts(selectedProduct.id);

  return (
    <StorefrontShell>
      <section className="space-y-5">
        <Card className="p-4 md:p-5 lg:p-6">
          <p className="mb-4 text-xs text-ink-soft md:mb-5">الرئيسية / المتجر / {selectedProduct.name}</p>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] lg:gap-8">
            <div className="grid gap-3 sm:grid-cols-[78px_minmax(0,1fr)]">
              <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
                {[0, 1, 2, 3].map((thumb) => (
                  <button
                    key={thumb}
                    type="button"
                    className="relative aspect-[3/4] w-[68px] overflow-hidden rounded-soft border border-line bg-surface-muted transition-colors hover:border-brand/40"
                    aria-label={`صورة مصغرة ${thumb + 1}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${toneClasses[selectedProduct.tone]}`} />
                  </button>
                ))}
              </div>

              <div className={`order-1 aspect-[4/5] overflow-hidden rounded-soft bg-gradient-to-b sm:order-2 ${toneClasses[selectedProduct.tone]}`}>
                <div className="h-full w-full bg-[radial-gradient(circle_at_60%_18%,rgba(255,255,255,0.24),rgba(255,255,255,0)_45%)]" />
              </div>
            </div>

            <div className="space-y-4 text-ink">
              <div className="space-y-2">
                <h1 className="text-heading-ar font-medium">{selectedProduct.name}</h1>
                <p className="text-sm text-ink-soft">SKU: {selectedProduct.id.toUpperCase()}</p>
                <p className="text-[32px] leading-none">{selectedProduct.price}</p>
              </div>

              <p className="max-w-[38ch] text-sm leading-7 text-ink-soft">
                مخور بتصميم أنيق يجمع بين الهدوء والرقي، بلمسة أنثوية ناعمة تناسب الاجتماعات والمناسبات اليومية الخاصة.
              </p>

              <ul className="space-y-2 text-sm text-ink-soft">
                {productFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-soft" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 pt-1">
                {['#c8b8a8', '#9f998f', '#7f766e', '#2f2822'].map((color) => (
                  <span key={color} className="h-4 w-4 rounded-full border border-line" style={{ backgroundColor: color }} />
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <Button variant="secondary" className="h-11 w-full bg-surface-muted text-sm">
                  نسخ رسالة الطلب
                </Button>
                <Button className="h-11 w-full text-sm">اطلب عبر إنستقرام</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-5">
          <h2 className="mb-4 text-lg font-medium">منتجات ذات صلة</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="block">
                <ProductCard product={relatedProduct} />
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </StorefrontShell>
  );
}
