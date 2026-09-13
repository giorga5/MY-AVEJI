import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductsTable from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), product_images(*)")
    .order("sort_order", { ascending: true });

  const withSortedImages = (products ?? []).map((p) => ({
    ...p,
    product_images: [...(p.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }));

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>პროდუქტები</h1>
          <p>დაამატეთ, დაარედაქტირეთ ან დამალეთ პროდუქცია</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          + ახალი პროდუქტი
        </Link>
      </div>
      <ProductsTable products={withSortedImages} />
    </>
  );
}
