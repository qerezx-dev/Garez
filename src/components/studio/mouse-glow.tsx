"use client";

import { cn } from "@/lib/utils";

type MouseGlowProps = {
  x: number;
  y: number;
  active: boolean;
  className?: string;
};

export function MouseGlow({ x, y, active, className }: MouseGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-500",
        active ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        background: `radial-gradient(420px circle at ${x}% ${y}%, oklch(0.74 0.16 255 / 0.16), oklch(0.7 0.2 300 / 0.08) 35%, transparent 60%)`,
      }}
    />
  );
}
