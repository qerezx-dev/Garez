"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Film, ImageIcon } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import type { Creation } from "@/lib/studio-data";
import { cn } from "@/lib/utils";

type RecentCarouselProps = {
  items: Creation[];
  onSelect: (item: Creation) => void;
};

export function RecentCarousel({ items, onSelect }: RecentCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  return (
    <section id="history" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Recent Generations
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Continuity across every draft
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll recent generations left"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
            onClick={() => scrollBy(1)}
            aria-label="Scroll recent generations right"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left shadow-[0_20px_50px_oklch(0.05_0.03_275/0.35)] transition hover:border-white/20"
          >
            <div
              className={cn(
                "relative aspect-[16/11] overflow-hidden",
                item.mode === "video"
                  ? "bg-gradient-to-br from-violet-500/35 via-fuchsia-600/25 to-[#12081f]"
                  : "bg-gradient-to-br from-sky-400/30 via-indigo-500/25 to-[#08101f]"
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.18),transparent_45%)]" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
                {item.mode === "video" ? (
                  <Film className="size-3.5" />
                ) : (
                  <ImageIcon className="size-3.5" />
                )}
                {item.mode}
              </div>
            </div>
            <div className="space-y-1.5 p-3.5">
              <p className="line-clamp-2 text-sm font-medium text-white/90 group-hover:text-white">
                {item.prompt}
              </p>
              <p className="text-[11px] text-white/40">
                {item.model} · {item.createdAt}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
