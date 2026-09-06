import { LogoutButton } from "@/components/auth/logout-button";
import type { AuthUser } from "@/types/auth";

export function AppHeader({ user }: { user: AuthUser }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--rule)] px-6">
      <p className="font-serif text-lg tracking-tight">
        AI Chat
      </p>
      <div className="flex items-center gap-4">
        <p className="hidden text-sm text-[var(--ink-muted)] sm:block">
          {user.name}
          <span className="mx-2 text-[var(--rule)]">/</span>
          {user.email}
        </p>
        <LogoutButton />
      </div>
    </header>
  );
}
