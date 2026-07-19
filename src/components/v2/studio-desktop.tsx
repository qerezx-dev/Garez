"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { AuroraField } from "@/components/v2/aurora-field";
import { DesktopNavigation, DesktopTopbar } from "@/components/v2/desktop-navigation";
import { PreviewPanel } from "@/components/v2/preview-panel";
import { PromptConsole } from "@/components/v2/prompt-console";
import { PortalFooter, ToolMatrix } from "@/components/v2/tool-matrix";

export function StudioDesktopV2() {
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const interval = useRef<number | null>(null);

  const make = (value: string) => {
    if (interval.current) window.clearInterval(interval.current);
    setPrompt(value);
    setRunning(true);
    setProgress(6);
    interval.current = window.setInterval(() => {
      setProgress((amount) => {
        if (amount > 91) return amount;
        return amount + 4 + Math.round(Math.random() * 8);
      });
    }, 150);
    window.setTimeout(() => {
      if (interval.current) window.clearInterval(interval.current);
      setProgress(100);
      setTimeout(() => { setProgress(0); setRunning(false); }, 550);
    }, 2200);
  };

  return (
    <div className="min-h-dvh overflow-hidden bg-[#04060d]">
      <AuroraField />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1728px]">
        <DesktopNavigation />
        <div className="min-w-0 flex-1">
          <DesktopTopbar />
          <main className="mx-auto max-w-[1280px] px-5 pb-6 xl:px-8">
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_356px] xl:gap-8">
              <section className="pt-9">
                <motion.div initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .65 }} className="max-w-[570px]">
                  <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-cyan-200/70">Creative Operating System</p>
                  <h1 className="mt-4 font-[family-name:var(--font-display)] text-[51px] font-semibold leading-[.99] tracking-[-.065em] xl:text-[64px]">Create beyond<br />the expected<span className="text-cyan-300">.</span><Sparkles className="mb-7 ml-1 inline size-5 text-violet-300" /></h1>
                  <p className="mt-4 max-w-[430px] text-[13px] leading-6 text-white/56">An original workspace for directing image, motion, sound, code, and autonomous ideas from a single focused surface.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .5 }}><PromptConsole onGenerate={make} running={running} /></motion.div>
                <ToolMatrix />
                <PortalFooter />
              </section>
              <motion.div initial={{ opacity: 0, x: 16, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ delay: .15, duration: .6 }} className="xl:pt-1"><PreviewPanel prompt={prompt} running={running} progress={progress} /></motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
