"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AuthUser } from "@/types/auth";
import { GalaxyCanvas, type GalaxyCanvasController } from "./galaxy-canvas";
import { GalaxyNav } from "./galaxy-nav";
import { GalaxyHero } from "./galaxy-hero";
import { GalaxyConstellation } from "./galaxy-constellation";
import { GalaxyVault } from "./galaxy-vault";
import { GalaxyKernel } from "./galaxy-kernel";
import { GalaxyCta } from "./galaxy-cta";
import { GalaxyFooter } from "./galaxy-footer";

interface GalaxyExperienceProps {
  user: AuthUser | null;
}

export function GalaxyExperience({ user }: GalaxyExperienceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<GalaxyCanvasController | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Direct scroll scrub with lightweight dampening
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          controllerRef.current?.setScrollProgress(self.progress);
        },
      });

      // Section tracker for active axis dot
      const sections = ["#constellation", "#vault", "#kernel", "#terminal"];
      sections.forEach((id, index) => {
        ScrollTrigger.create({
          trigger: id,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(index + 1),
          onEnterBack: () => setActiveSection(index + 1),
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#030408] text-slate-100 selection:bg-emerald-500/30 selection:text-white"
    >
      {/* 3D Celestial WebGL / Canvas Universe */}
      <GalaxyCanvas
        onControllerReady={(controller) => {
          controllerRef.current = controller;
        }}
      />

      {/* Persistent Navigation Header */}
      <GalaxyNav user={user} />

      {/* Vertical Celestial Orbit Guide (Desktop) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none">
        <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest -rotate-90 origin-center mb-6">
          ORBITAL // AXIS
        </div>
        {[0, 1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 rounded-full ${
              activeSection === idx
                ? "w-2 h-6 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                : "w-1.5 h-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>

      {/* Main Celestial Experience Sections */}
      <main className="relative z-10 flex flex-col">
        <GalaxyHero user={user} />
        <GalaxyConstellation />
        <GalaxyVault />
        <GalaxyKernel />
        <GalaxyCta user={user} />
      </main>

      {/* Observatory Ground Station Footer */}
      <GalaxyFooter />
    </div>
  );
}
