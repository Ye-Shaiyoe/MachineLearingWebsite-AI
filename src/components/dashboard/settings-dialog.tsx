"use client";

import { useEffect, useState } from "react";
import { Check, ShieldCheck, UserRound, X } from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL, type ChatModelId } from "@/types/ai";

type SettingsDialogProps = { user: AuthUser; open: boolean; onClose: () => void };
const settingSections = [{ id: "account", label: "Akun", icon: UserRound }, { id: "model", label: "Pilih model", icon: Check }] as const;

export function SettingsDialog({ user, open, onClose }: SettingsDialogProps) {
  const [section, setSection] = useState<(typeof settingSections)[number]["id"]>("account");
  const [model, setModel] = useState<ChatModelId>(DEFAULT_CHAT_MODEL);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="settings-title" className="w-full max-w-2xl overflow-hidden border border-white/15 bg-[#080b14] shadow-2xl shadow-black/50">
        <header className="flex items-start justify-between border-b border-white/10 px-5 py-4">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ds-accent)]">System configuration</p><h2 id="settings-title" className="mt-1 font-serif text-xl text-[var(--ds-text)]">Pengaturan</h2></div>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-[var(--ds-text-dim)] hover:bg-white/[0.06] hover:text-[var(--ds-text)]" aria-label="Tutup pengaturan"><X className="h-4 w-4" /></button>
        </header>
        <div className="grid min-h-[320px] sm:grid-cols-[170px_1fr]">
          <nav className="border-b border-white/10 p-3 sm:border-b-0 sm:border-r" aria-label="Menu pengaturan">
            {settingSections.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => setSection(item.id)} className={`ds-nav-item w-full text-left ${section === item.id ? "active" : ""}`}><Icon className="h-4 w-4" /><span>{item.label}</span></button>; })}
          </nav>
          <div className="p-5">
            {section === "account" ? <div className="space-y-4"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-dim)]">Profil pengguna</p><div className="mt-3 border border-white/10 bg-white/[0.02] p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ds-accent)] text-sm font-bold text-[#030508]">{user.name.charAt(0).toUpperCase()}</div><div><p className="text-sm font-medium text-[var(--ds-text)]">{user.name}</p><p className="font-mono text-[10px] text-[var(--ds-text-dim)]">{user.email}</p></div></div></div></div><div className="flex gap-2 border border-[var(--ds-accent)]/20 bg-[var(--ds-accent)]/[0.05] p-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-accent)]" /><p className="text-[11px] leading-relaxed text-[var(--ds-text-muted)]">Permintaan AI selalu melewati server proxy. Kredensial provider tidak pernah dikirim ke browser.</p></div></div> : <div><p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-dim)]">Model percakapan</p><p className="mt-2 text-xs leading-relaxed text-[var(--ds-text-muted)]">Pilih model default untuk sesi chat berikutnya.</p><div className="mt-4 space-y-2">{CHAT_MODELS.map((item) => <button key={item} type="button" onClick={() => setModel(item)} className={`flex w-full items-center justify-between border p-3 text-left transition-colors ${model === item ? "border-[var(--ds-accent)]/60 bg-[var(--ds-accent)]/[0.08]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}><span className="font-mono text-xs text-[var(--ds-text)]">{item}</span>{model === item && <Check className="h-4 w-4 text-[var(--ds-accent)]" />}</button>)}</div></div>}
          </div>
        </div>
      </section>
    </div>
  );
}
