"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { AIToolGrid } from "@/components/os/ai-tool-grid";
import { CinematicStage } from "@/components/os/cinematic-stage";
import { PreviewPanel } from "@/components/os/preview-panel";
import { PromptCenter } from "@/components/os/prompt-center";
import { StudioFooter } from "@/components/os/studio-footer";
import { StudioSidebar } from "@/components/os/studio-sidebar";
import { StudioTopbar } from "@/components/os/studio-topbar";
import { Creation, SEED_HISTORY } from "@/lib/studio-data";

export function StudioHome() {
  const [history, setHistory] = useState<Creation[]>(SEED_HISTORY);
  const [prompt, setPrompt] = useState(SEED_HISTORY[0].prompt);
  const [media, setMedia] = useState<"image" | "video" | "music" | "code">("video");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<number | null>(null);
  const completeTimer = useRef<number | null>(null);

  const generate = (nextPrompt: string, nextMedia: "image" | "video" | "music" | "code") => {
    if (progressTimer.current) window.clearInterval(progressTimer.current);
    if (completeTimer.current) window.clearTimeout(completeTimer.current);

    setPrompt(nextPrompt);
    setMedia(nextMedia);
    setIsGenerating(true);
    setProgress(8);

    progressTimer.current = window.setInterval(() => {
      setProgress((current) => (current > 91 ? current : current + Math.round(Math.random() * 9) + 3));
    }, 150);

    completeTimer.current = window.setTimeout(() => {
      if (progressTimer.current) window.clearInterval(progressTimer.current);
      const creation: Creation = {
        id: `noro-${Date.now()}`,
        prompt: nextPrompt,
        mode: nextMedia,
        model: "NORO Cinema",
        aspect: "16:9",
        quality: "Ultra",
        creativity: 72,
        seed: "auto",
        outputCount: 1,
        createdAt: "Just now",
        duration: nextMedia === "video" ? "00:08" : undefined,
        gradient: nextMedia === "video" ? "from-[#18062b] via-[#4c1d95] to-[#0369a1]" : "from-[#0c1f3f] via-[#3730a3] to-[#9333ea]",
      };
      setHistory((current) => [creation, ...current].slice(0, 8));
      setProgress(100);
      setIsGenerating(false);
      window.setTimeout(() => setProgress(0), 600);
    }, 2200);
  };

  return (
    <div className="min-h-dvh bg-[#05070b] text-white">
      <CinematicStage />
      <div className="relative z-10 flex min-h-dvh">
        <StudioSidebar />
        <div className="min-w-0 flex-1">
          <StudioTopbar />
          <main className="mx-auto w-full max-w-[1280px] px-5 pb-8 pt-1 xl:px-8">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
              <section className="pt-5 xl:pt-7">
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[540px]"
                >
                  <h1 className="font-display text-[45px] font-semibold leading-[1.03] tracking-[-0.055em] text-white xl:text-[54px]">
                    Create Anything<br />with <span className="neon-text">AI</span><Sparkles className="ml-1 inline size-5 align-top text-[#7dd3fc]" />
                  </h1>
                  <p className="mt-3 max-w-[420px] text-[13px] leading-[1.55] text-white/58">
                    All-in-one AI studio to generate, edit and bring your ideas to life.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.55 }}
                >
                  <PromptCenter onGenerate={generate} isGenerating={isGenerating} />
                </motion.div>

                <AIToolGrid />
                <StudioFooter />
              </section>

              <motion.aside
                initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.12, duration: 0.6 }}
                className="xl:pt-1"
              >
                <PreviewPanel
                  prompt={prompt}
                  media={media}
                  isGenerating={isGenerating}
                  progress={progress}
                  history={history}
                  onSelect={(item) => {
                    setPrompt(item.prompt);
                    setMedia(item.mode);
                    setHistory((current) => [item, ...current.filter((entry) => entry.id !== item.id)]);
                  }}
                />
              </motion.aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
