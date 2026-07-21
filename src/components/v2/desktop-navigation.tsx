"use client";

import { Bell, Box, ChevronDown, CircleUserRound, CreditCard, FolderKanban, Grid2X2, Layers, Settings, Share2, Sparkles, Workflow } from "lucide-react";

const items = [
  ["Studio", Grid2X2],
  ["Projects", FolderKanban],
  ["Assets", Layers],
  ["Workflows", Workflow],
  ["Models", Box],
  ["Community", CircleUserRound],
  ["API", Share2],
  ["Settings", Settings],
] as const;

export function DesktopNavigation() {
  return (
    <aside className="hidden w-[248px] shrink-0 p-3 lg:block">
      <div className="flex h-[calc(100dvh-24px)] flex-col rounded-[18px] border border-white/[.1] bg-[linear-gradient(165deg,rgba(11,18,33,.86),rgba(5,8,16,.78))] p-3 shadow-[0_24px_64px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-[30px]">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#16c7e4,#526cff,#bb61ff)] text-sm font-black shadow-[0_0_24px_rgba(66,144,255,.36)]">N</span>
          <span><b className="font-[family-name:var(--font-display)] text-[14px] tracking-[.12em]">NORO</b><i className="mt-0.5 block text-[8px] not-italic tracking-[.24em] text-white/45">STUDIO</i></span>
        </div>
        <div className="mt-7 space-y-1">
          {items.map(([label, Icon], index) => (
            <button key={label} className={`flex h-10 w-full items-center gap-3 rounded-[9px] px-3 text-left text-[12px] transition ${index === 0 ? "bg-[linear-gradient(90deg,rgba(4,128,186,.72),rgba(12,112,185,.37))] text-white ring-1 ring-cyan-300/25" : "text-white/55 hover:bg-white/[.055] hover:text-white"}`}>
              <Icon className="size-[15px]" /> {label}
            </button>
          ))}
        </div>
        <div className="mt-auto space-y-3">
          <div className="overflow-hidden rounded-[10px] border border-fuchsia-400/25 bg-[linear-gradient(145deg,rgba(25,10,49,.86),rgba(7,13,28,.85))] p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80"><Sparkles className="size-3 text-fuchsia-300" /> NORO PRO</p>
            <p className="mt-2 text-[10px] leading-4 text-white/48">Infinite drafts<br />Priority compute<br />Signature models</p>
            <button className="mt-3 w-full rounded-[6px] bg-gradient-to-r from-fuchsia-600 to-blue-500 py-2 text-[10px] font-semibold">Unlock Pro</button>
          </div>
          <div className="rounded-[10px] border border-white/[.08] bg-white/[.025] p-3"><span className="text-[10px] text-white/45">Available credits</span><b className="mt-1 flex items-center gap-1.5 text-[13px]"><CreditCard className="size-3.5" /> 12,450</b><div className="mt-2 h-1 rounded-full bg-white/[.09]"><div className="h-full w-[71%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" /></div></div>
          <div className="flex items-center gap-2.5 rounded-[9px] px-2 py-1"><span className="grid size-7 place-items-center rounded-full bg-slate-700 text-[10px]">Q</span><span className="text-[10px] text-white/70">qaRez</span><ChevronDown className="ml-auto size-3 text-white/35" /></div>
        </div>
      </div>
    </aside>
  );
}

export function DesktopTopbar() {
  return (
    <header className="flex h-[72px] items-center px-5">
      <div className="flex h-10 w-[230px] items-center gap-2.5 rounded-[9px] border border-white/[.09] bg-[#080c17]/55 px-3 text-[11px] text-white/38"><span className="text-base">⌕</span><span>Search anything...</span><kbd className="ml-auto rounded bg-white/[.05] px-1.5 py-1 text-[9px]">⌘ K</kbd></div>
      <div className="ml-auto flex items-center gap-3"><div className="rounded-[9px] border border-white/[.09] bg-white/[.025] px-3 py-2 text-[10px] text-white/72">12,450 Credits <b className="ml-1 text-white/45">+</b></div><button className="relative grid size-9 place-items-center rounded-full text-white/65"><Bell className="size-4" /><i className="absolute right-0 top-0 grid size-3.5 place-items-center rounded-full bg-cyan-400 text-[8px] not-italic text-slate-950">3</i></button><span className="grid size-8 place-items-center rounded-full border border-white/15 bg-slate-800 text-[10px]">Q</span></div>
    </header>
  );
}
