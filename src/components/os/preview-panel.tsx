"use client";

import { motion } from "framer-motion";
import { ImageIcon, Music2, Play, Video } from "lucide-react";

import { Creation } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type PreviewPanelProps = {
  prompt: string;
  media: "image" | "video" | "music" | "code";
  isGenerating: boolean;
  progress: number;
  history: Creation[];
  onSelect: (item: Creation) => void;
};

const MODES = [
  { id: "video", label: "Video", icon: Video },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "music", label: "Music", icon: Music2 },
] as const;

export function PreviewPanel({ prompt, media, isGenerating, progress, history, onSelect }: PreviewPanelProps) {
  return (
    <section className="os-panel rounded-[12px] p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-semibold text-white/88">Live Preview</h2>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-cyan-300">
          <span className={cn("size-1.5 rounded-full bg-cyan-400", isGenerating && "animate-pulse shadow-[0_0_8px_#22d3ee]")} />
          {isGenerating ? "Generating..." : "Ready"}
        </span>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-[9px] border border-white/8 bg-gradient-to-br from-[#100a25] via-[#1a1040] to-[#041827]">
        <div className="aspect-[16/9]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.16),transparent_27%),radial-gradient(circle_at_80%_24%,rgba(236,72,153,0.24),transparent_34%),linear-gradient(135deg,transparent_40%,rgba(168,85,247,0.25))]" />
          <div className="absolute inset-x-[15%] bottom-[15%] h-[35%] rounded-[50%] bg-black/55 blur-md" />
          <div className="absolute bottom-[18%] left-[34%] h-[19%] w-[34%] rounded-[2rem] bg-[linear-gradient(110deg,#021023,#2563eb,#a855f7,#020617)] shadow-[0_0_24px_rgba(236,72,153,0.45)]" />
          <div className="absolute bottom-[29%] left-[42%] h-[3px] w-[20%] rounded-full bg-[#f0abfc] shadow-[0_0_15px_#f0abfc]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          <motion.button whileHover={{ scale: 1.08 }} type="button" className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#594492]/65 text-white shadow-[0_0_35px_rgba(168,85,247,0.5)] backdrop-blur-md">
            <Play className="ml-0.5 size-4 fill-current" />
          </motion.button>

          {isGenerating && (
            <div className="absolute inset-x-4 bottom-3">
              <div className="mb-1 flex justify-between text-[9px] text-white/70"><span>Rendering</span><span>{Math.round(progress)}%</span></div>
              <div className="h-1 overflow-hidden rounded-full bg-white/15"><motion.div animate={{ width: `${Math.min(100, progress)}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-violet-400" /></div>
            </div>
          )}
          {prompt && !isGenerating && <p className="absolute inset-x-3 bottom-2 line-clamp-1 text-[9px] text-white/70">{prompt}</p>}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1 border-b border-white/[0.07] pb-2">
        {MODES.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={cn("inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-[10px] transition", media === id ? "bg-white/[0.08] text-white" : "text-white/42 hover:text-white")}>
            <Icon className="size-3" /> {label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[10px] font-semibold text-white/72">Recent Generations</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {history.slice(0, 4).map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item)} className={cn("relative aspect-[1.16] overflow-hidden rounded-[6px] border border-white/10 bg-gradient-to-br transition hover:scale-[1.04] hover:border-white/30", item.gradient)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_40%)]" />
            {item.duration && <span className="absolute bottom-1 right-1 rounded bg-black/65 px-1 py-0.5 text-[7px] text-white">{item.duration}</span>}
          </button>
        ))}
      </div>
    </section>
  );
}
