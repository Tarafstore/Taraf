import { notFound } from 'next/navigation';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { ProductCard } from '@/components/product/product-card';
import { Card } from '@/components/ui/card';
import { formatProductPrice, getProductBySlug, getProductPrimaryImage, getRelatedProducts } from '@/lib/products';

const trustFeatures = ['تصميم أنيق', 'جودة عالية', 'شحن سريع'] as const;

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

function TinyIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#decebd] bg-[#f8f3ed] text-[0.92rem] text-[#9c7a58]">
      {children}
    </span>
  );
}

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

  const gallery =
    product.images.length > 0
      ? product.images
      : [
          {
            id: 'fallback',
            image_url: getProductPrimaryImage(product),
            alt_text: product.name,
            product_id: product.id,
            sort_order: 0,
          },
        ];
  const primaryImage = gallery[0];
  const thumbs = gallery.slice(0, 4);

  return (
    <StorefrontShell>
      <section className="rounded-[1.95rem] border border-[#e7ddd2] bg-[#fcfaf7] p-4 shadow-[0_10px_30px_rgba(60,42,24,0.04)] md:p-7 lg:p-8">
        <div className="grid gap-6 lg:[direction:ltr] lg:grid-cols-[0.95fr_1fr] lg:items-start lg:gap-8">
          <div className="space-y-3.5">
            <div className="relative overflow-hidden rounded-[1.45rem] border border-[#e4d8cc] bg-[#f8f2ea] p-2 shadow-[0_12px_30px_rgba(58,40,24,0.05)]">
              <div className="aspect-[4/3] w-full">
                <img
                  src={primaryImage.image_url}
                  alt={primaryImage.alt_text ?? product.name}
                  className="h-full w-full rounded-[1.1rem] object-cover object-center"
                />
              </div>
              <span className="absolute right-3 top-3 rounded-full border border-[#d8c8b8] bg-white/80 px-4 py-1 text-xs text-[#a27b55] backdrop-blur-sm">
                جديد
              </span>
              <button
                type="button"
                className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d9cab9] bg-white/90 text-[#4b3623] shadow-sm"
                aria-label="تكبير الصورة"
              >
                ⊕
              </button>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e0d4c8] bg-[#f9f5ef] text-xl leading-none text-[#8e7963]"
                aria-label="الصورة السابقة"
              >
                ‹
              </button>
              <div className="grid flex-1 grid-cols-4 gap-2.5">
                {thumbs.map((image, index) => (
                  <div
                    key={image.id}
                    className={`overflow-hidden rounded-[0.6rem] border bg-[#f6f1ea] ${
                      index === 0 ? 'border-[#b69773] ring-1 ring-[#ccb395]' : 'border-[#e4d8cb]'
                    }`}
                  >
                    <div className="aspect-[4/5]">
                      <img
                        src={image.image_url}
                        alt={image.alt_text ?? `${product.name} - ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e0d4c8] bg-[#f9f5ef] text-xl leading-none text-[#8e7963]"
                aria-label="الصورة التالية"
              >
                ›
              </button>
            </div>
          </div>

          <div dir="rtl" className="rounded-[1.35rem] bg-[#fcfaf7] px-1 py-2 lg:px-4 lg:py-3">
            <div className="space-y-1.5">
              {product.category && <p className="text-lg text-[#8f7b68]">{product.category}</p>}
              <h1 className="text-[2.5rem] font-medium leading-[1.2] text-[#2e2117] md:text-[3.15rem]">{product.name}</h1>
              <p className="text-4xl font-medium text-[#a88662]">{formatProductPrice(product.price)}</p>
            </div>

            {product.description && (
              <p className="mt-4 max-w-[34rem] text-xl leading-10 text-[#7f6851] md:text-[1.65rem]">
                {product.description}
              </p>
            )}

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f3ece4] px-4 py-2 text-[1.72rem] font-medium text-[#3f2f21] md:text-3xl">
              <span className="text-[#b4936e]">☆</span>
              <span>4.9</span>
            </div>

            <div className="mt-6 border-t border-[#e4d8cc]" />

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-2xl border border-[#ddd0c3] bg-gradient-to-b from-[#fbf8f4] to-[#f5eee6] px-5 text-[1.7rem] font-medium text-[#3a2a1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-colors hover:from-[#f8f3ed] hover:to-[#f2eae1]"
              >
                <span>واتساب</span>
                <span className="text-[1.45rem] leading-none text-[#7f6a56]">◌</span>
              </button>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3f2a1a] to-[#2f1e11] px-4 text-[1.2rem] font-medium text-[#fbf6ee] shadow-[0_8px_24px_rgba(42,24,13,0.25)] transition-opacity hover:opacity-95"
              >
                <span>اطلب الآن</span>
                <span className="text-[1.05rem]">⌂</span>
              </button>
            </div>

            <div className="mt-6 grid gap-2.5 md:grid-cols-3">
              {trustFeatures.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#e7ddd2] bg-[#f3ede6] px-4 py-2.5 text-[1.34rem] text-[#3a2b1f] md:px-5"
                >
                  <TinyIcon>✧</TinyIcon>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-6 space-y-3 rounded-2xl border border-line bg-surface p-3.5 md:p-4">
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
