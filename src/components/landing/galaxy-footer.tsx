"use client";

import React from "react";
import Link from "next/link";

export function GalaxyFooter() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#020306] py-14 px-6 z-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-serif text-base tracking-wider text-white">
              ORBITAL OBSERVATORY
            </span>
          </div>
          <p className="font-mono text-[11px] text-slate-400">
            A private multi-model AI cluster with server-isolated inference.
          </p>
          <p className="font-mono text-[10px] text-slate-400 mt-1">
            STACK: Next.js 16 · Drizzle ORM · Better Auth · Cloudflare R2 · GSAP 3
          </p>
        </div>

        {/* Center telemetry */}
        <div className="font-mono text-[11px] text-slate-400 text-center space-y-1">
          <div>TELEMETRY: RA 17h 45m 40s · DEC -29° 00′ 28″</div>
          <div className="text-emerald-400/90">
            ALL ORBITAL SENSORS OPERATIONAL · SECURE GATEWAY
          </div>
        </div>

        {/* Right links */}
        <div className="flex items-center gap-6 font-mono text-xs text-slate-400">
          <Link href="/login" className="hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="hover:text-white transition-colors">
            Register
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Console
          </Link>
          <a
            href="#constellation"
            className="hover:text-white transition-colors"
          >
            Top ↑
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/[0.04] text-center font-mono text-[10px] text-slate-400">
        © {new Date().getFullYear()} Orbital Observatory. Zero Token Exposure Architecture.
      </div>
    </footer>
  );
}
