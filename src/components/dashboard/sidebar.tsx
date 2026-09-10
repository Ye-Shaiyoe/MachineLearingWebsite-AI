"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Wand2,
  FolderOpen,
  Bot,
  Clock,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Generator", href: "/generator", icon: Wand2 },
  { label: "File & Dokumen", href: "/files", icon: FolderOpen },
  { label: "Agen AI", href: "/agents", icon: Bot },
  { label: "Riwayat", href: "/history", icon: Clock },
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

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

      {/* Navigation */}
      <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-3">
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
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[var(--ds-border)] px-4 py-4">
        <p className="text-[10px] leading-relaxed text-[var(--ds-text-dim)]">
          v0.1.0 · Galaxy Engine
        </p>
      </div>
    </aside>
  );
}
