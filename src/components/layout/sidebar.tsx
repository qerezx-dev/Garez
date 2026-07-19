"use client";

import { motion } from "framer-motion";
import { ChevronUp, X, Zap } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NAV_ITEMS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-3 left-3 z-50 flex w-[270px] flex-col rounded-[28px] glass-float p-4 transition-transform duration-300 lg:static lg:my-3 lg:ml-3 lg:h-[calc(100dvh-1.5rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-[120%]"
        )}
      >
        <div className="mb-7 flex items-center justify-between px-1">
          <Logo />
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white/70 hover:bg-white/8 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                    item.active
                      ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_oklch(0.8_0.1_255/0.2)]"
                      : "text-white/55 hover:bg-white/[0.045] hover:text-white"
                  )}
                >
                  {item.active && (
                    <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#60a5fa] to-[#c084fc] shadow-[0_0_12px_oklch(0.7_0.16_280)]" />
                  )}
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl transition-all duration-300",
                      item.active
                        ? "bg-gradient-to-br from-blue-500/35 to-violet-500/35 text-white"
                        : "bg-white/[0.04] text-white/65 group-hover:scale-105 group-hover:bg-white/[0.08]"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-3.5">
            <div className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-violet-500/30 blur-2xl" />
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
              NORO Pro
            </p>
            <p className="mt-1.5 text-sm font-medium text-white">
              Unlimited generations
            </p>
            <p className="mt-1 text-xs text-white/50">
              Priority queue and private models.
            </p>
            <Button
              size="sm"
              className="mt-3 w-full rounded-xl border-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:opacity-95"
            >
              <Zap data-icon="inline-start" className="size-3.5" />
              Upgrade Now
            </Button>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/45">Credits</span>
              <span className="font-medium tabular-nums text-white">12,450</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]" />
            </div>
          </div>

          <Separator className="bg-white/8" />

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl px-1.5 py-1.5 text-left transition hover:bg-white/[0.04]"
          >
            <Avatar size="default" className="ring-1 ring-white/15">
              <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#a855f7] text-[11px] font-semibold text-white">
                Q
              </AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">
                qaRez
              </span>
              <span className="block text-[11px] text-white/40">Pro Plan</span>
            </span>
            <ChevronUp className="size-4 text-white/35" />
          </button>
        </div>
      </aside>
    </>
  );
}
