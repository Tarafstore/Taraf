import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Product, ProductImage } from '@/lib/types/product';

type ProductRow = {
  id: string;
  slug: string | null;
  name: string | null;
  description?: string | null;
  category?: string | null;
  price?: number | string | null;
  is_active?: boolean | null;
  is_featured?: boolean | null;
};

type ProductImageRow = {
  id: string;
  product_id: string;
  image_url: string | null;
  alt_text?: string | null;
  sort_order?: number | null;
};

const FALLBACK_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%23ece7e2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23978674' font-family='sans-serif' font-size='28'%3ETaraf%3C/text%3E%3C/svg%3E";

function toNumber(value: number | string | null | undefined) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

function mapImage(row: ProductImageRow): ProductImage | null {
  if (!row.image_url) {
    return null;
  }

  return {
    id: row.id,
    product_id: row.product_id,
    image_url: row.image_url,
    alt_text: row.alt_text ?? null,
    sort_order: row.sort_order ?? null,
  };
}

function mapProduct(row: ProductRow, images: ProductImage[]): Product {
  return {
    id: row.id,
    slug: row.slug ?? row.id,
    name: row.name ?? 'منتج',
    description: row.description ?? null,
    category: row.category ?? null,
    price: toNumber(row.price),
    is_active: row.is_active ?? true,
    is_featured: row.is_featured ?? false,
    images,
  };
}

async function loadImagesByProductIds(productIds: string[]) {
  if (productIds.length === 0) {
    return new Map<string, ProductImage[]>();
  }

  try {
    const supabase = createSupabaseServerClient();
    const productIdFilter = `in.(${productIds.join(',')})`;
    const rows = await supabase.from<ProductImageRow>('product_images', {
      select: 'id,product_id,image_url,alt_text,sort_order',
      product_id: productIdFilter,
      order: 'sort_order.asc.nullslast',
    });

    console.log('[loadImagesByProductIds] images rows count:', rows.length, {
      productIdsCount: productIds.length,
      productIdFilter,
    });

    const map = new Map<string, ProductImage[]>();

    for (const row of rows) {
      const image = mapImage(row);

      if (!image) {
        continue;
      }

      const existing = map.get(image.product_id) ?? [];
      existing.push(image);
      map.set(image.product_id, existing);
    }

    return map;
  } catch (error) {
    console.error('[loadImagesByProductIds] Error source: product_images query or image mapping', {
      productIds,
      error,
    });

    return new Map<string, ProductImage[]>();
  }
}

async function loadProducts(query: Record<string, string | number | boolean>) {
  try {
    const supabase = createSupabaseServerClient();
    const rows = await supabase.from<ProductRow>('products', {
      select: 'id,slug,name,description,category,price,is_active,is_featured',
      ...query,
    });

    console.log('[loadProducts] products rows count:', rows.length, {
      query,
    });

    const imageMap = await loadImagesByProductIds(rows.map((row) => row.id));

    return rows.map((row) => mapProduct(row, imageMap.get(row.id) ?? []));
  } catch (error) {
    console.error('[loadProducts] Error source: products query or product mapping', {
      query,
      error,
    });
    throw error;
  }
}

function buildProductsQueryPath(query: Record<string, string | number | boolean>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    searchParams.set(key, `${value}`);
  }

  return `/rest/v1/products?${searchParams.toString()}`;
}

export async function getFeaturedProducts(limit = 4) {
  const featured = await loadProducts({
    is_active: 'eq.true',
    is_featured: 'eq.true',
    order: 'id.desc',
    limit,
  });

  if (featured.length > 0) {
    return featured;
  }

  return loadProducts({
    is_active: 'eq.true',
    order: 'id.desc',
    limit,
  });
}

export async function getActiveProducts() {
  return loadProducts({
    is_active: 'eq.true',
    order: 'id.desc',
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const slugQuery = {
      slug: `eq.${slug}`,
      limit: 1,
    };
    console.log('[getProductBySlug] Supabase query path (slug):', buildProductsQueryPath(slugQuery));

    const productsBySlug = await loadProducts(slugQuery);
    if (productsBySlug[0]) {
      return productsBySlug[0];
    }

    const idQuery = {
      id: `eq.${slug}`,
      limit: 1,
    };
    console.log('[getProductBySlug] Supabase query path (id fallback):', buildProductsQueryPath(idQuery));

    const productsById = await loadProducts(idQuery);
    return productsById[0] ?? null;
  } catch (error) {
    console.error('[getProductBySlug] Error source: slug lookup flow', {
      slug,
      error,
    });
    throw error;
  }
}

export async function getRelatedProducts(product: Product, limit = 4) {
  if (!product.category) {
    return [];
  }

  const related = await loadProducts({
    is_active: 'eq.true',
    category: `eq.${product.category}`,
    id: `neq.${product.id}`,
    order: 'id.desc',
    limit,
  });

  return related;
}

export function getProductPrimaryImage(product: Product) {
  return product.images[0]?.image_url ?? FALLBACK_PLACEHOLDER;
}

export function formatProductPrice(price: Product['price']) {
  if (price == null) {
    return 'السعر غير متوفر';
  }

  return `${price} ريال`;
}
