"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { AiTools } from "@/components/studio/ai-tools";
import { LivePreview } from "@/components/studio/live-preview";
import { PromptBox } from "@/components/studio/prompt-box";

export function HeroSection() {
  const [activePrompt, setActivePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (prompt: string) => {
    setIsGenerating(true);
    setActivePrompt("");

    window.setTimeout(() => {
      setActivePrompt(prompt);
      setIsGenerating(false);
    }, 1600);
  };

  return (
    <div id="create" className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:py-10">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-3"
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-neon-cyan/80">
          NORO Studio
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Create Anything with{" "}
          <span className="neon-text">AI</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          A premium creation surface for images, motion, voice, and brand systems —
          designed with Apple-level craft and studio-grade control.
        </p>
      </motion.section>

      <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
        >
          <PromptBox onGenerate={handleGenerate} isGenerating={isGenerating} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="min-h-full"
        >
          <LivePreview prompt={activePrompt} isGenerating={isGenerating} />
        </motion.div>
      </div>

      <AiTools />
    </div>
  );
}
