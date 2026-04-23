export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  is_active: boolean;
  is_featured: boolean;
  images: ProductImage[];
};
