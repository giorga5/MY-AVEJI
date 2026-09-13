import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-side Supabase client (anon key only -- safe to expose).
 * Only used where a Client Component needs to talk to Supabase directly
 * (e.g. building signed preview URLs for not-yet-uploaded images).
 * All real mutations go through Server Actions, not this client.
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
