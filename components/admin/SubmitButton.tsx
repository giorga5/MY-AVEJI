"use client";

interface SubmitButtonProps {
  children: React.ReactNode;
  pending: boolean;
  className?: string;
  pendingText?: string;
}

/**
 * Plain pending-aware submit button. Takes `pending` explicitly (from the
 * parent's useActionState) rather than reading it via useFormStatus, because
 * our forms submit through a manual onSubmit + formAction(new FormData(...))
 * call instead of the native <form action={fn}> binding -- doing that
 * deliberately opts out of React's "reset the form after any action call
 * that doesn't throw" behavior, which was wiping these forms back to blank
 * even when the action returned a validation/DB error instead of throwing.
 */
export default function SubmitButton({ children, pending, className = "btn btn-primary", pendingText = "დამუშავება..." }: SubmitButtonProps) {
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
