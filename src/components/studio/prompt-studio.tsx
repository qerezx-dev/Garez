"use client";

import { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

import { GenerationSettings } from "@/components/studio/generation-settings";
import { GlassPanel } from "@/components/studio/glass-panel";
import { ModelSelector } from "@/components/studio/model-selector";
import { PromptEditor } from "@/components/studio/prompt-editor";
import { Button } from "@/components/ui/button";
import type { GenerationPayload } from "@/lib/generation";
import {
  AI_PROVIDERS,
  ASPECT_RATIOS,
  QUALITIES,
  SEED_PROMPT_HISTORY,
} from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PromptStudioProps = {
  onGenerate: (payload: GenerationPayload) => void;
  isGenerating?: boolean;
  draftPrompt?: string;
};

export function PromptStudio({
  onGenerate,
  isGenerating = false,
  draftPrompt = "",
}: PromptStudioProps) {
  const [prompt, setPrompt] = useState(draftPrompt);
  const [referenceName, setReferenceName] = useState<string | null>(null);
  const [providerId, setProviderId] = useState(AI_PROVIDERS[0].id);
  const [focused, setFocused] = useState(false);
  const [promptHistory, setPromptHistory] = useState(SEED_PROMPT_HISTORY);
  const [settings, setSettings] = useState({
    aspect: ASPECT_RATIOS[2].value,
    quality: QUALITIES[1].value,
    creativity: 65,
    seed: "",
    outputCount: 1,
    negativePrompt: "",
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (draftPrompt) {
      setPrompt(draftPrompt);
    }
  }, [draftPrompt]);

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value || isGenerating) return;

    const provider =
      AI_PROVIDERS.find((item) => item.id === providerId) ?? AI_PROVIDERS[0];

    setPromptHistory((items) =>
      [value, ...items.filter((item) => item !== value)].slice(0, 8)
    );

    startTransition(() => {
      onGenerate({
        prompt: value,
        negativePrompt: settings.negativePrompt.trim(),
        providerId: provider.id,
        providerName: provider.name,
        aspect: settings.aspect,
        quality:
          QUALITIES.find((item) => item.value === settings.quality)?.label ??
          settings.quality,
        creativity: settings.creativity,
        seed: settings.seed || "random",
        outputCount: settings.outputCount,
        hasReference: Boolean(referenceName),
        mode: "image",
      });
    });
  };

  return (
    <GlassPanel
      id="prompt-studio"
      strong
      glow
      framed
      className={cn(
        "space-y-6 p-4 transition-shadow duration-500 sm:p-5",
        focused && "neon-ring"
      )}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            AI Prompt Studio
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
            Workspace
          </h2>
        </div>
        <p className="text-xs text-white/40">Frontend-only · APIs not connected</p>
      </div>

      <PromptEditor
        value={prompt}
        onChange={setPrompt}
        referenceName={referenceName}
        onReferenceChange={setReferenceName}
        promptHistory={promptHistory}
        onSelectHistoryPrompt={setPrompt}
        focused={focused}
        onFocusedChange={setFocused}
        onSubmit={handleGenerate}
      />

      <div className="border-t border-white/8 pt-5">
        <ModelSelector value={providerId} onChange={setProviderId} />
      </div>

      <div className="border-t border-white/8 pt-5">
        <GenerationSettings value={settings} onChange={setSettings} />
      </div>

      <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/35">
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
            ⌘
          </kbd>{" "}
          +{" "}
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
            Enter
          </kbd>{" "}
          to generate
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            size="lg"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="relative h-12 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-neon-blue via-[#7a6cff] to-neon-purple px-6 text-sm font-semibold text-white shadow-[0_16px_48px_oklch(0.55_0.18_275/0.5)] hover:opacity-95 disabled:opacity-45 sm:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,transparent,oklch(1_0_0/0.25),transparent)]" />
            <AnimatePresence mode="wait" initial={false}>
              {isGenerating ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="relative inline-flex items-center gap-2"
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
                  className="relative inline-flex items-center gap-2"
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
