import CategoryIcon from "./CategoryIcon";
import type { Category } from "@/lib/types";

export default function CategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="section-pad">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">ჩვენი ასორტიმენტი</span>
          <h2>კატეგორიები</h2>
          <p>აირჩიეთ კატეგორია და იხილეთ ჩვენი პროდუქციის მაგალითები ქვემოთ.</p>
        </div>

        {categories.length > 0 ? (
          <div className="categories-grid">
            {categories.map((c) => (
              <a href="#products" className="category-card" key={c.id}>
                <span className="category-icon">
                  <CategoryIcon iconKey={c.icon_key} />
                </span>
                <h3>{c.name}</h3>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            კატეგორიები მალე დაემატება.
          </p>
        )}
      </div>
    </section>
  );
}
