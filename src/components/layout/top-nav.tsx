"use client";

import { Bell, Coins, Menu, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

type TopNavProps = {
  onMenuOpen: () => void;
};

export function TopNav({ onMenuOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#090b13]/55 px-4 py-3 backdrop-blur-2xl sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open navigation"
        >
          <Menu />
        </Button>

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/35" />
          <Input
            type="search"
            placeholder="Search prompts, tools, and assets…"
            className="h-10 w-full rounded-xl border-white/10 bg-white/5 pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-neon-blue/50 focus-visible:ring-neon-blue/25"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden border-white/12 bg-white/5 text-white hover:bg-white/10 sm:inline-flex"
                />
              }
            >
              <Coins data-icon="inline-start" className="text-neon-cyan" />
              <span className="font-medium">1,240</span>
              <span className="text-white/45">credits</span>
            </TooltipTrigger>
            <TooltipContent>Studio credits remaining</TooltipContent>
          </Tooltip>

          <Badge
            variant="secondary"
            className="border border-white/10 bg-white/5 px-2.5 py-1 text-white sm:hidden"
          >
            <Coins className="size-3.5 text-neon-cyan" />
            1,240
          </Badge>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white/80 hover:bg-white/8 hover:text-white"
                  aria-label="Notifications"
                />
              }
            >
              <Bell />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-neon-purple shadow-[0_0_10px_oklch(0.68_0.2_300)]" />
            </TooltipTrigger>
            <TooltipContent>3 new notifications</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-10 gap-2 rounded-xl px-1.5 hover:bg-white/8 sm:px-2"
                />
              }
            >
              <Avatar size="sm" className="ring-1 ring-white/15">
                <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple text-[11px] font-semibold text-white">
                  NS
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-medium text-white">
                  Nora Sato
                </span>
                <span className="block text-[11px] text-white/45">
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
    </header>
  );
}
