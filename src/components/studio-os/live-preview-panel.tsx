"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Aperture,
  Download,
  Film,
  ImageIcon,
  Maximize2,
  Play,
  RefreshCw,
} from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GenerationStatus } from "@/lib/generation";
import type { Creation } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type LivePreviewPanelProps = {
  prompt: string;
  model: string;
  aspect: string;
  quality: string;
  creativity: number;
  toolLabel: string;
  isGenerating: boolean;
  progress: number;
  status: GenerationStatus;
  history: Creation[];
  onSelectHistory: (item: Creation) => void;
};

const STATUS_COPY: Record<GenerationStatus, string> = {
  idle: "Waiting for prompt",
  queued: "Queued in render pipeline",
  generating: "Composing visual structure",
  refining: "Refining detail and lighting",
  complete: "Generation complete",
  error: "Generation failed",
};

export function LivePreviewPanel({
  prompt,
  model,
  aspect,
  quality,
  creativity,
  toolLabel,
  isGenerating,
  progress,
  status,
  history,
  onSelectHistory,
}: LivePreviewPanelProps) {
  const hasPrompt = prompt.trim().length > 0;
  const rounded = Math.round(Math.min(progress, 100));

  return (
    <GlassPanel
      id="preview"
      strong
      glow
      framed
      className="flex h-full flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-cyan">
            <Aperture className="size-4" />
          </span>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Live Preview
            </p>
            <p className="text-sm font-semibold text-white">Output canvas</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusBadge isGenerating={isGenerating} hasPrompt={hasPrompt} />
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Regenerate"
          >
            <RefreshCw />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Expand"
          >
            <Maximize2 />
          </Button>
        </div>
      </div>

      {/* 16:9 canvas */}
      <div className="p-5">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b16]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.18_255/0.25),transparent_45%),radial-gradient(circle_at_75%_80%,oklch(0.5_0.2_300/0.22),transparent_50%)]" />
          <div className="absolute inset-0 soft-grid opacity-30" />

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 p-6 text-center"
              >
                <div className="relative size-24">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-neon-blue/35"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2.5 rounded-full border border-dashed border-neon-purple/45"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-6 rounded-2xl bg-gradient-to-br from-neon-blue/50 to-neon-purple/50"
                    animate={{ opacity: [0.45, 1, 0.45], scale: [0.92, 1.08, 0.92] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <Aperture className="size-6 text-white" />
                  </div>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <p className="font-display text-lg font-semibold text-white">
                    Rendering {toolLabel.toLowerCase()}
                  </p>
                  <p className="text-sm text-white/55">{STATUS_COPY[status]}</p>
                </div>
              </motion.div>
            ) : hasPrompt ? (
              <motion.div
                key={prompt}
                initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-br from-[#18255b]/70 via-[#241a55]/50 to-[#0a1526]/70 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge className="border border-white/12 bg-black/35 text-white/85">
                      {toolLabel}
                    </Badge>
                    <Badge className="border border-white/10 bg-black/30 text-white/70">
                      {aspect}
                    </Badge>
                  </div>
                  {toolLabel === "Video" && (
                    <span className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                      <Play className="size-4 translate-x-px" />
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-white text-balance">
                    {prompt}
                  </p>
                  <p className="mt-2 text-sm text-white/55">
                    {model} · {quality} · Creativity {creativity}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 text-center"
              >
                <div className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <ImageIcon className="size-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    Preview your next creation
                  </p>
                  <p className="mt-1 max-w-xs text-sm text-white/50">
                    Compose a prompt and generate to render output here.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/55">{STATUS_COPY[status]}</span>
            <span className="tabular-nums text-white/75">{rounded}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
              animate={{ width: `${rounded}%` }}
              transition={{ ease: "easeOut", duration: 0.25 }}
            />
          </div>
        </div>
      </div>

      {/* Recent generations */}
      <div id="history" className="mt-auto border-t border-white/8 px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Recent generations
            </p>
            <p className="text-sm font-semibold text-white">History</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-xs text-white/50 hover:bg-white/8 hover:text-white"
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {history.slice(0, 3).map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelectHistory(item)}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-2.5 text-left transition-colors hover:border-neon-blue/30"
            >
              <div
                className={cn(
                  "relative mb-2.5 flex aspect-video items-end overflow-hidden rounded-xl p-2",
                  item.mode === "video"
                    ? "bg-gradient-to-br from-violet-500/35 to-fuchsia-600/25"
                    : "bg-gradient-to-br from-sky-500/35 to-indigo-600/25"
                )}
              >
                <span className="card-sheen" />
                {item.mode === "video" ? (
                  <Film className="size-4 text-white/85" />
                ) : (
                  <ImageIcon className="size-4 text-white/85" />
                )}
                <span className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Download className="size-3.5 text-white/70" />
                </span>
              </div>
              <p className="line-clamp-2 text-xs font-medium text-white/85 group-hover:text-white">
                {item.prompt}
              </p>
              <p className="mt-1 text-[11px] text-white/40">
                {item.model} · {item.createdAt}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

function StatusBadge({
  isGenerating,
  hasPrompt,
}: {
  isGenerating: boolean;
  hasPrompt: boolean;
}) {
  return (
    <Badge
      className={cn(
        "border",
        isGenerating
          ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
          : hasPrompt
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
            : "border-white/10 bg-white/5 text-white/60"
      )}
    >
      <span
        className={cn(
          "mr-1.5 size-1.5 rounded-full",
          isGenerating
            ? "animate-pulse bg-amber-300 shadow-[0_0_8px_oklch(0.85_0.15_90)]"
            : hasPrompt
              ? "bg-emerald-300 shadow-[0_0_8px_oklch(0.8_0.17_150)]"
              : "bg-white/40"
        )}
      />
      {isGenerating ? "Rendering" : hasPrompt ? "Ready" : "Idle"}
    </Badge>
  );
}
