"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  History,
  LayoutTemplate,
  Loader2,
  Mic,
  Paperclip,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";

import { GlassPanel } from "@/components/studio/glass-panel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GenerationPayload } from "@/lib/generation";
import {
  AI_PROVIDERS,
  ASPECT_RATIOS,
  CREATION_MODES,
  PROMPT_TEMPLATES,
  QUALITIES,
  SEED_PROMPT_HISTORY,
} from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PromptCommandCenterProps = {
  onGenerate: (payload: GenerationPayload) => void;
  isGenerating?: boolean;
  draftPrompt?: string;
};

export function PromptCommandCenter({
  onGenerate,
  isGenerating = false,
  draftPrompt = "",
}: PromptCommandCenterProps) {
  const [prompt, setPrompt] = useState(draftPrompt);
  const [toolId, setToolId] = useState(CREATION_MODES[0].id);
  const [providerId, setProviderId] = useState(AI_PROVIDERS[0].id);
  const [aspect, setAspect] = useState(ASPECT_RATIOS[2].value);
  const [quality, setQuality] = useState(QUALITIES[1].value);
  const [creativity, setCreativity] = useState(65);
  const [referenceName, setReferenceName] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [focused, setFocused] = useState(false);
  const [promptHistory, setPromptHistory] = useState(SEED_PROMPT_HISTORY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (draftPrompt) setPrompt(draftPrompt);
  }, [draftPrompt]);

  const provider =
    AI_PROVIDERS.find((item) => item.id === providerId) ?? AI_PROVIDERS[0];
  const mode = CREATION_MODES.find((item) => item.id === toolId) ?? CREATION_MODES[0];

  const handleGenerate = () => {
    const value = prompt.trim();
    if (!value || isGenerating) return;

    setPromptHistory((items) =>
      [value, ...items.filter((item) => item !== value)].slice(0, 8)
    );

    startTransition(() => {
      onGenerate({
        prompt: value,
        negativePrompt: "",
        providerId: provider.id,
        providerName: provider.name,
        aspect,
        quality:
          QUALITIES.find((item) => item.value === quality)?.label ?? quality,
        creativity,
        seed: "random",
        outputCount: 1,
        hasReference: Boolean(referenceName),
        mode: toolId === "video" ? "video" : "image",
        toolId: mode.id,
        toolLabel: mode.label,
      });
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleGenerate();
    }
  };

  return (
    <GlassPanel
      id="create"
      strong
      glow
      framed
      className={cn(
        "space-y-5 p-5 transition-shadow duration-500 sm:p-6",
        focused && "neon-ring"
      )}
    >
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-neon-blue/40 to-neon-purple/35 text-white shadow-[0_0_24px_oklch(0.6_0.16_255/0.4)]">
            <Wand2 className="size-5" />
          </span>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
              Command Center
            </p>
            <h2 className="font-display text-xl font-semibold tracking-tight text-white">
              Compose a creation
            </h2>
          </div>
        </div>

        <ModelSelector
          providerId={providerId}
          onChange={setProviderId}
          providerName={provider.name}
          providerInitials={provider.initials}
        />
      </div>

      {/* Mode chips */}
      <div className="flex flex-wrap gap-2">
        {CREATION_MODES.map((item) => {
          const Icon = item.icon;
          const active = item.id === toolId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setToolId(item.id)}
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-300",
                active
                  ? "border-transparent text-white"
                  : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white"
              )}
            >
              {active && (
                <motion.span
                  layoutId="mode-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/30 via-neon-purple/25 to-neon-cyan/25 shadow-[inset_0_0_0_1px_oklch(0.7_0.16_255/0.35),0_0_24px_oklch(0.6_0.16_275/0.3)]"
                />
              )}
              <Icon className="relative size-4" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Prompt box */}
      <div
        className={cn(
          "relative rounded-2xl border bg-black/25 p-4 transition-all duration-300",
          focused
            ? "border-neon-blue/40 shadow-[0_0_0_1px_oklch(0.6_0.16_255/0.3),0_0_40px_-8px_oklch(0.55_0.18_275/0.5)]"
            : "border-white/8"
        )}
      >
        <Textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={`Describe the ${mode.label.toLowerCase()} you want to create…`}
          className="min-h-[128px] resize-none border-0 bg-transparent p-0 text-base leading-relaxed text-white shadow-none placeholder:text-white/30 focus-visible:ring-0"
        />

        <AnimatePresence>
          {referenceName && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-xs text-white/70"
            >
              <Paperclip className="size-3.5 text-neon-cyan" />
              {referenceName}
              <button
                type="button"
                onClick={() => setReferenceName(null)}
                className="text-white/40 hover:text-white"
                aria-label="Remove reference"
              >
                <X className="size-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/8 pt-3">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setReferenceName(file.name);
                event.target.value = "";
              }}
            />
            <ToolbarButton
              label={listening ? "Listening…" : "Voice"}
              active={listening}
              onClick={() => setListening((value) => !value)}
              icon={<Mic className="size-4" />}
            />
            <ToolbarButton
              label="Upload"
              onClick={() => fileInputRef.current?.click()}
              icon={<Paperclip className="size-4" />}
            />
            <PromptMenu
              label="Templates"
              icon={<LayoutTemplate className="size-4" />}
              heading="Prompt templates"
              items={PROMPT_TEMPLATES.map((template) => ({
                key: template.id,
                title: template.label,
                subtitle: template.prompt,
                value: template.prompt,
              }))}
              onSelect={setPrompt}
            />
            <PromptMenu
              label="History"
              icon={<History className="size-4" />}
              heading="Recent prompts"
              items={promptHistory.map((item, index) => ({
                key: `${index}-${item}`,
                title: item,
                value: item,
              }))}
              onSelect={setPrompt}
            />
          </div>

          <p className="hidden text-xs text-white/30 sm:block">
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
              ⌘
            </kbd>
            <span className="px-1">+</span>
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
              ↵
            </kbd>
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Aspect ratio
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ASPECT_RATIOS.map((item) => (
              <PillButton
                key={item.value}
                active={aspect === item.value}
                onClick={() => setAspect(item.value)}
              >
                {item.label}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Quality
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUALITIES.map((item) => (
              <PillButton
                key={item.value}
                active={quality === item.value}
                onClick={() => setQuality(item.value)}
              >
                {item.label}
              </PillButton>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          <span>Creativity</span>
          <span className="tabular-nums text-white/70">{creativity}</span>
        </div>
        <Slider
          value={creativity}
          min={0}
          max={100}
          onValueChange={(value) =>
            setCreativity(Array.isArray(value) ? value[0] : value)
          }
          className="[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-neon-blue [&_[data-slot=slider-range]]:to-neon-purple [&_[data-slot=slider-thumb]]:border-neon-blue [&_[data-slot=slider-track]]:bg-white/10"
        />
      </div>

      {/* Generate */}
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          type="button"
          size="lg"
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-neon-blue via-[#6d6bff] to-neon-purple text-base font-semibold text-white shadow-[0_20px_60px_-16px_oklch(0.55_0.2_275/0.8)] hover:opacity-95 disabled:opacity-40"
        >
          <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,transparent,oklch(1_0_0/0.28),transparent)]" />
          <AnimatePresence mode="wait" initial={false}>
            {isGenerating ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="relative inline-flex items-center gap-2"
              >
                <Loader2 className="size-5 animate-spin" />
                Generating {mode.label.toLowerCase()}…
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="relative inline-flex items-center gap-2"
              >
                <Sparkles className="size-5" />
                Generate {mode.label}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </GlassPanel>
  );
}

function ToolbarButton({
  label,
  icon,
  onClick,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={cn(
              "h-9 gap-1.5 rounded-xl px-2.5 text-xs font-medium text-white/60 hover:bg-white/8 hover:text-white",
              active &&
                "bg-neon-cyan/10 text-neon-cyan shadow-[inset_0_0_0_1px_oklch(0.82_0.13_220/0.3)]"
            )}
          />
        }
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PillButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-neon-blue/40 bg-neon-blue/15 text-white shadow-[0_0_16px_-4px_oklch(0.6_0.16_255/0.6)]"
          : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/15 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function ModelSelector({
  providerId,
  providerName,
  providerInitials,
  onChange,
}: {
  providerId: string;
  providerName: string;
  providerInitials: string;
  onChange: (id: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-11 gap-2.5 rounded-2xl border-white/12 bg-white/[0.04] px-3 text-white hover:bg-white/[0.08]"
          />
        }
      >
        <span className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-neon-blue/50 to-neon-purple/40 text-[10px] font-bold text-white">
          {providerInitials}
        </span>
        <span className="text-sm font-medium">{providerName}</span>
        <ChevronRight className="size-4 rotate-90 text-white/40" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Model provider</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {AI_PROVIDERS.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => onChange(item.id)}
              className="gap-2.5 py-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-neon-blue/40 to-neon-purple/35 text-[10px] font-bold text-white">
                {item.initials}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                  {item.name}
                  {providerId === item.id && (
                    <span className="size-1.5 rounded-full bg-neon-cyan" />
                  )}
                </span>
                <span className="truncate text-xs text-white/45">
                  {item.description}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PromptMenu({
  label,
  icon,
  heading,
  items,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  heading: string;
  items: { key: string; title: string; subtitle?: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 rounded-xl px-2.5 text-xs font-medium text-white/60 hover:bg-white/8 hover:text-white"
          />
        }
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{heading}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.length === 0 ? (
            <DropdownMenuItem disabled>Nothing yet</DropdownMenuItem>
          ) : (
            items.map((item) => (
              <DropdownMenuItem
                key={item.key}
                onClick={() => onSelect(item.value)}
                className="flex flex-col items-start gap-0.5 py-2"
              >
                <span className="text-sm font-medium text-white">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="line-clamp-2 text-xs text-white/45">
                    {item.subtitle}
                  </span>
                )}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
