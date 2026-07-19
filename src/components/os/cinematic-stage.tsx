"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 7) % 100}%`,
  top: `${(index * 43 + 11) % 100}%`,
  size: index % 6 === 0 ? 2 : 1,
  delay: index * 0.11,
}));

export function CinematicStage() {
  const reducedMotion = useReducedMotion();
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05070b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_23%,#172155_0%,transparent_30%),radial-gradient(ellipse_at_68%_35%,#321653_0%,transparent_32%),radial-gradient(ellipse_at_40%_100%,#061d35_0%,transparent_45%)] opacity-75" />

      <motion.div
        className="absolute left-[25%] top-[8%] h-[42rem] w-[58rem] rounded-full bg-[radial-gradient(ellipse,rgba(69,85,240,0.22),rgba(131,58,220,0.11)_40%,transparent_68%)] blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, 36, -15, 0], y: [0, 18, -8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[18%] h-[32rem] w-[42rem] rounded-full bg-[radial-gradient(ellipse,rgba(168,85,247,0.2),transparent_68%)] blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, -28, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-[36%] top-[11%] h-[22rem] w-[22rem]">
        <motion.div
          className="absolute inset-0 rounded-full border border-violet-300/75 shadow-[0_0_20px_rgba(139,92,246,0.85),0_0_55px_rgba(59,130,246,0.38),inset_0_0_32px_rgba(124,58,237,0.2)]"
          animate={reducedMotion ? undefined : { rotate: [0, 5, -3, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(180,137,255,0.32),transparent_22%),radial-gradient(circle,#121025_30%,#080a17_64%,transparent_67%)]" />
        <div className="absolute inset-[-20%] rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <motion.div
        className="absolute left-[18%] top-[25%] h-[20rem] w-[74rem] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,rgba(41,98,255,0.18),rgba(190,86,255,0.22),transparent)] blur-2xl"
        animate={reducedMotion ? undefined : { x: ["-4%", "7%", "-4%"], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={reducedMotion ? undefined : { opacity: [0.12, 0.8, 0.14], scale: [0.7, 1.35, 0.8] }}
          transition={{ duration: 3 + (particle.id % 6), delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,3,8,0.9)_100%)]" />
    </div>
  );
}
