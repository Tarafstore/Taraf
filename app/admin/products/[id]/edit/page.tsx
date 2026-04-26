import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductForm } from '@/components/admin/product-form';
import { updateProductAction } from '@/app/admin/products/actions';
import { getAdminProductById } from '@/lib/admin/products';

type EditProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; message?: string }>;
};

export default async function EditProductPage({ params, searchParams }: EditProductPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">تعديل المنتج</h2>
        <Link href="/admin/products">
          <Button variant="secondary">إلغاء</Button>
        </Link>
      </div>

      {query.status === 'error' ? (
        <Card className="border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {query.message ? decodeURIComponent(query.message) : 'حدث خطأ أثناء تحديث المنتج.'}
        </Card>
      ) : null}

      <Card className="p-5">
        <ProductForm mode="edit" action={updateProductAction} product={product} />
      </Card>
    </div>
  );
}
