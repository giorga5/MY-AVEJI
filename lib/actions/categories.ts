"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult, CategoryIconKey } from "@/lib/types";

export async function createCategoryAction(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();
  const iconKey = String(formData.get("icon_key") ?? "default") as CategoryIconKey;

  if (!name) return { error: "სახელის შევსება სავალდებულოა." };

  const { data: maxSortRow } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = (maxSortRow?.sort_order ?? 0) + 1;

  const { error } = await supabase.from("categories").insert({ name, icon_key: iconKey, sort_order: nextSort });
  if (error) return { error: "კატეგორიის დამატება ვერ მოხერხდა." };

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true, message: "კატეგორია დაემატა." };
}

export async function updateCategoryAction(
  categoryId: string,
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();
  const iconKey = String(formData.get("icon_key") ?? "default") as CategoryIconKey;

  if (!name) return { error: "სახელის შევსება სავალდებულოა." };

  const { error } = await supabase.from("categories").update({ name, icon_key: iconKey }).eq("id", categoryId);
  if (error) return { error: "განახლება ვერ მოხერხდა." };

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true, message: "კატეგორია განახლდა." };
}

export async function deleteCategoryAction(categoryId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if ((count ?? 0) > 0) {
    return { error: `ვერ წაიშლება — ${count} პროდუქტი ჯერ კიდევ მიბმულია ამ კატეგორიაზე.` };
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId);
  if (error) return { error: "წაშლა ვერ მოხერხდა." };

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true, message: "კატეგორია წაიშალა." };
}

export async function moveCategoryAction(categoryId: string, direction: "up" | "down"): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !categories) return { error: "ვერ მოხერხდა." };

  const index = categories.findIndex((c) => c.id === categoryId);
  if (index === -1) return { error: "კატეგორია ვერ მოიძებნა." };

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= categories.length) return { success: true };

  const current = categories[index];
  const swap = categories[swapIndex];

  await supabase.from("categories").update({ sort_order: swap.sort_order }).eq("id", current.id);
  await supabase.from("categories").update({ sort_order: current.sort_order }).eq("id", swap.id);

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true };
}
