"use client";

import { Bell, Command, Menu, Plus, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function StudioTopbar() {
  return (
    <header className="relative z-20 flex h-[72px] items-center justify-between gap-5 px-4 lg:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu />
      </Button>
      <div className="os-topbar-search hidden h-10 w-[230px] items-center gap-2.5 rounded-[9px] px-3 lg:flex">
        <Search className="size-4 text-white/40" />
        <span className="flex-1 text-[11px] text-white/35">Search anything...</span>
        <span className="inline-flex items-center gap-0.5 rounded bg-white/[0.06] px-1.5 py-1 text-[9px] text-white/35">
          <Command className="size-2.5" /> K
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden h-9 items-center gap-1.5 rounded-[9px] border border-white/10 bg-white/[0.025] px-3 text-[11px] text-white/75 sm:flex">
          <span className="font-semibold tabular-nums">12,450 Credits</span>
          <span className="grid size-4 place-items-center rounded bg-white/[0.08] text-white/60"><Plus className="size-3" /></span>
        </div>
        <Button variant="ghost" size="icon" className="relative size-9 rounded-full text-white/70 hover:bg-white/[0.06]">
          <Bell className="size-4" />
          <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-[#1a9cff] text-[8px] font-semibold text-white">3</span>
        </Button>
        <Avatar size="default" className="size-8 ring-1 ring-white/20">
          <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-950 text-[10px] text-white">Q</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
