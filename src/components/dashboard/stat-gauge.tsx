"use client";

interface StatGaugeProps {
  label: string;
  value: number;
  color: string;
}

export function StatGauge({ label, value, color }: StatGaugeProps) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 52 52" className="h-full w-full -rotate-90">
          {/* Background ring */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          {/* Value ring */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stat-gauge-ring"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-[var(--ds-text)]">
          {value}%
        </span>
      </div>
      <span className="text-[10px] text-[var(--ds-text-muted)]">{label}</span>
    </div>
  );
}
