import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options: CookieOptions };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client bound to the current request's cookies.
 * Use in Server Components, Server Actions, and Route Handlers.
 * Every mutation made with this client is authorized as the signed-in
 * user (or as `anon`) -- RLS policies in Postgres are what actually
 * decide what's allowed, not this file.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component that can't set cookies (e.g. a
          // page render, not a Server Action) -- middleware refreshes the
          // session on the next request instead, so this is safe to ignore.
        }
      },
    },
  });
}
