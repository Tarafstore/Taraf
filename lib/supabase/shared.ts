import { getSupabaseEnv } from '@/lib/supabase/env';

type SupabaseQueryValue = string | number | boolean;

type SupabaseMutatePayload = Record<string, unknown> | Record<string, unknown>[];

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

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    table: string,
    query: Record<string, SupabaseQueryValue> = {},
    payload?: SupabaseMutatePayload,
    headers: Record<string, string> = {}
  ): Promise<T[]> {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      searchParams.set(key, serializeValue(value));
    }

    const hasQuery = searchParams.toString();
    const endpoint = `${this.url}/rest/v1/${table}${hasQuery ? `?${hasQuery}` : ''}`;
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: this.publishableKey,
        Authorization: `Bearer ${this.publishableKey}`,
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      cache: this.fetchOptions.cache,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Supabase request failed (${response.status}): ${body}`);
    }

    if (response.status === 204) {
      return [];
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    return JSON.parse(text) as T[];
  }

  async from<T>(table: string, query: Record<string, SupabaseQueryValue> = {}): Promise<T[]> {
    return this.request<T>('GET', table, query);
  }

  async insert<T>(table: string, payload: SupabaseMutatePayload): Promise<T[]> {
    return this.request<T>('POST', table, {}, payload, {
      Prefer: 'return=representation',
    });
  }

  async update<T>(table: string, query: Record<string, SupabaseQueryValue>, payload: Record<string, unknown>): Promise<T[]> {
    return this.request<T>('PATCH', table, query, payload, {
      Prefer: 'return=representation',
    });
  }

  async delete(table: string, query: Record<string, SupabaseQueryValue>) {
    await this.request('DELETE', table, query, undefined, {
      Prefer: 'return=minimal',
    });
  }
}
