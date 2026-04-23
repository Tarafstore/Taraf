import Image from 'next/image';
import { Product } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="space-y-2">
      <div className="relative overflow-hidden rounded-[5px] border border-line bg-surface-muted">
        {product.badge ? (
          <Badge tone="default" className="absolute left-2 top-2 z-10 bg-brand px-2 py-0.5 text-[10px] text-surface">
            {product.badge}
          </Badge>
        ) : null}
        <div className="relative aspect-[4/5]">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 50vw, 240px" className="object-cover" />
        </div>
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-[17px] text-ink">{product.name}</h3>
        <p className="text-[15px] text-ink-soft">{product.price}</p>
      </div>
    </article>
  );
}
