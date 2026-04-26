import 'server-only';

import { getSupabaseAdminEnv } from '@/lib/supabase/env';
import { SupabaseRestClient } from '@/lib/supabase/shared';

export function createSupabaseAdminClient() {
  const env = getSupabaseAdminEnv();

  return new SupabaseRestClient({
    cache: 'no-store',
    apiKey: env.serviceRoleKey,
  });
}
