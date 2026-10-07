import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Numbered kicker, word-by-word masked title reveal, and a giant outlined
   background word that drifts sideways as the section scrolls past. */
export default function SectionHeading({ index, kicker, title, accent, ghost, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  const words = [
    ...title.split(" ").filter(Boolean).map((w) => ({ w, accent: false })),
    ...(accent ? accent.split(" ").map((w) => ({ w, accent: true })) : []),
  ];

  return (
    <div ref={ref} className="relative isolate text-center mb-16">
      {ghost && (
        <motion.span
          aria-hidden
          style={{ x: ghostX }}
          className="ghost-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap
            font-display font-bold text-[18vw] md:text-[12rem] leading-none select-none pointer-events-none -z-10"
        >
          {ghost}
        </motion.span>
      )}

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3"
      >
        <span className="text-slate-500">{index} — </span>{kicker}
      </motion.p>

      <motion.h2
        className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        {words.map(({ w, accent: isAccent }, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em] last:mr-0">
            <motion.span
              className={`inline-block ${isAccent ? "text-gradient-anim" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                visible: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {children}
    </div>
  );
}
