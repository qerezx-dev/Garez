"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { AI_TOOLS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

export function AIToolGrid() {
  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-white/88">AI Tools</h2>
        <p className="mt-0.5 text-[11px] text-white/44">Everything you need to create in one place.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {AI_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.button
              key={tool.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035, duration: 0.35 }}
              whileHover={{ y: -3 }}
              className={cn("os-tool-card group relative min-h-[104px] overflow-hidden rounded-[10px] p-3 text-left", tool.glow)}
            >
              <div className={cn("pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br blur-2xl opacity-70 transition group-hover:scale-125", tool.accent)} />
              <div className="relative flex h-full flex-col">
                <div className={cn("grid size-8 place-items-center rounded-[7px] bg-gradient-to-br text-white shadow-lg", tool.iconBg)}>
                  <Icon className="size-4" />
                </div>
                <div className="mt-2.5 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[12px] font-semibold text-white/90">{tool.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[9px] leading-[1.35] text-white/48">{tool.description}</p>
                  </div>
                  <ArrowRight className="mt-1 size-3.5 shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
