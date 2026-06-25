import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaGithub, FaFileAlt, FaHeartbeat, FaHotel, FaUniversity,
  FaArrowRight, FaStar,
} from "react-icons/fa";
import { projects } from "../data/portfolio";

const projectConfig = {
  "GED — ISO 9001 Quality System": {
    Icon: FaFileAlt,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
  },
  "TrueCare AI — Medical Reimbursements": {
    Icon: FaHeartbeat,
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-600",
  },
  "Hotel Management System": {
    Icon: FaHotel,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
  },
  "University SOA System": {
    Icon: FaUniversity,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
  },
};

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              What I've built
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              My <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
              A selection of projects I've engineered — from AI systems to enterprise-grade applications.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} index={i + 1} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.45}>
          <div className="text-center">
            <a
              href="https://github.com/HMotez"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm
                border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400
                transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <FaGithub className="text-lg" />
              View All Projects on GitHub
              <FaArrowRight className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const cfg = projectConfig[project.title] ?? {
    Icon: FaFileAlt,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
  };
  const { Icon, color, gradient } = cfg;
  const indexStr = String(index).padStart(2, "0");

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative rounded-2xl border border-white/[0.07] bg-[#080d1e] overflow-hidden group
        hover:border-white/[0.14] transition-colors duration-300 flex flex-col"
    >
      {/* Top gradient line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Left accent bar */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
      />

      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${color}0d 0%, transparent 65%)` }}
      />

      {/* Watermark index */}
      <div className="absolute top-3 right-4 text-8xl font-black text-white/[0.025] select-none pointer-events-none leading-none">
        {indexStr}
      </div>

      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <Icon className="text-white text-xl" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-[0.14em] px-2.5 py-0.5
                  rounded-full border border-white/[0.08] bg-white/[0.04] inline-block w-fit"
              >
                {project.subtitle}
              </span>
              <span className="text-[0.62rem] font-mono text-slate-600 pl-0.5">#{indexStr}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {project.featured && (
              <span
                className="flex items-center gap-1.5 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${color}18`,
                  color,
                  border: `1px solid ${color}35`,
                }}
              >
                <FaStar className="text-[0.5rem]" />
                Featured
              </span>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500
                border border-white/[0.07] hover:text-white hover:border-white/20
                transition-all duration-200 hover:bg-white/[0.06]"
              aria-label="GitHub"
            >
              <FaGithub className="text-base" />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-snug mb-3">
          {project.title}
        </h3>

        {/* Accent divider */}
        <div
          className="w-10 h-[2px] rounded-full mb-4 opacity-75 group-hover:w-16 transition-all duration-500"
          style={{ background: color }}
        />

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Footer: tags + CTA */}
        <div className="flex items-end justify-between gap-3 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[0.68rem] font-mono font-medium
                  bg-white/[0.05] text-slate-400 border border-white/[0.06]
                  group-hover:border-white/10 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold
              transition-all duration-200 group/cta whitespace-nowrap"
            style={{ color }}
          >
            View Code
            <FaArrowRight className="text-[0.6rem] group-hover/cta:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
