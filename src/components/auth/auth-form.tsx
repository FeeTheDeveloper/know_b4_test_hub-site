"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/types";

interface AuthFormProps {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  children: React.ReactNode;
}

export function AuthForm({ action, submitLabel, children }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: true,
  });

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state.message && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
          {state.message}
        </div>
      )}

      {children}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-brandBlue bg-brandGold hover:bg-brandGoldLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
