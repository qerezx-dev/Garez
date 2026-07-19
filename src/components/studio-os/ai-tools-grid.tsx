"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { AI_TOOLS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

export function AiToolsGrid() {
  return (
    <section id="tools" className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
            AI Toolkit
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem]">
            Every medium. One operating system.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
            Modular creation surfaces engineered with cinematic craft, built for
            teams who ship extraordinary work.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/60">
          8 engines online
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AI_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <GlassPanel
                glow
                framed
                className={cn(
                  "group relative h-full cursor-pointer p-5 transition-shadow duration-500",
                  tool.glow
                )}
              >
                <span className="card-sheen rounded-3xl" />
                <div
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-gradient-to-br blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100",
                    tool.accent
                  )}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] transition-all duration-300 group-hover:scale-105 group-hover:border-white/25 group-hover:shadow-[0_0_28px_-4px_oklch(0.6_0.16_255/0.6)]">
                    <Icon className="size-5" />
                  </div>
                  <Badge className="border border-white/10 bg-black/25 text-white/70">
                    {tool.tag}
                  </Badge>
                </div>

                <div className="relative mt-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {tool.description}
                  </p>
                </div>

                <div className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition-all duration-300 group-hover:gap-2">
                  Launch
                  <ArrowUpRight className="size-4" />
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
