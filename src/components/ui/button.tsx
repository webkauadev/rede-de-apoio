import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Primitiva nativa: sem Slot/variants sem uso; tokens shadcn/ui aprovados. */
export function Button({
  className,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(
        "inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-meta font-normal text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
