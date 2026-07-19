"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STARS = Array.from({ length: 70 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 13) % 100}%`,
  top: `${(index * 71 + 7) % 100}%`,
  size: index % 7 === 0 ? 2.4 : index % 3 === 0 ? 1.6 : 1,
  delay: (index % 12) * 0.4,
  duration: 3.5 + (index % 7),
}));

const PARTICLES = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 61 + 9) % 100}%`,
  top: `${(index * 43 + 21) % 100}%`,
  size: 3 + (index % 4) * 2,
  drift: 18 + (index % 5) * 8,
  delay: (index % 6) * 0.9,
  duration: 14 + (index % 8) * 2,
  hue: index % 3,
}));

const PARTICLE_COLORS = [
  "oklch(0.82 0.13 220 / 0.6)",
  "oklch(0.74 0.16 255 / 0.55)",
  "oklch(0.7 0.2 300 / 0.5)",
];

export function CinematicBackground() {
  const reduceMotion = useReducedMotion();
  const stars = useMemo(() => STARS, []);
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#05070b]" />

      {/* Deep space color wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,oklch(0.32_0.18_265/0.5),transparent_45%),radial-gradient(circle_at_85%_5%,oklch(0.3_0.2_300/0.4),transparent_45%),radial-gradient(circle_at_50%_120%,oklch(0.3_0.14_220/0.35),transparent_55%)]" />

      {/* Nebula drift layers */}
      <motion.div
        className="absolute -left-40 -top-40 size-[52rem] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.22_262/0.4),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 60, -30, 0], y: [0, 40, -20, 0], scale: [1, 1.12, 0.96, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-[2%] size-[46rem] rounded-full bg-[radial-gradient(circle,oklch(0.48_0.24_305/0.38),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -50, 30, 0], y: [0, 50, 15, 0], scale: [1, 0.9, 1.14, 1] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[24%] size-[48rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.15_218/0.28),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 70, -40, 0], opacity: [0.4, 0.7, 0.45, 0.4] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora ribbons */}
      <motion.div
        className="absolute left-[-12%] top-[16%] h-[46%] w-[72%] rotate-[-9deg] bg-[linear-gradient(90deg,transparent,oklch(0.72_0.16_255/0.2),oklch(0.7_0.2_300/0.16),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["-8%", "12%", "-4%"], opacity: [0.4, 0.7, 0.45] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-16%] top-[46%] h-[42%] w-[66%] rotate-[11deg] bg-[linear-gradient(90deg,transparent,oklch(0.8_0.13_220/0.16),oklch(0.68_0.18_290/0.18),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["8%", "-12%", "4%"], opacity: [0.35, 0.6, 0.4] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Planet eclipse */}
      <motion.div
        className="absolute right-[8%] top-[14%] size-[26rem] max-w-[40vw]"
        animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-[#05070b] shadow-[inset_18px_-12px_60px_oklch(0.4_0.16_265/0.5)]" />
        <div className="absolute inset-0 rounded-full [background:radial-gradient(circle_at_32%_30%,transparent_54%,oklch(0.85_0.13_220/0.9)_58%,oklch(0.7_0.2_300/0.5)_63%,transparent_70%)] blur-[2px]" />
        <motion.div
          className="absolute -inset-8 rounded-full [background:radial-gradient(circle,transparent_58%,oklch(0.8_0.14_255/0.28)_66%,transparent_78%)] blur-xl"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Soft light rays */}
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_75%)]">
        <div className="absolute left-1/2 top-[-20%] h-[80%] w-px -translate-x-1/2 rotate-12 bg-gradient-to-b from-neon-cyan/40 via-white/10 to-transparent" />
        <div className="absolute left-[40%] top-[-15%] h-[70%] w-px rotate-[-18deg] bg-gradient-to-b from-neon-blue/30 via-white/5 to-transparent" />
        <div className="absolute left-[60%] top-[-18%] h-[75%] w-px rotate-[22deg] bg-gradient-to-b from-neon-purple/30 via-white/5 to-transparent" />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.12, 0.9, 0.2], scale: [0.8, 1.3, 0.9] }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating glow particles */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: PARTICLE_COLORS[particle.hue],
            boxShadow: `0 0 12px ${PARTICLE_COLORS[particle.hue]}`,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -particle.drift, 0],
                  x: [0, particle.drift / 2, 0],
                  opacity: [0.2, 0.85, 0.2],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Depth grid + vignette + grain */}
      <div className="absolute inset-0 soft-grid opacity-[0.16]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05070b_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
