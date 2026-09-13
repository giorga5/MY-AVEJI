"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_IMAGES_BUCKET } from "@/lib/storage";
import type { ActionResult } from "@/lib/types";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

function parseBool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true";
}

async function uploadImages(supabase: SupabaseServerClient, productId: string, files: File[]) {
  const uploaded: { storage_path: string }[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `products/${productId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    uploaded.push({ storage_path: path });
  }
  return uploaded;
}

export async function createProductAction(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const priceRaw = String(formData.get("price") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const isFeatured = parseBool(formData, "is_featured");
  const isVisible = parseBool(formData, "is_visible");

  if (!name) return { error: "სახელის შევსება სავალდებულოა." };
  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price < 0) return { error: "ფასი არასწორია." };
  if (!categoryId) return { error: "აირჩიეთ კატეგორია." };

  const { data: maxSortRow } = await supabase
    .from("products")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = (maxSortRow?.sort_order ?? 0) + 1;

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name,
      description,
      price,
      category_id: categoryId,
      is_featured: isFeatured,
      is_visible: isVisible,
      sort_order: nextSort,
    })
    .select()
    .single();

  if (error || !product) {
    return { error: "პროდუქტის შექმნა ვერ მოხერხდა: " + (error?.message ?? "") };
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > 0) {
    try {
      const uploaded = await uploadImages(supabase, product.id, files);
      if (uploaded.length > 0) {
        await supabase
          .from("product_images")
          .insert(uploaded.map((u, i) => ({ product_id: product.id, storage_path: u.storage_path, sort_order: i })));
      }
    } catch {
      return { error: "პროდუქტი შეიქმნა, მაგრამ სურათების ატვირთვა ვერ მოხერხდა. გახსენით რედაქტირება და სცადეთ ხელახლა." };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const priceRaw = String(formData.get("price") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "");
  const isFeatured = parseBool(formData, "is_featured");
  const isVisible = parseBool(formData, "is_visible");

  if (!name) return { error: "სახელის შევსება სავალდებულოა." };
  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price < 0) return { error: "ფასი არასწორია." };
  if (!categoryId) return { error: "აირჩიეთ კატეგორია." };

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description,
      price,
      category_id: categoryId,
      is_featured: isFeatured,
      is_visible: isVisible,
    })
    .eq("id", productId);

  if (error) return { error: "განახლება ვერ მოხერხდა: " + error.message };

  const removeIds = formData
    .getAll("remove_image_ids")
    .map(String)
    .filter(Boolean);

  if (removeIds.length > 0) {
    const { data: imagesToRemove } = await supabase
      .from("product_images")
      .select("id, storage_path")
      .in("id", removeIds);

    if (imagesToRemove && imagesToRemove.length > 0) {
      await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(imagesToRemove.map((i) => i.storage_path));
      await supabase
        .from("product_images")
        .delete()
        .in("id", imagesToRemove.map((i) => i.id));
    }
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > 0) {
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("sort_order")
      .eq("product_id", productId)
      .order("sort_order", { ascending: false })
      .limit(1);

    let nextSort = (existingImages?.[0]?.sort_order ?? -1) + 1;

    try {
      const uploaded = await uploadImages(supabase, productId, files);
      if (uploaded.length > 0) {
        await supabase.from("product_images").insert(
          uploaded.map((u) => ({ product_id: productId, storage_path: u.storage_path, sort_order: nextSort++ }))
        );
      }
    } catch {
      return { error: "პროდუქტი განახლდა, მაგრამ ახალი სურათების ატვირთვა ვერ მოხერხდა." };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("product_images")
    .select("storage_path")
    .eq("product_id", productId);

  if (images && images.length > 0) {
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(images.map((i) => i.storage_path));
  }

  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) return { error: "წაშლა ვერ მოხერხდა: " + error.message };

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true, message: "პროდუქტი წაიშალა." };
}

export async function duplicateProductAction(productId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("id", productId)
    .single();

  if (fetchError || !product) return { error: "პროდუქტი ვერ მოიძებნა." };

  const { data: maxSortRow } = await supabase
    .from("products")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = (maxSortRow?.sort_order ?? 0) + 1;

  const { data: newProduct, error: insertError } = await supabase
    .from("products")
    .insert({
      name: `${product.name} (ასლი)`,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      is_featured: product.is_featured,
      is_visible: false,
      sort_order: nextSort,
    })
    .select()
    .single();

  if (insertError || !newProduct) return { error: "დუბლირება ვერ მოხერხდა." };

  const images = (product.product_images ?? []) as { storage_path: string; sort_order: number }[];

  for (const img of images) {
    const ext = img.storage_path.split(".").pop() || "jpg";
    const newPath = `products/${newProduct.id}/${crypto.randomUUID()}.${ext}`;
    const { error: copyError } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).copy(img.storage_path, newPath);
    if (!copyError) {
      await supabase.from("product_images").insert({
        product_id: newProduct.id,
        storage_path: newPath,
        sort_order: img.sort_order,
      });
    }
  }

  revalidatePath("/admin/products");
  return { success: true, message: "პროდუქტი დუბლირებულია (დამალული სახით)." };
}

export async function toggleVisibleAction(productId: string, next: boolean): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ is_visible: next }).eq("id", productId);
  if (error) return { error: "ვერ განახლდა." };
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function toggleFeaturedAction(productId: string, next: boolean): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ is_featured: next }).eq("id", productId);
  if (error) return { error: "ვერ განახლდა." };
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function moveProductAction(productId: string, direction: "up" | "down"): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !products) return { error: "ვერ მოხერხდა." };

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) return { error: "პროდუქტი ვერ მოიძებნა." };

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= products.length) return { success: true };

  const current = products[index];
  const swap = products[swapIndex];

  await supabase.from("products").update({ sort_order: swap.sort_order }).eq("id", current.id);
  await supabase.from("products").update({ sort_order: current.sort_order }).eq("id", swap.id);

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}
