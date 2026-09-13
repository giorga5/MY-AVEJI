"use client";

import { startTransition, useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import SubmitButton from "@/components/admin/SubmitButton";
import type { ActionResult } from "@/lib/types";

const initialState: ActionResult = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {state?.error && <div className="admin-error-banner">{state.error}</div>}

      <div className="form-field">
        <label htmlFor="username">მომხმარებელი</label>
        <input type="text" id="username" name="username" autoComplete="username" required autoFocus />
      </div>
      <div className="form-field">
        <label htmlFor="password">პაროლი</label>
        <input type="password" id="password" name="password" autoComplete="current-password" required />
      </div>

      <SubmitButton pending={isPending} className="btn btn-primary btn-block" pendingText="შესვლა...">
        შესვლა
      </SubmitButton>
    </form>
  );
}
