"use client";

import { Dices } from "lucide-react";

import { ControlChip } from "@/components/studio/control-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ASPECT_RATIOS,
  OUTPUT_COUNTS,
  QUALITIES,
} from "@/lib/studio-data";

export type GenerationSettingsValue = {
  aspect: string;
  quality: string;
  creativity: number;
  seed: string;
  outputCount: number;
  negativePrompt: string;
};

type GenerationSettingsProps = {
  value: GenerationSettingsValue;
  onChange: (value: GenerationSettingsValue) => void;
};

export function GenerationSettings({
  value,
  onChange,
}: GenerationSettingsProps) {
  const update = <K extends keyof GenerationSettingsValue>(
    key: K,
    next: GenerationSettingsValue[K]
  ) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Generation Settings
        </p>
        <p className="mt-1 text-sm text-white/55">
          Fine-tune output behavior before you generate.
        </p>
      </div>

      <SettingGroup label="Aspect ratio">
        {ASPECT_RATIOS.map((item) => (
          <ControlChip
            key={item.value}
            label={item.label}
            active={value.aspect === item.value}
            onClick={() => update("aspect", item.value)}
          />
        ))}
      </SettingGroup>

      <SettingGroup label="Quality">
        {QUALITIES.map((item) => (
          <ControlChip
            key={item.value}
            label={item.label}
            active={value.quality === item.value}
            onClick={() => update("quality", item.value)}
          />
        ))}
      </SettingGroup>

      <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <Label className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Creativity
          </Label>
          <span className="text-xs tabular-nums text-white/70">
            {value.creativity}
          </span>
        </div>
        <Slider
          value={[value.creativity]}
          min={0}
          max={100}
          step={1}
          onValueChange={(next) => {
            const amount = Array.isArray(next) ? Number(next[0]) : Number(next);
            if (Number.isFinite(amount)) {
              update("creativity", amount);
            }
          }}
          className="w-full"
        />
        <div className="flex justify-between text-[11px] text-white/35">
          <span>Precise</span>
          <span>Expressive</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="seed"
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
          >
            Seed
          </Label>
          <div className="flex gap-2">
            <Input
              id="seed"
              value={value.seed}
              onChange={(event) => update("seed", event.target.value)}
              placeholder="Random"
              className="h-10 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/35"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 shrink-0 rounded-xl border-white/12 bg-white/[0.03] text-white hover:bg-white/[0.08]"
              aria-label="Randomize seed"
              onClick={() =>
                update("seed", String(Math.floor(Math.random() * 90000) + 10000))
              }
            >
              <Dices />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Output count
          </p>
          <div className="flex flex-wrap gap-1.5">
            {OUTPUT_COUNTS.map((item) => (
              <ControlChip
                key={item.value}
                label={item.label}
                active={String(value.outputCount) === item.value}
                onClick={() => update("outputCount", Number(item.value))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="negative-prompt"
          className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
        >
          Negative prompt
        </Label>
        <textarea
          id="negative-prompt"
          value={value.negativePrompt}
          onChange={(event) => update("negativePrompt", event.target.value)}
          rows={3}
          placeholder="Elements to avoid: blur, watermark, distorted hands…"
          className="w-full resize-none rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-neon-purple/40"
        />
      </div>
    </div>
  );
}

function SettingGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
