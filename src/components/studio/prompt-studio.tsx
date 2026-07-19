"use client";

import { useEffect, useState, useTransition } from "react";

import { GenerateButton } from "@/components/studio/generate-button";
import { GenerationSettings } from "@/components/studio/generation-settings";
import { GlassPanel } from "@/components/studio/glass-panel";
import { ModelSelector } from "@/components/studio/model-selector";
import { PromptEditor } from "@/components/studio/prompt-editor";
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
        "space-y-7 p-5 transition-shadow duration-500 sm:p-6 lg:p-7",
        focused && "neon-ring"
      )}
    >
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

      <div className="mx-auto max-w-3xl text-center sm:text-left">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
          AI Prompt Studio
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Center stage for every idea
        </h2>
        <p className="mt-2 text-sm text-white/50 sm:text-base">
          A cinematic prompt workspace with model control, craft settings, and
          one-click generation.
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-7">
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

        <div className="border-t border-white/8 pt-6">
          <ModelSelector value={providerId} onChange={setProviderId} />
        </div>

        <div className="border-t border-white/8 pt-6">
          <GenerationSettings value={settings} onChange={setSettings} />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
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

          <GenerateButton
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </GlassPanel>
  );
}
