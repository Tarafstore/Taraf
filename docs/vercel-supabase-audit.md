# Vercel + Supabase Deployment Audit

Date: 2026-04-23 (UTC)

## High-risk findings

1. **Environment variable naming mismatch can break production fetches**
   - The app expected `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` only.
   - Many Vercel + Supabase setups provide `NEXT_PUBLIC_SUPABASE_ANON_KEY` by default.
   - Impact: app throws at runtime and product lists fail to load.
   - Mitigation implemented: support both variable names.

2. **Server-side data access uses a public key only**
   - Server reads products with the publishable/anon key through PostgREST.
   - No per-user auth token is sent.
   - Impact: If RLS is strict and no public `SELECT` policies exist for storefront tables, requests return 401/403 and pages show fallback error content.
   - Recommended Supabase policy posture:
     - `products`: allow anonymous `SELECT` only where `is_active = true`.
     - `product_images`: allow anonymous `SELECT` only for images linked to active products.

3. **Potentially heavy origin traffic on Vercel**
   - The server client uses `cache: 'no-store'`, forcing every request to hit Supabase.
   - Impact: more latency and read load, especially under burst traffic.
   - Recommendation: consider Next.js revalidation (`next: { revalidate: 60 }`) for listing endpoints if near-real-time updates are not required.

## Medium-risk findings

1. **Image host allowlist not aligned with likely Supabase storage domain**
   - `next.config.ts` currently allows only `images.unsplash.com` remote images.
   - If switching to Next `<Image>` for Supabase-hosted assets, rendering will fail unless the Supabase storage host is added.

2. **Custom REST wrapper omits advanced Supabase ergonomics**
   - Current wrapper is functional but does not include built-in auth/session helpers from `@supabase/supabase-js`.
   - This is acceptable for a public storefront but becomes limiting for authenticated or role-aware features.

## Low-risk / quality findings

1. **Product card used duplicate image getter calls and had an unused variable**
   - This was cleaned up as part of this audit to keep lint output clean and avoid accidental regressions.

## Suggested deployment checklist for Vercel

- Add project env vars in Vercel for production and preview:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` **or** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify Supabase RLS policies for anonymous product browsing.
- Confirm Supabase project API URL matches `NEXT_PUBLIC_SUPABASE_URL` exactly.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before promoting.
- Optional: add cache/revalidate strategy to reduce repetitive reads.
