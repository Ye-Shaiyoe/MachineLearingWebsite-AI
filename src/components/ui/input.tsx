import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full border border-[var(--rule)] bg-[var(--paper)] px-3 text-sm text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
