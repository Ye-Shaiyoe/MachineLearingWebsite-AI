"use client";

import { useEffect } from "react";
import { KeyRound, ShieldCheck, UserRound, X } from "lucide-react";
import type { AuthUser } from "@/types/auth";

type SettingsDialogProps = {
  user: AuthUser;
  open: boolean;
  onClose: () => void;
};

export function SettingsDialog({ user, open, onClose }: SettingsDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="settings-title" className="w-full max-w-lg border border-white/15 bg-[#080b14] shadow-2xl shadow-black/50">
        <header className="flex items-start justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ds-accent)]">System configuration</p>
            <h2 id="settings-title" className="mt-1 font-serif text-xl text-[var(--ds-text)]">Pengaturan</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-[var(--ds-text-dim)] hover:bg-white/[0.06] hover:text-[var(--ds-text)]" aria-label="Tutup pengaturan">
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="space-y-3 p-5">
          <div className="border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 h-4 w-4 text-[var(--ds-cyan)]" />
              <div>
                <p className="text-xs font-semibold text-[var(--ds-text)]">Akun</p>
                <p className="mt-1 text-xs text-[var(--ds-text-muted)]">{user.name}</p>
                <p className="font-mono text-[10px] text-[var(--ds-text-dim)]">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start gap-3">
              <KeyRound className="mt-0.5 h-4 w-4 text-[var(--ds-amber)]" />
              <div>
                <p className="text-xs font-semibold text-[var(--ds-text)]">OpenRouter API key</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--ds-text-muted)]">Key disimpan di server melalui <code className="font-mono text-[var(--ds-text)]">OPENROUTER_API_KEY</code> pada file environment deployment, bukan di browser.</p>
                <p className="mt-3 font-mono text-[10px] text-[var(--ds-text-dim)]">STATUS · dikelola administrator server</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 border border-[var(--ds-accent)]/20 bg-[var(--ds-accent)]/[0.05] p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-accent)]" />
            <p className="text-[11px] leading-relaxed text-[var(--ds-text-muted)]">Permintaan AI selalu melewati server proxy. Jangan memasukkan API key ke local storage atau komponen client.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
