"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { AI_TOOLS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

export function AiTools() {
  return (
    <section id="tools" className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {AI_TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              whileHover={{ y: -8, rotateX: 2 }}
              style={{ transformPerspective: 900 }}
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
                    "pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-gradient-to-br blur-2xl transition duration-500 group-hover:scale-125",
                    tool.accent
                  )}
                />

                <div
                  className={cn(
                    "relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-[0_12px_30px_oklch(0.4_0.12_280/0.35)] transition duration-300 group-hover:scale-110",
                    tool.iconBg
                  )}
                >
                  <Icon className="size-5" />
                </div>

                <div className="relative mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {tool.title}
                    </h3>
                    <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-white" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {tool.description}
                  </p>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
