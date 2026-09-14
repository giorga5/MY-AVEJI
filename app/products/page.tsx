import { Suspense } from "react";
import { getCategories, getVisibleProducts, getSiteSettings } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductsCatalog from "@/components/ProductsCatalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "კატალოგი — MY AVEJI",
};

export default async function ProductsPage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getVisibleProducts(),
    getSiteSettings(),
  ]);

  const storeName = settings?.store_name ?? "MY AVEJI";
  const tagline = settings?.tagline ?? null;

  return (
    <>
      <SiteHeader storeName={storeName} tagline={tagline} logoSrc="/Media/logo.jpg" />
      <main id="top">
        <Suspense fallback={null}>
          <ProductsCatalog categories={categories} products={products} />
        </Suspense>
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
