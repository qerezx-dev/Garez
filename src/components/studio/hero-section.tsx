"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { AiTools } from "@/components/studio/ai-tools";
import { LivePreview } from "@/components/studio/live-preview";
import { PromptStudio } from "@/components/studio/prompt-studio";
import type { GenerationPayload, GenerationStatus } from "@/lib/generation";
import { SEED_HISTORY, type Creation } from "@/lib/studio-data";

export function HeroSection() {
  const [activePrompt, setActivePrompt] = useState("");
  const [draftPrompt, setDraftPrompt] = useState("");
  const [model, setModel] = useState("OpenAI");
  const [aspect, setAspect] = useState("16:9");
  const [quality, setQuality] = useState("High");
  const [creativity, setCreativity] = useState(65);
  const [seed, setSeed] = useState("random");
  const [outputCount, setOutputCount] = useState(1);
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
    setStatus("queued");
    setProgress(4);
    setActivePrompt("");
    setModel(payload.providerName);
    setAspect(payload.aspect);
    setQuality(payload.quality);
    setCreativity(payload.creativity);
    setSeed(payload.seed);
    setOutputCount(payload.outputCount);

    progressRef.current = window.setInterval(() => {
      setProgress((value) => {
        const next = value >= 92 ? value : value + Math.random() * 10 + 4;
        if (next > 30 && next < 70) setStatus("generating");
        if (next >= 70) setStatus("refining");
        return next;
      });
    }, 180);

    timerRef.current = window.setTimeout(() => {
      if (progressRef.current) window.clearInterval(progressRef.current);
      setProgress(100);
      setStatus("complete");

      const creation: Creation = {
        id: `gen-${Date.now()}`,
        prompt: payload.prompt,
        mode: payload.mode,
        model: payload.providerName,
        aspect: payload.aspect,
        quality: payload.quality,
        creativity: payload.creativity,
        seed: payload.seed,
        outputCount: payload.outputCount,
        createdAt: "Just now",
      };

      setActivePrompt(payload.prompt);
      setHistory((items) => [creation, ...items].slice(0, 6));
      setIsGenerating(false);
      window.setTimeout(() => {
        setProgress(0);
        setStatus("idle");
      }, 900);
    }, 2400);
  };

  const handleSelectHistory = (item: Creation) => {
    setActivePrompt(item.prompt);
    setDraftPrompt(item.prompt);
    setModel(item.model);
    setAspect(item.aspect);
    setQuality(item.quality);
    setCreativity(item.creativity);
    setSeed(item.seed);
    setOutputCount(item.outputCount);
    setIsGenerating(false);
    setProgress(0);
    setStatus("complete");
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
          Create Anything with <span className="neon-text">AI</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          A real AI workspace for prompts, models, and generation control —
          frontend architecture ready for provider integrations.
        </p>
      </motion.section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] xl:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <PromptStudio
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            draftPrompt={draftPrompt}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="xl:sticky xl:top-24"
        >
          <LivePreview
            prompt={activePrompt}
            model={model}
            aspect={aspect}
            quality={quality}
            creativity={creativity}
            seed={seed}
            outputCount={outputCount}
            isGenerating={isGenerating}
            progress={progress}
            status={status}
            history={history}
            onSelectHistory={handleSelectHistory}
          />
        </motion.div>
      </div>

      <AiTools />
    </div>
  );
}
