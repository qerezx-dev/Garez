"use client";

import { motion } from "framer-motion";
import { Bell, Command, Menu, PanelLeft, Search, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FloatingTopBarProps = {
  onMenuOpen: () => void;
};

export function FloatingTopBar({ onMenuOpen }: FloatingTopBarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-30 lg:top-6"
    >
      <div className="glass-strong flex h-[72px] items-center gap-3 rounded-[24px] px-3 shadow-[0_30px_80px_-40px_oklch(0.4_0.14_265/0.8)] backdrop-blur-[40px] sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:bg-white/8 hover:text-white lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open navigation"
        >
          <Menu />
        </Button>

        <div className="hidden size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 lg:grid">
          <PanelLeft className="size-4" />
        </div>

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35" />
          <Input
            type="search"
            placeholder="Search projects, assets, models, and workflows…"
            className="h-12 w-full rounded-2xl border-white/10 bg-white/[0.04] pl-11 pr-20 text-sm text-white placeholder:text-white/35 focus-visible:border-neon-blue/45 focus-visible:ring-neon-blue/20"
          />
          <div className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/40">
            <Command className="size-3" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="lg"
                  className="hidden h-11 rounded-2xl border-white/12 bg-white/[0.04] px-3.5 text-white hover:bg-white/[0.08] md:inline-flex"
                />
              }
            >
              <Sparkles data-icon="inline-start" className="text-neon-cyan" />
              <span className="font-semibold tabular-nums">1,240</span>
              <span className="text-white/40">credits</span>
            </TooltipTrigger>
            <TooltipContent>Studio credits remaining</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative size-11 rounded-2xl text-white/80 hover:bg-white/8 hover:text-white"
                  aria-label="Notifications"
                />
              }
            >
              <Bell />
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-neon-purple shadow-[0_0_12px_oklch(0.7_0.2_300)]" />
            </TooltipTrigger>
            <TooltipContent>3 new notifications</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-12 gap-2.5 rounded-2xl px-1.5 hover:bg-white/8 sm:px-2"
                />
              }
            >
              <Avatar size="default" className="ring-1 ring-white/15">
                <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple text-[11px] font-semibold text-white">
                  NS
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-semibold text-white">
                  Nora Sato
                </span>
                <span className="block text-[11px] text-white/40">
                  Creative Lead
                </span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
