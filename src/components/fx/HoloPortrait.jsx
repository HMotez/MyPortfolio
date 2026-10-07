import { useRef, useState } from "react";
import {
  motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useAnimationFrame, useReducedMotion,
} from "framer-motion";
import { SiReact, SiNodedotjs, SiPython, SiDocker, SiPostgresql } from "react-icons/si";
import { FaBrain, FaMapMarkerAlt, FaGraduationCap, FaSyncAlt } from "react-icons/fa";
import { useLang } from "../../i18n/lang";

const CARD_BG = "#060914";

/* Tech logos riding an elliptical orbit around the portrait */
const ORBIT = [
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiNodedotjs, color: "#5FA04E" },
  { icon: SiPython, color: "#FFD43B" },
  { icon: SiDocker, color: "#2496ED" },
  { icon: SiPostgresql, color: "#7aa7e0" },
  { icon: FaBrain, color: "#c084fc" },
];
/* orbit ellipse in % of the card: centre (50, 58), radii (40, 10) — tall enough
   that neighbouring logos never stack at the sides */
const OX = 50, OY = 58, RX = 40, RY = 10;

/* deterministic "random" particles */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: (i * 0.77) % 7,
  duration: 7 + (i % 5),
  size: 2 + (i % 3),
}));

/* "Available" badge: a beam of light runs around its border, the status dot breathes */
function StatusBadge({ title, subtitle }) {
  return (
    <div className="relative rounded-full p-px overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <span
        aria-hidden
        className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, #34d399 50deg, #67e8f9 90deg, transparent 140deg, transparent 360deg)" }}
      />
      <div className="relative flex items-center gap-2.5 rounded-full bg-[#060914]/90 backdrop-blur-xl pl-2.5 pr-4 py-1.5">
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[0.7rem] font-semibold text-white tracking-wide">{title}</span>
          <span className="mt-1 text-[0.55rem] font-mono uppercase tracking-[0.18em] text-emerald-300/90">{subtitle}</span>
        </span>
      </div>
    </div>
  );
}

/* pointer-driven 2D offset for one parallax layer (depth in px at the card edge) */
function useLayer(sx, sy, depth) {
  return {
    x: useTransform(sx, (v) => v * depth),
    y: useTransform(sy, (v) => v * depth),
  };
}

/* Holographic portrait card: pointer tilt + parallax layers, orbiting tech
   logos that pass behind/in front of the portrait, glare, and a 3D flip to
   the illustrated avatar on the back. */
export default function HoloPortrait({ photo, art, name, role }) {
  const { t, tr } = useLang();
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const hovering = useRef(false);
  const cardRef = useRef(null);
  const itemRefs = useRef([]);

  /* pointer in -0.5..0.5 (raw) and its springy version */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const bgLayer = useLayer(sx, sy, -10);
  const nameLayer = useLayer(sx, sy, -22);
  const personLayer = useLayer(sx, sy, 8);
  const orbitLayer = useLayer(sx, sy, 14);
  const plateLayer = useLayer(sx, sy, 18);
  const glowLayer = useLayer(sx, sy, -30);

  const gx = useTransform(sx, (v) => `${(v + 0.5) * 100}%`);
  const gy = useTransform(sy, (v) => `${(v + 0.5) * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 45%)`;
  const holoPos = useMotionTemplate`${gx} ${gy}`;

  useAnimationFrame((time) => {
    const tt = time / 1000;
    /* idle sway so the card feels alive on touch screens too */
    if (!hovering.current && !reduce) {
      px.set(Math.sin(tt * 0.6) * 0.18);
      py.set(Math.cos(tt * 0.45) * 0.12);
    }
    /* orbit: depth > 0 means in front of the portrait */
    const n = ORBIT.length;
    for (let i = 0; i < n; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const a = (reduce ? 0 : tt * 0.45) + (i / n) * Math.PI * 2;
      const depth = Math.cos(a);
      const s = 0.78 + 0.32 * (depth + 1) / 2;
      el.style.left = `${OX + RX * Math.sin(a)}%`;
      el.style.top = `${OY + RY * depth}%`;
      el.style.transform = `translate(-50%, -50%) scale(${s})`;
      el.style.zIndex = depth > 0 ? "30" : "10";
      el.style.opacity = String(depth > 0 ? 1 : 0.25 + 0.75 * (depth + 1));
    }
  });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = true;
    const r = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { hovering.current = false; };

  return (
    <motion.div
      className="relative w-full h-full"
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, rotateY: -28, rotateX: 12, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ambient glow under the card, follows the tilt */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-[2rem] blur-3xl opacity-60 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600"
        style={{ ...glowLayer, top: "2.5rem" }}
      />

      <motion.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={t("about.flip")}
        data-cursor={t("cursor.flip")}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
        }}
        className="relative w-full h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-[1.75rem]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          {/* ── FRONT ─────────────────────────────────────── */}
          <div
            className="@container on-accent absolute inset-0 rounded-[1.75rem] overflow-hidden border border-white/15
              shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
            style={{ background: CARD_BG, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {/* studio lighting */}
            <motion.div aria-hidden className="absolute -inset-10" style={bgLayer}>
              <div className="absolute left-[-10%] top-[10%] w-[70%] h-[60%] rounded-full bg-cyan-500/35 blur-[60px]" />
              <div className="absolute right-[-15%] top-[25%] w-[70%] h-[60%] rounded-full bg-fuchsia-600/35 blur-[60px]" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[60%] h-[70%] bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
            </motion.div>

            {/* perspective grid floor */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[48%] overflow-hidden [mask-image:linear-gradient(to_top,black_30%,transparent)]">
              <div
                className="holo-floor absolute left-[-50%] right-[-50%] top-0 h-[200%]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.35) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  transform: "perspective(260px) rotateX(62deg)",
                  transformOrigin: "50% 0%",
                }}
              />
            </div>

            {/* rising particles */}
            <div aria-hidden className="absolute inset-0">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="holo-particle absolute bottom-0 rounded-full bg-cyan-200"
                  style={{
                    left: `${p.left}%`, width: p.size, height: p.size,
                    animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
                  }}
                />
              ))}
            </div>

            {/* name behind the head */}
            <motion.div
              aria-hidden
              style={nameLayer}
              className="absolute inset-x-0 top-[7%] flex flex-col items-center font-logo font-extrabold leading-[0.82]
                text-[29cqw] tracking-tighter select-none [mask-image:linear-gradient(to_bottom,black_35%,transparent_95%)]"
            >
              <span className="text-gradient-anim">MOE</span>
              <span className="text-gradient-anim opacity-80">TEZ</span>
            </motion.div>

            {/* orbit path (front half only — the back half is hidden by the portrait) */}
            <motion.svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-[29]" style={orbitLayer}>
              <path d={`M${OX - RX},${OY} A${RX},${RY} 0 0,0 ${OX + RX},${OY}`} fill="none" stroke="rgba(103,232,249,0.45)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </motion.svg>

            {/* portrait with cyan / pink rim light */}
            <motion.img
              src={photo}
              alt={name}
              draggable={false}
              style={personLayer}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[80%] w-auto max-w-none z-20 select-none
                [filter:drop-shadow(-2px_0_4px_rgba(103,232,249,0.5))_drop-shadow(2px_0_4px_rgba(244,114,182,0.45))_drop-shadow(0_24px_28px_rgba(0,0,0,0.55))]"
            />

            {/* orbiting logos */}
            <motion.div aria-hidden className="absolute inset-0" style={orbitLayer}>
              {ORBIT.map((o, i) => (
                <span
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="absolute w-11 h-11 rounded-full flex items-center justify-center
                    bg-[#0b1224]/90 border border-white/25 backdrop-blur-md"
                  style={{ boxShadow: `0 0 18px ${o.color}55, 0 6px 20px rgba(0,0,0,0.5)` }}
                >
                  <o.icon style={{ color: o.color }} className="text-[1.3rem]" />
                </span>
              ))}
            </motion.div>

            {/* bottom fade + name plate */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[42%] z-[35]"
              style={{ background: `linear-gradient(to top, ${CARD_BG} 18%, ${CARD_BG}d9 45%, transparent)` }} />
            <motion.div style={plateLayer} className="absolute left-5 right-5 bottom-14 z-40">
              <p className="font-logo text-[1.35rem] font-bold text-white leading-tight">{name}</p>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.25em] text-[#67e8f9]">{tr(role)}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-white/60">
                <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#67e8f9]" />Monastir, TN</span>
                <span className="flex items-center gap-1.5"><FaGraduationCap className="text-[#c084fc]" />FSM ’26</span>
              </div>
            </motion.div>

            {/* top bar */}
            <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
              <StatusBadge title={t("about.available")} subtitle={t("about.availableSub")} />
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/50">Nº 01</span>
            </div>

            {/* holographic sheen, glare and periodic light sweep */}
            <motion.div aria-hidden className="holo-foil absolute inset-0 z-50 pointer-events-none" style={{ backgroundPosition: holoPos }} />
            <motion.div aria-hidden className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay" style={{ background: glare }} />
            <div aria-hidden className="holo-sweep absolute inset-0 z-50 pointer-events-none" />

            {/* flip hint */}
            <span className="absolute z-50 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full
              text-[0.62rem] font-mono uppercase tracking-widest text-white bg-black/50 border border-white/20 backdrop-blur-md whitespace-nowrap">
              <FaSyncAlt className="text-[0.55rem]" /> {t("about.flipHint")}
            </span>
          </div>

          {/* ── BACK: illustrated avatar ─────────────────── */}
          <div
            className="on-accent absolute inset-0 rounded-[1.75rem] overflow-hidden border border-white/15"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: CARD_BG }}
          >
            <img src={art} alt="" aria-hidden draggable={false} className="absolute inset-0 w-full h-full object-cover" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: `linear-gradient(to top, ${CARD_BG}, transparent)` }} />
            <motion.div aria-hidden className="holo-foil absolute inset-0 pointer-events-none" style={{ backgroundPosition: holoPos }} />
            <div className="absolute left-5 right-5 bottom-14">
              <p className="font-logo text-[1.35rem] font-bold text-white">{t("about.photoArt")}</p>
              <p className="mt-1 text-xs text-white/70">{t("about.artNote")}</p>
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full
              text-[0.62rem] font-mono uppercase tracking-widest text-white bg-black/50 border border-white/20 backdrop-blur-md whitespace-nowrap">
              <FaSyncAlt className="text-[0.55rem]" /> {t("about.flipBack")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
