import { requireGuest } from "@/lib/auth/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireGuest();

  return (
    <div className="grid min-h-full lg:grid-cols-[minmax(0,1fr)_28rem]">
      <aside className="relative hidden flex-col justify-between border-r border-[var(--rule)] px-12 py-12 lg:flex">
        <p className="font-serif text-2xl tracking-tight">
          AI Chat
        </p>
        <div className="max-w-sm space-y-4">
          <p className="font-serif text-4xl leading-tight tracking-tight">
            Work stays on the server. History stays with the account.
          </p>
          <p className="text-sm leading-6 text-[var(--ink-muted)]">
            Models are called from the application backend. API keys are never
            sent to the browser.
          </p>
        </div>
        <p className="text-xs tracking-[0.16em] text-[var(--ink-muted)] uppercase">
          Private workspace
        </p>
      </aside>
      <main className="flex flex-col justify-center px-6 py-16 sm:px-10">
        <p className="mb-10 font-serif text-xl lg:hidden">
          AI Chat
        </p>
        {children}
      </main>
    </div>
  );
}
