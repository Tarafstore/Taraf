-- TARAF collections support
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products
  add column if not exists collection_id uuid references public.collections(id);

create index if not exists idx_products_collection_id on public.products(collection_id);
create index if not exists idx_collections_active_sort on public.collections(is_active, sort_order);
