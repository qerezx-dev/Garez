"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STARS = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  left: `${(index * 47) % 100}%`,
  top: `${(index * 59) % 100}%`,
  size: index % 7 === 0 ? 2.5 : 1.1,
  delay: (index % 14) * 0.25,
  duration: 2.8 + (index % 8),
}));

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => STARS, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05060b]" />

      {/* Cinematic eclipse / landscape glow */}
      <div className="absolute left-1/2 top-[6%] h-[28rem] w-[min(92vw,56rem)] -translate-x-1/2 sm:top-[2%] sm:h-[36rem]">
        <motion.div
          className="absolute inset-x-[8%] top-[18%] h-[55%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_300/0.55),oklch(0.55_0.18_255/0.25)_40%,transparent_70%)] blur-2xl"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[10%] h-[14rem] w-[14rem] -translate-x-1/2 rounded-full sm:h-[18rem] sm:w-[18rem]"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.7 0.12 280 / 0.45), transparent 28%), radial-gradient(circle, #0b0d16 46%, transparent 62%)",
            boxShadow:
              "0 0 80px oklch(0.6 0.2 300 / 0.45), 0 0 160px oklch(0.55 0.18 255 / 0.25), inset 0 0 40px oklch(0.65 0.16 280 / 0.25)",
          }}
          animate={reduceMotion ? undefined : { rotate: [0, 6, -4, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-[5%] bottom-[8%] h-[42%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,oklch(0.35_0.08_280/0.55),transparent_70%)] blur-xl" />
        <div className="absolute inset-x-[12%] bottom-[18%] h-[28%] bg-[linear-gradient(to_top,oklch(0.2_0.05_280/0.65),transparent)] [clip-path:polygon(0_100%,8%_55%,18%_70%,28%_40%,40%_62%,52%_28%,64%_58%,76%_35%,88%_60%,100%_100%)] opacity-70" />
        <div className="absolute inset-x-[18%] bottom-[10%] h-px bg-gradient-to-r from-transparent via-fuchsia-300/50 to-transparent" />
      </div>

      <motion.div
        className="absolute -left-40 top-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.2_265/0.28),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 36, -12, 0], y: [0, 24, -10, 0] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-[8%] size-[38rem] rounded-full bg-[radial-gradient(circle,oklch(0.48_0.22_300/0.28),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -30, 18, 0], y: [0, 34, 8, 0] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[-10%] top-[26%] h-[40%] w-[70%] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,oklch(0.7_0.16_255/0.14),oklch(0.65_0.2_300/0.16),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["-5%", "10%", "-2%"], opacity: [0.35, 0.7, 0.4] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.1, 0.95, 0.15], scale: [0.75, 1.35, 0.8] }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 soft-grid opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,oklch(0.06_0.02_275/0.85)_100%)]" />
    </div>
  );
}
