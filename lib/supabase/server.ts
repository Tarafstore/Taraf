import { SupabaseRestClient } from '@/lib/supabase/shared';

export function createSupabaseServerClient() {
  return new SupabaseRestClient({ cache: 'no-store' });
}
