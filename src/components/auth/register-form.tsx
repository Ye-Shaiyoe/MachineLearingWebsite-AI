"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { registerSchema } from "@/lib/auth/schemas";
import { GoogleSignInButton } from "./google-sign-in-button";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const parsed = registerSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setPending(true);
    const { error: signUpError } = await authClient.signUp.email({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (signUpError) {
      setPending(false);
      setError(signUpError.message ?? "Could not create the account.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <div className="space-y-1.5">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Create Account
        </h2>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          Initialize your sovereign identity on the neural cluster.
        </p>
      </div>

      {/* Google Social OAuth Button */}
      <GoogleSignInButton
        label="Sign up with Google"
        callbackURL="/dashboard"
      />

      {/* Astrometric Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-white/15" />
        <span className="absolute bg-[#070a14] px-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Or register via email gateway
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
          >
            Operator Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            required
            className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        <div className="space-y-1">
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
            className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
          >
            Password (Min. 8 characters)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••••••"
            required
            className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block font-mono text-xs uppercase tracking-wider text-slate-300 font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••••••"
            required
            className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
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
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-mono text-sm font-bold text-slate-950 shadow-xl transition-all hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
          ) : (
            <span>Initialize Account →</span>
          )}
        </button>
      </form>

      {/* Footer Switcher */}
      <div className="pt-2 border-t border-white/10 text-center">
        <p className="text-xs text-slate-300 font-sans">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-mono font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            Sign in to session
          </Link>
        </p>
      </div>
    </div>
  );
}
