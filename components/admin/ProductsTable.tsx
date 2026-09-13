"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog";
import { useToast } from "./ToastProvider";
import {
  deleteProductAction,
  duplicateProductAction,
  moveProductAction,
  toggleFeaturedAction,
  toggleVisibleAction,
} from "@/lib/actions/products";
import { getProductImageUrl } from "@/lib/storage";
import type { ActionResult, Product } from "@/lib/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ka-GE").format(price);
}

export default function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  function runAction(id: string, fn: () => Promise<ActionResult>) {
    setPendingId(id);
    startTransition(async () => {
      const result = await fn();
      setPendingId(null);
      if (result?.error) {
        showToast("error", result.error);
      } else {
        if (result?.message) showToast("success", result.message);
        router.refresh();
      }
    });
  }

  function handleDeleteConfirmed() {
    if (!confirmDelete) return;
    const product = confirmDelete;
    setConfirmDelete(null);
    runAction(product.id, () => deleteProductAction(product.id));
  }

  if (products.length === 0) {
    return (
      <div className="admin-card">
        <p>ჯერ არცერთი პროდუქტი არ დამატებულა.</p>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>სურათი</th>
              <th>დასახელება</th>
              <th>კატეგორია</th>
              <th>ფასი</th>
              <th>სტატუსი</th>
              <th>რიგითობა</th>
              <th>მოქმედება</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const firstImage = product.product_images?.[0];
              const busy = isPending && pendingId === product.id;
              return (
                <tr key={product.id}>
                  <td>
                    {firstImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="admin-table-thumb" src={getProductImageUrl(firstImage.storage_path)} alt="" />
                    ) : (
                      <div className="admin-table-thumb" />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category?.name ?? "—"}</td>
                  <td>{formatPrice(product.price)} ₾</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        <button
                          type="button"
                          className="switch-btn"
                          data-on={product.is_visible}
                          disabled={busy}
                          aria-label="საიტზე გამოქვეყნება"
                          onClick={() => runAction(product.id, () => toggleVisibleAction(product.id, !product.is_visible))}
                        >
                          <span className="switch-knob" />
                        </button>
                        საიტზე
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        <button
                          type="button"
                          className="switch-btn"
                          data-on={product.is_featured}
                          disabled={busy}
                          aria-label="აქცია"
                          onClick={() => runAction(product.id, () => toggleFeaturedAction(product.id, !product.is_featured))}
                        >
                          <span className="switch-knob" />
                        </button>
                        აქცია
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        disabled={busy || index === 0}
                        aria-label="ზემოთ გადატანა"
                        onClick={() => runAction(product.id, () => moveProductAction(product.id, "up"))}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        disabled={busy || index === products.length - 1}
                        aria-label="ქვემოთ გადატანა"
                        onClick={() => runAction(product.id, () => moveProductAction(product.id, "down"))}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={`/admin/products/${product.id}/edit`} className="icon-btn" aria-label="რედაქტირება">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </Link>
                      <button
                        type="button"
                        className="icon-btn"
                        disabled={busy}
                        aria-label="დუბლირება"
                        onClick={() => runAction(product.id, () => duplicateProductAction(product.id))}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="12" height="12" rx="2" />
                          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-btn danger"
                        disabled={busy}
                        aria-label="წაშლა"
                        onClick={() => setConfirmDelete(product)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="პროდუქტის წაშლა"
        description={`დარწმუნებული ხართ, რომ გსურთ წაშალოთ „${confirmDelete?.name}"? ეს მოქმედება შეუქცევადია.`}
        confirmLabel="წაშლა"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
