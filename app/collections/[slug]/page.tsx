import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ProductCard } from '@/components/product/product-card';
import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { getCollectionPrimaryImage, getProductsByCollectionSlug } from '@/lib/products';

type CollectionDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionDetailsPage({ params }: CollectionDetailsPageProps) {
  const { slug } = await params;
  const { collection, products } = await getProductsByCollectionSlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <StorefrontShell>
      <section className="space-y-6">
        <div className="overflow-hidden rounded-[14px] border border-[#e5d6c5] bg-[#f6efe6]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[220px] md:min-h-[280px]">
              <Image src={getCollectionPrimaryImage(collection)} alt={collection.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            </div>
            <div className="flex items-center justify-center p-6 text-center">
              <div>
                <h1 className="text-2xl font-semibold text-[#2f1d12] md:text-3xl">{collection.name}</h1>
                {collection.description && <p className="mt-3 text-sm leading-7 text-[#7a6654] md:text-base">{collection.description}</p>}
              </div>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <Card className="rounded-[14px] border border-[#e5d6c5] bg-white/80 p-6 text-center text-[#7a6654]">لا توجد منتجات ضمن هذه المجموعة حالياً.</Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </StorefrontShell>
  );
}
