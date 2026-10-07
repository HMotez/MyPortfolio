import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/* Animates the numeric part of a value like "5+" from 0 when scrolled into view. */
export default function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const target = parseInt(value, 10) || 0;
  const suffix = String(value).replace(/^\d+/, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, { duration, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, target, duration]);

  return <span ref={ref}>{n}{suffix}</span>;
}
