import { useRef } from "react";
import {
  motion, useScroll, useVelocity, useSpring, useTransform,
  useMotionValue, useAnimationFrame,
} from "framer-motion";
import { useLang } from "../../i18n/lang";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Infinite text row whose speed and skew react to scroll velocity. */
function VelocityRow({ children, baseVelocity = 3, outline = false }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 2000], [12, -12]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    move += direction.current * move * vf;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div style={{ x, skewX: skew }} className="flex whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`font-display font-bold uppercase text-5xl md:text-7xl tracking-tight pr-8 ${
              outline ? "ghost-text-strong" : "text-gradient-anim"
            }`}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const ROW_A = "Full-Stack ✦ React ✦ Node.js ✦ AI / NLP ✦ Docker ✦ PostgreSQL ✦ ";

export default function Marquee() {
  const { t } = useLang();
  return (
    <section aria-hidden className="relative py-14 md:py-20 overflow-hidden border-y border-white/[0.06] bg-ink/40">
      <div className="-rotate-2 flex flex-col gap-2 md:gap-4">
        <VelocityRow baseVelocity={-2.5}>{ROW_A}</VelocityRow>
        <VelocityRow baseVelocity={2.5} outline>{t("marquee.b")}</VelocityRow>
      </div>
    </section>
  );
}
