"use client";

import { motion } from "framer-motion";
import { ChevronDown, Workflow } from "lucide-react";

export function StudioFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-5 flex items-center justify-between rounded-[10px] border border-violet-400/20 bg-[linear-gradient(100deg,rgba(32,11,56,0.75),rgba(11,15,43,0.82))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div>
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white/85">
          <Workflow className="size-3.5 text-fuchsia-400" />
          Build. Create. Automate.
        </p>
        <p className="mt-1 text-[10px] text-white/45">Workflows let you connect AI tools and automate your creative process.</p>
      </div>
      <button type="button" className="hidden items-center gap-2 rounded-[7px] border border-violet-400/25 bg-violet-950/35 px-3 py-2 text-[10px] text-white/75 hover:bg-violet-900/35 sm:inline-flex">
        Explore Workflows <ChevronDown className="size-3" />
      </button>
    </motion.footer>
  );
}
