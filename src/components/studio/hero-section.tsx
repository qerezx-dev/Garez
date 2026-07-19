"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { AiTools } from "@/components/studio/ai-tools";
import { LivePreview } from "@/components/studio/live-preview";
import { PromptStudio } from "@/components/studio/prompt-studio";
import { RecentCarousel } from "@/components/studio/recent-carousel";
import type { GenerationPayload, GenerationStatus } from "@/lib/generation";
import { SEED_HISTORY, type Creation } from "@/lib/studio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const [activePrompt, setActivePrompt] = useState("");
  const [draftPrompt, setDraftPrompt] = useState("");
  const [model, setModel] = useState("OpenAI");
  const [aspect, setAspect] = useState("16:9");
  const [quality, setQuality] = useState("High");
  const [creativity, setCreativity] = useState(65);
  const [seed, setSeed] = useState("random");
  const [outputCount, setOutputCount] = useState(1);
  const [mode, setMode] = useState<"image" | "video">("image");
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
    setMode(payload.mode);

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
      setHistory((items) => [creation, ...items].slice(0, 8));
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
    setMode(item.mode);
    setIsGenerating(false);
    setProgress(0);
    setStatus("complete");
  };

  return (
    <motion.div
      id="create"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mx-auto w-full max-w-[1500px] space-y-12 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8 lg:py-12"
    >
      <motion.section variants={fadeUp} className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 shadow-[0_0_30px_oklch(0.65_0.14_255/0.12)]">
          <span className="size-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.84_0.12_220)]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
            NORO Studio
          </p>
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
          Create Anything with <span className="neon-text">AI</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          A luxury AI operating system for prompts, models, and cinematic
          previews — designed with quiet power and absolute polish.
        </p>
      </motion.section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] xl:gap-7">
        <motion.div variants={fadeUp}>
          <PromptStudio
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            draftPrompt={draftPrompt}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="xl:sticky xl:top-28">
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
            mode={mode}
          />
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <RecentCarousel items={history} onSelect={handleSelectHistory} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <AiTools />
      </motion.div>
    </motion.div>
  );
}
