import Image from 'next/image';
import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { getCollectionPrimaryImage, getCollections } from '@/lib/products';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <StorefrontShell>
      <section className="space-y-6">
        <div className="rounded-[14px] border border-[#e5d6c5] bg-[#f6efe6] p-5 text-center">
          <h1 className="text-2xl font-semibold text-[#2f1d12] md:text-3xl">المخاوير</h1>
          <p className="mt-2 text-sm text-[#7a6654] md:text-base">تسوقي المجموعات المختارة بعناية من TARAF MUKHAWAR</p>
        </div>

        {collections.length === 0 ? (
          <Card className="rounded-[14px] border border-[#e5d6c5] bg-white/80 p-6 text-center text-[#7a6654]">لا توجد مجموعات متاحة حالياً.</Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group overflow-hidden rounded-[14px] border border-[#e5d6c5] bg-[#fffdfb] shadow-[0_6px_18px_rgba(47,29,18,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b8925b]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getCollectionPrimaryImage(collection)}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f1d12]/70 via-[#2f1d12]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-4 px-4 text-center text-[#fbf7f0]">
                    <h2 className="text-xl font-medium">{collection.name}</h2>
                    {collection.description && <p className="mt-1 text-xs text-[#efe4d6]">{collection.description}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </StorefrontShell>
  );
}
