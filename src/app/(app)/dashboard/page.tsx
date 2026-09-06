import Link from "next/link";
import { requireSession, toAuthUser } from "@/lib/auth/session";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await requireSession();
  const user = toAuthUser(session.user);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col gap-2 border-b border-[var(--rule)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <p className="text-[11px] font-medium tracking-[0.16em] text-[var(--ink-muted)] uppercase">
              Authenticated Session
            </p>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
            Welcome, {user.name}
          </h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Signed in as <span className="font-medium text-[var(--ink)]">{user.email}</span>
          </p>
        </div>

        <div className="pt-2 sm:pt-0">
          <p className="text-xs text-[var(--ink-muted)]">
            Session ID:{" "}
            <span className="font-mono text-[var(--ink)]">
              {session.session.id.slice(0, 12)}…
            </span>
          </p>
        </div>
      </div>

      {/* Floating Info Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Workspace Status */}
        <div className="rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-6 shadow-sm transition-all hover:border-[var(--ink)]/40 hover:shadow-md">
          <div className="flex items-center justify-between pb-3">
            <p className="text-xs font-medium tracking-wider text-[var(--ink-muted)] uppercase">
              Workspace
            </p>
            <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
              Online
            </span>
          </div>
          <h2 className="font-serif text-xl tracking-tight">Private Chat Environment</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
            All AI model queries are dispatched securely from the server via OpenRouter. Keys remain shielded.
          </p>
        </div>

        {/* Card 2: Image Engine */}
        <div className="rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-6 shadow-sm transition-all hover:border-[var(--ink)]/40 hover:shadow-md">
          <div className="flex items-center justify-between pb-3">
            <p className="text-xs font-medium tracking-wider text-[var(--ink-muted)] uppercase">
              Storage
            </p>
            <span className="rounded-full bg-[var(--rule)]/40 px-2 py-0.5 text-[10px] font-medium text-[var(--ink)]">
              Cloudflare R2
            </span>
          </div>
          <h2 className="font-serif text-xl tracking-tight">Media Vault</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
            Image generation pipelines connect directly to Cloudflare R2 bucket storage.
          </p>
        </div>

        {/* Card 3: Account Profile */}
        <div className="rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-6 shadow-sm transition-all hover:border-[var(--ink)]/40 hover:shadow-md">
          <div className="flex items-center justify-between pb-3">
            <p className="text-xs font-medium tracking-wider text-[var(--ink-muted)] uppercase">
              Security
            </p>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
              HttpOnly Cookie
            </span>
          </div>
          <h2 className="font-serif text-xl tracking-tight">Session Protection</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
            Sessions persist via secure HTTP-only cookies with a 5-minute cache layer.
          </p>
        </div>
      </div>

      {/* Action / Next steps panel */}
      <div className="rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl tracking-tight">Ready to begin?</h3>
            <p className="text-sm text-[var(--ink-muted)]">
              Start conversations with supported frontier models, review saved chat threads, or customize prompts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--accent)] px-5 text-sm font-medium text-[var(--on-accent)] transition-all hover:bg-[var(--accent-hover)] shadow-sm"
            >
              New Conversation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
