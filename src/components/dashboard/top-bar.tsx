"use client";

import { Search, Bell, Moon, ChevronDown } from "lucide-react";
import type { AuthUser } from "@/types/auth";

export function DashboardTopBar({ user }: { user: AuthUser }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-[var(--ds-border)] bg-[var(--ds-surface)]/80 px-6 backdrop-blur-xl">
      {/* Search bar */}
      <div className="relative flex flex-1 items-center">
        <Search className="absolute left-3 h-4 w-4 text-[var(--ds-text-dim)]" />
        <input
          type="text"
          placeholder="Cari apa pun... (mis. buat gambar, jelaskan sesuatu, atau minta kode)"
          className="h-9 w-full max-w-lg rounded-lg border border-[var(--ds-border)] bg-[var(--ds-surface-2)] pl-9 pr-20 text-xs text-[var(--ds-text)] placeholder:text-[var(--ds-text-dim)] focus:border-[var(--ds-accent)]/30 focus:outline-none"
        />
        <span className="absolute right-3 rounded border border-[var(--ds-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ds-text-dim)]">
          Ctrl + K
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--ds-text-dim)] transition-colors hover:bg-[var(--ds-surface-2)] hover:text-[var(--ds-text)]"
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--ds-text-dim)] transition-colors hover:bg-[var(--ds-surface-2)] hover:text-[var(--ds-text)]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--ds-accent)]" />
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--ds-surface-2)]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--ds-accent)] to-[var(--ds-cyan)] text-[10px] font-bold text-[#030508]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-xs font-medium text-[var(--ds-text)]">
              {user.name}
            </p>
            <p className="text-[10px] text-[var(--ds-text-dim)]">
              Pengguna Gratis
            </p>
          </div>
          <ChevronDown className="hidden h-3 w-3 text-[var(--ds-text-dim)] lg:block" />
        </button>
      </div>
    </header>
  );
}
