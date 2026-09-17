"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Clock,
  Sparkles,
  Plus,
} from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { LocalMusicPlayer } from "./local-music-player";
import { SavedNavItem } from "./saved-nav-item";

const navItems = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Riwayat", href: "/history", icon: Clock },
];

export function DashboardSidebar({ user }: { user: AuthUser }) {
  const pathname = usePathname();
  const router = useRouter();

  function startNewChat() {
    router.push("/chat");
    window.dispatchEvent(new Event("nyieai:new-chat"));
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-[var(--ds-border)] bg-[var(--ds-surface)]">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--ds-accent)] to-[var(--ds-cyan)]">
          <Sparkles className="h-4 w-4 text-[#030508]" />
        </div>
        <div>
          <p className="font-serif text-sm font-semibold tracking-tight text-[var(--ds-text)]">
            NyieAI
          </p>
          <p className="text-[10px] text-[var(--ds-text-dim)]">
            Your AI, Your Way
          </p>
        </div>
      </div>

      {/* New conversation */}
      <div className="px-3">
        <button type="button" onClick={startNewChat} className="flex w-full items-center justify-center gap-2 border border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/[0.08] px-3 py-2.5 text-xs font-medium text-[var(--ds-accent)] transition-colors hover:bg-[var(--ds-accent)]/[0.14]">
          <Plus className="h-4 w-4" />
          Obrolan baru
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-3 flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`ds-nav-item ${isActive ? "active" : ""}`}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <SavedNavItem user={user} />
      </nav>

      {/* Local player */}
      <LocalMusicPlayer />

      {/* Bottom section */}
      <div className="border-t border-[var(--ds-border)] px-4 py-4">
        <p className="text-[10px] leading-relaxed text-[var(--ds-text-dim)]">
          v0.1.0 · Galaxy Engine
        </p>
      </div>
    </aside>
  );
}
