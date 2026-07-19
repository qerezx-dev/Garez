"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { AiTools } from "@/components/studio/ai-tools";
import { LivePreview } from "@/components/studio/live-preview";
import { PromptBox } from "@/components/studio/prompt-box";
import type { GenerationPayload } from "@/lib/generation";
import { SEED_HISTORY, type Creation } from "@/lib/studio-data";

export function HeroSection() {
  const [activePrompt, setActivePrompt] = useState("");
  const [mode, setMode] = useState<"image" | "video">("image");
  const [model, setModel] = useState("NORO Prime");
  const [style, setStyle] = useState("Cinematic");
  const [aspect, setAspect] = useState("16:9");
  const [quality, setQuality] = useState("High");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(6);
    setActivePrompt("");
    setMode(payload.mode);
    setModel(payload.model);
    setStyle(payload.style);
    setAspect(payload.aspect);
    setQuality(payload.quality);

    progressRef.current = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 92) return value;
        return value + Math.random() * 10 + 4;
      });
    }, 180);

    timerRef.current = window.setTimeout(() => {
      if (progressRef.current) window.clearInterval(progressRef.current);
      setProgress(100);

      const creation: Creation = {
        id: `gen-${Date.now()}`,
        prompt: payload.prompt,
        mode: payload.mode,
        model: payload.model,
        style: payload.style,
        aspect: payload.aspect,
        quality: payload.quality,
        createdAt: "Just now",
      };

      setActivePrompt(payload.prompt);
      setHistory((items) => [creation, ...items].slice(0, 6));
      setIsGenerating(false);
      window.setTimeout(() => setProgress(0), 500);
    }, 2200);
  };

  const handleSelectHistory = (item: Creation) => {
    setActivePrompt(item.prompt);
    setMode(item.mode);
    setModel(item.model);
    setStyle(item.style);
    setAspect(item.aspect);
    setQuality(item.quality);
    setIsGenerating(false);
    setProgress(0);
  };

  return (
    <div
      id="create"
      className="mx-auto w-full max-w-[1440px] space-y-12 px-4 py-8 sm:px-6 lg:space-y-14 lg:py-12"
    >
      <motion.section
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.82_0.13_220)]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
            NORO Studio
          </p>
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
          Create Anything with{" "}
          <span className="neon-text">AI</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          A next-generation creation OS for images, motion, voice, and agents —
          crafted with quiet luxury and cinematic control.
        </p>
      </motion.section>

      <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <PromptBox onGenerate={handleGenerate} isGenerating={isGenerating} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="min-h-full"
        >
          <LivePreview
            prompt={activePrompt}
            mode={mode}
            model={model}
            style={style}
            aspect={aspect}
            quality={quality}
            isGenerating={isGenerating}
            progress={progress}
            history={history}
            onSelectHistory={handleSelectHistory}
          />
        </motion.div>
      </div>

      <AiTools />
    </div>
  );
}
