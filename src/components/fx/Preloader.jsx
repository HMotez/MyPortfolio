import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { LogoMark } from "./Logo";
import { useLang } from "../../i18n/lang";

const NAME = "HMoetez";
const EASE = [0.76, 0, 0.24, 1];

/* Full-screen intro: counter 0→100, name reveal, then the curtain lifts. */
export default function Preloader({ onDone }) {
  const { t } = useLang();
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();

    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setLeaving(true),
    });
    return () => controls.stop();
  }, []);

  const finish = () => {
    document.documentElement.style.overflow = "";
    window.__lenis?.start();
    onDone();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center overflow-hidden"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      onAnimationComplete={() => leaving && finish()}
    >
      <div className="absolute inset-0 grain opacity-60" />

      <div className="flex flex-col items-center gap-6">
      <motion.div animate={leaving ? { scale: 0.6, opacity: 0 } : {}} transition={{ duration: 0.5, ease: EASE }}>
        <LogoMark size={96} orbit={false} />
      </motion.div>
      {/* name */}
      <div className="flex overflow-hidden font-logo text-4xl md:text-6xl font-bold tracking-tight">
        {NAME.split("").map((c, i) => (
          <motion.span
            key={i}
            className="inline-block text-white"
            initial={{ y: "110%" }}
            animate={{ y: leaving ? "-110%" : "0%" }}
            transition={{ duration: 0.7, ease: EASE, delay: leaving ? i * 0.03 : 0.1 + i * 0.06 }}
          >
            {c}
          </motion.span>
        ))}
        <motion.span
          className="inline-block text-cyan-400"
          initial={{ scale: 0 }}
          animate={{ scale: leaving ? 0 : 1 }}
          transition={{ duration: 0.4, delay: leaving ? 0 : 0.6 }}
        >
          .
        </motion.span>
      </div>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full"
          style={{ width: `${count}%`, background: "linear-gradient(90deg,#06b6d4,#a855f7,#ec4899)" }}
        />
      </div>

      {/* counter */}
      <span className="absolute bottom-6 right-6 md:bottom-10 md:right-12 font-display font-bold text-6xl md:text-8xl text-white/10 tabular-nums">
        {String(count).padStart(3, "0")}
      </span>
      <span className="absolute bottom-8 left-6 md:bottom-12 md:left-12 font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">
        {t("intro.tagline")}
      </span>
    </motion.div>
  );
}
