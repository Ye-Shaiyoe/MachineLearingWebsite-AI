"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { forgotPasswordSchema } from "@/lib/auth/schemas";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const parsed = forgotPasswordSchema.safeParse({
      email: form.get("email"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the email and try again.");
      return;
    }

    setPending(true);

    try {
      const res = await authClient.$fetch<{ status?: boolean; message?: string }>("/request-password-reset", {
        method: "POST",
        body: {
          email: parsed.data.email,
          redirectTo: "/reset-password",
        },
      });

      if (res.error) {
        setError(res.error.message ?? "Could not send reset instructions.");
        return;
      }

      setSubmittedEmail(parsed.data.email);
    } catch {
      setError("Unable to process request. Please try again later.");
    } finally {
      setPending(false);
    }
  }

  if (submittedEmail) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Dispatch Sent
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            If an account exists for <span className="font-mono font-semibold text-white">{submittedEmail}</span>,
            we have transmitted secure instructions to reset your password.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-white text-slate-950 font-mono text-sm font-bold shadow-lg transition-all hover:bg-slate-200"
          >
            ← Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <div className="space-y-1.5">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Reset Password
        </h2>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          Enter your registered email address to receive password reset instructions.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="operator@orbital.network"
          required
          className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        />
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5 font-mono text-xs text-rose-300" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 font-mono text-sm font-bold text-slate-950 shadow-lg transition-all hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
        ) : (
          <span>Transmit Reset Link →</span>
        )}
      </button>

      <p className="text-center text-xs text-slate-300 pt-1">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-mono font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
