"use client";

import { useEffect, useRef, useState } from "react";

import { AiToolsGrid } from "@/components/studio-os/ai-tools-grid";
import { CinematicBackground } from "@/components/studio-os/cinematic-background";
import { FloatingSidebar } from "@/components/studio-os/floating-sidebar";
import { FloatingTopBar } from "@/components/studio-os/floating-topbar";
import { Hero } from "@/components/studio-os/hero";
import { LivePreviewPanel } from "@/components/studio-os/live-preview-panel";
import { PromptCommandCenter } from "@/components/studio-os/prompt-command-center";
import type { GenerationPayload, GenerationStatus } from "@/lib/generation";
import { SEED_HISTORY, type Creation } from "@/lib/studio-data";

export function Workspace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState("");
  const [draftPrompt, setDraftPrompt] = useState("");
  const [model, setModel] = useState("OpenAI");
  const [aspect, setAspect] = useState("16:9");
  const [quality, setQuality] = useState("High");
  const [creativity, setCreativity] = useState(65);
  const [toolLabel, setToolLabel] = useState("Image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [history, setHistory] = useState<Creation[]>(SEED_HISTORY);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (progressRef.current) window.clearInterval(progressRef.current);
    };
  }, []);

  const handleGenerate = (payload: GenerationPayload) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (progressRef.current) window.clearInterval(progressRef.current);

    setIsGenerating(true);
    setStatus("queued");
    setProgress(4);
    setActivePrompt("");
    setModel(payload.providerName);
    setAspect(payload.aspect);
    setQuality(payload.quality);
    setCreativity(payload.creativity);
    setToolLabel(payload.toolLabel);

    progressRef.current = window.setInterval(() => {
      setProgress((value) => {
        const next = value >= 92 ? value : value + Math.random() * 10 + 4;
        if (next > 30 && next < 70) setStatus("generating");
        if (next >= 70) setStatus("refining");
        return next;
      });
    }, 180);

    timerRef.current = window.setTimeout(() => {
      if (progressRef.current) window.clearInterval(progressRef.current);
      setProgress(100);
      setStatus("complete");

      const creation: Creation = {
        id: `gen-${Date.now()}`,
        prompt: payload.prompt,
        mode: payload.mode,
        toolLabel: payload.toolLabel,
        model: payload.providerName,
        aspect: payload.aspect,
        quality: payload.quality,
        creativity: payload.creativity,
        seed: payload.seed,
        outputCount: payload.outputCount,
        createdAt: "Just now",
      };

      setActivePrompt(payload.prompt);
      setHistory((items) => [creation, ...items].slice(0, 6));
      setIsGenerating(false);

      window.setTimeout(() => {
        setProgress(0);
        setStatus("idle");
      }, 1000);
    }, 2400);
  };

  const handleSelectHistory = (item: Creation) => {
    setActivePrompt(item.prompt);
    setDraftPrompt(item.prompt);
    setModel(item.model);
    setAspect(item.aspect);
    setQuality(item.quality);
    setCreativity(item.creativity);
    setToolLabel(item.toolLabel);
    setIsGenerating(false);
    setProgress(0);
    setStatus("complete");
  };

  return (
    <div className="relative min-h-dvh">
      <CinematicBackground />
      <FloatingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative lg:pl-[314px]">
        <div className="mx-auto w-full max-w-[1680px] px-4 pb-24 sm:px-6">
          <FloatingTopBar onMenuOpen={() => setSidebarOpen(true)} />

          <Hero />

          <div className="mt-10 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)]">
            <PromptCommandCenter
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              draftPrompt={draftPrompt}
            />

            <div className="xl:sticky xl:top-28">
              <LivePreviewPanel
                prompt={activePrompt}
                model={model}
                aspect={aspect}
                quality={quality}
                creativity={creativity}
                toolLabel={toolLabel}
                isGenerating={isGenerating}
                progress={progress}
                status={status}
                history={history}
                onSelectHistory={handleSelectHistory}
              />
            </div>
          </div>

          <div className="mt-16">
            <AiToolsGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
