"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { resetPasswordSchema } from "@/lib/auth/schemas";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const parsed = resetPasswordSchema.safeParse({
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setPending(true);

    try {
      const res = await authClient.$fetch<{ status?: boolean }>("/reset-password", {
        method: "POST",
        body: {
          newPassword: parsed.data.password,
          token: token ?? "",
        },
      });

      if (res.error) {
        setError(res.error.message ?? "Failed to reset password. The link may have expired.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Failed to reset password. The link may have expired.");
    } finally {
      setPending(false);
    }
  }

  if (!token && !success) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Invalid Token
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            This password reset authorization link is missing a valid token or has expired.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/forgot-password"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-white text-slate-950 font-mono text-sm font-bold shadow-lg transition-all hover:bg-slate-200"
          >
            Request New Reset Token
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Password Updated
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Your cryptographic credentials have been refreshed. You can now authenticate your session.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-emerald-400 text-slate-950 font-mono text-sm font-bold shadow-lg transition-all hover:bg-emerald-300"
          >
            Authenticate Session →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <div className="space-y-1.5">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Set New Password
        </h2>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          Must be at least eight characters.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
        >
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••••••"
          required
          className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="confirmPassword"
          className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••••••"
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
          <span>Commit Password Update →</span>
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
