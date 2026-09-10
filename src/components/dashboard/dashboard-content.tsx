"use client";

import {
  Send,
  ImageIcon,
  FileText,
  Search,
  Code2,
  LayoutGrid,
  Wand2,
  Terminal,
  FileSearch,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Languages,
  MessageCircle,
  Play,
  Heart,
  MoreVertical,
  Star,
  Activity,
} from "lucide-react";
import type { AuthUser } from "@/types/auth";
import { FeatureCard } from "./feature-card";
import { StatGauge } from "./stat-gauge";
import { WallpaperCustomizer, useWallpaper } from "./wallpaper-customizer";

/* ──────────────────────────────────────────── */
/* Quick-action pill data                       */
/* ──────────────────────────────────────────── */
const quickActions = [
  { label: "Buat gambar", icon: ImageIcon },
  { label: "Tulis dokumen", icon: FileText },
  { label: "Cari informasi", icon: Search },
  { label: "Coding", icon: Code2 },
  { label: "Lainnya", icon: LayoutGrid },
];

/* ──────────────────────────────────────────── */
/* Feature cards data                           */
/* ──────────────────────────────────────────── */
const features = [
  {
    title: "Image Generator",
    description: "Ubah imajinasimu jadi gambar keren, dengan AI.",
    icon: Wand2,
    gradient: "linear-gradient(135deg, #0d3b66 0%, #14532d 100%)",
  },
  {
    title: "Code Assistant",
    description: "Bantu nulis, debug, dan jelaskan kode dengan mudah.",
    icon: Terminal,
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #134e4a 100%)",
  },
  {
    title: "Dokumen & Analisis",
    description: "Ringkas, analisis, dan pahami dokumen dengan cepat.",
    icon: FileSearch,
    gradient: "linear-gradient(135deg, #312e81 0%, #1e3a5f 100%)",
  },
];

/* ──────────────────────────────────────────── */
/* Recent history mock data                     */
/* ──────────────────────────────────────────── */
const recentHistory = [
  {
    title: "Rekomendasi Modpack Hardcore",
    description: "Berikut beberapa modpack Minecraft yang cocok untuk play...",
    time: "2 jam lalu",
    icon: Play,
    color: "var(--ds-cyan)",
  },
  {
    title: "Install Blue Archive di Arch Linux",
    description:
      "Berikut langkah-langkah untuk menginstall Blue Archive di Arch Linux...",
    time: "5 jam lalu",
    icon: Play,
    color: "var(--ds-purple)",
  },
  {
    title: "Perlakuanmu ke Aku",
    description:
      "Berikut adalah gambaran tentang bagaimana kamu memperlakukan akuk...",
    time: "1 hari lalu",
    icon: Heart,
    color: "var(--ds-rose)",
  },
  {
    title: "Rekomendasi Distro Linux (Tingkat Kesulitan)",
    description:
      "Berikut rekomendasi distro Linux berdasarkan tingkat kesulitan...",
    time: "2 hari lalu",
    icon: Terminal,
    color: "var(--ds-accent)",
  },
];

/* ──────────────────────────────────────────── */
/* Quick tools data                             */
/* ──────────────────────────────────────────── */
const quickTools = [
  {
    title: "Generate Gambar",
    sub: "Teks → Gambar",
    icon: ImageIcon,
    color: "var(--ds-cyan)",
    bg: "var(--ds-cyan-bg)",
  },
  {
    title: "Ringkasan Teks",
    sub: "PDF / Artikel → Ringkasan",
    icon: FileText,
    color: "var(--ds-purple)",
    bg: "var(--ds-purple-bg)",
  },
  {
    title: "Terjemahan",
    sub: "Multi-bahasa",
    icon: Languages,
    color: "var(--ds-amber)",
    bg: "var(--ds-amber-bg)",
  },
  {
    title: "Tanya AI",
    sub: "Jawab apa saja",
    icon: MessageCircle,
    color: "var(--ds-rose)",
    bg: "var(--ds-rose-bg)",
  },
];

const tags = [
  { label: "Linux", color: "var(--ds-cyan)" },
  { label: "Minecraft", color: "var(--ds-accent)" },
  { label: "Anime", color: "var(--ds-purple)" },
  { label: "Xiao nyie", color: "var(--ds-rose)" },
];

/* ══════════════════════════════════════════════
   Main Dashboard Content
   ══════════════════════════════════════════════ */

export function DashboardContent({ user }: { user: AuthUser }) {
  const { wallpaper, updateWallpaper } = useWallpaper();

  return (
    <div className="flex flex-1 gap-0 overflow-hidden">
      {/* ───── Main Column ───── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-[860px] space-y-5 px-5 py-5">
          {/* ── Hero Wallpaper Banner ── */}
          <section className="relative overflow-hidden rounded-2xl" style={{ minHeight: 220 }}>
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${wallpaper})` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ds-bg)] via-[var(--ds-bg)]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ds-bg)]/80 to-transparent" />

            {/* Welcome content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6" style={{ minHeight: 220 }}>
              <div className="max-w-sm">
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Selamat datang, {user.name}! 👋
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Ide apa yang ingin kamu wujudkan hari ini?
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  Aku di sini untuk membantu, kapan pun, di mana pun. ✦
                </p>
              </div>
            </div>

            {/* Wallpaper customizer */}
            <WallpaperCustomizer
              currentWallpaper={wallpaper}
              onSelect={updateWallpaper}
            />
          </section>

          {/* ── Prompt Input Bar ── */}
          <div className="prompt-glow flex items-center gap-3 rounded-xl bg-[var(--ds-surface-2)] px-4 py-3">
            <Sparkles className="h-5 w-5 shrink-0 text-[var(--ds-text-dim)]" />
            <input
              type="text"
              placeholder="Tulis perintah atau pertanyaan..."
              className="flex-1 bg-transparent text-sm text-[var(--ds-text)] placeholder:text-[var(--ds-text-dim)] focus:outline-none"
            />
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--ds-accent)] text-[#030508] transition-colors hover:bg-[var(--ds-accent-hover)]"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* ── Quick Action Pills ── */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-4 py-2 text-xs font-medium text-[var(--ds-text-muted)] transition-all hover:border-[var(--ds-accent)]/30 hover:text-[var(--ds-text)]"
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </button>
            ))}
          </div>

          {/* ── Feature Cards ── */}
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* ── Bottom Row: Quote + History ── */}
          <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
            {/* Daily Quote */}
            <div className="ds-glass flex flex-col justify-between rounded-xl p-5">
              <div>
                <p className="mb-3 text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                  Hari ini
                </p>
                <blockquote className="font-serif text-sm leading-relaxed text-[var(--ds-text)] italic">
                  &ldquo;Langkah kecil hari ini, bisa jadi lompatan besar esok
                  nanti.&rdquo;
                </blockquote>
              </div>
              <p className="mt-4 text-right text-[10px] text-[var(--ds-text-dim)]">
                — NyieAI
              </p>
            </div>

            {/* Recent History */}
            <div className="ds-glass rounded-xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--ds-text)]">
                  <span className="text-base">📋</span> Riwayat Terbaru
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] text-[var(--ds-accent)] transition-colors hover:text-[var(--ds-accent-hover)]"
                >
                  Lihat semua <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1">
                {recentHistory.map((item) => (
                  <div
                    key={item.title}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.03]"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
                    >
                      <item.icon
                        className="h-4 w-4"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-[var(--ds-text)]">
                        {item.title}
                      </p>
                      <p className="truncate text-[10px] text-[var(--ds-text-dim)]">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] text-[var(--ds-text-dim)]">
                      {item.time}
                    </span>
                    <button
                      type="button"
                      className="shrink-0 text-[var(--ds-text-dim)] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ───── Right Sidebar ───── */}
      <aside className="hidden w-[280px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-[var(--ds-border)] bg-[var(--ds-surface)] p-4 xl:flex">
        {/* Quick Tools */}
        <div className="ds-glass-light rounded-xl p-4">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--ds-text)] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-[var(--ds-accent)]" />
            Tools Cepat
          </h3>
          <div className="space-y-1">
            {quickTools.map((tool) => (
              <button
                key={tool.title}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: tool.bg }}
                >
                  <tool.icon
                    className="h-4 w-4"
                    style={{ color: tool.color }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[var(--ds-text)]">
                    {tool.title}
                  </p>
                  <p className="text-[10px] text-[var(--ds-text-dim)]">
                    {tool.sub}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--ds-text-dim)]" />
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="ds-glass-light rounded-xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xs font-semibold text-[var(--ds-text)] uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 text-[var(--ds-accent)]" />
              Status Sistem
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-[var(--ds-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ds-accent)]" />
              Semua layanan aktif
            </span>
          </div>
          <div className="flex items-center justify-around">
            <StatGauge label="CPU" value={12} color="var(--ds-cyan)" />
            <StatGauge label="RAM" value={34} color="var(--ds-accent)" />
            <StatGauge label="Storage" value={48} color="var(--ds-amber)" />
            <StatGauge label="Jaringan" value={6} color="var(--ds-purple)" />
          </div>
        </div>

        {/* Usage */}
        <div className="ds-glass-light rounded-xl p-4">
          <h3 className="mb-3 text-xs font-semibold text-[var(--ds-text)] uppercase tracking-wider">
            Penggunaan Hari Ini
          </h3>
          <div className="mb-2 flex items-end justify-between">
            <span className="text-2xl font-bold text-[var(--ds-text)]">0</span>
            <span className="text-xs text-[var(--ds-text-dim)]">
              / 1000 kredit AI
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--ds-accent)] to-[var(--ds-cyan)]"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Tip */}
        <div className="ds-glass-light rounded-xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-[var(--ds-amber)]" />
            <span className="text-xs font-semibold text-[var(--ds-text)]">
              Tips hari ini:
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-[var(--ds-text-muted)]">
            Jangan takut untuk bertanya. Tidak ada pertanyaan yang bodoh! :)
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 px-1">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--ds-border)] px-2.5 py-1 text-[10px] font-medium transition-colors hover:border-[var(--ds-border-hover)]"
              style={{ color: tag.color }}
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: tag.color }}
              />
              {tag.label}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
