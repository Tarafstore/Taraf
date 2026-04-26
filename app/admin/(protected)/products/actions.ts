'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { parseImagesFromFormData, slugifyArabic } from '@/lib/admin/products';

function getRequiredValue(formData: FormData, key: string, label: string) {
  const value = `${formData.get(key) ?? ''}`.trim();

  if (!value) {
    throw new Error(`حقل ${label} مطلوب.`);
  }

  return value;
}

function getNumberValue(formData: FormData, key: string, label: string, required = false) {
  const raw = `${formData.get(key) ?? ''}`.trim();

  if (!raw) {
    if (required) {
      throw new Error(`حقل ${label} مطلوب.`);
    }

    return null;
  }

  const parsed = Number(raw);

  if (Number.isNaN(parsed)) {
    throw new Error(`قيمة ${label} غير صالحة.`);
  }

  return parsed;
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

export async function createProductAction(formData: FormData) {
  const supabase = createSupabaseServerClient();

  try {
    const name = getRequiredValue(formData, 'name', 'الاسم');
    const rawSlug = `${formData.get('slug') ?? ''}`.trim();
    const slug = rawSlug || slugifyArabic(name);

    if (!slug) {
      throw new Error('تعذر إنشاء الرابط. الرجاء إدخال رابط صالح.');
    }

    const price = getNumberValue(formData, 'price', 'السعر', true);
    const salePrice = getNumberValue(formData, 'sale_price', 'سعر التخفيض');
    const description = `${formData.get('description') ?? ''}`.trim() || null;
    const sku = `${formData.get('sku') ?? ''}`.trim() || null;
    const category = `${formData.get('category') ?? ''}`.trim() || null;
    const isActive = getBooleanValue(formData, 'is_active');
    const isFeatured = getBooleanValue(formData, 'is_featured');
    const images = parseImagesFromFormData(formData);

    const createdRows = await supabase.insert<{ id: string }>('products', {
      name,
      slug,
      description,
      price,
      sale_price: salePrice,
      sku,
      category,
      is_active: isActive,
      is_featured: isFeatured,
    });

    const createdProduct = createdRows[0];

    if (!createdProduct?.id) {
      throw new Error('تعذر إنشاء المنتج.');
    }

    if (images.length > 0) {
      await supabase.insert(
        'product_images',
        images.map((image) => ({
          product_id: createdProduct.id,
          image_url: image.image_url,
          sort_order: image.sort_order,
        }))
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ المنتج.';
    redirect(`/admin/products/new?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products?status=created');
}

export async function updateProductAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const id = `${formData.get('id') ?? ''}`.trim();

  if (!id) {
    redirect('/admin/products?status=error&message=معرف المنتج غير صالح.');
  }

  try {
    const name = getRequiredValue(formData, 'name', 'الاسم');
    const rawSlug = `${formData.get('slug') ?? ''}`.trim();
    const slug = rawSlug || slugifyArabic(name);

    if (!slug) {
      throw new Error('تعذر إنشاء الرابط. الرجاء إدخال رابط صالح.');
    }

    const price = getNumberValue(formData, 'price', 'السعر', true);
    const salePrice = getNumberValue(formData, 'sale_price', 'سعر التخفيض');
    const description = `${formData.get('description') ?? ''}`.trim() || null;
    const sku = `${formData.get('sku') ?? ''}`.trim() || null;
    const category = `${formData.get('category') ?? ''}`.trim() || null;
    const isActive = getBooleanValue(formData, 'is_active');
    const isFeatured = getBooleanValue(formData, 'is_featured');
    const images = parseImagesFromFormData(formData);

    await supabase.update(
      'products',
      {
        id: `eq.${id}`,
      },
      {
        name,
        slug,
        description,
        price,
        sale_price: salePrice,
        sku,
        category,
        is_active: isActive,
        is_featured: isFeatured,
        updated_at: new Date().toISOString(),
      }
    );

    await supabase.delete('product_images', {
      product_id: `eq.${id}`,
    });

    if (images.length > 0) {
      await supabase.insert(
        'product_images',
        images.map((image) => ({
          product_id: id,
          image_url: image.image_url,
          sort_order: image.sort_order,
        }))
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث المنتج.';
    redirect(`/admin/products/${id}/edit?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath(`/products/${id}`);
  revalidatePath('/products');
  redirect('/admin/products?status=updated');
}

export async function deleteProductAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const id = `${formData.get('id') ?? ''}`.trim();

  if (!id) {
    redirect('/admin/products?status=error&message=معرف المنتج غير صالح.');
  }

  try {
    await supabase.delete('product_images', {
      product_id: `eq.${id}`,
    });

    await supabase.delete('products', {
      id: `eq.${id}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذر حذف المنتج.';
    redirect(`/admin/products?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products?status=deleted');
}
