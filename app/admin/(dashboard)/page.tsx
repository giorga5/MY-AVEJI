import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: visibleCount }, { count: categoryCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_visible", true),
    supabase.from("categories").select("*", { count: "exact", head: true }),
  ]);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>მთავარი</h1>
          <p>მოკლე მიმოხილვა თქვენი საიტის შესახებ</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{productCount ?? 0}</span>
          <span className="stat-label">სულ პროდუქტი</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{visibleCount ?? 0}</span>
          <span className="stat-label">გამოქვეყნებული საიტზე</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{categoryCount ?? 0}</span>
          <span className="stat-label">კატეგორია</span>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "1rem" }}>სწრაფი მოქმედებები</h3>
        <div className="quick-links">
          <Link href="/admin/products/new" className="btn btn-primary">
            + ახალი პროდუქტი
          </Link>
          <Link href="/admin/categories" className="btn btn-outline">
            კატეგორიების მართვა
          </Link>
          <Link href="/admin/content" className="btn btn-outline">
            საიტის კონტენტის რედაქტირება
          </Link>
        </div>
      </div>
    </>
  );
}
