"use client";

import { motion } from "framer-motion";
import { ChevronRight, Crown, Sparkles, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type FloatingSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function FloatingSidebar({ open, onClose }: FloatingSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <motion.aside
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[290px] p-4 transition-transform duration-300 lg:inset-y-6 lg:left-6 lg:h-[calc(100dvh-3rem)] lg:p-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="glass-strong relative flex h-full flex-col overflow-hidden rounded-[28px] p-5 shadow-[0_40px_120px_-30px_oklch(0.5_0.2_265/0.7),0_0_0_1px_oklch(0.7_0.16_255/0.08)]">
          {/* Blue glow */}
          <div className="pointer-events-none absolute -left-16 top-10 size-56 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_262/0.35),transparent_70%)] blur-2xl" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent" />

          <div className="relative mb-8 flex items-center justify-between">
            <Logo />
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-white/70 hover:bg-white/8 hover:text-white lg:hidden"
              onClick={onClose}
              aria-label="Close navigation"
            >
              <X />
            </Button>
          </div>

          <nav className="relative flex flex-1 flex-col gap-1.5 overflow-y-auto">
            <p className="mb-1 px-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
              Workspace
            </p>
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                      item.active
                        ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_oklch(0.7_0.16_255/0.22)]"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    {item.active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple shadow-[0_0_16px_oklch(0.7_0.16_255/0.6)]"
                      />
                    )}
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-xl transition-all duration-300",
                        item.active
                          ? "bg-gradient-to-br from-neon-blue/40 to-neon-purple/35 text-white shadow-[0_0_24px_oklch(0.6_0.16_255/0.4)]"
                          : "bg-white/[0.04] text-white/65 group-hover:bg-white/[0.08] group-hover:text-white"
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    {item.label}
                    <ChevronRight
                      className={cn(
                        "ml-auto size-4 text-white/25 transition-all duration-300",
                        item.active
                          ? "text-neon-cyan opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="relative mt-4 space-y-3">
            {/* Upgrade plan */}
            <div className="glow-border relative overflow-hidden rounded-2xl bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent p-4">
              <div className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.2_300/0.4),transparent_70%)] blur-xl" />
              <div className="relative flex items-center gap-2">
                <Crown className="size-4 text-neon-cyan" />
                <p className="font-display text-sm font-semibold text-white">
                  Upgrade to Pro
                </p>
              </div>
              <p className="relative mt-1.5 text-xs leading-relaxed text-white/55">
                Unlock private models, priority renders, and unlimited seats.
              </p>
              <Button
                size="sm"
                className="relative mt-3 h-9 w-full overflow-hidden rounded-xl bg-gradient-to-r from-neon-blue via-[#6d6bff] to-neon-purple text-xs font-semibold text-white shadow-[0_12px_32px_-8px_oklch(0.55_0.2_275/0.7)]"
              >
                <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(120deg,transparent,oklch(1_0_0/0.3),transparent)]" />
                <Sparkles data-icon="inline-start" className="relative" />
                <span className="relative">Upgrade Plan</span>
              </Button>
            </div>

            {/* Profile + credits */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-2.5">
              <Avatar size="default" className="ring-1 ring-white/15">
                <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple text-[11px] font-semibold text-white">
                  NS
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">Nora Sato</p>
                <p className="truncate text-[11px] text-white/45">
                  1,240 credits left
                </p>
              </div>
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.8_0.17_150)]" />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
