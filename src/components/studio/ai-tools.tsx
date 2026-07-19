"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { AI_TOOLS } from "@/lib/studio-data";

export function AiTools() {
  return (
    <section id="tools" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            AI Toolkit
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Craft with precision
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/50 sm:text-base">
            Modular creation tools designed for high-end visual storytelling.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {AI_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
            >
              <GlassPanel className="group relative h-full overflow-hidden p-4 transition duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                <div
                  className={`pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-gradient-to-br ${tool.accent} blur-2xl transition duration-500 group-hover:scale-125`}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/6 text-white">
                    <Icon className="size-5" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="border border-white/10 bg-black/20 text-white/70"
                  >
                    {tool.tag}
                  </Badge>
                </div>
                <div className="relative mt-4">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {tool.description}
                  </p>
                </div>
                <div className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition group-hover:gap-2">
                  Open tool
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
