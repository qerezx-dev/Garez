"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Clapperboard,
  ImageIcon,
  Maximize2,
  Play,
  RefreshCw,
} from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GenerationStatus } from "@/lib/generation";
import { cn } from "@/lib/utils";

type LivePreviewProps = {
  prompt: string;
  model: string;
  aspect: string;
  quality: string;
  creativity: number;
  seed: string;
  outputCount: number;
  isGenerating: boolean;
  progress: number;
  status: GenerationStatus;
  mode?: "image" | "video";
};

const STATUS_COPY: Record<GenerationStatus, string> = {
  idle: "Waiting for prompt",
  queued: "Queued in studio pipeline",
  generating: "Composing visual structure",
  refining: "Refining detail and lighting",
  complete: "Generation complete",
  error: "Generation failed",
};

export function LivePreview({
  prompt,
  model,
  aspect,
  quality,
  creativity,
  seed,
  outputCount,
  isGenerating,
  progress,
  status,
  mode = "image",
}: LivePreviewProps) {
  const hasPrompt = prompt.trim().length > 0;

  return (
    <GlassPanel
      id="preview"
      strong
      glow
      framed
      className="flex h-full min-h-[520px] flex-col lg:min-h-[720px]"
    >
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Live Preview
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            Image & video canvas
          </p>
        </div>
        <div className="flex items-center gap-1.5">
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
                  ? "bg-amber-300 shadow-[0_0_8px_oklch(0.85_0.15_90)]"
                  : hasPrompt
                    ? "bg-emerald-300 shadow-[0_0_8px_oklch(0.8_0.17_150)]"
                    : "bg-white/40"
              )}
            />
            {isGenerating ? "Rendering" : hasPrompt ? "Ready" : "Idle"}
          </Badge>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Refresh preview"
          >
            <RefreshCw />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-xl text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Expand preview"
          >
            <Maximize2 />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.18_255/0.22),transparent_42%),radial-gradient(circle_at_75%_75%,oklch(0.5_0.2_300/0.2),transparent_48%)]" />
        <div className="absolute inset-0 soft-grid opacity-35" />

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
              className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 text-center"
            >
              <div className="relative size-36">
                <motion.div
                  className="absolute inset-0 rounded-full border border-neon-blue/35"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-dashed border-neon-purple/45"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-9 rounded-3xl bg-gradient-to-br from-neon-blue/45 to-neon-purple/45"
                  animate={{ opacity: [0.45, 1, 0.45], scale: [0.94, 1.06, 0.94] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <ImageIcon className="size-6 text-white" />
                </div>
              </div>
              <div className="w-full space-y-3">
                <div>
                  <p className="font-display text-xl font-semibold text-white">
                    Generating preview
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {STATUS_COPY[status]}
                  </p>
                </div>
                <div className="w-full space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Generation progress</span>
                    <span className="tabular-nums text-white/80">
                      {Math.round(Math.min(progress, 100))}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ ease: "easeOut", duration: 0.25 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : hasPrompt ? (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-xl"
            >
              <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[#0b1020]/88 shadow-[0_40px_100px_oklch(0.16_0.08_275/0.55)]">
                <div
                  className={cn(
                    "relative bg-gradient-to-br from-[#1a2758] via-[#2c184d] to-[#0c1b2c] p-6",
                    aspectClass(aspect)
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.8_0.12_220/0.22),transparent_40%),radial-gradient(circle_at_80%_70%,oklch(0.7_0.18_300/0.24),transparent_45%)]" />
                  <div className="relative flex h-full min-h-[260px] flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="secondary"
                          className="border border-white/10 bg-black/30 text-white/80"
                        >
                          {mode === "video" ? "Video Preview" : "Image Preview"}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="border border-white/10 bg-black/30 text-white/70"
                        >
                          {aspect}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="border border-white/10 bg-black/30 text-white/70"
                        >
                          ×{outputCount}
                        </Badge>
                      </div>
                      {mode === "video" && (
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          className="rounded-full bg-white/10 text-white hover:bg-white/20"
                          aria-label="Play preview"
                        >
                          <Play className="size-3.5 fill-current" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold tracking-tight text-white text-balance">
                        {prompt}
                      </p>
                      <p className="mt-2 text-sm text-white/55">
                        {model} · {quality} · Creativity {creativity} · Seed{" "}
                        {seed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              className="relative z-10 max-w-sm text-center"
            >
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Clapperboard className="size-5 text-neon-cyan" />
              </div>
              <p className="font-display text-xl font-semibold text-white">
                Your canvas awaits
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Generate from the Prompt Studio to stream a cinematic image or
                video preview here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/8 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Generation Status
            </p>
            <p className="mt-1 text-sm text-white/75">{STATUS_COPY[status]}</p>
          </div>
          <p className="text-xs tabular-nums text-white/40">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}

function aspectClass(aspect: string) {
  switch (aspect) {
    case "1:1":
      return "aspect-square";
    case "4:5":
      return "aspect-[4/5]";
    case "9:16":
      return "aspect-[9/16] max-h-[420px] mx-auto w-full";
    case "21:9":
      return "aspect-[21/9]";
    case "16:9":
    default:
      return "aspect-video";
  }
}
