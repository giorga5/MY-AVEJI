import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase Auth requires an email address, but the admin logs in with a
 * plain username. This fixed, non-routable domain maps one to the other
 * server-side -- it's never emailed to anyone and never shown in the UI.
 * When creating the admin user in the Supabase dashboard, use
 * `<username>@admin.myaveji.local` as the email.
 */
export const ADMIN_EMAIL_DOMAIN = "admin.myaveji.local";

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${ADMIN_EMAIL_DOMAIN}`;
}

/**
 * Server-side guard for admin pages/layouts. Middleware already redirects
 * unauthenticated requests away from /admin/**, but Supabase's own guidance
 * is to re-verify with getUser() wherever access truly matters, since
 * middleware can be bypassed in edge cases (e.g. cached responses).
 */
export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
