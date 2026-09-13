"use client";

import { startTransition, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { changePasswordAction } from "@/lib/actions/account";
import type { ActionResult } from "@/lib/types";

const initialState: ActionResult = {};

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card" style={{ maxWidth: "480px" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>პაროლის შეცვლა</h3>
      {state?.error && <div className="admin-error-banner">{state.error}</div>}
      {state?.success && state.message && (
        <div className="admin-error-banner" style={{ background: "#e6f4ea", borderColor: "#b7dcc0", color: "#2b7a3f" }}>
          {state.message}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="current_password">მიმდინარე პაროლი</label>
        <input type="password" id="current_password" name="current_password" autoComplete="current-password" required />
      </div>
      <div className="form-field">
        <label htmlFor="new_password">ახალი პაროლი</label>
        <input type="password" id="new_password" name="new_password" autoComplete="new-password" minLength={8} required />
      </div>
      <div className="form-field">
        <label htmlFor="confirm_password">გაიმეორეთ ახალი პაროლი</label>
        <input type="password" id="confirm_password" name="confirm_password" autoComplete="new-password" minLength={8} required />
      </div>

      <div className="admin-form-actions">
        <SubmitButton pending={isPending}>პაროლის განახლება</SubmitButton>
      </div>
    </form>
  );
}
