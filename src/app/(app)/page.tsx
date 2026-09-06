import { requireSession, toAuthUser } from "@/lib/auth/session";

export default async function HomePage() {
  const session = await requireSession();
  const user = toAuthUser(session.user);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <p className="text-[11px] tracking-[0.18em] text-[var(--ink-muted)] uppercase">
        Signed in
      </p>
      <h1 className="font-serif text-4xl tracking-tight">
        {user.name}
      </h1>
      <p className="max-w-md text-sm leading-6 text-[var(--ink-muted)]">
        Session is stored in an HTTP-only cookie and restored on each request.
        Conversations will attach to this account.
      </p>
    </main>
  );
}
