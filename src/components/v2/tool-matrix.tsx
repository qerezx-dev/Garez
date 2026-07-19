"use client";

import { motion } from "framer-motion";
import { Bot, Code2, FileText, ImageIcon, Mic2, Music2, Palette, Video } from "lucide-react";

const modules = [
  ["Image", "High-fidelity visual worlds", ImageIcon, "#34b8ff"],
  ["Motion", "Frames with a pulse", Video, "#9b6cff"],
  ["Voice", "Natural voice direction", Mic2, "#4bd99d"],
  ["Music", "Scores with atmosphere", Music2, "#fc78a0"],
  ["Design", "Systems and campaigns", Palette, "#c279ff"],
  ["Documents", "Writing with taste", FileText, "#ffb25e"],
  ["Agent", "Autonomous creative flow", Bot, "#7ba8ff"],
  ["Code", "Working interfaces", Code2, "#2dd2cf"],
] as const;

export function ToolMatrix() {
  return (
    <section className="mt-8">
      <h2 className="text-[14px] font-semibold">Creative modules</h2>
      <p className="mt-1 text-[10px] text-white/42">Pick a surface. Make it yours.</p>
      <div className="mt-3 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {modules.map(([name, detail, Icon, color], index) => (
          <motion.button key={name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .035 }} whileHover={{ y: -4 }} className="relative min-h-[104px] overflow-hidden rounded-[10px] border border-white/[.1] bg-[linear-gradient(155deg,rgba(14,24,43,.82),rgba(6,11,22,.82))] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_10px_24px_rgba(0,0,0,.22)]">
            <i className="absolute -right-5 -top-5 size-20 rounded-full opacity-20 blur-2xl" style={{ background: color }} />
            <span className="relative grid size-8 place-items-center rounded-[7px]" style={{ background: `${color}22`, color }}><Icon className="size-4" /></span><p className="relative mt-3 text-[11px] font-semibold">{name}</p><p className="relative mt-1 text-[9px] text-white/43">{detail}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function PortalFooter() {
  return <footer className="mt-5 flex items-center justify-between rounded-[10px] border border-cyan-400/15 bg-[linear-gradient(100deg,rgba(6,41,63,.58),rgba(38,13,76,.58))] px-4 py-3"><div><b className="text-[11px]">One idea, every medium.</b><p className="mt-1 text-[9px] text-white/43">Combine modules into your next creative system.</p></div><button className="rounded-[6px] border border-white/[.12] bg-white/[.04] px-3 py-2 text-[10px]">Open automation</button></footer>;
}
