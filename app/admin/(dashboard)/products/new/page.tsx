import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "@/lib/actions/products";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>ახალი პროდუქტი</h1>
          <p>შეავსეთ ინფორმაცია და დაამატეთ სურათები</p>
        </div>
      </div>
      <ProductForm action={createProductAction} categories={categories ?? []} submitLabel="დამატება" />
    </>
  );
}
