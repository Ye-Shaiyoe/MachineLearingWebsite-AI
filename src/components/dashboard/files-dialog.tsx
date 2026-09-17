"use client";

import { FileText, FolderOpen, Upload, X } from "lucide-react";
import { useEffect } from "react";

type FilesDialogProps = { open: boolean; onClose: () => void };

export function FilesDialog({ open, onClose }: FilesDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="files-title" className="w-full max-w-lg border border-white/15 bg-[#080b14] shadow-2xl shadow-black/50">
        <header className="flex items-start justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ds-accent)]">Personal archive</p>
            <h2 id="files-title" className="mt-1 font-serif text-xl text-[var(--ds-text)]">File & Dokumen</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-[var(--ds-text-dim)] hover:bg-white/[0.06] hover:text-[var(--ds-text)]" aria-label="Tutup file dan dokumen"><X className="h-4 w-4" /></button>
        </header>
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-3"><FolderOpen className="h-5 w-5 text-[var(--ds-cyan)]" /><div><p className="text-xs font-semibold text-[var(--ds-text)]">Dokumen tersimpan</p><p className="mt-1 text-[11px] text-[var(--ds-text-muted)]">Belum ada dokumen di arsip Anda.</p></div></div>
            <span className="font-mono text-[10px] text-[var(--ds-text-dim)]">00 FILES</span>
          </div>
          <button type="button" className="flex w-full items-center justify-center gap-2 border border-dashed border-[var(--ds-accent)]/40 bg-[var(--ds-accent)]/[0.05] px-4 py-3 text-xs font-medium text-[var(--ds-accent)] hover:bg-[var(--ds-accent)]/[0.1]"><Upload className="h-4 w-4" /> Unggah dokumen</button>
          <div className="flex items-center gap-2 border border-white/10 p-3 text-[11px] text-[var(--ds-text-muted)]"><FileText className="h-4 w-4 shrink-0 text-[var(--ds-text-dim)]" /> File yang diunggah akan tersedia untuk analisis AI.</div>
        </div>
      </section>
    </div>
  );
}
