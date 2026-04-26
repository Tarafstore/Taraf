import { Card } from '@/components/ui/card';
import { ProductForm } from '@/components/admin/product-form';
import { createProductAction } from '@/app/admin/(protected)/products/actions';

type NewProductPageProps = {
  searchParams: Promise<{ status?: string; message?: string }>;
};

export default async function NewProductPage({ searchParams }: NewProductPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">إضافة منتج</h2>

      {params.status === 'error' ? (
        <Card className="border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {params.message ? decodeURIComponent(params.message) : 'حدث خطأ أثناء إنشاء المنتج.'}
        </Card>
      ) : null}

      <Card className="p-5">
        <ProductForm mode="create" action={createProductAction} />
      </Card>
    </div>
  );
}
