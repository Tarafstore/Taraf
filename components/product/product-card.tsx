import { Product } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

const toneLabel: Record<Product['tone'], string> = {
  ivory: 'عاجي',
  rose: 'وردي',
  olive: 'زيتي',
  black: 'أسود',
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/5] bg-surface-muted" />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <Badge tone="muted">{toneLabel[product.tone]}</Badge>
        </div>
        <p className="text-sm text-ink-soft">{product.price}</p>
      </div>
    </Card>
  );
}
