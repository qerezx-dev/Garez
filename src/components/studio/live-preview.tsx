"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Play, RefreshCw } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type LivePreviewProps = {
  prompt: string;
  isGenerating: boolean;
};

export function LivePreview({ prompt, isGenerating }: LivePreviewProps) {
  const hasPrompt = prompt.trim().length > 0;

  return (
    <GlassPanel id="preview" strong className="flex h-full min-h-[360px] flex-col overflow-hidden lg:min-h-[460px]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            Live Preview
          </p>
          <p className="mt-0.5 text-sm font-medium text-white">Canvas Output</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge className="border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
            <span className="mr-1.5 size-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_oklch(0.8_0.17_150)]" />
            Ready
          </Badge>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Refresh preview"
          >
            <RefreshCw />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/60 hover:bg-white/8 hover:text-white"
            aria-label="Expand preview"
          >
            <Maximize2 />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.18_255/0.22),transparent_40%),radial-gradient(circle_at_70%_70%,oklch(0.5_0.2_300/0.2),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="relative z-10 flex w-full max-w-md flex-col items-center gap-4 text-center"
            >
              <div className="relative size-28">
                <motion.div
                  className="absolute inset-0 rounded-full border border-neon-blue/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-neon-purple/50 border-dashed"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    className="size-16 rounded-2xl bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 blur-[1px]"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                </div>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Composing your scene
                </p>
                <p className="mt-1 text-sm text-white/55">
                  Lighting, materials, and composition are being resolved…
                </p>
              </div>
            </motion.div>
          ) : hasPrompt ? (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-lg"
            >
              <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0c1020]/80 shadow-[0_30px_80px_oklch(0.2_0.08_275/0.55)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#1a2450] via-[#2a1848] to-[#0d1b2a] p-6">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="secondary"
                        className="border border-white/10 bg-black/25 text-white/80"
                      >
                        Concept Frame
                      </Badge>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="rounded-full bg-white/8 text-white hover:bg-white/15"
                        aria-label="Play preview"
                      >
                        <Play className="size-3.5 fill-current" />
                      </Button>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold tracking-tight text-white text-balance">
                        {prompt}
                      </p>
                      <p className="mt-2 text-sm text-white/55">
                        Preview mock — connect generation when backend is ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 max-w-sm text-center"
            >
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Play className="size-5 text-neon-cyan" />
              </div>
              <p className="font-display text-xl font-semibold text-white">
                Your creation appears here
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Write a prompt and generate to see a live studio preview of your
                next asset.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
