"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { AuthUser } from "@/types/auth";

interface GalaxyNavProps {
  user: AuthUser | null;
}

export function GalaxyNav({ user }: GalaxyNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/15 bg-[#030508]/95 backdrop-blur-xl py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand / Observatory Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/[0.08] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 rounded-lg border border-emerald-400/30" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-base font-semibold tracking-wider text-white uppercase">
              ORBITAL
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-slate-300 uppercase font-medium">
              Neural Observatory
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider text-slate-200 font-medium">
          <a
            href="#constellation"
            className="transition-colors hover:text-white"
          >
            <span className="text-emerald-400 mr-1.5 font-bold">01/</span>Constellation
          </a>
          <a
            href="#vault"
            className="transition-colors hover:text-white"
          >
            <span className="text-sky-400 mr-1.5 font-bold">02/</span>Media Vault
          </a>
          <a
            href="#kernel"
            className="transition-colors hover:text-white"
          >
            <span className="text-amber-400 mr-1.5 font-bold">03/</span>Sovereign Kernel
          </a>
          <a
            href="#terminal"
            className="transition-colors hover:text-white"
          >
            <span className="text-emerald-400 mr-1.5 font-bold">04/</span>Terminal
          </a>
        </nav>

        {/* Right CTA / Session Portal */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col text-right">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Authenticated
                </span>
                <span className="font-mono text-xs text-slate-200 font-medium max-w-[150px] truncate">
                  {user.email}
                </span>
              </div>
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-emerald-400 bg-emerald-500/20 px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:bg-emerald-500/30 hover:border-emerald-300 shadow-md"
              >
                <span>Console</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="font-mono text-xs text-slate-200 font-medium transition-colors hover:text-white px-3 py-1.5"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-white px-4 py-2 font-mono text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-slate-200"
              >
                <span>Initialize</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex sm:hidden items-center justify-center p-2 rounded-lg border border-white/20 bg-black/50 text-slate-100 hover:text-white"
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/20 bg-[#030508]/98 px-6 py-5 backdrop-blur-2xl shadow-2xl">
          <nav className="flex flex-col gap-3 font-mono text-sm tracking-wider text-slate-200 font-medium pb-4">
            <a
              href="#constellation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              01/ Constellation
            </a>
            <a
              href="#vault"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              02/ Media Vault
            </a>
            <a
              href="#kernel"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              03/ Sovereign Kernel
            </a>
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              04/ Terminal
            </a>
          </nav>
          <div className="pt-3 border-t border-white/15 flex flex-col gap-2.5">
            {user ? (
              <Link
                href="/dashboard"
                className="w-full text-center py-3 rounded-lg border border-emerald-400 bg-emerald-500/20 font-mono text-xs font-bold text-white"
              >
                Open Console ({user.email})
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full text-center py-3 rounded-lg border border-white/20 bg-black/60 font-mono text-xs font-semibold text-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-3 rounded-lg bg-white font-mono text-xs font-bold text-slate-950"
                >
                  Create Station Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
