"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { loginSchema } from "@/lib/auth/schemas";
import { GoogleSignInButton } from "./google-sign-in-button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const parsed = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setPending(true);
    const { error: signInError } = await authClient.signIn.email({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (signInError) {
      setPending(false);
      setError(signInError.message ?? "Could not sign in with those details.");
      return;
    }

    const destination =
      nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")
        ? nextPath
        : "/dashboard";
    router.push(destination);
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <div className="space-y-1.5">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Sign In
        </h2>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          Access your private neural workspace and conversation threads.
        </p>
      </div>

      {/* Google Social OAuth Button */}
      <GoogleSignInButton
        label="Continue with Google"
        callbackURL={nextPath || "/dashboard"}
      />

      {/* Astrometric Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-white/15" />
        <span className="absolute bg-[#070a14] px-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Or via email gateway
        </span>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-mono text-[11px] text-slate-400 hover:text-emerald-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 font-mono text-sm font-bold text-slate-950 shadow-lg transition-all hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
          ) : (
            <span>Authenticate Session →</span>
          )}
        </button>
      </form>

      {/* Footer Switcher */}
      <div className="pt-2 border-t border-white/10 text-center">
        <p className="text-xs text-slate-300 font-sans">
          Don&apos;t have a station account?{" "}
          <Link
            href="/register"
            className="font-mono font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}
