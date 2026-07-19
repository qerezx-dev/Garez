"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MEDIA_TYPES, PROMPT_SUGGESTIONS, STYLES } from "@/lib/studio-data";

type PromptCenterProps = {
  onGenerate: (prompt: string, mediaType: "image" | "video" | "music" | "code") => void;
  isGenerating: boolean;
};

export function PromptCenter({ onGenerate, isGenerating }: PromptCenterProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const [media, setMedia] = useState<"image" | "video" | "music" | "code">("image");
  const [style, setStyle] = useState("cinematic");
  const [hasUpload, setHasUpload] = useState(false);
  const [open, setOpen] = useState<"media" | "style" | null>(null);

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) setHasUpload(true);
    event.target.value = "";
  };

  return (
    <div className="mt-5">
      <div className="os-command relative rounded-[12px] p-[1px]">
        <div className="rounded-[11px] bg-[#0a1020]/88 px-3.5 py-3.5 backdrop-blur-2xl">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && prompt.trim()) {
                event.preventDefault();
                onGenerate(prompt, media);
              }
            }}
            rows={3}
            placeholder="Describe your idea..."
            className="min-h-[72px] w-full resize-none bg-transparent px-0 py-0 text-[13px] leading-relaxed text-white outline-none placeholder:text-white/38"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={selectFile} />
              <Button variant="ghost" size="icon-sm" onClick={() => fileRef.current?.click()} className="size-7 rounded-[7px] bg-white/[0.045] text-white/65 hover:bg-white/[0.1]">
                <Plus className="size-4" />
              </Button>

              <Picker
                label={MEDIA_TYPES.find((item) => item.value === media)?.label ?? "Image"}
                open={open === "media"}
                onToggle={() => setOpen(open === "media" ? null : "media")}
              >
                {MEDIA_TYPES.map((item) => (
                  <button key={item.value} type="button" onClick={() => { setMedia(item.value as typeof media); setOpen(null); }} className="block w-full rounded-md px-2.5 py-1.5 text-left text-[11px] text-white/65 hover:bg-white/[0.08] hover:text-white">{item.label}</button>
                ))}
              </Picker>

              <Picker
                label={STYLES.find((item) => item.value === style)?.label ?? "Style"}
                open={open === "style"}
                onToggle={() => setOpen(open === "style" ? null : "style")}
              >
                {STYLES.map((item) => (
                  <button key={item.value} type="button" onClick={() => { setStyle(item.value); setOpen(null); }} className="block w-full rounded-md px-2.5 py-1.5 text-left text-[11px] text-white/65 hover:bg-white/[0.08] hover:text-white">{item.label}</button>
                ))}
              </Picker>
              {hasUpload && <span className="text-[10px] text-cyan-300">Reference added</span>}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => prompt.trim() && onGenerate(prompt, media)}
                disabled={!prompt.trim() || isGenerating}
                className="h-8 rounded-[7px] border-0 bg-[linear-gradient(100deg,#a855f7,#7c3aed,#06b6d4)] px-4 text-[11px] font-semibold text-white shadow-[0_6px_22px_rgba(79,70,229,0.42)] hover:brightness-110"
              >
                <Sparkles className="size-3.5" data-icon="inline-start" />
                {isGenerating ? "Generating…" : "Generate"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[11px] text-white/42">Try these</span>
        {PROMPT_SUGGESTIONS.map((item) => (
          <button key={item} type="button" onClick={() => setPrompt(item)} className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[10px] text-white/55 transition hover:border-cyan-400/30 hover:text-white">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Picker({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button type="button" onClick={onToggle} className="inline-flex h-7 items-center gap-1.5 rounded-[7px] bg-white/[0.045] px-2.5 text-[10px] font-medium text-white/72 hover:bg-white/[0.09]">
        {label}
        <ChevronDown className="size-3 opacity-55" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute left-0 top-9 z-30 min-w-[112px] rounded-[8px] border border-white/10 bg-[#0b1120]/95 p-1 shadow-2xl backdrop-blur-2xl">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
