"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  imageSrc?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
}: FeatureCardProps) {
  return (
    <div className="group relative flex min-h-[180px] cursor-pointer flex-col justify-end overflow-hidden rounded-xl ds-glass transition-all hover:scale-[1.02]">
      {/* Gradient overlay background */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80"
        style={{ background: gradient }}
      />

      {/* Icon in top area */}
      <div className="relative z-10 px-5 pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Content at bottom */}
      <div className="relative z-10 mt-auto space-y-1 px-5 pb-5">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs leading-relaxed text-white/70">{description}</p>
        <div className="flex items-center gap-1 pt-1 text-[var(--ds-accent)]">
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
