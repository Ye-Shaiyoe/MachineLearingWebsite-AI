"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { resetPasswordSchema } from "@/lib/auth/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="flex w-full flex-col gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">
            Invalid reset link
          </h1>
          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
            This password reset link is missing a valid token or has expired.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/forgot-password"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[var(--rule)] bg-transparent px-4 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
          >
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex w-full flex-col gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">
            Password updated
          </h1>
          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
            Your password has been changed. You can now sign in with your new password.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">
          Set new password
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Must be at least eight characters.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      {error ? (
        <p className="text-sm text-[#8a3b2b]" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Updating password…" : "Update password"}
      </Button>

      <p className="text-sm text-[var(--ink-muted)]">
        Remembered your password?{" "}
        <Link href="/login" className="text-[var(--ink)] underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
