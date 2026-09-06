import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "block text-[11px] font-medium tracking-[0.12em] text-[var(--ink-muted)] uppercase",
        className,
      )}
      {...props}
    />
  );
}
