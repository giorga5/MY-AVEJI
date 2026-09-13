import { createClient } from "@/lib/supabase/server";
import CategoryManager from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>კატეგორიები</h1>
          <p>დაამატეთ, დაარედაქტირეთ ან შეცვალეთ კატეგორიების თანმიმდევრობა</p>
        </div>
      </div>
      <CategoryManager categories={categories ?? []} />
    </>
  );
}
