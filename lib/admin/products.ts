import { createSupabaseServerClient } from '@/lib/supabase/server';

export type AdminProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  sale_price: number | null;
  sku: string | null;
  category: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images: AdminProductImage[];
};

type ProductRow = Omit<AdminProduct, 'images'>;
type ProductImageRow = AdminProductImage;

function asNumber(value: string | number | null | undefined) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}

export function slugifyArabic(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseImagesFromFormData(formData: FormData) {
  const imageUrls = formData.getAll('image_url').map((item) => `${item}`.trim());
  const sortOrders = formData.getAll('sort_order').map((item) => `${item}`.trim());

  return imageUrls
    .map((image_url, index) => ({
      image_url,
      sort_order: sortOrders[index] ? Number(sortOrders[index]) : index,
    }))
    .filter((image) => image.image_url.length > 0)
    .map((image, index) => ({
      ...image,
      sort_order: Number.isFinite(image.sort_order) ? image.sort_order : index,
    }));
}

export async function getAdminProducts() {
  const supabase = createSupabaseServerClient();

  const products = await supabase.from<ProductRow>('products', {
    select:
      'id,name,slug,description,price,sale_price,sku,category,is_active,is_featured,created_at,updated_at',
    order: 'created_at.desc',
  });

  const productIds = products.map((item) => item.id);

  if (productIds.length === 0) {
    return [] as AdminProduct[];
  }

  const productIdFilter = `in.(${productIds.join(',')})`;
  const images = await supabase.from<ProductImageRow>('product_images', {
    select: 'id,product_id,image_url,sort_order,created_at',
    product_id: productIdFilter,
    order: 'sort_order.asc.nullslast',
  });

  const imagesMap = new Map<string, ProductImageRow[]>();

  for (const image of images) {
    const list = imagesMap.get(image.product_id) ?? [];
    list.push({
      ...image,
      sort_order: image.sort_order ?? 0,
    });
    imagesMap.set(image.product_id, list);
  }

  return products.map((item) => ({
    ...item,
    name: item.name ?? '',
    slug: item.slug ?? '',
    description: item.description ?? null,
    price: asNumber(item.price),
    sale_price: asNumber(item.sale_price),
    sku: item.sku ?? null,
    category: item.category ?? null,
    is_active: item.is_active ?? false,
    is_featured: item.is_featured ?? false,
    images: imagesMap.get(item.id) ?? [],
  }));
}

export async function getAdminProductById(id: string) {
  const supabase = createSupabaseServerClient();
  const rows = await supabase.from<ProductRow>('products', {
    select:
      'id,name,slug,description,price,sale_price,sku,category,is_active,is_featured,created_at,updated_at',
    id: `eq.${id}`,
    limit: 1,
  });

  const product = rows[0];

  if (!product) {
    return null;
  }

  const images = await supabase.from<ProductImageRow>('product_images', {
    select: 'id,product_id,image_url,sort_order,created_at',
    product_id: `eq.${id}`,
    order: 'sort_order.asc.nullslast',
  });

  return {
    ...product,
    name: product.name ?? '',
    slug: product.slug ?? '',
    description: product.description ?? null,
    price: asNumber(product.price),
    sale_price: asNumber(product.sale_price),
    sku: product.sku ?? null,
    category: product.category ?? null,
    is_active: product.is_active ?? false,
    is_featured: product.is_featured ?? false,
    images: images.map((image) => ({
      ...image,
      sort_order: image.sort_order ?? 0,
    })),
  } as AdminProduct;
}

export function filterAdminProducts(
  products: AdminProduct[],
  {
    search,
    category,
    active,
    featured,
  }: { search?: string; category?: string; active?: string; featured?: string }
) {
  const normalizedSearch = search?.trim().toLowerCase() ?? '';

  return products.filter((product) => {
    const searchMatched =
      normalizedSearch.length === 0 ||
      [product.name, product.slug, product.sku ?? '', product.category ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);

    const categoryMatched = !category || category === 'all' || product.category === category;

    const activeMatched =
      !active ||
      active === 'all' ||
      (active === 'active' && product.is_active) ||
      (active === 'inactive' && !product.is_active);

    const featuredMatched =
      !featured ||
      featured === 'all' ||
      (featured === 'featured' && product.is_featured) ||
      (featured === 'normal' && !product.is_featured);

    return searchMatched && categoryMatched && activeMatched && featuredMatched;
  });
}
