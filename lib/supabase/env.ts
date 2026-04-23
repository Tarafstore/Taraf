function readEnv(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') {
  return process.env[name];
}

function assertEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(
      `${name} is missing. Please set it in Vercel Environment Variables and redeploy so the build picks it up.`
    );
  }

  return value;
}

export function getSupabaseEnv() {
  return {
    url: assertEnv(readEnv('NEXT_PUBLIC_SUPABASE_URL'), 'NEXT_PUBLIC_SUPABASE_URL'),
    publishableKey: assertEnv(
      readEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
      'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
    ),
  };
}
