"use client";

import React from "react";
import Link from "next/link";
import type { AuthUser } from "@/types/auth";

interface GalaxyHeroProps {
  user: AuthUser | null;
}

export function GalaxyHero({ user }: GalaxyHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-20 text-center z-10 overflow-hidden">
      {/* Dark Ambient Scrim behind Hero to ensure 100% text readability */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_48%,rgba(3,5,8,0.9)_0%,rgba(3,5,8,0.4)_65%,rgba(3,5,8,0)_100%)]" />

      {/* Astrometric Header Telemetry Chip */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md mb-8 shadow-lg">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <span className="font-mono text-xs tracking-[0.16em] text-emerald-300 font-medium uppercase">
          RA 17h 45m · DEC -29° 00′ · ORBITAL GATEWAY ACTIVE
        </span>
      </div>

      {/* Monumental Serif Headline with High-Contrast Text */}
      <h1 className="max-w-4xl font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.1] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        Intelligence Beyond The Terrestrial Horizon.
      </h1>

      {/* Crisp High-Contrast Subtitle */}
      <p className="max-w-2xl text-base sm:text-xl text-slate-200 leading-relaxed font-sans mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        A private multi-model intelligence cluster. Queries are dispatched through server-isolated inference proxies, paired with Cloudflare R2 media persistence and zero client-side credential leakage.
      </p>

      {/* Primary Action Group */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        {user ? (
          <Link
            href="/dashboard"
            className="group relative inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-emerald-400 bg-emerald-500/25 px-8 font-mono text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-emerald-500/40 hover:border-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.35)]"
          >
            <span>Open Console</span>
            <span className="transition-transform group-hover:translate-x-1 font-sans">→</span>
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="group relative inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/40 bg-white text-slate-950 px-8 font-mono text-sm font-semibold transition-all hover:bg-slate-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <span>Initialize Station Account</span>
              <span className="transition-transform group-hover:translate-x-1 font-sans">→</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-black/70 px-7 font-mono text-sm font-medium text-slate-100 transition-colors hover:text-white hover:border-white/40 hover:bg-black/90 shadow-md"
            >
              Sign In to Console
            </Link>
          </>
        )}

        <a
          href="#constellation"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-transparent px-5 font-mono text-xs text-slate-300 hover:text-white transition-colors"
        >
          Explore Constellation ↓
        </a>
      </div>

      {/* High-Legibility Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl rounded-2xl border border-white/20 bg-[#06080e]/95 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center sm:items-start px-3">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
            4 Models
          </span>
          <span className="font-mono text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium">
            Frontier Matrix
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start px-3 border-l border-white/15">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
            &lt; 38ms
          </span>
          <span className="font-mono text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium">
            Dispatch TTFT
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start px-3 border-l-0 md:border-l border-white/15">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-sky-400 tracking-tight">
            0% Leak
          </span>
          <span className="font-mono text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium">
            Server-Only Keys
          </span>
        </div>

        <div className="flex flex-col items-center sm:items-start px-3 border-l border-white/15">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
            R2 Edge
          </span>
          <span className="font-mono text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium">
            Object Storage
          </span>
        </div>
      </div>

      {/* Ambient Scroll Indicator */}
      <div className="mt-12 flex flex-col items-center gap-2 opacity-80">
        <span className="font-mono text-[11px] tracking-[0.2em] text-slate-300 uppercase font-medium">
          SCROLL TO ORBIT
        </span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex justify-center pt-1.5 bg-black/40">
          <div className="w-1.5 h-2 rounded-full bg-emerald-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
