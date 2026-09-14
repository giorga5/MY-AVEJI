"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import CategoryIcon from "./CategoryIcon";
import type { Category, Product } from "@/lib/types";

type SortOption = "default" | "price-asc" | "price-desc";

interface ProductsCatalogProps {
  categories: Category[];
  products: Product[];
}

export default function ProductsCatalog({ categories, products }: ProductsCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  // Keep local state in sync if the URL changes from elsewhere (e.g. a
  // category link clicked again while already on this page).
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  function handleCategoryClick(categoryId: string) {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products", { scroll: false });
  }

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category_id === selectedCategory);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    result = [...result];
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => a.sort_order - b.sort_order);

    return result;
  }, [products, selectedCategory, search, sort]);

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <section className="section-pad">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">კატალოგი</span>
          <h2>{activeCategory ? activeCategory.name : "ყველა პროდუქტი"}</h2>
          <p>დაათვალიერეთ ჩვენი სრული კატალოგი.</p>
        </div>

        <div className="catalog-filters">
          <div className="catalog-categories">
            <button
              type="button"
              className={`catalog-pill${selectedCategory === "all" ? " is-active" : ""}`}
              onClick={() => handleCategoryClick("all")}
            >
              ყველა
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`catalog-pill${selectedCategory === c.id ? " is-active" : ""}`}
                onClick={() => handleCategoryClick(c.id)}
              >
                <span className="catalog-pill-icon">
                  <CategoryIcon iconKey={c.icon_key} />
                </span>
                {c.name}
              </button>
            ))}
          </div>

          <div className="catalog-controls">
            <input
              type="search"
              className="catalog-search"
              placeholder="ძებნა..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="პროდუქტის ძებნა"
            />
            <select
              className="catalog-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="დალაგება"
            >
              <option value="default">დალაგება: ჩვეულებრივი</option>
              <option value="price-asc">ფასი: დაბლიდან მაღლა</option>
              <option value="price-desc">ფასი: მაღლიდან დაბლა</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: "2rem" }}>
            ამ ფილტრით პროდუქტი ვერ მოიძებნა.
          </p>
        )}
      </div>
    </section>
  );
}
