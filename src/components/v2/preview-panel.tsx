"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

type PreviewPanelProps = { prompt: string; running: boolean; progress: number };

export function PreviewPanel({ prompt, running, progress }: PreviewPanelProps) {
  return (
    <aside className="rounded-[12px] border border-white/[.1] bg-[linear-gradient(155deg,rgba(10,18,35,.85),rgba(5,8,15,.88))] p-3 shadow-[0_20px_60px_rgba(0,0,0,.36)] backdrop-blur-2xl">
      <div className="flex items-center justify-between"><b className="text-[12px]">Live Preview</b><span className="flex items-center gap-1.5 text-[9px] text-cyan-300"><i className="size-1.5 rounded-full bg-cyan-300" />{running ? "CREATING" : "READY"}</span></div>
      <div className="relative mt-3 aspect-video overflow-hidden rounded-[9px] bg-[linear-gradient(135deg,#070a17,#112f59_46%,#70156f)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(247,58,177,.38),transparent_26%),radial-gradient(circle_at_20%_30%,rgba(22,202,255,.19),transparent_30%)]" /><div className="absolute inset-x-[16%] bottom-[13%] h-[31%] rounded-[50%] bg-black/48 blur-md" /><div className="absolute bottom-[21%] left-[35%] h-[20%] w-[38%] rounded-[2rem] bg-gradient-to-r from-[#0a1a31] via-[#1461c9] to-[#be49e7] shadow-[0_0_30px_rgba(217,70,239,.5)]" /><motion.div whileHover={{ scale: 1.08 }} className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-violet-950/55"><Play className="ml-0.5 size-4 fill-current" /></motion.div>
        {running && <div className="absolute inset-x-4 bottom-3"><div className="mb-1 flex justify-between text-[9px] text-white/70"><span>Resolving composition</span><span>{progress}%</span></div><div className="h-1 overflow-hidden rounded bg-white/15"><motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-violet-400" /></div></div>}
      </div>
      <div className="mt-2 flex gap-1 border-b border-white/[.07] pb-2">{["Video","Image","Music","Code"].map((item, index) => <button key={item} className={`rounded-[5px] px-2 py-1 text-[9px] ${index === 0 ? "bg-white/[.08] text-white" : "text-white/42"}`}>{item}</button>)}</div>
      <p className="mt-3 line-clamp-2 text-[10px] leading-4 text-white/62">{prompt || "A new scene will appear here when you materialize an idea."}</p>
      <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.18em] text-white/42">Recent fields</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">{["from-sky-500 to-blue-950","from-violet-500 to-slate-950","from-fuchsia-500 to-indigo-950","from-cyan-400 to-slate-950"].map((gradient, index) => <button key={gradient} className={`relative aspect-[1.18] overflow-hidden rounded-[6px] bg-gradient-to-br ${gradient} ${index === 0 ? "ring-1 ring-cyan-300/60" : ""}`}><i className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.32),transparent_42%)]" /></button>)}</div>
    </aside>
  );
}
