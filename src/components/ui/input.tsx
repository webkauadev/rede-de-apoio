import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Primitiva shadcn/ui adaptada aos tokens e ao target de 48 px do projeto. */
export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-12 min-w-0 w-full rounded-lg border border-input bg-surface-low px-2.5 text-meta placeholder:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
