"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STARS = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: index % 5 === 0 ? 2.2 : 1.2,
  delay: (index % 10) * 0.35,
  duration: 3 + (index % 6),
}));

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => STARS, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#06070d]" />

      {/* Nebula depth layers */}
      <motion.div
        className="absolute -left-32 top-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_265/0.35),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 50, -20, 0],
                y: [0, 30, -15, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-[8%] size-[36rem] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.22_300/0.32),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -40, 25, 0],
                y: [0, 45, 10, 0],
                scale: [1, 0.92, 1.12, 1],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[28%] size-[40rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.14_220/0.22),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 60, -30, 0],
                opacity: [0.45, 0.75, 0.5, 0.45],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora ribbons */}
      <motion.div
        className="absolute left-[-10%] top-[18%] h-[45%] w-[70%] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,oklch(0.72_0.16_255/0.16),oklch(0.7_0.2_300/0.14),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["-8%", "10%", "-4%"], opacity: [0.35, 0.65, 0.4] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[42%] h-[40%] w-[65%] rotate-[12deg] bg-[linear-gradient(90deg,transparent,oklch(0.8_0.13_220/0.12),oklch(0.68_0.18_290/0.16),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["8%", "-12%", "4%"], opacity: [0.3, 0.55, 0.35] }
        }
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft light rays */}
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]">
        <div className="absolute left-1/2 top-[-20%] h-[80%] w-px -translate-x-1/2 rotate-12 bg-gradient-to-b from-neon-cyan/40 via-white/10 to-transparent" />
        <div className="absolute left-[42%] top-[-15%] h-[70%] w-px rotate-[-18deg] bg-gradient-to-b from-neon-blue/30 via-white/5 to-transparent" />
        <div className="absolute left-[58%] top-[-18%] h-[75%] w-px rotate-[22deg] bg-gradient-to-b from-neon-purple/30 via-white/5 to-transparent" />
      </div>

      {/* Stars / particles */}
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
              : {
                  opacity: [0.15, 0.85, 0.2],
                  scale: [0.8, 1.25, 0.9],
                }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 soft-grid opacity-[0.18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.08_0.02_275/0.75)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
