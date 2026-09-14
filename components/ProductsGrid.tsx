import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section id="products" className="section-pad section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">გამორჩეული მოდელები</span>
          <h2>პოპულარული პროდუქცია</h2>
          <p>რამდენიმე მაგალითი ჩვენი ასორტიმენტიდან — სრული კატალოგისთვის მოგვინახულეთ სავაჭრო დარბაზში.</p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <a href="/products" className="btn btn-primary">
                სრული კატალოგის ნახვა
              </a>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            მალე დაემატება პროდუქცია.
          </p>
        )}
      </div>
    </section>
  );
}
