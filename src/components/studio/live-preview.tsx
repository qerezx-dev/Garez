"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import type { GenerationStatus } from "@/lib/generation";
import type { Creation } from "@/lib/studio-data";
import { MEDIA_TYPES } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type LivePreviewProps = {
  prompt: string;
  mediaType: "image" | "video" | "music" | "code";
  isGenerating: boolean;
  progress: number;
  status: GenerationStatus;
  history: Creation[];
  onSelectHistory: (item: Creation) => void;
  onMediaTypeChange: (type: "image" | "video" | "music" | "code") => void;
};

export function LivePreview({
  prompt,
  mediaType,
  isGenerating,
  progress,
  status,
  history,
  onSelectHistory,
  onMediaTypeChange,
}: LivePreviewProps) {
  const hasPrompt = prompt.trim().length > 0;
  const active = history[0];

  return (
    <GlassPanel
      id="preview"
      strong
      glow
      framed
      className="flex h-full min-h-[500px] flex-col rounded-[28px] p-4 sm:min-h-[590px] sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            Live Preview
          </p>
        </div>
        <Badge
          className={cn(
            "border",
            isGenerating
              ? "border-sky-400/25 bg-sky-400/10 text-sky-100"
              : "border-white/10 bg-white/5 text-white/60"
          )}
        >
          <span
            className={cn(
              "mr-1.5 size-1.5 rounded-full",
              isGenerating
                ? "animate-pulse bg-sky-300 shadow-[0_0_10px_oklch(0.8_0.14_230)]"
                : "bg-white/40"
            )}
          />
          {isGenerating ? "Generating..." : status === "complete" ? "Ready" : "Idle"}
        </Badge>
      </div>

      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#080a14] shadow-[0_24px_60px_oklch(0.05_0.03_275/0.5)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={hasPrompt ? prompt : "empty"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className={cn(
              "relative aspect-video w-full",
              active?.gradient
                ? `bg-gradient-to-br ${active.gradient}`
                : "bg-gradient-to-br from-[#1a0b2e] via-[#312e81] to-[#0ea5e9]"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(1_0_0/0.15),transparent_35%),radial-gradient(circle_at_70%_80%,oklch(0.7_0.2_300/0.25),transparent_40%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

            {/* Mock cyberpunk scene elements */}
            <div className="absolute inset-x-[12%] bottom-[18%] h-[34%] rounded-[40%] bg-black/35 blur-md" />
            <div className="absolute left-1/2 bottom-[22%] h-[22%] w-[55%] -translate-x-1/2 rounded-[2rem] bg-gradient-to-r from-[#22d3ee]/50 via-[#a855f7]/70 to-[#f472b6]/50 blur-[1px]" />
            <div className="absolute left-1/2 bottom-[28%] h-8 w-[48%] -translate-x-1/2 rounded-full bg-[#0ea5e9]/40 blur-lg" />

            {(mediaType === "video" || isGenerating) && (
              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="grid size-14 place-items-center rounded-full border border-white/20 bg-black/35 text-white shadow-[0_0_40px_oklch(0.65_0.16_280/0.35)] backdrop-blur-md"
                >
                  <Play className="size-5 fill-current" />
                </motion.div>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-x-6 bottom-5">
                <div className="mb-2 flex justify-between text-[11px] text-white/70">
                  <span>Rendering frame</span>
                  <span>{Math.round(Math.min(progress, 100))}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {!isGenerating && hasPrompt && (
              <div className="absolute inset-x-5 bottom-4">
                <p className="line-clamp-2 text-sm font-medium text-white drop-shadow">
                  {prompt}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {MEDIA_TYPES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() =>
              onMediaTypeChange(item.value as typeof mediaType)
            }
            className={cn(
              "rounded-2xl border px-2 py-2.5 text-xs font-medium transition",
              mediaType === item.value
                ? "border-violet-400/35 bg-white/[0.08] text-white shadow-[0_0_24px_oklch(0.65_0.16_280/0.18)]"
                : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Recent Generations
        </p>
        <div className="grid grid-cols-4 gap-2">
          {history.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectHistory(item)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/25",
                `bg-gradient-to-br ${item.gradient}`
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.18),transparent_50%)]" />
              {item.duration && (
                <span className="absolute right-1.5 bottom-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[9px] text-white/85 backdrop-blur">
                  {item.duration}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
