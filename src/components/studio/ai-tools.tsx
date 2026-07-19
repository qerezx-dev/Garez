"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { AI_TOOLS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

export function AiTools() {
  return (
    <section id="tools" className="space-y-7">
      <div className="max-w-2xl">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
          AI Toolkit
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Every medium. One luminous system.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
          Premium creation surfaces with vivid gradients, crafted for teams who
          ship world-class work.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AI_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              whileHover={{ y: -6 }}
            >
              <GlassPanel
                glow
                framed
                className={cn(
                  "group h-full cursor-pointer p-5 transition duration-500",
                  tool.glow
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-8 -top-10 size-44 rounded-full bg-gradient-to-br blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-100",
                    tool.accent
                  )}
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.08),transparent_45%)]" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_10px_30px_oklch(0.4_0.1_255/0.15)] transition duration-300 group-hover:scale-110 group-hover:border-white/25">
                    <Icon className="size-5" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="border border-white/10 bg-black/25 text-white/70"
                  >
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

                <div className="relative mt-7 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition-all duration-300 group-hover:gap-2.5">
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
