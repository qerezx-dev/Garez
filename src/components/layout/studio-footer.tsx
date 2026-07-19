"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StudioFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-3 pb-3 sm:px-4 lg:px-5"
    >
      <div className="glass-float flex flex-col items-start justify-between gap-3 rounded-[24px] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <p className="font-display text-sm font-medium tracking-wide text-white/80 sm:text-base">
          Build. Create. Automate.
        </p>
        <Button className="rounded-full border-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:opacity-95">
          <Zap data-icon="inline-start" className="size-3.5" />
          Explore Workflows
          <ChevronDown data-icon="inline-end" className="size-3.5 opacity-80" />
        </Button>
      </div>
    </motion.div>
  );
}
