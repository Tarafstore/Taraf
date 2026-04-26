import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DeleteProductButton } from '@/components/admin/delete-product-button';
import { deleteProductAction } from '@/app/admin/(protected)/products/actions';
import { getActiveCollectionsForSelect } from '@/lib/admin/collections';
import { filterAdminProducts, getAdminProducts } from '@/lib/admin/products';

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    active?: string;
    featured?: string;
    collection?: string;
    status?: string;
    message?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, collections] = await Promise.all([getAdminProducts(), getActiveCollectionsForSelect()]);
  const filteredProducts = filterAdminProducts(products, params);
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))] as string[];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">المنتجات</h2>
        <Link href="/admin/products/new">
          <Button>إضافة منتج</Button>
        </Link>
      </div>

      {params.status ? (
        <Card
          className={`p-3 text-sm ${params.status === 'error' ? 'border-red-300 bg-red-50 text-red-800' : 'border-emerald-300 bg-emerald-50 text-emerald-800'}`}
        >
          {params.message
            ? decodeURIComponent(params.message)
            : params.status === 'created'
              ? 'تم إنشاء المنتج بنجاح.'
              : params.status === 'updated'
                ? 'تم تحديث المنتج بنجاح.'
                : params.status === 'deleted'
                  ? 'تم حذف المنتج بنجاح.'
                  : 'تمت العملية بنجاح.'}
        </Card>
      ) : null}

      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-5">
          <Input name="search" defaultValue={params.search ?? ''} placeholder="بحث بالاسم / الرابط / رمز المنتج / التصنيف" />
          <Select name="category" defaultValue={params.category ?? 'all'}>
            <option value="all">كل التصنيفات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select name="active" defaultValue={params.active ?? 'all'}>
            <option value="all">الحالة (الكل)</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </Select>
          <Select name="featured" defaultValue={params.featured ?? 'all'}>
            <option value="all">التمييز (الكل)</option>
            <option value="featured">مميز</option>
            <option value="normal">غير مميز</option>
          </Select>
          <Select name="collection" defaultValue={params.collection ?? 'all'}>
            <option value="all">كل المجموعات</option>
            <option value="none">بدون مجموعة</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </Select>
          <div className="md:col-span-5 flex gap-2">
            <Button type="submit">تطبيق الفلاتر</Button>
            <Link href="/admin/products">
              <Button type="button" variant="secondary">
                إعادة ضبط
              </Button>
            </Link>
          </div>
        </form>
      </Card>

      <Card className="p-0">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-sm text-ink-soft">لا توجد منتجات مطابقة.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1300px] w-full text-right text-sm">
              <thead className="bg-surface-muted text-ink-soft">
                <tr>
                  <th className="px-3 py-3">الصورة</th>
                  <th className="px-3 py-3">الاسم</th>
                  <th className="px-3 py-3">الرابط</th>
                  <th className="px-3 py-3">السعر</th>
                  <th className="px-3 py-3">سعر التخفيض</th>
                  <th className="px-3 py-3">رمز المنتج</th>
                  <th className="px-3 py-3">التصنيف</th>
                  <th className="px-3 py-3">المجموعة</th>
                  <th className="px-3 py-3">نشط</th>
                  <th className="px-3 py-3">مميز</th>
                  <th className="px-3 py-3">تاريخ الإنشاء</th>
                  <th className="px-3 py-3">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const thumbnail = product.images[0]?.image_url;

                  return (
                    <tr key={product.id} className="border-t border-line align-top">
                      <td className="px-3 py-3">
                        {thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumbnail} alt={product.name} className="h-14 w-14 rounded-soft border border-line object-cover" />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-soft border border-dashed border-line text-[10px] text-ink-soft">
                            بدون صورة
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 font-medium">{product.name}</td>
                      <td className="px-3 py-3 text-ink-soft">{product.slug}</td>
                      <td className="px-3 py-3">{product.price ?? '-'}</td>
                      <td className="px-3 py-3">{product.sale_price ?? '-'}</td>
                      <td className="px-3 py-3">{product.sku ?? '-'}</td>
                      <td className="px-3 py-3">{product.category ?? '-'}</td>
                      <td className="px-3 py-3">
                        {product.collection_name ? (
                          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                            {product.collection_name}
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800">بدون مجموعة</span>
                        )}
                      </td>
                      <td className="px-3 py-3">{product.is_active ? 'نعم' : 'لا'}</td>
                      <td className="px-3 py-3">{product.is_featured ? 'نعم' : 'لا'}</td>
                      <td className="px-3 py-3 text-ink-soft">{new Date(product.created_at).toLocaleDateString('ar-SA')}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="secondary">تعديل المنتج</Button>
                          </Link>
                          <form action={deleteProductAction}>
                            <input type="hidden" name="id" value={product.id} />
                            <DeleteProductButton />
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
