"use client";

import { motion } from "framer-motion";
import { Settings2, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
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
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-white/10 bg-[#0a0c14]/80 p-4 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-transparent lg:backdrop-blur-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between px-1">
          <Logo />
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    item.active
                      ? "bg-white/8 text-white shadow-[inset_0_0_0_1px_oklch(0.85_0.05_255/0.12)]"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-lg transition-colors",
                      item.active
                        ? "bg-gradient-to-br from-neon-blue/30 to-neon-purple/25 text-white"
                        : "bg-white/5 text-white/70 group-hover:text-white"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {item.label}
                  {item.active && (
                    <span className="ml-auto size-1.5 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.8_0.14_220)]" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <Separator className="my-4 bg-white/10" />

        <div className="glass rounded-2xl p-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            Plan
          </p>
          <p className="mt-1 font-display text-base font-semibold text-white">
            NORO Pro
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            Unlimited drafts, priority render queue, and private models.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <Settings2 data-icon="inline-start" />
            Manage plan
          </Button>
        </div>
      </aside>
    </>
  );
}
