"use client";

import { cn } from "@/lib/utils";

type ControlChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ControlChip({
  label,
  active = false,
  onClick,
  className,
}: ControlChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
        active
          ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_oklch(0.85_0.08_255/0.35),0_0_24px_oklch(0.7_0.16_255/0.18)]"
          : "bg-white/[0.03] text-white/55 shadow-[inset_0_0_0_1px_oklch(1_0_0/0.08)] hover:bg-white/[0.06] hover:text-white",
        className
      )}
    >
      {label}
    </button>
  );
}
