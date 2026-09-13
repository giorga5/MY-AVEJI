"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/types";

function textOrNull(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v || null;
}

export async function updateSiteSettingsAction(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const fields = {
    store_name: textOrNull(formData, "store_name") ?? "MY AVEJI",
    tagline: textOrNull(formData, "tagline"),
    hero_headline: textOrNull(formData, "hero_headline"),
    hero_subtext: textOrNull(formData, "hero_subtext"),
    about_text: textOrNull(formData, "about_text"),
    phone: textOrNull(formData, "phone"),
    phone_2: textOrNull(formData, "phone_2"),
    whatsapp_number: textOrNull(formData, "whatsapp_number"),
    facebook_url: textOrNull(formData, "facebook_url"),
    instagram_url: textOrNull(formData, "instagram_url"),
    address: textOrNull(formData, "address"),
    business_hours: textOrNull(formData, "business_hours"),
    map_embed_url: textOrNull(formData, "map_embed_url"),
  };

  const { error } = await supabase.from("site_settings").update(fields).eq("id", 1);
  if (error) return { error: "განახლება ვერ მოხერხდა: " + error.message };

  revalidatePath("/");
  revalidatePath("/admin/content");
  return { success: true, message: "ცვლილებები შენახულია." };
}
