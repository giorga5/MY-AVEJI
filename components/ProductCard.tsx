import Image from "next/image";
import CategoryIcon from "./CategoryIcon";
import { getProductImageUrl } from "@/lib/storage";
import type { Product } from "@/lib/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ka-GE").format(price);
}

export default function ProductCard({ product }: { product: Product }) {
  const images = product.product_images ?? [];
  const firstImage = images[0];
  const iconKey = product.category?.icon_key ?? "default";

  return (
    <article className="product-card">
      <div className="product-media">
        {firstImage ? (
          <Image
            src={getProductImageUrl(firstImage.storage_path)}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <CategoryIcon iconKey={iconKey} />
        )}
        {product.is_featured && <span className="product-tag">აქცია</span>}
      </div>
      <div className="product-body">
        {product.category && <span className="product-cat">{product.category.name}</span>}
        <h3>{product.name}</h3>
        <div className="product-footer">
          <span className={`product-price${product.is_featured ? " is-on-sale" : ""}`}>
            {formatPrice(product.price)} ₾
          </span>
        </div>
      </div>
    </article>
  );
}
