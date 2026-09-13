import { createClient } from "@/lib/supabase/server";
import type { Category, Product, SiteSettings } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getCategories error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getVisibleProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), product_images(*)")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getVisibleProducts error:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    ...p,
    product_images: [...(p.product_images ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  })) as Product[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("getSiteSettings error:", error.message);
    return null;
  }
  return data;
}
