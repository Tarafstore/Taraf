import { notFound } from 'next/navigation';

import { ProductCard } from '@/components/product/product-card';
import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { formatProductPrice, getProductBySlug, getProductPrimaryImage, getRelatedProducts } from '@/lib/products';

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;

  let product: Awaited<ReturnType<typeof getProductBySlug>> = null;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error('[ProductDetailsPage] failed to load product', {
      slug,
      error,
    });

    return (
      <StorefrontShell>
        <Card className="rounded-soft border border-line bg-surface p-8 text-center text-ink-soft">
          تعذر تحميل بيانات المنتج حالياً. حاول مرة أخرى بعد قليل.
        </Card>
      </StorefrontShell>
    );
  }

  if (!product) {
    notFound();
  }

  let relatedProducts = [] as Awaited<ReturnType<typeof getRelatedProducts>>;

  try {
    relatedProducts = await getRelatedProducts(product);
  } catch (error) {
    console.error('[ProductDetailsPage] failed to load related products', {
      slug,
      productId: product.id,
      category: product.category ?? null,
      error,
    });
    relatedProducts = [];
  }
  const gallery = product.images.length > 0 ? product.images : [{ id: 'fallback', image_url: getProductPrimaryImage(product), alt_text: product.name, product_id: product.id, sort_order: 0 }];
  const primaryImage = gallery[0];

  return (
    <StorefrontShell>
      <section className="space-y-8 rounded-soft border border-line bg-[#fcfbf8] p-4 md:p-6 lg:p-8">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-1 lg:order-2 lg:flex lg:justify-end">
            <div className="w-full max-w-[26rem] overflow-hidden rounded-2xl border border-line bg-surface-2">
              <div className="aspect-[4/5] w-full max-h-[32rem] bg-[#f6f3ee] md:aspect-[3/4]">
                <img
                  src={primaryImage.image_url}
                  alt={primaryImage.alt_text ?? product.name}
                  className="h-full w-full object-contain object-center p-3 md:p-4"
                />
              </div>
            </div>
          </div>

          <Card className="order-2 h-fit rounded-2xl border border-line bg-surface p-5 lg:order-1 lg:p-7">
            <div className="space-y-1.5">
              {product.category && <p className="text-xs text-ink-soft/80">{product.category}</p>}
              <h1 className="text-[1.65rem] font-medium leading-tight text-ink md:text-[1.9rem]">{product.name}</h1>
              <p className="text-xl font-medium text-ink">{formatProductPrice(product.price)}</p>
            </div>

            {product.description && <p className="mt-5 text-sm leading-8 text-ink-soft">{product.description}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex min-w-[9rem] items-center justify-center rounded-full bg-[#2e2419] px-5 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-[#241b12]"
              >
                اطلب الآن
              </button>
              <button
                type="button"
                className="inline-flex min-w-[9rem] items-center justify-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                واتساب
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 border-t border-line pt-4 text-sm text-ink-soft sm:grid-cols-3 sm:gap-3">
              <span className="rounded-full border border-line bg-surface-2 px-3 py-2 text-center">شحن سريع</span>
              <span className="rounded-full border border-line bg-surface-2 px-3 py-2 text-center">جودة عالية</span>
              <span className="rounded-full border border-line bg-surface-2 px-3 py-2 text-center">تصميم أنيق</span>
            </div>
          </Card>
        </div>

        {relatedProducts.length > 0 && (
          <div className="space-y-4 rounded-2xl border border-line bg-surface p-4 md:p-5">
            <h2 className="text-base font-medium text-ink md:text-lg">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </section>
    </StorefrontShell>
  );
}
