const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "product-images";

/** Builds the public URL for a file stored in the product-images bucket. */
export function getProductImageUrl(storagePath: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

export { BUCKET as PRODUCT_IMAGES_BUCKET };
