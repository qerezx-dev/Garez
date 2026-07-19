"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { AiTools } from "@/components/studio/ai-tools";
import { CommandCenter } from "@/components/studio/command-center";
import { LivePreview } from "@/components/studio/live-preview";
import type { GenerationPayload, GenerationStatus } from "@/lib/generation";
import { SEED_HISTORY, type Creation } from "@/lib/studio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const [activePrompt, setActivePrompt] = useState(
    SEED_HISTORY[0]?.prompt ?? ""
  );
  const [mediaType, setMediaType] = useState<"image" | "video" | "music" | "code">(
    "video"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [history, setHistory] = useState<Creation[]>(SEED_HISTORY);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (progressRef.current) window.clearInterval(progressRef.current);
    };
  }, []);

  const handleGenerate = (payload: GenerationPayload) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (progressRef.current) window.clearInterval(progressRef.current);

    setIsGenerating(true);
    setStatus("generating");
    setProgress(8);
    setMediaType(payload.mediaType);
    setActivePrompt(payload.prompt);

    progressRef.current = window.setInterval(() => {
      setProgress((value) => (value >= 92 ? value : value + Math.random() * 11 + 4));
    }, 160);

    timerRef.current = window.setTimeout(() => {
      if (progressRef.current) window.clearInterval(progressRef.current);
      setProgress(100);
      setStatus("complete");

      const creation: Creation = {
        id: `gen-${Date.now()}`,
        prompt: payload.prompt,
        mode: payload.mediaType,
        model: "NORO Cinema",
        aspect: "16:9",
        quality: "Ultra",
        creativity: 70,
        seed: "auto",
        outputCount: 1,
        createdAt: "Just now",
        duration: payload.mediaType === "video" ? "00:08" : undefined,
        gradient:
          payload.mediaType === "video"
            ? "from-[#1a0b2e] via-[#3b0764] to-[#0ea5e9]"
            : "from-[#0f172a] via-[#312e81] to-[#7c3aed]",
      };

      setHistory((items) => [creation, ...items].slice(0, 8));
      setIsGenerating(false);
      window.setTimeout(() => {
        setProgress(0);
        setStatus("idle");
      }, 800);
    }, 2200);
  };

  const handleSelectHistory = (item: Creation) => {
    setActivePrompt(item.prompt);
    setMediaType(item.mode);
    setStatus("complete");
    setIsGenerating(false);
    setProgress(0);
    setHistory((items) => [item, ...items.filter((entry) => entry.id !== item.id)]);
  };

  return (
    <motion.div
      id="create"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="mx-auto w-full max-w-[1680px] space-y-12 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8 lg:py-10"
    >
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-8 lg:col-span-7 lg:space-y-10 xl:col-span-8">
          <motion.section
            variants={fadeUp}
            className="mx-auto max-w-4xl pt-4 text-center lg:mx-0 lg:pt-10 lg:text-left"
          >
            <h1 className="font-display text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.6rem] lg:leading-[0.98]">
              Create Anything with{" "}
              <span className="relative inline-flex items-center gap-2">
                <span className="neon-text">AI</span>
                <Sparkles className="size-6 text-sky-300 sm:size-7" />
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg lg:mx-0">
              The operating system for imagination — generate images, video,
              music, and agents from one cinematic command surface.
            </p>
          </motion.section>

          <motion.div variants={fadeUp}>
            <CommandCenter
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-28 xl:col-span-4">
          <LivePreview
            prompt={activePrompt}
            mediaType={mediaType}
            isGenerating={isGenerating}
            progress={progress}
            status={status}
            history={history}
            onSelectHistory={handleSelectHistory}
            onMediaTypeChange={setMediaType}
          />
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <AiTools />
      </motion.div>
    </motion.div>
  );
}
