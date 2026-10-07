import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedinIn, FaBrain } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiDocker } from "react-icons/si";
import { HiMail, HiArrowDown } from "react-icons/hi";
import { lazy, Suspense, useRef } from "react";
import Magnetic from "./fx/Magnetic";
import { useIntroDone } from "./fx/IntroContext";
import CVDownload from "./fx/CVDownload";
import { useLang } from "../i18n/lang";
const Hero3D = lazy(() => import("./Hero3D"));

const EASE = [0.22, 1, 0.36, 1];

/* Glass tech badges floating around the 3D scene; `depth` sets how far they drift with the mouse */
const CHIPS = [
  { label: "React", icon: SiReact, color: "#61DAFB", className: "left-[4%] top-[14%]", depth: 28, float: 5 },
  { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E", className: "right-[2%] top-[6%]", depth: -22, float: 6 },
  { label: "AI · NLP", icon: FaBrain, color: "#c084fc", className: "left-[0%] bottom-[18%]", depth: -34, float: 7 },
  { label: "Docker", icon: SiDocker, color: "#2496ED", className: "right-[6%] bottom-[10%]", depth: 18, float: 5.5 },
];

function Chip({ chip, mx, my, index, show }) {
  const x = useTransform(mx, (v) => v * chip.depth);
  const y = useTransform(my, (v) => v * chip.depth);
  return (
    <motion.div
      className={`absolute ${chip.className} z-20 pointer-events-none hidden md:block`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1 + index * 0.12 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: chip.float, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-sm font-semibold text-white
          bg-white/[0.06] border border-white/[0.12] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <chip.icon style={{ color: chip.color }} className="text-base" />
        {chip.label}
      </motion.div>
    </motion.div>
  );
}

const social = [
  { href: "https://github.com/HMotez", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:hamzaouii.moetez@gmail.com", icon: HiMail, label: "Email" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const introDone = useIntroDone();
  const { t, lang } = useLang();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const modelScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  /* pointer → normalised (-0.5..0.5) for chip parallax, pixels for the spotlight */
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const px = useMotionValue(-1000);
  const py = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px}px ${py}px, rgba(34,211,238,0.10), transparent 60%)`;
  const onPointerMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={onPointerMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Cursor spotlight */}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

      {/* Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] rounded-full bg-pink-500/8 blur-[80px] animate-pulse" style={{ animationDelay: "4s" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] light:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">

          {/* Left — Text */}
          <motion.div
            className="lg:w-[45%] w-full text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={introDone ? "visible" : "hidden"}
            style={{ y: textY, opacity: textOpacity }}
          >
            <motion.p
              variants={itemVariants}
              className="inline-block whitespace-pre font-mono text-sm text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5"
            >
              {t("hero.welcome")}
            </motion.p>

            <motion.h1
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
              aria-label="Hamzaoui Moetez"
            >
              <span aria-hidden className="flex justify-center lg:justify-start overflow-hidden pb-1">
                {"Hamzaoui".split("").map((c, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white hover:text-cyan-400 transition-colors duration-200 cursor-default"
                    variants={{
                      hidden: { y: "110%", rotate: 12 },
                      visible: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
                    }}
                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                  >
                    {c}
                  </motion.span>
                ))}
              </span>
              <span aria-hidden className="block overflow-hidden pb-2">
                <motion.span
                  className="inline-block text-gradient-anim"
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: "0%", transition: { duration: 1, ease: EASE, delay: 0.35 } },
                  }}
                >
                  Moetez
                </motion.span>
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 mb-6 font-light min-h-[2rem]"
            >
              <span className="text-slate-400">{t("hero.iam")}</span>
              <TypeAnimation
                key={lang}
                sequence={t("hero.roles").flatMap((r) => [r, 2000])}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
                className="text-cyan-400 font-semibold"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed mb-8 mx-auto lg:mx-0"
            >
              {t("hero.desc1")}
              <span className="text-cyan-400 font-medium">{t("hero.descHi")}</span>
              {t("hero.desc2")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Magnetic>
              <Link
                to="projects"
                smooth
                duration={600}
                offset={-80}
                className="inline-block cursor-pointer px-7 py-3 rounded-full font-semibold text-sm
                  bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                  hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {t("hero.work")}
              </Link>
              </Magnetic>
              <Magnetic>
              <Link
                to="contact"
                smooth
                duration={600}
                offset={-80}
                className="inline-block cursor-pointer px-7 py-3 rounded-full font-semibold text-sm
                  border border-cyan-400/50 text-cyan-400
                  hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t("hero.touch")}
              </Link>
              </Magnetic>
              <CVDownload />
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 justify-center lg:justify-start">
              {social.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center
                    text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10
                    transition-all duration-200 hover:-translate-y-0.5 text-lg"
                >
                  <s.icon />
                </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Canvas */}
          <motion.div
            className="relative lg:w-[52%] w-full h-[380px] lg:h-[560px]"
            style={{ y: modelY, scale: modelScale }}
            data-cursor={t("cursor.drag")}
          >
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            >
              <Suspense fallback={<div className="w-full h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />}>
                <Hero3D />
              </Suspense>
            </motion.div>
            {CHIPS.map((c, i) => (
              <Chip key={c.label} chip={c} mx={mx} my={my} index={i} show={introDone} />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-slate-500 text-xs font-mono tracking-widest">{t("hero.scroll")}</span>
          <HiArrowDown className="text-cyan-400/60 text-xl animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
