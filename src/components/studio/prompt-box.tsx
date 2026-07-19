"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ImagePlus,
  Loader2,
  Paperclip,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Button } from "@/components/ui/button";
import { PROMPT_SUGGESTIONS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PromptBoxProps = {
  onGenerate: (prompt: string) => void;
  isGenerating?: boolean;
};

export function PromptBox({ onGenerate, isGenerating = false }: PromptBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const [, startTransition] = useTransition();

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value || isGenerating) return;
    startTransition(() => {
      onGenerate(value);
    });
  };

  return (
    <GlassPanel
      strong
      className={cn(
        "relative overflow-hidden p-3 transition-shadow duration-500 sm:p-4",
        focused && "neon-ring"
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent" />

      <label htmlFor="noro-prompt" className="sr-only">
        Creation prompt
      </label>
      <textarea
        id="noro-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            handleGenerate();
          }
        }}
        rows={4}
        placeholder="Describe the world you want to create…"
        className="min-h-[120px] w-full resize-none bg-transparent px-2 py-2 text-base leading-relaxed text-white outline-none placeholder:text-white/35 sm:min-h-[140px] sm:text-[17px]"
      />

      <div className="mt-2 flex flex-wrap gap-2 px-1">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-left text-xs text-white/65 transition hover:border-neon-blue/35 hover:bg-white/8 hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:bg-white/8 hover:text-white"
          >
            <ImagePlus data-icon="inline-start" />
            Reference
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:bg-white/8 hover:text-white"
          >
            <Paperclip data-icon="inline-start" />
            Attach
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden text-white/70 hover:bg-white/8 hover:text-white sm:inline-flex"
          >
            <WandSparkles data-icon="inline-start" />
            Enhance
          </Button>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            size="lg"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-neon-blue via-[#6d7cff] to-neon-purple px-5 text-sm font-semibold text-white shadow-[0_12px_40px_oklch(0.55_0.18_275/0.45)] hover:opacity-95 disabled:opacity-50 sm:w-auto"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isGenerating ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-2"
                >
                  <Loader2 className="size-4 animate-spin" />
                  Generating…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-2"
                >
                  <Sparkles className="size-4" />
                  Generate
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </GlassPanel>
  );
}
