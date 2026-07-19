"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Sidebar } from "@/components/layout/sidebar";
import { StudioFooter } from "@/components/layout/studio-footer";
import { TopNav } from "@/components/layout/top-nav";
import { AmbientBackground } from "@/components/studio/ambient-background";
import { HeroSection } from "@/components/studio/hero-section";

export function StudioShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-dvh">
      <AmbientBackground />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex min-w-0 flex-1 flex-col"
      >
        <TopNav onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <HeroSection />
          <StudioFooter />
        </main>
      </motion.div>
    </div>
  );
}
