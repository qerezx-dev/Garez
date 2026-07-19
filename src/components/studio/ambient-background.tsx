"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STARS = Array.from({ length: 56 }, (_, index) => ({
  id: index,
  left: `${(index * 41) % 100}%`,
  top: `${(index * 57) % 100}%`,
  size: index % 6 === 0 ? 2.4 : 1.15,
  delay: (index % 12) * 0.28,
  duration: 3.2 + (index % 7),
}));

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => STARS, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#05060b]" />

      {/* Glowing eclipse */}
      <div className="absolute left-1/2 top-[18%] h-[34rem] w-[34rem] -translate-x-1/2 sm:top-[12%] sm:h-[42rem] sm:w-[42rem]">
        <motion.div
          className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.18_255/0.35),oklch(0.55_0.2_300/0.18)_40%,transparent_68%)] blur-2xl"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(0.75_0.12_220/0.35),transparent_28%),radial-gradient(circle,oklch(0.18_0.04_275/0.95)_42%,oklch(0.08_0.02_275/0.2)_58%,transparent_72%)] shadow-[0_0_120px_oklch(0.65_0.18_270/0.35)]"
          animate={reduceMotion ? undefined : { rotate: [0, 8, -6, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_40%_35%,oklch(0.55_0.08_250/0.35),#05060b_58%)]" />
        <motion.div
          className="absolute inset-[18%] rounded-full border border-white/10"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.2, 0.55, 0.2], scale: [0.98, 1.02, 0.98] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-[18%] rounded-full shadow-[inset_0_0_60px_oklch(0.7_0.16_255/0.25),0_0_80px_oklch(0.65_0.18_300/0.2)]" />
      </div>

      {/* Aurora washes */}
      <motion.div
        className="absolute -left-40 top-[-8%] size-[44rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_265/0.32),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, -15, 0], y: [0, 28, -12, 0], scale: [1, 1.08, 0.96, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-28 top-[10%] size-[38rem] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.22_300/0.3),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -35, 20, 0], y: [0, 40, 8, 0], scale: [1, 0.93, 1.1, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[22%] size-[42rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.14_220/0.2),transparent_65%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 50, -25, 0], opacity: [0.4, 0.7, 0.45, 0.4] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[-12%] top-[22%] h-[48%] w-[72%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,oklch(0.74_0.15_255/0.16),oklch(0.7_0.2_300/0.14),transparent)] blur-2xl"
        animate={
          reduceMotion
            ? undefined
            : { x: ["-6%", "12%", "-3%"], opacity: [0.3, 0.65, 0.35] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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
              : { opacity: [0.12, 0.9, 0.18], scale: [0.8, 1.3, 0.85] }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 soft-grid opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.07_0.02_275/0.78)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
