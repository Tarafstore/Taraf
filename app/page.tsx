import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Navbar } from '@/components/layout/navbar';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/section-title';
import { StatCard } from '@/components/admin/stat-card';
import { products, stats } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar links={[{ label: 'الرئيسية', href: '#' }, { label: 'المتجر', href: '#' }]} />
      <section className="container-base section-y-sm grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar items={[{ label: 'لوحة التحكم', href: '#', active: true }, { label: 'الطلبات', href: '#' }]} />
        <div className="space-y-6">
          <Card className="space-y-4 p-6">
            <SectionTitle title="أساس النظام البصري" subtitle="مكونات أولية جاهزة لبناء الصفحات لاحقًا" />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
            <Button>متابعة البناء</Button>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
