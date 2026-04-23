import { getSupabaseEnv } from '@/lib/supabase/env';

type SupabaseQueryValue = string | number | boolean;

export type SupabaseFetchOptions = {
  cache?: RequestCache;
};

function serializeValue(value: SupabaseQueryValue) {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return `${value}`;
}

export class SupabaseRestClient {
  private readonly url: string;
  private readonly publishableKey: string;
  private readonly fetchOptions: SupabaseFetchOptions;

  constructor(fetchOptions: SupabaseFetchOptions = {}) {
    const env = getSupabaseEnv();

    this.url = env.url;
    this.publishableKey = env.publishableKey;
    this.fetchOptions = fetchOptions;
  }

  async from<T>(table: string, query: Record<string, SupabaseQueryValue> = {}): Promise<T[]> {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      searchParams.set(key, serializeValue(value));
    }

    const response = await fetch(`${this.url}/rest/v1/${table}?${searchParams.toString()}`, {
      headers: {
        apikey: this.publishableKey,
        Authorization: `Bearer ${this.publishableKey}`,
      },
      cache: this.fetchOptions.cache,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Supabase request failed (${response.status}): ${body}`);
    }

    return (await response.json()) as T[];
  }
}
