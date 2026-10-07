import { useId, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Hexagon (pointy-top, r=20 around 24,24) and an HM monogram drawn in strokes */
const HEX = "M24 4 L41.32 14 L41.32 34 L24 44 L6.68 34 L6.68 14 Z";
const LETTERS = [
  "M15 16 V32",          // H left
  "M15 24 H22",          // H bar
  "M22 16 V32",          // H right
  "M26 32 V16 L29.5 24 L33 16 V32", // M
];

/* Animated HM hexagon mark. `play` starts the draw-on; hover redraws it. */
export function LogoMark({ size = 44, play = true, delay = 0, orbit = true }) {
  const id = useId().replace(/:/g, "");
  const [run, setRun] = useState(0);

  return (
    <motion.svg
      key={run}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      onHoverStart={() => setRun((r) => r + 1)}
      initial={{ rotate: -60 }}
      animate={play ? { rotate: 0 } : { rotate: -60 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="0.55" stopColor="#a855f7" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <filter id={`f${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* soft fill behind */}
      <motion.path
        d={HEX}
        fill={`url(#g${id})`}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 0.12 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.9 }}
      />
      {/* hexagon outline */}
      <motion.path
        d={HEX}
        stroke={`url(#g${id})`}
        strokeWidth="2.2"
        strokeLinejoin="round"
        filter={`url(#f${id})`}
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay }}
      />
      {/* monogram */}
      {LETTERS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          style={{ stroke: "var(--color-white)" }}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.55 + i * 0.12 }}
        />
      ))}
      {/* orbiting spark */}
      {orbit && play && (
        <circle r="1.8" fill="#67e8f9" filter={`url(#f${id})`}>
          <animateMotion dur="5s" repeatCount="indefinite" path={HEX} begin={`${delay + 1.2}s`} />
        </circle>
      )}
    </motion.svg>
  );
}

/* Mark + "HMoetez." wordmark */
export default function Logo({ play = true, size = 44 }) {
  return (
    <div className="flex items-center gap-3 group/logo select-none">
      <LogoMark size={size} play={play} />
      <div className="flex items-baseline font-logo font-bold text-[1.2rem] sm:text-[1.45rem] leading-none tracking-tight overflow-hidden pb-0.5">
        {"HMoetez".split("").map((c, i) => (
          <motion.span
            key={i}
            className={`inline-block ${i < 2 ? "text-gradient-anim" : "text-white"}
              transition-colors duration-200 group-hover/logo:text-cyan-300`}
            initial={{ y: "110%" }}
            animate={play ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 + i * 0.05 }}
          >
            {c}
          </motion.span>
        ))}
        <motion.span
          className="inline-block text-cyan-400 ml-[1px]"
          initial={{ scale: 0 }}
          animate={
            play
              ? { scale: 1, textShadow: ["0 0 4px #22d3ee", "0 0 18px #22d3ee", "0 0 4px #22d3ee"] }
              : { scale: 0 }
          }
          transition={{
            scale: { delay: 1, type: "spring", stiffness: 300 },
            textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.4 },
          }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}
