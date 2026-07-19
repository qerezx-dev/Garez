"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div
        aria-hidden
        className="relative grid size-10 place-items-center rounded-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#60a5fa] via-[#818cf8] to-[#c084fc]" />
        <div className="absolute inset-[1.5px] rounded-[14px] bg-[#0a0b12]" />
        <span className="relative font-display text-[15px] font-bold tracking-tight text-white">
          N
        </span>
      </motion.div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-[1.05rem] font-semibold tracking-[0.08em] text-white">
            NORO
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
            Studio
          </p>
        </div>
      )}
    </div>
  );
}
