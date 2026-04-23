import { Product } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

const toneClasses: Record<Product['tone'], string> = {
  ivory: 'from-[#d9c7b5] via-[#cdbba9] to-[#e8ddd0]',
  rose: 'from-[#c79a91] via-[#b18179] to-[#dfc3bb]',
  olive: 'from-[#7f8571] via-[#6f7661] to-[#adb29d]',
  black: 'from-[#353432] via-[#272624] to-[#696663]',
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-surface">
      <div className={`relative aspect-[3/4] bg-gradient-to-b ${toneClasses[product.tone]}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),rgba(255,255,255,0)_45%)]" />
        {product.isNew && (
          <span className="absolute right-2 top-2 rounded-soft bg-[#21180f] px-2 py-1 text-[10px] text-surface">جديد</span>
        )}
      </div>

      <div className="space-y-1 p-3 text-center">
        <h3 className="text-sm font-medium text-ink">{product.name}</h3>
        <p className="text-sm text-ink-soft">{product.price}</p>
      </div>
    </Card>
  );
}
