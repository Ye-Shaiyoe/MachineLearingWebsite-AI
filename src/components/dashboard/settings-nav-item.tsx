"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import type { AuthUser } from "@/types/auth";
import { SettingsDialog } from "./settings-dialog";

export function SettingsNavItem({ user }: { user: AuthUser }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="ds-nav-item w-full text-left">
        <Settings className="h-[18px] w-[18px] shrink-0" />
        <span>Pengaturan</span>
      </button>
      <SettingsDialog user={user} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
