const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function assertEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`${name} is missing. Please add it to your environment variables.`);
  }

  return value;
}

export function getSupabaseEnv() {
  return {
    url: assertEnv(supabaseUrl, 'NEXT_PUBLIC_SUPABASE_URL'),
    publishableKey: assertEnv(supabasePublishableKey, 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
  };
}
