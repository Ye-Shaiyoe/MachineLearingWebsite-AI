"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="flex w-full flex-col gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">
            Check your email
          </h1>
          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
            If an account exists for <span className="font-medium text-[var(--ink)]">{submittedEmail}</span>,
            we have sent instructions to reset your password.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[var(--rule)] bg-transparent px-4 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      {error ? (
        <p className="text-sm text-[#8a3b2b]" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Sending link…" : "Send reset link"}
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
