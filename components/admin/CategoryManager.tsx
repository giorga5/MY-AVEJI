"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { startTransition as startReactTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog";
import SubmitButton from "./SubmitButton";
import { useToast } from "./ToastProvider";
import CategoryIcon, { CATEGORY_ICON_OPTIONS } from "../CategoryIcon";
import {
  createCategoryAction,
  deleteCategoryAction,
  moveCategoryAction,
  updateCategoryAction,
} from "@/lib/actions/categories";
import type { ActionResult, Category } from "@/lib/types";

const initialState: ActionResult = {};

function CreateCategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategoryAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startReactTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="admin-card" style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>ახალი კატეგორია</h3>
      {state?.error && <div className="admin-error-banner">{state.error}</div>}
      <div className="form-row form-row-2">
        <div className="form-field">
          <label htmlFor="new-cat-name">დასახელება *</label>
          <input type="text" id="new-cat-name" name="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="new-cat-icon">ხატულა</label>
          <select id="new-cat-icon" name="icon_key" defaultValue="default">
            {CATEGORY_ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="admin-form-actions">
        <SubmitButton pending={isPending}>დამატება</SubmitButton>
      </div>
    </form>
  );
}

interface CategoryRowProps {
  category: Category;
  index: number;
  total: number;
  busy: boolean;
  onMove: (id: string, direction: "up" | "down") => void;
  onRequestDelete: (category: Category) => void;
}

function CategoryRow({ category, index, total, busy, onMove, onRequestDelete }: CategoryRowProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const boundUpdate = updateCategoryAction.bind(null, category.id);
  const [state, formAction, isPending] = useActionState(boundUpdate, initialState);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startReactTransition(() => {
      formAction(formData);
    });
  }

  if (isEditing) {
    return (
      <tr>
        <td colSpan={3}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
            {state?.error && (
              <div className="admin-error-banner" style={{ width: "100%" }}>
                {state.error}
              </div>
            )}
            <div className="form-field" style={{ marginBottom: 0, minWidth: "180px" }}>
              <label>დასახელება</label>
              <input type="text" name="name" defaultValue={category.name} required />
            </div>
            <div className="form-field" style={{ marginBottom: 0, minWidth: "160px" }}>
              <label>ხატულა</label>
              <select name="icon_key" defaultValue={category.icon_key}>
                {CATEGORY_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <SubmitButton pending={isPending} className="btn btn-primary btn-sm">შენახვა</SubmitButton>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>
                გაუქმება
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <span className="category-icon" style={{ width: 36, height: 36, display: "inline-flex" }}>
          <CategoryIcon iconKey={category.icon_key} />
        </span>
      </td>
      <td>{category.name}</td>
      <td>
        <div className="admin-row-actions">
          <button
            type="button"
            className="icon-btn"
            disabled={busy || index === 0}
            aria-label="ზემოთ გადატანა"
            onClick={() => onMove(category.id, "up")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="icon-btn"
            disabled={busy || index === total - 1}
            aria-label="ქვემოთ გადატანა"
            onClick={() => onMove(category.id, "down")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
          <button type="button" className="icon-btn" aria-label="რედაქტირება" onClick={() => setIsEditing(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button type="button" className="icon-btn danger" disabled={busy} aria-label="წაშლა" onClick={() => onRequestDelete(category)}>
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
}

export default function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState<Category | null>(null);

  function runAction(fn: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await fn();
      if (result?.error) showToast("error", result.error);
      else {
        if (result?.message) showToast("success", result.message);
        router.refresh();
      }
    });
  }

  function handleMove(id: string, direction: "up" | "down") {
    runAction(() => moveCategoryAction(id, direction));
  }

  function handleDeleteConfirmed() {
    if (!confirmDelete) return;
    const category = confirmDelete;
    setConfirmDelete(null);
    runAction(() => deleteCategoryAction(category.id));
  }

  return (
    <>
      <CreateCategoryForm />
      <div className="admin-card">
        {categories.length === 0 ? (
          <p>ჯერ არცერთი კატეგორია არ დამატებულა.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ხატულა</th>
                  <th>დასახელება</th>
                  <th>მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <CategoryRow
                    key={c.id}
                    category={c}
                    index={i}
                    total={categories.length}
                    busy={isPending}
                    onMove={handleMove}
                    onRequestDelete={setConfirmDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="კატეგორიის წაშლა"
        description={`დარწმუნებული ხართ, რომ გსურთ წაშალოთ „${confirmDelete?.name}"? თუ კატეგორიას პროდუქტი აქვს მიბმული, წაშლა ვერ მოხერხდება.`}
        confirmLabel="წაშლა"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmDelete(null)}
      />
    </>
  );
}
