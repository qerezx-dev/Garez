"use client";

import { motion } from "framer-motion";
import { Bell, Command, Menu, Plus, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TopNavProps = {
  onMenuOpen: () => void;
};

export function TopNav({ onMenuOpen }: TopNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3 z-30 px-3 sm:px-4 lg:px-5"
    >
      <div className="glass-float mx-auto flex h-[72px] max-w-5xl items-center gap-3 rounded-[24px] px-3 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white/80 hover:bg-white/8 lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open navigation"
        >
          <Menu />
        </Button>

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-full border-transparent bg-transparent pl-11 pr-16 text-sm text-white placeholder:text-white/35 focus-visible:border-white/10 focus-visible:bg-white/[0.03] focus-visible:ring-0"
          />
          <div className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/40 sm:flex">
            <Command className="size-3" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08] sm:inline-flex"
          >
            <span className="tabular-nums">12,450</span>
            <span className="text-white/40">Credits</span>
            <Plus data-icon="inline-end" className="size-3.5 text-white/60" />
          </Button>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative size-9 rounded-full text-white/80 hover:bg-white/8"
                  aria-label="Notifications"
                />
              }
            >
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] font-semibold text-white shadow-[0_0_12px_oklch(0.65_0.2_25)]">
                3
              </span>
            </TooltipTrigger>
            <TooltipContent>3 new notifications</TooltipContent>
          </Tooltip>

          <Avatar size="default" className="ring-2 ring-white/10">
            <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#a855f7] text-[11px] font-semibold text-white">
              Q
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}
