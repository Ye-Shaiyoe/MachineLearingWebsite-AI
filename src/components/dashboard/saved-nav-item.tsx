"use client";

import { ChevronDown, FolderOpen, Settings2 } from "lucide-react";
import { useState } from "react";
import type { AuthUser } from "@/types/auth";
import { SettingsDialog } from "./settings-dialog";
import { FilesDialog } from "./files-dialog";

export function SavedNavItem({ user }: { user: AuthUser }) {
  const [expanded, setExpanded] = useState(false);
  const [dialog, setDialog] = useState<"settings" | "files" | null>(null);

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="ds-nav-item w-full justify-between text-left"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-3">
          <FolderOpen className="h-[18px] w-[18px] shrink-0" />
          <span>Pengaturan</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-[var(--ds-border)] pl-2">
          <button type="button" onClick={() => setDialog("settings")} className="ds-nav-item w-full text-left text-xs">
            <Settings2 className="h-4 w-4 shrink-0" />
            <span>Akun</span>
          </button>
          <button type="button" onClick={() => setDialog("files")} className="ds-nav-item w-full text-left text-xs">
            <FolderOpen className="h-4 w-4 shrink-0" />
            <span>File & Dokumen</span>
          </button>
        </div>
      )}

      <SettingsDialog user={user} open={dialog === "settings"} onClose={() => setDialog(null)} />
      <FilesDialog open={dialog === "files"} onClose={() => setDialog(null)} />
    </div>
  );
}
