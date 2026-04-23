import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { formatProductPrice, getProductPrimaryImage } from '@/lib/products';
import { Product } from '@/lib/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductPrimaryImage(product);
  const isDataUrl = imageUrl.startsWith('data:');

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden bg-surface">
        <div className="relative aspect-[3/4] bg-surface-2">
          <img
            src={getProductPrimaryImage(product)}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {product.is_featured && (
            <span className="absolute right-2 top-2 rounded-soft bg-[#21180f] px-2 py-1 text-[10px] text-surface">جديد</span>
          )}
        </div>

        <div className="space-y-1 p-3 text-center">
          <h3 className="text-sm font-medium text-ink">{product.name}</h3>
          <p className="text-sm text-ink-soft">{formatProductPrice(product.price)}</p>
        </div>
      </Card>
    </Link>
  );
}
