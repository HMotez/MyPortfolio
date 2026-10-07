import { useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor]";

/* Trailing ring that follows the pointer and grows over interactive elements.
   Desktop (fine pointer) only; the native cursor stays visible. */
export default function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      setHovering(!!el);
      setLabel(el?.dataset?.cursor ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 56 : 28;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[90] pointer-events-none rounded-full flex items-center justify-center
        border border-cyan-300/70 mix-blend-difference light:mix-blend-normal"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: label ? "rgba(255,255,255,1)" : hovering ? "rgba(103,232,249,0.25)" : "rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-black">{label}</span>
      )}
    </motion.div>
  );
}
