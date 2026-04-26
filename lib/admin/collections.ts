import 'server-only';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export type AdminCollection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

type CollectionRow = {
  id: string;
  name: string | null;
  slug: string | null;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean | null;
  sort_order?: number | null;
  created_at?: string | null;
};

const SLUG_REGEX = /^[a-z0-9-]+$/;

function mapCollection(row: CollectionRow): AdminCollection {
  return {
    id: row.id,
    name: row.name ?? '',
    slug: row.slug ?? '',
    description: row.description ?? null,
    image_url: row.image_url ?? null,
    is_active: row.is_active ?? true,
    sort_order: row.sort_order ?? 0,
    created_at: row.created_at ?? new Date(0).toISOString(),
  };
}

export function validateCollectionPayload(payload: {
  name: string;
  slug: string;
  sort_order: number;
}) {
  if (!payload.name.trim()) {
    throw new Error('اسم المجموعة مطلوب.');
  }

  if (!payload.slug.trim()) {
    throw new Error('رابط المجموعة مطلوب.');
  }

  if (!SLUG_REGEX.test(payload.slug)) {
    throw new Error('صيغة الرابط غير صحيحة. استخدم حروف إنجليزية صغيرة وأرقام وشرطة فقط.');
  }

  if (!Number.isFinite(payload.sort_order)) {
    throw new Error('ترتيب المجموعة يجب أن يكون رقماً صالحاً.');
  }
}


async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const supabase = createSupabaseAdminClient();

  const rows = await supabase.from<CollectionRow>('collections', {
    select: 'id,slug',
    slug: `eq.${slug}`,
    limit: 1,
  });

  const existing = rows[0];

  if (existing && existing.id !== excludeId) {
    throw new Error('هذا الرابط مستخدم بالفعل لمجموعة أخرى.');
  }
}

export async function getAdminCollections() {
  const supabase = createSupabaseAdminClient();

  try {
    const rows = await supabase.from<CollectionRow>('collections', {
      select: 'id,name,slug,description,image_url,is_active,sort_order,created_at',
      order: 'sort_order.asc.nullslast',
    });

    return rows.map(mapCollection);
  } catch (error) {
    console.error('[getAdminCollections] failed', { error });
    throw error;
  }
}

export async function getActiveCollectionsForSelect() {
  const supabase = createSupabaseAdminClient();

  try {
    const rows = await supabase.from<CollectionRow>('collections', {
      select: 'id,name,slug,is_active,sort_order',
      is_active: 'eq.true',
      order: 'sort_order.asc.nullslast',
    });

    return rows.map(mapCollection);
  } catch (error) {
    console.error('[getActiveCollectionsForSelect] failed', { error });
    return [] as AdminCollection[];
  }
}

export async function createCollection(payload: Omit<AdminCollection, 'id' | 'created_at'>) {
  const supabase = createSupabaseAdminClient();

  validateCollectionPayload(payload);

  try {
    await ensureUniqueSlug(payload.slug);

    const rows = await supabase.insert<CollectionRow>('collections', {
      ...payload,
    });

    return rows[0] ? mapCollection(rows[0]) : null;
  } catch (error) {
    console.error('[createCollection] failed', { payload, error });
    throw error;
  }
}

export async function updateCollection(id: string, payload: Omit<AdminCollection, 'id' | 'created_at'>) {
  const supabase = createSupabaseAdminClient();

  validateCollectionPayload(payload);

  try {
    await ensureUniqueSlug(payload.slug, id);

    const rows = await supabase.update<CollectionRow>(
      'collections',
      {
        id: `eq.${id}`,
      },
      {
        ...payload,
      },
    );

    return rows[0] ? mapCollection(rows[0]) : null;
  } catch (error) {
    console.error('[updateCollection] failed', { id, payload, error });
    throw error;
  }
}

export async function deleteCollection(id: string) {
  const supabase = createSupabaseAdminClient();

  try {
    await supabase.update(
      'products',
      {
        collection_id: `eq.${id}`,
      },
      {
        collection_id: null,
      },
    );

    await supabase.delete('collections', {
      id: `eq.${id}`,
    });
  } catch (error) {
    console.error('[deleteCollection] failed', { id, error });
    throw error;
  }
}

export async function deactivateCollection(id: string) {
  const supabase = createSupabaseAdminClient();

  try {
    await supabase.update(
      'collections',
      {
        id: `eq.${id}`,
      },
      {
        is_active: false,
      },
    );
  } catch (error) {
    console.error('[deactivateCollection] failed', { id, error });
    throw error;
  }
}
