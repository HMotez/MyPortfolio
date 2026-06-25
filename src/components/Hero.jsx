import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedinIn, FaDownload, FaFilePdf, FaChevronDown } from "react-icons/fa";
import { HiMail, HiArrowDown } from "react-icons/hi";
import { lazy, Suspense, useState, useRef, useEffect } from "react";
const Hero3D = lazy(() => import("./Hero3D"));

const social = [
  { href: "https://github.com/HMotez", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:hamzaouii.moetez@gmail.com", icon: HiMail, label: "Email" },
];

function CVDownload() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
          bg-gradient-to-r from-purple-600 to-pink-600 text-white
          hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300"
      >
        <FaDownload className="text-xs" />
        Download CV
        <FaChevronDown className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-0 w-52 rounded-2xl overflow-hidden
              border border-white/10 bg-[#0a0f1e]/95 backdrop-blur-xl shadow-2xl z-50"
          >
            {[
              { label: "CV — English", file: "/cv_en.pdf", name: "Hamzaoui_Moetez_CV_EN.pdf", flag: "🇬🇧" },
              { label: "CV — Français", file: "/cv_fr.pdf", name: "Hamzaoui_Moetez_CV_FR.pdf", flag: "🇫🇷" },
            ].map(({ label, file, name, flag }) => (
              <a
                key={label}
                href={file}
                download={name}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300
                  hover:bg-purple-500/15 hover:text-white transition-all duration-150 group"
              >
                <span className="text-base">{flag}</span>
                <FaFilePdf className="text-rose-400 text-xs flex-shrink-0" />
                <span className="font-medium">{label}</span>
                <FaDownload className="ml-auto text-[10px] opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] rounded-full bg-pink-500/8 blur-[80px] animate-pulse" style={{ animationDelay: "4s" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="inline-block font-mono text-sm text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5"
            >
              👋 &nbsp;Welcome to my portfolio
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4"
            >
              <span className="text-white">Hamzaoui</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#06b6d4,#a855f7,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Moetez
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 mb-6 font-light min-h-[2rem]"
            >
              <span className="text-slate-400">I'm a </span>
              <TypeAnimation
                sequence={[
                  "Full-Stack Developer",
                  2000,
                  "React.js Developer",
                  2000,
                  "Node.js Developer",
                  2000,
                  "AI Enthusiast",
                  2000,
                  "Problem Solver",
                  2000,
                ]}
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
              Passionate about building modern full-stack applications, integrating AI,
              and delivering high-impact software solutions. Currently seeking an
              <span className="text-cyan-400 font-medium"> alternance</span> opportunity.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Link
                to="projects"
                smooth
                duration={600}
                offset={-80}
                className="cursor-pointer px-7 py-3 rounded-full font-semibold text-sm
                  bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                  hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                View My Work
              </Link>
              <Link
                to="contact"
                smooth
                duration={600}
                offset={-80}
                className="cursor-pointer px-7 py-3 rounded-full font-semibold text-sm
                  border border-cyan-400/50 text-cyan-400
                  hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </Link>
              <CVDownload />
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 justify-center lg:justify-start">
              {social.map((s) => (
                <a
                  key={s.label}
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
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Canvas */}
          <motion.div
            className="lg:w-[48%] w-full h-[360px] lg:h-[480px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          >
            <Suspense fallback={<div className="w-full h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />}>
              <Hero3D />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-slate-500 text-xs font-mono tracking-widest">SCROLL</span>
          <HiArrowDown className="text-cyan-400/60 text-xl animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
