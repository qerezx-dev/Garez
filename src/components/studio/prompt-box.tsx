"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ImagePlus,
  Loader2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import { ControlChip } from "@/components/studio/control-chip";
import { GlassPanel } from "@/components/studio/glass-panel";
import { Button } from "@/components/ui/button";
import type { GenerationPayload } from "@/lib/generation";
import {
  ASPECT_RATIOS,
  MODELS,
  PROMPT_SUGGESTIONS,
  QUALITIES,
  STYLES,
} from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PromptBoxProps = {
  onGenerate: (payload: GenerationPayload) => void;
  isGenerating?: boolean;
};

export function PromptBox({
  onGenerate,
  isGenerating = false,
}: PromptBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [showNegative, setShowNegative] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [referenceName, setReferenceName] = useState<string | null>(null);
  const [model, setModel] = useState(MODELS[0].value);
  const [style, setStyle] = useState(STYLES[0].value);
  const [aspect, setAspect] = useState(ASPECT_RATIOS[2].value);
  const [quality, setQuality] = useState(QUALITIES[1].value);
  const [mode, setMode] = useState<"image" | "video">("image");
  const [, startTransition] = useTransition();

  const attachFile = useCallback((file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setReferenceName(file.name);
  }, []);

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value || isGenerating) return;

    startTransition(() => {
      onGenerate({
        prompt: value,
        negativePrompt: negativePrompt.trim(),
        model: MODELS.find((item) => item.value === model)?.label ?? model,
        style: STYLES.find((item) => item.value === style)?.label ?? style,
        aspect,
        quality:
          QUALITIES.find((item) => item.value === quality)?.label ?? quality,
        mode,
        hasReference: Boolean(referenceName),
      });
    });
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    attachFile(event.dataTransfer.files?.[0]);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    attachFile(event.target.files?.[0]);
    event.target.value = "";
  };

  return (
    <GlassPanel
      strong
      glow
      framed
      className={cn(
        "p-4 transition-shadow duration-500 sm:p-5",
        focused && "neon-ring",
        dragging && "neon-ring"
      )}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Creation Console
          </p>
          <p className="mt-1 text-sm text-white/60">
            Compose with precision. Generate with presence.
          </p>
        </div>
        <div className="flex rounded-full bg-white/[0.03] p-1 shadow-[inset_0_0_0_1px_oklch(1_0_0/0.08)]">
          {(["image", "video"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all",
                mode === item
                  ? "bg-gradient-to-r from-neon-blue/80 to-neon-purple/80 text-white shadow-[0_0_24px_oklch(0.7_0.16_255/0.35)]"
                  : "text-white/50 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-3 transition-all duration-300",
          dragging && "border-neon-blue/50 bg-neon-blue/5"
        )}
      >
        <AnimatePresence>
          {dragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 grid place-items-center rounded-2xl bg-[#0a0d18]/80 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm text-white">
                <Upload className="size-4 text-neon-cyan" />
                Drop reference image
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          rows={5}
          placeholder="Describe the world you want to create…"
          className="min-h-[140px] w-full resize-none bg-transparent px-1 py-1 text-[15px] leading-relaxed text-white outline-none placeholder:text-white/35 sm:min-h-[150px] sm:text-base"
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl text-white/70 hover:bg-white/8 hover:text-white"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus data-icon="inline-start" />
            Upload image
          </Button>
          {referenceName ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-blue/25 bg-neon-blue/10 px-3 py-1 text-xs text-white/80">
              {referenceName}
              <button
                type="button"
                aria-label="Remove reference"
                onClick={() => setReferenceName(null)}
                className="rounded-full p-0.5 hover:bg-white/10"
              >
                <X className="size-3" />
              </button>
            </span>
          ) : (
            <span className="text-xs text-white/35">
              or drag & drop a reference
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-white/60 transition hover:border-neon-blue/30 hover:bg-white/[0.06] hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <ControlGroup label="Model">
          {MODELS.map((item) => (
            <ControlChip
              key={item.value}
              label={item.label}
              active={model === item.value}
              onClick={() => setModel(item.value)}
            />
          ))}
        </ControlGroup>

        <ControlGroup label="Style">
          {STYLES.map((item) => (
            <ControlChip
              key={item.value}
              label={item.label}
              active={style === item.value}
              onClick={() => setStyle(item.value)}
            />
          ))}
        </ControlGroup>

        <div className="grid gap-4 sm:grid-cols-2">
          <ControlGroup label="Aspect ratio">
            {ASPECT_RATIOS.map((item) => (
              <ControlChip
                key={item.value}
                label={item.label}
                active={aspect === item.value}
                onClick={() => setAspect(item.value)}
              />
            ))}
          </ControlGroup>
          <ControlGroup label="Quality">
            {QUALITIES.map((item) => (
              <ControlChip
                key={item.value}
                label={item.label}
                active={quality === item.value}
                onClick={() => setQuality(item.value)}
              />
            ))}
          </ControlGroup>
        </div>
      </div>

      <div className="mt-4 border-t border-white/8 pt-3">
        <button
          type="button"
          onClick={() => setShowNegative((value) => !value)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-white"
        >
          Negative prompt
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              showNegative && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {showNegative && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <textarea
                value={negativePrompt}
                onChange={(event) => setNegativePrompt(event.target.value)}
                rows={2}
                placeholder="Elements to avoid: blur, watermark, distorted hands…"
                className="mt-2 w-full resize-none rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-neon-purple/40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
