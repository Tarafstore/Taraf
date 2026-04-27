import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { formatProductPrice, getProductPrimaryImage } from '@/lib/products';
import { Product } from '@/lib/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductPrimaryImage(product);

  return (
    <Link href={`/products/${product.slug}`} className="group block sm:max-w-none">
      <Card className="h-full overflow-hidden rounded-soft border border-line/80 bg-surface shadow-[0_6px_20px_rgba(40,27,16,0.05)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="relative aspect-[4/5] bg-surface-2">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {product.is_featured && (
            <span className="absolute right-2 top-2 rounded-full bg-[#21180f] px-2 py-0.5 text-[10px] font-medium text-surface">جديد</span>
          )}
        </div>

        <div className="space-y-1.5 p-3 text-center md:p-3.5">
          <h3 className="min-h-[2.7rem] text-sm font-medium leading-5 text-ink">{product.name}</h3>
          <p className="text-sm font-medium text-ink-soft">{formatProductPrice(product.price)}</p>
          <span className="inline-flex min-h-9 items-center justify-center rounded-full border border-brand/20 px-3 text-[11px] text-brand md:hidden">
            عرض التفاصيل
          </span>
        </div>
      </Card>
    </Link>
  );
}
