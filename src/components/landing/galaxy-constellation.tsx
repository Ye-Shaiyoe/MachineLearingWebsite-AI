"use client";

import React, { useState } from "react";

interface ModelSpec {
  id: string;
  name: string;
  codename: string;
  category: "REASONING" | "SYNTHESIS" | "FRONTIER" | "DIFFUSION";
  badgeColor: string;
  headline: string;
  description: string;
  parameters: {
    contextWindow: string;
    throughput: string;
    temperatureRange: string;
    serverRoute: string;
    outputType: string;
  };
}

const MODELS: ModelSpec[] = [
  {
    id: "stealth/ox-alpha",
    name: "OX-Alpha",
    codename: "stealth/ox-alpha",
    category: "REASONING",
    badgeColor: "text-emerald-300 border-emerald-400/40 bg-emerald-500/20",
    headline: "Flagship Deductive & Algorithmic Core",
    description:
      "Trained for high-complexity mathematical proofs, multi-step programmatic refactoring, and deterministic reasoning chains without superficial hallucinations.",
    parameters: {
      contextWindow: "128,000 tokens",
      throughput: "High Density / CoT",
      temperatureRange: "0.0 – 1.0 (strict)",
      serverRoute: "api/ai/chat (Server-only)",
      outputType: "Text & Reasoning Delta",
    },
  },
  {
    id: "minimax/minimax-m3:free",
    name: "MiniMax M3",
    codename: "minimax/minimax-m3:free",
    category: "SYNTHESIS",
    badgeColor: "text-sky-300 border-sky-400/40 bg-sky-500/20",
    headline: "Low-Latency Conversational Engine",
    description:
      "High-throughput generalist model tuned for lightning-fast dialogue, continuous conversational coherence, and efficient token dispatch with near-zero latency penalty.",
    parameters: {
      contextWindow: "64,000 tokens",
      throughput: "Sub-40ms TTFT",
      temperatureRange: "0.2 – 1.2 (fluid)",
      serverRoute: "api/ai/chat (Server-only)",
      outputType: "Text / Continuous Stream",
    },
  },
  {
    id: "x-ai/grok-4.3",
    name: "Grok 4.3",
    codename: "x-ai/grok-4.3",
    category: "FRONTIER",
    badgeColor: "text-amber-300 border-amber-400/40 bg-amber-500/20",
    headline: "Frontier Dialectic & Technical Synthesizer",
    description:
      "Advanced multi-domain intelligence delivering rigorous technical synthesis, unfiltered inquiry evaluation, and high-dimensional problem resolution.",
    parameters: {
      contextWindow: "256,000 tokens",
      throughput: "Frontier Throughput",
      temperatureRange: "0.1 – 1.0 (balanced)",
      serverRoute: "api/ai/chat (Server-only)",
      outputType: "Text / Structured JSON",
    },
  },
  {
    id: "x-ai/grok-imagine-image-quality",
    name: "Grok Imagine",
    codename: "x-ai/grok-imagine-image-quality",
    category: "DIFFUSION",
    badgeColor: "text-rose-300 border-rose-400/40 bg-rose-500/20",
    headline: "Spatial Generative Media Architecture",
    description:
      "High-fidelity rasterization pipeline. Prompt tokens are converted into raw binary images on the server and piped directly to Cloudflare R2 bucket storage.",
    parameters: {
      contextWindow: "Prompt Vector Matrix",
      throughput: "Async Binary Pipe",
      temperatureRange: "Aspect Ratio Custom",
      serverRoute: "api/ai/image → Cloudflare R2",
      outputType: "Binary WebP / PNG to S3/R2",
    },
  },
];

export function GalaxyConstellation() {
  const [activeModelId, setActiveModelId] = useState<string>(MODELS[0].id);
  const activeModel = MODELS.find((m) => m.id === activeModelId) || MODELS[0];

  return (
    <section
      id="constellation"
      className="relative min-h-screen py-28 px-6 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-emerald-400 font-semibold tracking-[0.2em] uppercase">
          01 // NEURAL CONSTELLATION
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-emerald-500/40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading and Overview */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] font-normal drop-shadow-md">
            Four Specialized Intelligences. One Sovereign Gateway.
          </h2>

          <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed drop-shadow-sm">
            Every neural model in the constellation is dispatched through authenticated server-side OpenRouter proxies. No browser-side API keys, no client-side payload leakage, and full telemetry tracing.
          </p>

          {/* Model Selector Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            {MODELS.map((model, idx) => {
              const isActive = model.id === activeModelId;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setActiveModelId(model.id)}
                  className={`group relative flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? "border-white/40 bg-white/[0.12] shadow-[0_0_24px_rgba(255,255,255,0.1)]"
                      : "border-white/15 bg-[#080b14]/90 hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      0{idx + 1}.
                    </span>
                    <div>
                      <div className="font-mono text-sm font-semibold text-white flex items-center gap-2.5">
                        {model.name}
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${model.badgeColor}`}
                        >
                          {model.category}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-slate-300 mt-0.5">
                        {model.codename}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-sm transition-transform ${
                      isActive ? "text-white translate-x-1 font-bold" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: High-Precision Telemetry Spec Card */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/20 bg-[#070a14]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            {/* Top Specification Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-widest uppercase">
                  NODE TELEMETRY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
                  {activeModel.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs text-emerald-300 font-semibold uppercase">
                  Online in Matrix
                </span>
              </div>
            </div>

            {/* Model Capability Description */}
            <div className="py-6 space-y-2 border-b border-white/15">
              <h4 className="font-mono text-xs text-slate-200 uppercase tracking-wider font-semibold">
                {activeModel.headline}
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {activeModel.description}
              </p>
            </div>

            {/* Technical Parameters Grid */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-medium">
                  Context Window
                </span>
                <span className="font-mono text-sm sm:text-base text-white font-semibold mt-1 block">
                  {activeModel.parameters.contextWindow}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-medium">
                  Latency Profile
                </span>
                <span className="font-mono text-sm sm:text-base text-emerald-400 font-semibold mt-1 block">
                  {activeModel.parameters.throughput}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-medium">
                  Dispatch Route
                </span>
                <span className="font-mono text-xs sm:text-sm text-slate-200 font-medium mt-1 block truncate">
                  {activeModel.parameters.serverRoute}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-medium">
                  Egress Format
                </span>
                <span className="font-mono text-xs sm:text-sm text-slate-200 font-medium mt-1 block">
                  {activeModel.parameters.outputType}
                </span>
              </div>
            </div>

            {/* Sovereign Guarantee Banner */}
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-200 font-semibold">
                ✓ Provider Keys Encrypted on Host Kernel
              </span>
              <span className="font-mono text-[11px] text-slate-300 uppercase font-medium">
                ISO/IEC 27001 Pattern
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
