"use client";

import { motion } from "framer-motion";

const points = Array.from({ length: 52 }, (_, index) => ({
  id: index,
  left: `${(index * 19 + 5) % 100}%`,
  top: `${(index * 37 + 3) % 94}%`,
  delay: index * 0.07,
}));

export function AuroraField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#04060d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_51%_17%,rgba(26,73,169,.24),transparent_29%),radial-gradient(ellipse_at_71%_26%,rgba(137,55,207,.19),transparent_29%),radial-gradient(ellipse_at_38%_85%,rgba(0,133,190,.12),transparent_38%)]" />
      <motion.div className="absolute left-[22%] top-[7%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(25,160,255,.16),rgba(107,61,231,.11)_43%,transparent_68%)] blur-3xl" animate={{ x: [0, 34, 0], y: [0, 18, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[-4%] top-[18%] size-[540px] rounded-full bg-[radial-gradient(circle,rgba(190,69,255,.18),transparent_65%)] blur-3xl" animate={{ x: [0, -28, 0], y: [0, 24, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

      <div className="absolute left-[40.5%] top-[11%] size-[220px] rounded-full border border-[#b7a6ff] shadow-[0_0_24px_rgba(166,121,255,.8),0_0_85px_rgba(49,143,255,.28)]" />
      <div className="absolute left-[40.7%] top-[11.2%] size-[216px] rounded-full bg-[radial-gradient(circle_at_37%_31%,rgba(178,153,255,.34),transparent_19%),radial-gradient(circle,#101124_50%,#06070f_68%,transparent_70%)]" />
      <motion.div className="absolute left-[18%] top-[23%] h-[220px] w-[72%] -rotate-[7deg] bg-[linear-gradient(90deg,transparent,rgba(53,104,255,.13),rgba(214,73,255,.17),transparent)] blur-2xl" animate={{ x: ["-4%", "8%", "-4%"] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />

      {points.map((point) => (
        <motion.span key={point.id} className="absolute size-px rounded-full bg-white" style={{ left: point.left, top: point.top }} animate={{ opacity: [.12, .8, .12], scale: [.6, 1.5, .6] }} transition={{ duration: 2.8 + point.id % 4, delay: point.delay, repeat: Infinity }} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(1,2,7,.9)_100%)]" />
    </div>
  );
}
