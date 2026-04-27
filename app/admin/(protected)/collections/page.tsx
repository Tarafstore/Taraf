import Link from 'next/link';

import {
  createCollectionAction,
  deactivateCollectionAction,
  deleteCollectionAction,
  updateCollectionAction,
} from '@/app/admin/(protected)/collections/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAdminCollections } from '@/lib/admin/collections';

type AdminCollectionsPageProps = {
  searchParams: Promise<{ status?: string; message?: string }>;
};

export default async function AdminCollectionsPage({ searchParams }: AdminCollectionsPageProps) {
  const params = await searchParams;
  const collections = await getAdminCollections();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">المجموعات</h2>
        <Link href="/collections" target="_blank" className="text-sm text-brand underline">
          معاينة صفحة المجموعات
        </Link>
      </div>

      {params.status ? (
        <Card
          className={`p-3 text-sm ${params.status === 'error' ? 'border-red-300 bg-red-50 text-red-800' : 'border-emerald-300 bg-emerald-50 text-emerald-800'}`}
        >
          {params.message
            ? decodeURIComponent(params.message)
            : params.status === 'created'
              ? 'تم إنشاء المجموعة بنجاح.'
              : params.status === 'updated'
                ? 'تم تحديث المجموعة بنجاح.'
                : params.status === 'deleted'
                  ? 'تم حذف المجموعة بنجاح.'
                  : params.status === 'deactivated'
                    ? 'تم تعطيل المجموعة بنجاح.'
                    : 'تمت العملية بنجاح.'}
        </Card>
      ) : null}

      <Card className="p-4">
        <h3 className="mb-3 text-lg font-semibold">إضافة مجموعة جديدة</h3>
        <form action={createCollectionAction} className="grid gap-3 md:grid-cols-2">
          <Input name="name" required placeholder="اسم المجموعة" />
          <Input name="slug" required placeholder="slug-example" dir="ltr" />
          <Input name="image_url" placeholder="رابط الصورة" className="md:col-span-2" />
          <textarea
            name="description"
            rows={3}
            placeholder="وصف المجموعة"
            className="w-full rounded-soft border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand md:col-span-2"
          />
          <Input name="sort_order" type="number" defaultValue={0} placeholder="ترتيب العرض" />
          <label className="flex items-center gap-2 rounded-soft border border-line bg-surface p-3 text-sm">
            <input type="checkbox" name="is_active" defaultChecked />
            <span>نشطة</span>
          </label>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full sm:w-auto">حفظ المجموعة</Button>
          </div>
        </form>
      </Card>

      <div className="space-y-3">
        {collections.map((collection) => (
          <Card key={collection.id} className="p-4">
            <form action={updateCollectionAction} className="grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={collection.id} />
              <Input name="name" required defaultValue={collection.name} />
              <Input name="slug" required defaultValue={collection.slug} dir="ltr" />
              <Input name="image_url" defaultValue={collection.image_url ?? ''} placeholder="رابط الصورة" className="md:col-span-2" />
              <textarea
                name="description"
                rows={3}
                defaultValue={collection.description ?? ''}
                className="w-full rounded-soft border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand md:col-span-2"
              />
              <Input name="sort_order" type="number" defaultValue={collection.sort_order} />
              <label className="flex items-center gap-2 rounded-soft border border-line bg-surface p-3 text-sm">
                <input type="checkbox" name="is_active" defaultChecked={collection.is_active} />
                <span>نشطة</span>
              </label>

              <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                <Button type="submit" className="w-full sm:w-auto">حفظ التعديلات</Button>
                <Link href={`/collections/${collection.slug}`} target="_blank">
                  <Button type="button" variant="secondary">
                    معاينة بالمتجر
                  </Button>
                </Link>
              </div>
            </form>

            <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
              <form action={deactivateCollectionAction}>
                <input type="hidden" name="id" value={collection.id} />
                <Button type="submit" variant="secondary">
                  تعطيل المجموعة
                </Button>
              </form>
              <form action={deleteCollectionAction}>
                <input type="hidden" name="id" value={collection.id} />
                <Button type="submit" variant="ghost">
                  حذف المجموعة
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
