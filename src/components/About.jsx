import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaGraduationCap,
  FaLanguage, FaGithub, FaDownload, FaCode, FaRocket, FaGlobe,
  FaFilePdf, FaChevronDown,
} from "react-icons/fa";

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
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
          bg-gradient-to-r from-cyan-500 to-blue-600 text-white
          hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-0.5"
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
              { label: "CV — English",  file: "/cv_en.pdf", name: "Hamzaoui_Moetez_CV_EN.pdf", flag: "🇬🇧" },
              { label: "CV — Français", file: "/cv_fr.pdf", name: "Hamzaoui_Moetez_CV_FR.pdf", flag: "🇫🇷" },
            ].map(({ label, file, name, flag }) => (
              <a
                key={label}
                href={file}
                download={name}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300
                  hover:bg-cyan-500/15 hover:text-white transition-all duration-150 group"
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
import { personalInfo } from "../data/portfolio";

const infoItems = [
  { icon: FaMapMarkerAlt, label: "Location", value: personalInfo.location },
  { icon: FaEnvelope,     label: "Email",    value: personalInfo.email },
  { icon: FaPhone,        label: "Phone",    value: personalInfo.phone },
  { icon: FaGraduationCap,label: "Degree",   value: "BSc Software Engineering (2026)" },
  { icon: FaLanguage,     label: "Languages",value: "Arabic · French · English" },
];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0f1e]/60 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Get to know me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About <span className="text-cyan-400">Me</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Avatar */}
          <FadeIn direction="left">
            <div className="relative flex flex-col items-center">
              <div className="relative mb-8">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-purple-500/25 blur-2xl -z-10 scale-110" />
                {/* Gradient border */}
                <div className="p-[3px] rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-2xl shadow-cyan-500/20">
                  <div className="rounded-[14px] overflow-hidden bg-[#050816]" style={{ width: "290px", height: "340px" }}>
                    <img
                      src="/profile.jpg"
                      alt="Hamzaoui Moetez"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Available badge — top right, professional */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 z-20"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl
                    bg-[#0d1b2a] border border-emerald-400/30 shadow-xl shadow-emerald-400/10
                    backdrop-blur-sm">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-emerald-400 text-xs font-semibold tracking-wide">Available for work</span>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
                {[
                  { number: "3+", label: "Years Coding",     icon: FaCode,    color: "#06b6d4", glow: "rgba(6,182,212,0.15)" },
                  { number: "5+", label: "Projects Built",   icon: FaRocket,  color: "#a855f7", glow: "rgba(168,85,247,0.15)" },
                  { number: "3",  label: "Languages",        icon: FaGlobe,   color: "#ec4899", glow: "rgba(236,72,153,0.15)" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -5, scale: 1.04 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex flex-col items-center py-5 px-3 rounded-2xl overflow-hidden cursor-default group"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                    />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at top, ${s.glow}, transparent 70%)` }}
                    />
                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 relative z-10"
                      style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                    >
                      <s.icon style={{ color: s.color, fontSize: "0.85rem" }} />
                    </div>
                    {/* Number */}
                    <span
                      className="text-2xl font-extrabold leading-none mb-1 relative z-10"
                      style={{ color: s.color }}
                    >
                      {s.number}
                    </span>
                    {/* Label */}
                    <span className="text-[0.65rem] text-slate-400 text-center leading-tight relative z-10">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Text */}
          <FadeIn direction="right" delay={0.15}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Full-Stack Developer &amp;{" "}
                <span className="text-cyan-400">AI Enthusiast</span>
              </h3>

              {personalInfo.bio.map((para, i) => (
                <p key={i} className="text-slate-400 leading-relaxed mb-4 text-[0.95rem]">
                  {para}
                </p>
              ))}

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]
                      hover:border-cyan-400/20 transition-colors duration-200"
                  >
                    <item.icon className="text-cyan-400 text-base flex-shrink-0" />
                    <div>
                      <p className="text-[0.7rem] text-slate-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-slate-300 text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <CVDownload />
                <a
                  href="https://github.com/HMotez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                    border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400
                    transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FaGithub />
                  GitHub Profile
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
