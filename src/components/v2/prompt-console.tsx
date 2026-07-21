"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus, SlidersHorizontal, Sparkles } from "lucide-react";

type PromptConsoleProps = {
  onGenerate: (prompt: string) => void;
  running: boolean;
};

export function PromptConsole({ onGenerate, running }: PromptConsoleProps) {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("Image");

  return (
    <div className="mt-5">
      <div className="rounded-[12px] bg-[linear-gradient(100deg,#c43df2,#5d68ff,#0bc7df)] p-px shadow-[0_0_32px_rgba(69,132,255,.3)]">
        <div className="rounded-[11px] bg-[#09101d]/95 p-3.5 backdrop-blur-xl">
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} placeholder="Describe the impossible..." className="min-h-[76px] w-full resize-none bg-transparent text-[13px] leading-6 text-white outline-none placeholder:text-white/35" />
          <div className="flex items-center justify-between border-t border-white/[.07] pt-3">
            <div className="flex items-center gap-2"><button className="grid size-7 place-items-center rounded-[6px] bg-white/[.055] text-white/68"><Plus className="size-4" /></button><ModeButton label={mode} onClick={() => setMode(mode === "Image" ? "Motion" : "Image")} /><ModeButton label="Style" /><button className="grid size-7 place-items-center rounded-[6px] bg-white/[.055] text-white/68"><SlidersHorizontal className="size-3.5" /></button></div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .98 }} onClick={() => prompt.trim() && onGenerate(prompt)} disabled={!prompt.trim() || running} className="rounded-[7px] bg-[linear-gradient(100deg,#a33bf3,#5969ff,#0ab7e9)] px-4 py-2 text-[10px] font-semibold shadow-[0_7px_22px_rgba(80,67,240,.4)] disabled:opacity-45"><Sparkles className="mr-1 inline size-3" />{running ? "Building..." : "Generate"}</motion.button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2"><span className="text-[10px] text-white/40">Try an idea</span>{["Bioluminescent reef","Monochrome campaign","Future mobility","Frozen observatory"].map((item) => <button key={item} onClick={() => setPrompt(item)} className="rounded-full border border-white/[.09] bg-white/[.025] px-2.5 py-1.5 text-[9px] text-white/55 hover:text-white">{item}</button>)}</div>
    </div>
  );
}

function ModeButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} className="flex h-7 items-center gap-1 rounded-[6px] bg-white/[.055] px-2 text-[10px] text-white/68">{label}<ChevronDown className="size-3 text-white/38" /></button>;
}
