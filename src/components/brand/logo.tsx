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
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/50 via-neon-blue/40 to-neon-purple/50 blur-[1px]" />
        <div className="absolute inset-[1px] rounded-[15px] bg-[#090b14]" />
        <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/10 to-transparent" />
        <span className="relative font-display text-[15px] font-bold tracking-tight text-white">
          N
        </span>
      </motion.div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-white">
            NORO
          </p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
            Studio
          </p>
        </div>
      )}
    </div>
  );
}
