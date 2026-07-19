"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  Box,
  Code2,
  Compass,
  FileText,
  Folder,
  ImageIcon,
  Layers3,
  Mic2,
  Music2,
  Search,
  Settings,
  Sparkles,
  Upload,
  Video,
  WandSparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

type MediaKind = "Image" | "Motion" | "Audio" | "Code" | "Agent";

type Tool = {
  name: string;
  detail: string;
  icon: LucideIcon;
  hue: string;
  tint: string;
};

const nav = [
  ["Workspace", Layers3],
  ["Library", Folder],
  ["Discover", Compass],
  ["Flows", Workflow],
  ["Models", Box],
  ["Settings", Settings],
] as const;

const tools: Tool[] = [
  { name: "Image Lab", detail: "Generate editorial imagery", icon: ImageIcon, hue: "#21b7ff", tint: "rgba(33,183,255,.18)" },
  { name: "Motion Forge", detail: "Turn ideas into motion", icon: Video, hue: "#9a69ff", tint: "rgba(154,105,255,.18)" },
  { name: "Voice Suite", detail: "Narration with character", icon: Mic2, hue: "#41d69a", tint: "rgba(65,214,154,.18)" },
  { name: "Sound Room", detail: "Music for every scene", icon: Music2, hue: "#fa719d", tint: "rgba(250,113,157,.18)" },
  { name: "Design Kit", detail: "Systems that ship", icon: WandSparkles, hue: "#b16cff", tint: "rgba(177,108,255,.18)" },
  { name: "Document AI", detail: "Write with context", icon: FileText, hue: "#ffad58", tint: "rgba(255,173,88,.18)" },
  { name: "Code Canvas", detail: "Build real interfaces", icon: Code2, hue: "#2ed3cc", tint: "rgba(46,211,204,.18)" },
  { name: "Autonomous", detail: "Hand work to an agent", icon: Bot, hue: "#89a7ff", tint: "rgba(137,167,255,.18)" },
];

const samples = [
  "A quiet future city after rain",
  "Editorial glass perfume campaign",
  "Floating observatory over the arctic",
  "Electric blue concept vehicle",
];

export function PrismDesktop() {
  const [prompt, setPrompt] = useState("");
  const [kind, setKind] = useState<MediaKind>("Image");
  const [isMaking, setIsMaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSample, setActiveSample] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const generate = () => {
    if (!prompt.trim() || isMaking) return;
    setIsMaking(true);
    setProgress(7);
    timer.current = window.setInterval(() => {
      setProgress((value) => {
        const next = value > 91 ? value : value + 5 + Math.round(Math.random() * 8);
        if (next >= 100 && timer.current) {
          window.clearInterval(timer.current);
          setTimeout(() => {
            setIsMaking(false);
            setProgress(0);
          }, 500);
        }
        return next;
      });
    }, 150);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#05070b]">
      <Atmosphere />
      <div className="relative z-10 mx-auto grid min-h-dvh max-w-[1680px] grid-cols-1 p-3 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-3">
        <CommandRail />
        <div className="min-w-0">
          <ControlDeck />
          <main className="grid grid-cols-1 gap-5 px-3 pb-6 pt-5 xl:grid-cols-12 xl:gap-6 xl:px-5">
            <section className="xl:col-span-7 2xl:col-span-8">
              <HeroCanvas />
              <CreationInput
                prompt={prompt}
                setPrompt={setPrompt}
                kind={kind}
                setKind={setKind}
                onGenerate={generate}
                isMaking={isMaking}
              />
              <ToolShelf />
              <LaunchStrip />
            </section>
            <aside className="xl:col-span-5 2xl:col-span-4">
              <RenderMonitor
                kind={kind}
                prompt={prompt || samples[activeSample]}
                isMaking={isMaking}
                progress={progress}
                activeSample={activeSample}
                setActiveSample={setActiveSample}
              />
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}

function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_20%,rgba(25,100,190,.18),transparent_30%),radial-gradient(ellipse_at_72%_55%,rgba(135,67,202,.15),transparent_30%)]" />
      <motion.div className="absolute left-[30%] top-[-15%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(18,181,219,.14),rgba(91,61,213,.1)_40%,transparent_65%)] blur-3xl" animate={{ x: [0, 40, 0], y: [0, 25, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[-12%] top-[10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(162,86,255,.16),transparent_64%)] blur-3xl" animate={{ x: [0, -32, 0], y: [0, 30, 0] }} transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute left-[43%] top-[14%] size-[260px] rounded-full border border-cyan-200/45 shadow-[0_0_26px_rgba(30,200,255,.55),0_0_80px_rgba(133,84,255,.3),inset_0_0_50px_rgba(123,71,227,.18)]" />
      <div className="absolute left-[43.2%] top-[14.2%] size-[258px] rounded-full bg-[radial-gradient(circle_at_37%_32%,rgba(145,191,255,.25),transparent_20%),radial-gradient(circle,#111427_47%,#070914_65%,transparent_68%)]" />
      {Array.from({ length: 45 }, (_, index) => (
        <motion.i key={index} className="absolute block size-px rounded-full bg-white" style={{ left: `${(index * 31) % 100}%`, top: `${(index * 47) % 90}%` }} animate={{ opacity: [.1, .8, .12], scale: [.7, 1.5, .7] }} transition={{ duration: 2.5 + index % 5, delay: index * .08, repeat: Infinity }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,3,7,.87)_100%)]" />
    </div>
  );
}

function CommandRail() {
  return (
    <aside className="hidden min-h-0 lg:block">
      <div className="h-[calc(100dvh-24px)] rounded-[22px] border border-white/[.1] bg-[linear-gradient(160deg,rgba(12,19,34,.82),rgba(6,9,17,.76))] p-3 shadow-[0_24px_70px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-[32px]">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="grid size-9 place-items-center rounded-xl bg-[conic-gradient(from_210deg,#22c7ee,#546dff,#bd63ff,#22c7ee)] shadow-[0_0_22px_rgba(73,161,255,.34)]"><span className="text-sm font-black">N</span></div>
          <div><p className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-[.12em]">NORO</p><p className="mt-0.5 text-[8px] tracking-[.26em] text-white/45">STUDIO</p></div>
        </div>
        <div className="mt-8 space-y-1">
          {nav.map(([name, Icon], index) => (
            <motion.button key={name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .04 }} className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-[12px] ${index === 0 ? "bg-gradient-to-r from-cyan-500/25 to-blue-500/20 text-white ring-1 ring-cyan-300/20" : "text-white/53 hover:bg-white/[.05] hover:text-white"}`}>
              <Icon className="size-[15px]" />{name}
            </motion.button>
          ))}
        </div>
        <div className="mt-auto space-y-3 pt-[390px]">
          <div className="rounded-xl border border-violet-400/25 bg-violet-950/20 p-3"><p className="text-[10px] font-semibold text-violet-200">NORO BLACK</p><p className="mt-2 text-[10px] leading-4 text-white/48">Private models, priority compute, and unlimited canvases.</p><button className="mt-3 w-full rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 py-2 text-[10px] font-semibold">Enter Black</button></div>
          <div className="flex items-center gap-2 rounded-xl bg-white/[.035] p-2"><div className="grid size-7 place-items-center rounded-full bg-slate-700 text-[10px]">Q</div><span className="text-[10px] text-white/72">qaRez</span><span className="ml-auto text-[9px] text-white/35">⌘</span></div>
        </div>
      </div>
    </aside>
  );
}

function ControlDeck() {
  return (
    <header className="flex h-[72px] items-center justify-between px-3 lg:px-5">
      <div className="flex h-10 w-[250px] items-center gap-2.5 rounded-xl border border-white/[.09] bg-[#070b15]/55 px-3 text-[11px] text-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,.03)]"><Search className="size-4" /> Search workspace <span className="ml-auto rounded bg-white/[.05] px-1.5 py-1 text-[9px]">⌘ K</span></div>
      <div className="ml-auto flex items-center gap-3"><div className="rounded-xl border border-white/[.09] bg-white/[.025] px-3 py-2 text-[10px] text-white/70">8,940 <span className="text-white/38">units</span></div><button className="relative grid size-9 place-items-center rounded-full text-white/65 hover:bg-white/[.06]"><Bell className="size-4" /><i className="absolute right-0 top-0 grid size-3.5 place-items-center rounded-full bg-cyan-400 text-[8px] text-slate-950">2</i></button><div className="grid size-8 place-items-center rounded-full border border-white/15 bg-slate-800 text-[10px]">Q</div></div>
    </header>
  );
}

function HeroCanvas() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-[600px] pt-9">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.25em] text-cyan-200/70">NORO / WORKSPACE 01</p>
      <h1 className="font-[family-name:var(--font-display)] text-[48px] font-semibold leading-[.98] tracking-[-.06em] sm:text-[60px]">Make a world<br />from a thought<span className="text-cyan-300">.</span></h1>
      <p className="mt-5 max-w-[440px] text-[14px] leading-6 text-white/56">NORO is a creative environment for seeing, shaping, and launching ideas at the speed of imagination.</p>
    </motion.div>
  );
}

function CreationInput({ prompt, setPrompt, kind, setKind, onGenerate, isMaking }: { prompt: string; setPrompt: (value: string) => void; kind: MediaKind; setKind: (value: MediaKind) => void; onGenerate: () => void; isMaking: boolean; }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="mt-8 rounded-2xl bg-[linear-gradient(110deg,#20bed8,#7564ff,#b44cf0)] p-px shadow-[0_0_36px_rgba(72,135,255,.25)]">
      <div className="rounded-[15px] bg-[#09111f]/92 p-4 backdrop-blur-xl">
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} placeholder="Compose a scene, an image, a sound, or an experience..." className="min-h-[76px] w-full resize-none bg-transparent text-[13px] leading-6 text-white outline-none placeholder:text-white/36" />
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/[.07] pt-3">
          <div className="flex items-center gap-2"><button className="grid size-8 place-items-center rounded-lg bg-white/[.055] text-white/65 hover:bg-white/[.1]"><Upload className="size-3.5" /></button><button className="grid size-8 place-items-center rounded-lg bg-white/[.055] text-white/65 hover:bg-white/[.1]"><Mic2 className="size-3.5" /></button><div className="flex rounded-lg bg-white/[.04] p-0.5">{(["Image","Motion","Audio","Code","Agent"] as MediaKind[]).map((item) => <button key={item} onClick={() => setKind(item)} className={`rounded-md px-2 py-1 text-[9px] ${kind === item ? "bg-white/[.12] text-white" : "text-white/42 hover:text-white"}`}>{item}</button>)}</div></div>
          <button onClick={onGenerate} disabled={!prompt.trim() || isMaking} className="relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-[11px] font-semibold text-white shadow-[0_7px_22px_rgba(34,211,238,.24)] disabled:opacity-45"><span className="relative inline-flex items-center gap-1.5"><Sparkles className="size-3.5" />{isMaking ? "Synthesizing" : "Materialize"}</span></button>
        </div>
      </div>
    </motion.section>
  );
}

function RenderMonitor({ kind, prompt, isMaking, progress, activeSample, setActiveSample }: { kind: MediaKind; prompt: string; isMaking: boolean; progress: number; activeSample: number; setActiveSample: (index: number) => void; }) {
  return (
    <div className="sticky top-5 rounded-2xl border border-white/[.1] bg-[linear-gradient(155deg,rgba(11,20,36,.82),rgba(5,8,15,.85))] p-3 shadow-[0_22px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="flex items-center justify-between"><span className="text-[11px] font-semibold">{kind} render</span><span className="flex items-center gap-1.5 text-[9px] text-cyan-300"><i className="size-1.5 rounded-full bg-cyan-300" /> {isMaking ? "LIVE COMPUTE" : "STANDING BY"}</span></div>
      <div className="relative mt-3 aspect-video overflow-hidden rounded-xl bg-[linear-gradient(135deg,#070a18,#10244b_48%,#4b1879)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(236,72,153,.38),transparent_25%),radial-gradient(circle_at_20%_25%,rgba(34,211,238,.2),transparent_30%)]" />
        <div className="absolute inset-x-[15%] bottom-[15%] h-[25%] rounded-[50%] bg-black/45 blur-md" /><div className="absolute bottom-[22%] left-[35%] h-[20%] w-[38%] rounded-[2rem] bg-gradient-to-r from-[#04233c] via-[#1355bc] to-[#c14ee5] shadow-[0_0_28px_rgba(217,70,239,.48)]" />
        <div className="absolute inset-0 grid place-items-center"><div className="grid size-12 place-items-center rounded-full border border-white/25 bg-slate-950/40 backdrop-blur"><Zap className="size-4 text-white" /></div></div>
        {isMaking && <div className="absolute inset-x-4 bottom-3"><div className="mb-1 flex justify-between text-[9px] text-white/75"><span>Weaving output</span><span>{progress}%</span></div><div className="h-1 overflow-hidden rounded-full bg-white/15"><motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-violet-400" /></div></div>}
      </div>
      <p className="mt-3 line-clamp-2 text-[11px] leading-5 text-white/62">{prompt}</p>
      <div className="mt-4 border-t border-white/[.07] pt-3"><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">Memory ribbon</p><div className="mt-2 grid grid-cols-4 gap-1.5">{samples.map((sample, index) => <button key={sample} onClick={() => setActiveSample(index)} className={`relative aspect-square overflow-hidden rounded-lg border ${index === activeSample ? "border-cyan-300/60" : "border-white/[.1]"} ${["bg-gradient-to-br from-sky-500 to-blue-950","bg-gradient-to-br from-violet-500 to-slate-950","bg-gradient-to-br from-pink-500 to-indigo-950","bg-gradient-to-br from-teal-400 to-slate-950"][index]}`}><span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.3),transparent_38%)]" /></button>)}</div></div>
    </div>
  );
}

function ToolShelf() {
  return (
    <section className="mt-8"><div className="flex items-end justify-between"><div><h2 className="text-[14px] font-semibold">Start with a module</h2><p className="mt-1 text-[11px] text-white/43">Purpose-built creative environments.</p></div><button className="text-[10px] text-cyan-300/80">All modules →</button></div><div className="mt-3 grid grid-cols-2 gap-2.5 xl:grid-cols-4">{tools.map((tool, index) => { const Icon = tool.icon; return <motion.button key={tool.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .035 }} whileHover={{ y: -4 }} className="relative min-h-[110px] overflow-hidden rounded-xl border border-white/[.1] bg-white/[.035] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_10px_24px_rgba(0,0,0,.2)]"><i className="absolute -right-5 -top-5 size-20 rounded-full blur-2xl" style={{ background: tool.tint }} /><span className="relative grid size-8 place-items-center rounded-lg" style={{ background: tool.tint, color: tool.hue }}><Icon className="size-4" /></span><p className="relative mt-3 text-[11px] font-semibold">{tool.name}</p><p className="relative mt-1 text-[9px] leading-4 text-white/44">{tool.detail}</p></motion.button>; })}</div></section>
  );
}

function LaunchStrip() {
  return <footer className="mt-5 flex items-center justify-between rounded-xl border border-cyan-400/15 bg-[linear-gradient(100deg,rgba(8,35,57,.55),rgba(31,14,67,.55))] px-4 py-3"><div><p className="text-[11px] font-semibold">Connect your imagination</p><p className="mt-1 text-[9px] text-white/44">Build chains of tools that run while you think.</p></div><button className="rounded-lg border border-white/[.12] bg-white/[.04] px-3 py-2 text-[10px] text-white/75">Open flows</button></footer>;
}
