import { SupabaseRestClient } from '@/lib/supabase/shared';

let browserClient: SupabaseRestClient | null = null;

export function createSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = new SupabaseRestClient();
  }

  return browserClient;
}
