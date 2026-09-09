"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { AuthUser } from "@/types/auth";

interface GalaxyCtaProps {
  user: AuthUser | null;
}

interface SimulatedQuery {
  prompt: string;
  model: string;
  response: string;
  latency: string;
}

const PRESET_QUERIES: SimulatedQuery[] = [
  {
    prompt: "Verify mathematical proof for spherical harmonics in gravitational lensing.",
    model: "stealth/ox-alpha",
    response:
      "Proof verified. Expressing potential field in terms of Laplace's equation: ∇²Φ = 0 in empty space. The expansion in spherical harmonics Y_lm(θ, φ) yields multipole moments with convergence metric ε < 10⁻¹².",
    latency: "34ms TTFT",
  },
  {
    prompt: "Synthesize summary of encrypted session lifecycle in Better Auth architecture.",
    model: "minimax/minimax-m3:free",
    response:
      "Session authenticated via RFC 6265 HttpOnly cookie. The 5-minute memory cache prevents redundant DB lookups while immediate server invalidation ensures instant revocation on logout.",
    latency: "28ms TTFT",
  },
  {
    prompt: "Generate architectural topology for zero-leak multi-model dispatch.",
    model: "x-ai/grok-4.3",
    response:
      "Topology established: Client (Authenticated Cookie) → Next.js App Router (server-only requireSession) → Private OpenRouter Dispatcher → Model Inference Cluster → Stream Return.",
    latency: "41ms TTFT",
  },
];

export function GalaxyCta({ user }: GalaxyCtaProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSim = PRESET_QUERIES[selectedIdx];

  return (
    <section
      id="terminal"
      className="relative min-h-screen py-28 px-6 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-emerald-400 font-semibold tracking-[0.2em] uppercase">
          04 // TERMINAL ACCESS
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-emerald-500/40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Interactive Terminal Simulator */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/25 bg-[#04060c]/98 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-3.5 bg-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-slate-300 font-medium ml-2">
                  orbital-terminal://v1.0.4
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-emerald-400">
                LATENCY: {activeSim.latency}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-7 font-mono text-xs space-y-4">
              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  DISPATCH TARGET MODEL
                </span>
                <span className="inline-block rounded-md bg-emerald-500/15 px-3 py-1 text-emerald-300 border border-emerald-400/40 font-semibold">
                  {activeSim.model}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  PROMPT PAYLOAD
                </span>
                <div className="rounded-xl border border-white/15 bg-black/70 p-4 text-slate-100 text-sm font-mono">
                  <span className="text-emerald-400 font-bold mr-2">&gt;</span>
                  {activeSim.prompt}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1.5">
                  INFERENCE STREAM
                </span>
                <div className="rounded-xl border border-white/15 bg-[#060912] p-4 text-slate-100 text-sm font-mono leading-relaxed min-h-[90px]">
                  {activeSim.response}
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-1.5 animate-pulse align-middle" />
                </div>
              </div>

              {/* Interactive prompt switcher */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-medium mr-1">
                  Preset Vector:
                </span>
                {PRESET_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
                      idx === selectedIdx
                        ? "bg-white text-slate-950 font-bold shadow-md"
                        : "bg-white/[0.08] text-slate-200 hover:text-white hover:bg-white/[0.14] border border-white/10"
                    }`}
                  >
                    Query 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Station Entry Portal */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] font-normal drop-shadow-md">
            Initialize Your Station Access.
          </h2>

          <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed drop-shadow-sm">
            Begin conversations, run spatial image generation pipelines, and retain permanent encrypted dialogue threads with the frontier models of the constellation.
          </p>

          <div className="space-y-4 pt-2">
            {user ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 font-mono text-xs">
                  <div className="text-emerald-300 font-bold text-sm">
                    ACTIVE SESSION DETECTED
                  </div>
                  <div className="text-slate-200 mt-1 text-xs">
                    User: {user.name} ({user.email})
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-4 font-mono text-base font-bold text-slate-950 shadow-xl transition-all hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]"
                >
                  <span>Enter Neural Console</span>
                  <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-mono text-base font-bold text-slate-950 shadow-2xl transition-all hover:bg-slate-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  <span>Create Station Account</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-xl border border-white/25 bg-black/70 py-3.5 font-mono text-sm font-semibold text-slate-100 transition-colors hover:text-white hover:border-white/50 hover:bg-black/90 shadow-md"
                >
                  Sign In to Existing Session
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2 text-center lg:text-left">
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-medium">
              PROTECTED BY BETTER-AUTH · HTTPONLY SESSIONS · ZERO PLAINTEXT PASSWORDS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
