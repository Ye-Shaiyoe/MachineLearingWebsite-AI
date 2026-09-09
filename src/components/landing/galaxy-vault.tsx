"use client";

import React from "react";

export function GalaxyVault() {
  const steps = [
    {
      step: "01",
      title: "Isolated Dispatch",
      description:
        "Prompt instructions are validated on the server. Image models generate raw binary streams without exposing client credentials.",
      tag: "SERVER KERNEL",
    },
    {
      step: "02",
      title: "Binary Stream Ingestion",
      description:
        "Image buffers stream directly into Cloudflare R2 object storage via AWS SDK S3 protocol with SHA-256 integrity validation.",
      tag: "R2 S3-COMPATIBLE",
    },
    {
      step: "03",
      title: "Global Edge Delivery",
      description:
        "Generated visual artifacts are cached across Cloudflare's Anycast edge network, providing sub-millisecond retrieval without egress charges.",
      tag: "ZERO EGRESS CDN",
    },
  ];

  return (
    <section
      id="vault"
      className="relative min-h-screen py-28 px-6 flex flex-col justify-center max-w-7xl mx-auto z-10"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-sky-400 font-semibold tracking-[0.2em] uppercase">
          02 // KINETIC MEDIA VAULT
        </span>
        <div className="h-px flex-1 max-w-[120px] bg-sky-500/40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading and Context */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] font-normal drop-shadow-md">
            Sub-Millisecond Object Persistence with Cloudflare R2.
          </h2>

          <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed drop-shadow-sm">
            Generative visual intelligence requires sovereign storage. Visual assets created by the imaging engine are piped straight into an S3-compatible Cloudflare R2 vault with zero egress fees and strict ACL boundaries.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4">
              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sky-400">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
              </div>
              <span className="font-mono text-xs sm:text-sm text-sky-200 font-medium">
                Direct Bucket Streaming Protocol: <span className="text-white font-bold">Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Pipeline Flow */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative rounded-2xl border border-white/20 bg-[#070a14]/95 p-6 sm:p-7 backdrop-blur-2xl shadow-xl transition-all duration-200 hover:border-sky-400/40"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    STEP {item.step}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span className="font-mono text-[11px] text-sky-300 font-semibold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400 group-hover:text-sky-300 transition-colors font-medium">
                  SEC // 0{item.step}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 font-medium">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}

          {/* High-Integrity Spec Strip */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl border border-white/15 bg-black/70 p-4 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block font-medium">Egress Fees</span>
              <span className="font-mono text-base sm:text-lg font-bold text-emerald-400 mt-1 block">$0.00 / GB</span>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/70 p-4 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block font-medium">Persistence</span>
              <span className="font-mono text-base sm:text-lg font-bold text-white mt-1 block">99.999999999%</span>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/70 p-4 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block font-medium">Edge Nodes</span>
              <span className="font-mono text-base sm:text-lg font-bold text-sky-400 mt-1 block">310+ Global</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
