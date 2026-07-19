"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { AI_PROVIDERS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type ModelSelectorProps = {
  value: string;
  onChange: (providerId: string) => void;
};

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          AI Model
        </p>
        <p className="mt-1 text-sm text-white/55">
          Choose a provider for this generation session.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {AI_PROVIDERS.map((provider, index) => {
          const active = value === provider.id;
          return (
            <motion.button
              key={provider.id}
              type="button"
              onClick={() => onChange(provider.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
              whileHover={{ y: -2 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-300",
                active
                  ? "border-neon-blue/40 bg-white/[0.07] shadow-[0_0_28px_oklch(0.7_0.16_255/0.18)]"
                  : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br blur-2xl transition duration-500",
                  provider.accent,
                  active ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                )}
              />

              <div className="relative flex items-start gap-3">
                <div
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br text-xs font-semibold tracking-wide text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.1)]",
                    provider.accent
                  )}
                >
                  {provider.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white">{provider.name}</p>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "shrink-0 border text-[10px]",
                        provider.status === "ready"
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                          : "border-white/10 bg-black/25 text-white/55"
                      )}
                    >
                      {provider.status === "ready" ? "Ready" : "Coming Soon"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">
                    {provider.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
