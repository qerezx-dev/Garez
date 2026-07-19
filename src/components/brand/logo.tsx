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
        className="relative grid size-9 place-items-center rounded-xl neon-ring"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/40 via-neon-purple/30 to-transparent" />
        <div className="absolute inset-px rounded-[11px] bg-[#0b0d16]/90" />
        <span className="relative font-display text-sm font-bold tracking-tight text-white">
          N
        </span>
      </motion.div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
            NORO
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            Studio
          </p>
        </div>
      )}
    </div>
  );
}
