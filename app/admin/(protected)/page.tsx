import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/admin/stat-card';
import { getAdminProducts } from '@/lib/admin/products';

export default async function AdminDashboardPage() {
  const products = await getAdminProducts();

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.is_active).length;
  const featuredProducts = products.filter((product) => product.is_featured).length;
  const productsWithoutImages = products.filter((product) => product.images.length === 0).length;
  const latestProducts = products.slice(0, 6);

  return (
    <div className="space-y-5">
      <div className="rounded-soft border border-line bg-surface px-5 py-4 shadow-[0_10px_30px_-24px_rgba(52,36,23,0.75)]">
        <h2 className="text-2xl font-bold text-ink">لوحة التحكم</h2>
        <p className="mt-1 text-sm text-ink-soft">ملخص سريع لإدارة المنتجات.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="إجمالي المنتجات" value={totalProducts} />
        <StatCard label="المنتجات النشطة" value={activeProducts} />
        <StatCard label="المنتجات المميزة" value={featuredProducts} />
        <StatCard label="منتجات بلا صور" value={productsWithoutImages} />
      </div>

      <Card className="p-5 shadow-[0_14px_34px_-28px_rgba(52,36,23,0.9)]">
        <h3 className="mb-4 text-lg font-semibold text-ink">أحدث المنتجات</h3>
        {latestProducts.length === 0 ? (
          <p className="text-sm text-ink-soft">لا توجد منتجات حالياً.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-right text-sm">
              <thead>
                <tr className="border-b border-line text-ink-soft">
                  <th className="px-2 py-2">الاسم</th>
                  <th className="px-2 py-2">الرابط</th>
                  <th className="px-2 py-2">السعر</th>
                  <th className="px-2 py-2">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {latestProducts.map((product) => (
                  <tr key={product.id} className="border-b border-line/70">
                    <td className="px-2 py-2 font-medium text-ink">{product.name}</td>
                    <td className="px-2 py-2 text-ink-soft">{product.slug}</td>
                    <td className="px-2 py-2 text-ink-soft">{product.price ?? '-'}</td>
                    <td className="px-2 py-2 text-ink-soft">
                      {new Date(product.created_at).toLocaleDateString('ar-SA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
