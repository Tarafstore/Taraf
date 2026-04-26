'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createCollection,
  deactivateCollection,
  deleteCollection,
  updateCollection,
} from '@/lib/admin/collections';

function getRequiredString(formData: FormData, key: string, label: string) {
  const value = `${formData.get(key) ?? ''}`.trim();

  if (!value) {
    throw new Error(`حقل ${label} مطلوب.`);
  }

  return value;
}

function getOptionalString(formData: FormData, key: string) {
  const value = `${formData.get(key) ?? ''}`.trim();
  return value || null;
}

function getSortOrder(formData: FormData) {
  const value = `${formData.get('sort_order') ?? ''}`.trim();
  const parsed = Number(value || 0);

  if (Number.isNaN(parsed)) {
    throw new Error('ترتيب العرض يجب أن يكون رقماً صالحاً.');
  }

  return parsed;
}

function getIsActive(formData: FormData) {
  return formData.get('is_active') === 'on';
}

export async function createCollectionAction(formData: FormData) {
  try {
    await createCollection({
      name: getRequiredString(formData, 'name', 'الاسم'),
      slug: getRequiredString(formData, 'slug', 'الرابط'),
      description: getOptionalString(formData, 'description'),
      image_url: getOptionalString(formData, 'image_url'),
      is_active: getIsActive(formData),
      sort_order: getSortOrder(formData),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذر إنشاء المجموعة.';
    redirect(`/admin/collections?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
  redirect('/admin/collections?status=created');
}

export async function updateCollectionAction(formData: FormData) {
  const id = `${formData.get('id') ?? ''}`.trim();

  if (!id) {
    redirect('/admin/collections?status=error&message=معرف المجموعة غير صالح.');
  }

  try {
    await updateCollection(id, {
      name: getRequiredString(formData, 'name', 'الاسم'),
      slug: getRequiredString(formData, 'slug', 'الرابط'),
      description: getOptionalString(formData, 'description'),
      image_url: getOptionalString(formData, 'image_url'),
      is_active: getIsActive(formData),
      sort_order: getSortOrder(formData),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذر تحديث المجموعة.';
    redirect(`/admin/collections?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
  redirect('/admin/collections?status=updated');
}

export async function deleteCollectionAction(formData: FormData) {
  const id = `${formData.get('id') ?? ''}`.trim();

  if (!id) {
    redirect('/admin/collections?status=error&message=معرف المجموعة غير صالح.');
  }

  try {
    await deleteCollection(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذر حذف المجموعة.';
    redirect(`/admin/collections?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
  redirect('/admin/collections?status=deleted');
}

export async function deactivateCollectionAction(formData: FormData) {
  const id = `${formData.get('id') ?? ''}`.trim();

  if (!id) {
    redirect('/admin/collections?status=error&message=معرف المجموعة غير صالح.');
  }

  try {
    await deactivateCollection(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذر تعطيل المجموعة.';
    redirect(`/admin/collections?status=error&message=${encodeURIComponent(message)}`);
  }

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
  redirect('/admin/collections?status=deactivated');
}
