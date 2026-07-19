"use client";

import { motion } from "framer-motion";
import { Settings2, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { GlassPanel } from "@/components/studio/glass-panel";
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
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/8 bg-[#070912]/82 p-4 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-[#070912]/45",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-7 flex items-center justify-between px-1">
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

        <nav className="flex flex-1 flex-col gap-1.5">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                    item.active
                      ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_oklch(0.85_0.08_255/0.16)]"
                      : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  {item.active && (
                    <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple" />
                  )}
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl transition-all duration-300",
                      item.active
                        ? "bg-gradient-to-br from-neon-blue/35 to-neon-purple/30 text-white shadow-[0_0_24px_oklch(0.7_0.16_255/0.25)]"
                        : "bg-white/[0.04] text-white/65 group-hover:bg-white/[0.07] group-hover:text-white"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {item.label}
                  {item.active && (
                    <span className="ml-auto size-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.82_0.13_220)]" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <Separator className="my-4 bg-white/8" />

        <GlassPanel glow className="rounded-2xl p-3.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Plan
          </p>
          <p className="mt-1.5 font-display text-base font-semibold text-white">
            NORO Pro
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            Priority render queue, private models, and unlimited drafts.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full rounded-xl border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Settings2 data-icon="inline-start" />
            Manage plan
          </Button>
        </GlassPanel>
      </aside>
    </>
  );
}
