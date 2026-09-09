"use client";

import React from "react";

export function GalaxyKernel() {
  const securityPillars = [
    {
      title: "HttpOnly Session Gate",
      spec: "Better Auth + CookieCache",
      description:
        "Authentication tokens live in strict HttpOnly, SameSite cookies with a 5-minute memory cache. Zero vulnerability to localStorage token harvesting or client XSS leakage.",
      badge: "RFC 6265 compliant",
    },
    {
      title: "Air-Gapped Provider Credentials",
      spec: "server-only Enforcement",
      description:
        "OpenRouter and Cloudflare R2 secrets are enforced via Node.js server-only boundaries. Upstream provider payloads and keys never enter client bundles.",
      badge: "Zero Client Leaks",
    },
    {
      title: "Strict Type-Safe Data Layer",
      spec: "Drizzle ORM + PostgreSQL",
      description:
        "End-to-end type safety spanning database relations to API handlers. Parameterized queries eliminate SQL injection, governed by reproducible Drizzle migrations.",
      badge: "Postgres 16+",
    },
  ];

  return (
    <section
      id="kernel"
      className="relative min-h-screen py-28 px-6 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-amber-400 font-semibold tracking-[0.2em] uppercase">
          03 // SOVEREIGN KERNEL
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-amber-500/40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading and Manifesto */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] font-normal drop-shadow-md">
            Zero Token Leakage. Cryptographic Session Isolation.
          </h2>

          <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed drop-shadow-sm">
            Many AI applications carelessly expose API keys and tokens to the client browser. Our architecture treats your credentials and session state as an air-gapped sovereign enclave.
          </p>

          {/* Architectural Schematic Snippet */}
          <div className="rounded-2xl border border-white/20 bg-[#04060c] p-5 font-mono text-xs text-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                ENCLAVE PERIMETER
              </span>
              <span className="text-emerald-400 text-xs font-bold">
                SECURE BOUNDARY
              </span>
            </div>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="text-slate-400">{"// Server-Only Guard"}</div>
              <div className="text-amber-300 font-medium">import &quot;server-only&quot;;</div>
              <div className="text-slate-200">
                export async function dispatchInference() &#123;
              </div>
              <div className="pl-4 text-emerald-300 font-medium">
                const session = await requireSession();
              </div>
              <div className="pl-4 text-slate-200">
                return openrouter.dispatch(session.user.id);
              </div>
              <div className="text-slate-200">&#125;</div>
            </div>
          </div>
        </div>

        {/* Right Column: Three Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-4">
          {securityPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/20 bg-[#070a14]/95 p-6 sm:p-7 backdrop-blur-2xl shadow-xl transition-all duration-200 hover:border-amber-400/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-sm font-bold text-amber-400">
                  {pillar.spec}
                </span>
                <span className="font-mono text-xs rounded-full border border-white/15 bg-white/[0.08] px-3 py-0.5 text-slate-200 font-medium">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 font-medium">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
