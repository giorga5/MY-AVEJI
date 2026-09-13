import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import { updateProductAction } from "@/lib/actions/products";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*, product_images(*)").eq("id", id).single(),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
  ]);

  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>პროდუქტის რედაქტირება</h1>
          <p>{product.name}</p>
        </div>
      </div>
      <ProductForm action={boundAction} categories={categories ?? []} product={product} submitLabel="შენახვა" />
    </>
  );
}
