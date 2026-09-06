import Link from "next/link";
import { requireGuest } from "@/lib/auth/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireGuest();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Soft ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="h-[32rem] w-[32rem] rounded-full bg-[var(--accent)]/5 blur-3xl" />
      </div>

      {/* Floating Card Container */}
      <div className="relative w-full max-w-[440px] rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
        {/* Floating Card Header */}
        <div className="mb-7 flex items-center justify-between border-b border-[var(--rule)]/60 pb-5">
          <Link href="/" className="inline-flex items-center gap-2.5 text-[var(--ink)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--rule)] bg-[var(--paper)] font-serif text-sm font-semibold shadow-xs">
              AI
            </span>
            <span className="font-serif text-lg font-medium tracking-tight">AI Chat</span>
          </Link>
          <span className="rounded-full border border-[var(--rule)]/80 bg-[var(--paper)] px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[var(--ink-muted)] uppercase">
            Private Space
          </span>
        </div>

        {/* Content */}
        {children}

        {/* Floating Card Footer Note */}
        <div className="mt-8 border-t border-[var(--rule)]/60 pt-4 text-center">
          <p className="text-[11px] text-[var(--ink-muted)]">
            Encrypted session · Server-side execution
          </p>
        </div>
      </div>
    </div>
  );
}
