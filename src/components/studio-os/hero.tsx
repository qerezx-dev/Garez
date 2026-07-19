"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const STATS = [
  { value: "8", label: "Creative engines" },
  { value: "40+", label: "Model providers" },
  { value: "12M", label: "Assets generated" },
];

export function Hero() {
  return (
    <section id="studio" className="relative pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-xl">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-cyan/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.82_0.13_220)]" />
          </span>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/60">
            NORO Studio — AI Operating System
          </p>
        </div>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5rem]">
          Create Anything
          <br />
          with <span className="text-hero-gradient">AI</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          One cinematic workspace for image, video, music, voice, code, and
          autonomous agents. Direct every model from a single command center
          built for studios that ship extraordinary work.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              {index > 0 && (
                <span className="hidden h-8 w-px bg-white/10 sm:block" />
              )}
              <div>
                <p className="font-display text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/45">{stat.label}</p>
              </div>
            </motion.div>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1.5 text-xs font-medium text-neon-cyan"
          >
            <Sparkles className="size-3.5" />
            New: Agent workflows
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
