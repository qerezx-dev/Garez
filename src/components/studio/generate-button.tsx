"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GenerateButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  isGenerating?: boolean;
  className?: string;
};

export function GenerateButton({
  onClick,
  disabled,
  isGenerating = false,
  className,
}: GenerateButtonProps) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn("relative", className)}
    >
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple opacity-70 blur-lg"
        animate={
          isGenerating
            ? { opacity: [0.35, 0.8, 0.35] }
            : { opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Button
        type="button"
        size="lg"
        onClick={onClick}
        disabled={disabled}
        className="relative h-12 w-full overflow-hidden rounded-2xl border-0 bg-transparent px-7 text-[15px] font-semibold text-white shadow-none disabled:opacity-45 sm:h-[3.25rem] sm:w-auto"
      >
        <span className="absolute inset-0 animate-gradient-flow bg-[linear-gradient(120deg,#38bdf8,#6366f1,#a855f7,#38bdf8)]" />
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,transparent,oklch(1_0_0/0.28),transparent)]" />
        <AnimatePresence mode="wait" initial={false}>
          {isGenerating ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="relative inline-flex items-center gap-2"
            >
              <Loader2 className="size-4 animate-spin" />
              Generating…
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="relative inline-flex items-center gap-2"
            >
              <Sparkles className="size-4" />
              Generate
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
