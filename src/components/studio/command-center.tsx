"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus, SlidersHorizontal, Sparkles } from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Button } from "@/components/ui/button";
import type { GenerationPayload } from "@/lib/generation";
import {
  MEDIA_TYPES,
  PROMPT_SUGGESTIONS,
  STYLES,
} from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type CommandCenterProps = {
  onGenerate: (payload: GenerationPayload) => void;
  isGenerating?: boolean;
};

export function CommandCenter({
  onGenerate,
  isGenerating = false,
}: CommandCenterProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video" | "music" | "code">("image");
  const [style, setStyle] = useState(STYLES[0].value);
  const [hasReference, setHasReference] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const [, startTransition] = useTransition();

  const handleGenerate = useCallback(() => {
    const value = prompt.trim();
    if (!value || isGenerating) return;
    startTransition(() => {
      onGenerate({
        prompt: value,
        mediaType,
        style: STYLES.find((item) => item.value === style)?.label ?? style,
        hasReference,
      });
    });
  }, [prompt, isGenerating, onGenerate, mediaType, style, hasReference]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setHasReference(true);
    event.target.value = "";
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <GlassPanel
        strong
        glow
        framed
        className="overflow-visible rounded-[28px] p-4 sm:p-5"
      >
        <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />

        <label htmlFor="noro-command" className="sr-only">
          Describe your idea
        </label>
        <textarea
          id="noro-command"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              handleGenerate();
            }
          }}
          rows={4}
          placeholder="Describe your idea..."
          className="min-h-[128px] w-full resize-none bg-transparent px-2 py-2 text-base leading-relaxed text-white outline-none placeholder:text-white/35 sm:text-[17px]"
        />

        <div className="mt-3 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowMedia((open) => !open);
                  setShowStyle(false);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              >
                {MEDIA_TYPES.find((item) => item.value === mediaType)?.label}
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
              {showMedia && (
                <div className="absolute top-11 left-0 z-20 min-w-[132px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e18]/95 p-1 shadow-2xl backdrop-blur-xl">
                  {MEDIA_TYPES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setMediaType(item.value as typeof mediaType);
                        setShowMedia(false);
                      }}
                      className={cn(
                        "block w-full rounded-xl px-3 py-2 text-left text-xs transition",
                        mediaType === item.value
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowStyle((open) => !open);
                  setShowMedia(false);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              >
                {STYLES.find((item) => item.value === style)?.label ?? "Style"}
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
              {showStyle && (
                <div className="absolute top-11 left-0 z-20 min-w-[132px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e18]/95 p-1 shadow-2xl backdrop-blur-xl">
                  {STYLES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setStyle(item.value);
                        setShowStyle(false);
                      }}
                      className={cn(
                        "block w-full rounded-xl px-3 py-2 text-left text-xs transition",
                        style === item.value
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-white/65 hover:bg-white/8 hover:text-white"
              onClick={() => fileRef.current?.click()}
              aria-label="Upload reference"
            >
              <Plus />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-white/65 hover:bg-white/8 hover:text-white"
              aria-label="Generation settings"
            >
              <SlidersHorizontal />
            </Button>
            {hasReference && (
              <span className="text-[11px] text-neon-cyan">Reference added</span>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full sm:w-auto"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6] opacity-70 blur-md" />
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="relative h-12 w-full overflow-hidden rounded-2xl border-0 bg-transparent px-7 text-sm font-semibold text-white sm:w-auto"
            >
              <span className="absolute inset-0 animate-gradient-flow bg-[linear-gradient(120deg,#8b5cf6,#6366f1,#3b82f6,#8b5cf6)]" />
              <span className="relative inline-flex items-center gap-2">
                <Sparkles className="size-4" />
                {isGenerating ? "Generating…" : "Generate"}
              </span>
            </Button>
          </motion.div>
        </div>
      </GlassPanel>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        <span className="text-xs text-white/35">Try these</span>
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65 transition hover:border-violet-400/35 hover:bg-white/[0.07] hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
