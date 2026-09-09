import React from "react";
import Link from "next/link";
import { requireGuest } from "@/lib/auth/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireGuest();

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* 2D Astrometric Architectural Grid & Ambient Scrim */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(52, 211, 153, 0.05) 0%, rgba(3, 5, 8, 0) 70%)",
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-white/10 bg-[#030508]/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] p-1.5 shadow-[0_0_12px_rgba(255,255,255,0.05)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
                ORBITAL
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] text-slate-400 uppercase">
                Auth Gateway
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GATEWAY ONLINE
            </span>
            <Link
              href="/"
              className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              ← Return Home
            </Link>
          </div>
        </div>
      </header>

      {/* Split Layout Container */}
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-12">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Control Telemetry Statement */}
          <div className="hidden lg:flex lg:col-span-6 flex-col space-y-6 pr-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-emerald-300 font-semibold uppercase tracking-widest">
                SESSION ENCLAVE // SECTOR 07
              </span>
            </div>

            <h1 className="font-serif text-4xl xl:text-5xl font-normal tracking-tight text-white leading-[1.15] drop-shadow-md">
              Sovereign Intelligence. Zero-Leak Credential Isolation.
            </h1>

            <p className="text-base text-slate-200 leading-relaxed font-sans">
              Connect directly to our multi-model neural cluster through cryptographically sealed HttpOnly sessions. Client browsers never touch raw upstream AI tokens or database keys.
            </p>

            {/* Architecture Telemetry Badges */}
            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-white/15 bg-[#060912]/80 p-3.5 font-mono text-xs text-slate-200 flex items-center justify-between">
                <span className="text-emerald-300 font-semibold">
                  ✓ RFC 6265 HttpOnly Cookie Cache
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  5-MIN TTL
                </span>
              </div>

              <div className="rounded-xl border border-white/15 bg-[#060912]/80 p-3.5 font-mono text-xs text-slate-200 flex items-center justify-between">
                <span className="text-sky-300 font-semibold">
                  ✓ Air-Gapped OpenRouter Server Proxy
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  ZERO LEAK
                </span>
              </div>

              <div className="rounded-xl border border-white/15 bg-[#060912]/80 p-3.5 font-mono text-xs text-slate-200 flex items-center justify-between">
                <span className="text-amber-300 font-semibold">
                  ✓ Cloudflare R2 Vault Image Pipeline
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  $0 EGRESS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Obsidian Form Container */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#070a14]/95 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Ground Note */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020306] py-4 px-6 text-center font-mono text-[11px] text-slate-400">
        ENCRYPTED SESSION PROTOCOL · NEXT.JS 16 · BETTER AUTH · DRIZZLE ORM
      </footer>
    </div>
  );
}
