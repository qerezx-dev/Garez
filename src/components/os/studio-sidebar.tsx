"use client";

import { motion } from "framer-motion";
import { Crown, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

export function StudioSidebar() {
  return (
    <aside className="hidden w-[290px] shrink-0 p-3 lg:block">
      <div className="os-glass flex h-[calc(100dvh-24px)] flex-col rounded-[18px] p-3">
        <div className="px-2 pt-1">
          <Logo />
        </div>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.035, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-10 items-center gap-3 rounded-[10px] px-3 text-[13px] font-medium transition-all",
                    item.active
                      ? "bg-gradient-to-r from-[#075d91]/85 to-[#0875b3]/60 text-white shadow-[inset_0_0_0_1px_rgba(56,189,248,0.35),0_8px_28px_rgba(14,165,233,0.14)]"
                      : "text-white/56 hover:bg-white/[0.055] hover:text-white"
                  )}
                >
                  <Icon className={cn("size-[15px]", item.active ? "text-cyan-200" : "text-white/55 group-hover:text-white")} />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 px-1">
          <div className="relative overflow-hidden rounded-[10px] border border-violet-400/35 bg-[linear-gradient(145deg,rgba(18,10,38,0.9),rgba(6,13,29,0.88))] p-3.5">
            <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-violet-500/25 blur-2xl" />
            <p className="relative flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/75">
              <Crown className="size-3 text-amber-300" />
              NORO Pro
            </p>
            <p className="relative mt-2 text-[11px] leading-5 text-white/48">
              Unlimited generations<br />Priority access<br />Premium models
            </p>
            <Button className="relative mt-3 h-8 w-full rounded-[7px] border-0 bg-gradient-to-r from-[#8b3ff4] to-[#1a9cff] text-xs text-white hover:opacity-95">
              Upgrade Now
            </Button>
          </div>

          <div className="rounded-[10px] border border-white/8 bg-white/[0.025] p-3">
            <p className="text-[11px] text-white/42">Credits</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white">
              <CreditCard className="size-3.5 text-white/55" />
              12,450
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-white/8">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#4d8dff] to-[#08b3eb]" />
            </div>
            <p className="mt-2 text-[9px] text-white/32">Resets on 1 June 2026</p>
          </div>

          <button type="button" className="flex w-full items-center gap-2.5 rounded-[10px] p-2 text-left transition hover:bg-white/[0.05]">
            <Avatar size="default" className="size-8 ring-1 ring-white/15">
              <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-950 text-[11px] text-white">Q</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-medium text-white">qaRez</span>
              <span className="block text-[10px] text-white/38">Pro Plan</span>
            </span>
            <ChevronRight className="size-3.5 text-white/35" />
          </button>
        </div>
      </div>
    </aside>
  );
}
