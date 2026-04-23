import { notFound } from 'next/navigation';

import { ProductCard } from '@/components/product/product-card';
import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { formatProductPrice, getProductBySlug, getProductPrimaryImage, getRelatedProducts } from '@/lib/products';

type ProductDetailsPageProps = {
  params: { slug: string };
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = params;
  console.info('[ProductDetailsPage] params.slug =', slug);

  let product: Awaited<ReturnType<typeof getProductBySlug>> = null;

  try {
    product = await getProductBySlug(slug);
  } catch {
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
  } catch {
    relatedProducts = [];
  }
  const gallery = product.images.length > 0 ? product.images : [{ id: 'fallback', image_url: getProductPrimaryImage(product), alt_text: product.name, product_id: product.id, sort_order: 0 }];

  return (
    <StorefrontShell>
      <section className="space-y-6 rounded-soft border border-line bg-surface px-4 py-5 md:px-6 md:py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            {gallery.map((image, index) => (
              <div key={image.id} className="overflow-hidden rounded-soft border border-line bg-surface-2">
                <img src={image.image_url} alt={image.alt_text ?? `${product.name} ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <Card className="h-fit rounded-soft border border-line bg-surface p-5">
            <h1 className="text-title-ar font-medium text-ink">{product.name}</h1>
            <p className="mt-2 text-base text-ink-soft">{formatProductPrice(product.price)}</p>
            {product.category && <p className="mt-3 text-sm text-ink-soft">{product.category}</p>}
            {product.description && <p className="mt-4 text-sm leading-7 text-ink-soft">{product.description}</p>}
          </Card>
        </div>

        {relatedProducts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-ink">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
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
