import { getCategories, getVisibleProducts, getSiteSettings } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import CategoriesGrid from "@/components/CategoriesGrid";
import ProductsGrid from "@/components/ProductsGrid";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getVisibleProducts(),
    getSiteSettings(),
  ]);

  const featuredProducts = pickRandom(products, 6);

  const storeName = settings?.store_name ?? "MY AVEJI";
  const tagline = settings?.tagline ?? null;

  return (
    <>
      <SiteHeader storeName={storeName} tagline={tagline} logoSrc="/Media/logo.jpg" />
      <main id="top">
        <Hero
          storeName={storeName}
          tagline={tagline}
          headline={settings?.hero_headline ?? "ხარისხიანი ავეჯი, შექმნილი თქვენი სახლისთვის"}
          subtext={
            settings?.hero_subtext ??
            "ჩვენ გთავაზობთ გამძლე და ესთეტიურ ავეჯს — დივნებიდან საწოლებამდე."
          }
          logoSrc="/Media/logo.jpg"
        />
        <ValueProps />
        <CategoriesGrid categories={categories} />
        <ProductsGrid products={featuredProducts} />
        <ContactSection settings={settings} />
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
