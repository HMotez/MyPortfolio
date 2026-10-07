import { useEffect, useRef } from "react";

export default function StarsBg() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* generate stars once */
    const COUNT = 280;
    const stars = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.2 + 0.2,
      base:  Math.random(),          /* base opacity */
      phase: Math.random() * Math.PI * 2,
      freq:  0.4 + Math.random() * 0.8,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ts = t * 0.001;
      /* light theme: faint ink-coloured dust instead of bright stars */
      const light = document.documentElement.dataset.theme === "light";
      const rgb = light ? "51,65,85" : "200,220,255";
      const k = light ? 0.35 : 1;
      for (const s of stars) {
        const alpha = (s.base * 0.5 + 0.3 + Math.sin(ts * s.freq + s.phase) * 0.2) * k;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
