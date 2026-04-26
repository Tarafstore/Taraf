'use client';

import { useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { slugifyArabic, type AdminProduct } from '@/lib/admin/products';

type ProductFormProps = {
  mode: 'create' | 'edit';
  action: (formData: FormData) => void;
  product?: AdminProduct;
};

type ImageInput = {
  id: string;
  image_url: string;
  sort_order: number;
};

function SubmitButton({ mode }: { mode: ProductFormProps['mode'] }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'جاري الحفظ...' : mode === 'create' ? 'حفظ' : 'حفظ'}
    </Button>
  );
}

export function ProductForm({ mode, action, product }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [images, setImages] = useState<ImageInput[]>(() => {
    if (product && product.images.length > 0) {
      return product.images.map((image) => ({
        id: image.id,
        image_url: image.image_url,
        sort_order: image.sort_order,
      }));
    }

    return [{ id: 'new-0', image_url: '', sort_order: 0 }];
  });

  const slugPlaceholder = useMemo(() => slugifyArabic(name), [name]);

  const addImage = () => {
    setImages((current) => [
      ...current,
      { id: `new-${Date.now()}`, image_url: '', sort_order: current.length },
    ]);
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      if (current.length === 1) {
        return [{ ...current[0], image_url: '' }];
      }

      return current.filter((item) => item.id !== id);
    });
  };

  const updateImage = (id: string, patch: Partial<ImageInput>) => {
    setImages((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <form action={action} className="space-y-6">
      {product?.id ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-ink">الاسم *</span>
          <Input
            name="name"
            required
            value={name}
            onChange={(event) => {
              const value = event.target.value;
              setName(value);

              if (!slug.trim()) {
                setSlug(slugifyArabic(value));
              }
            }}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-ink">الرابط *</span>
          <Input
            name="slug"
            value={slug}
            placeholder={slugPlaceholder || 'يُنشأ تلقائياً من الاسم'}
            onChange={(event) => setSlug(event.target.value)}
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span className="text-ink">الوصف</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ''}
            className="w-full rounded-soft border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-ink">السعر *</span>
          <Input name="price" type="number" min="0" step="0.01" required defaultValue={product?.price ?? ''} />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-ink">سعر التخفيض</span>
          <Input name="sale_price" type="number" min="0" step="0.01" defaultValue={product?.sale_price ?? ''} />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-ink">رمز المنتج</span>
          <Input name="sku" defaultValue={product?.sku ?? ''} />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-ink">التصنيف</span>
          <Input name="category" defaultValue={product?.category ?? ''} />
        </label>

        <label className="flex items-center gap-2 rounded-soft border border-line bg-surface p-3 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} />
          <span>نشط</span>
        </label>

        <label className="flex items-center gap-2 rounded-soft border border-line bg-surface p-3 text-sm">
          <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} />
          <span>مميز</span>
        </label>
      </div>

      <div className="space-y-4 rounded-soft border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">الصور</h2>
          <Button type="button" variant="secondary" onClick={addImage}>
            إضافة صورة
          </Button>
        </div>

        <div className="space-y-3">
          {images.map((image, index) => (
            <div key={image.id} className="grid gap-2 rounded-soft border border-line bg-white p-3 md:grid-cols-[1fr_130px_auto]">
              <label className="space-y-1 text-xs text-ink-soft">
                <span>رابط الصورة</span>
                <Input
                  name="image_url"
                  placeholder="https://..."
                  value={image.image_url}
                  onChange={(event) => updateImage(image.id, { image_url: event.target.value })}
                />
              </label>

              <label className="space-y-1 text-xs text-ink-soft">
                <span>ترتيب الصورة</span>
                <Input
                  name="sort_order"
                  type="number"
                  value={image.sort_order}
                  onChange={(event) => updateImage(image.id, { sort_order: Number(event.target.value || index) })}
                />
              </label>

              <div className="flex items-end">
                <Button type="button" variant="ghost" onClick={() => removeImage(image.id)}>
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <SubmitButton mode={mode} />
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
