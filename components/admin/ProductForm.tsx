"use client";

import { startTransition, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import ImageUploader from "./ImageUploader";
import { getProductImageUrl } from "@/lib/storage";
import type { ActionResult, Category, Product } from "@/lib/types";

interface ProductFormProps {
  action: (prevState: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;
  categories: Category[];
  product?: Product;
  submitLabel: string;
}

const initialState: ActionResult = {};

export default function ProductForm({ action, categories, product, submitLabel }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const existingImages = (product?.product_images ?? []).map((img) => ({
    id: img.id,
    url: getProductImageUrl(img.storage_path),
  }));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card">
      {state?.error && <div className="admin-error-banner">{state.error}</div>}

      <div className="admin-form-grid">
        <div className="form-field">
          <label htmlFor="name">დასახელება *</label>
          <input type="text" id="name" name="name" defaultValue={product?.name} required />
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label htmlFor="price">ფასი (₾) *</label>
            <input type="number" id="price" name="price" step="0.01" min="0" defaultValue={product?.price} required />
          </div>
          <div className="form-field">
            <label htmlFor="category_id">კატეგორია *</label>
            <select id="category_id" name="category_id" defaultValue={product?.category_id ?? ""} required>
              <option value="" disabled>
                აირჩიეთ კატეგორია
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="description">აღწერა</label>
          <textarea id="description" name="description" rows={4} defaultValue={product?.description ?? ""} />
        </div>

        <div className="form-field">
          <label>სურათები</label>
          <ImageUploader existingImages={existingImages} />
          <p className="form-hint">შეგიძლიათ ატვირთოთ რამდენიმე სურათი ერთდროულად. პირველი სურათი გამოჩნდება ბარათზე.</p>
        </div>

        <div className="form-row form-row-2">
          <div className="checkbox-row">
            <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={product?.is_featured ?? false} />
            <label htmlFor="is_featured">გამორჩეული (აქცია)</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="is_visible" name="is_visible" defaultChecked={product?.is_visible ?? true} />
            <label htmlFor="is_visible">გამოქვეყნებულია საიტზე</label>
          </div>
        </div>
      </div>

      <div className="admin-form-actions">
        <SubmitButton pending={isPending}>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
