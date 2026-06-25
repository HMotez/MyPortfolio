import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaGraduationCap, FaSchool, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { experiences } from "../data/portfolio";

const typeIcon = {
  work: FaBriefcase,
  edu:  FaGraduationCap,
};

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        y: direction === "up" ? 30 : 0,
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0a0f1e]/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-[100px] -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              My journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Experience &amp; <span className="text-cyan-400">Education</span>
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Center line desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2
            bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
          {/* Left line mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px]
            bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }) {
  const isLeft = index % 2 === 0;
  const isWork = exp.type === "work";
  const DotIcon = typeIcon[exp.type] ?? FaGraduationCap;

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-0">
      {/* Left (desktop) */}
      <div className={`hidden md:block flex-1 ${isLeft ? "pr-12" : "opacity-0 pointer-events-none"}`}>
        {isLeft && (
          <FadeIn direction="left" delay={0.1}>
            <Card exp={exp} isWork={isWork} />
          </FadeIn>
        )}
      </div>

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-xl ${
            isWork
              ? "border-cyan-400 bg-[#050816] shadow-cyan-400/30"
              : "border-purple-400 bg-[#050816] shadow-purple-400/30"
          }`}
        >
          <DotIcon className={isWork ? "text-cyan-400" : "text-purple-400"} />
        </motion.div>
      </div>

      {/* Right (desktop) */}
      <div className={`hidden md:block flex-1 ${!isLeft ? "pl-12" : "opacity-0 pointer-events-none"}`}>
        {!isLeft && (
          <FadeIn direction="right" delay={0.1}>
            <Card exp={exp} isWork={isWork} />
          </FadeIn>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-start gap-6 pl-2">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              isWork
                ? "border-cyan-400 bg-[#050816] shadow-cyan-400/20"
                : "border-purple-400 bg-[#050816] shadow-purple-400/20"
            }`}
          >
            <DotIcon className={`text-sm ${isWork ? "text-cyan-400" : "text-purple-400"}`} />
          </motion.div>
        </div>
        <FadeIn delay={0.1}>
          <Card exp={exp} isWork={isWork} />
        </FadeIn>
      </div>
    </div>
  );
}

function Card({ exp, isWork }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm
        hover:border-cyan-400/25 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wider mb-2 ${
              isWork
                ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                : "bg-purple-400/15 text-purple-400 border border-purple-400/30"
            }`}
          >
            {isWork ? <FaBriefcase className="text-[0.6rem]" /> : <FaGraduationCap className="text-[0.6rem]" />}
            {isWork ? "Work" : "Education"}
          </span>
          <h3 className="text-white font-semibold text-base leading-snug group-hover:text-cyan-400 transition-colors duration-200">
            {exp.title}
          </h3>
        </div>
        <span className="flex items-center gap-1.5 text-slate-500 text-xs font-mono whitespace-nowrap">
          <FaCalendarAlt className="text-slate-600" />
          {exp.period}
        </span>
      </div>

      <p className="flex items-center gap-1.5 text-cyan-400/80 text-sm font-medium mb-1">
        <FaBuilding className="text-xs" /> {exp.company}
      </p>
      <p className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
        <FaMapMarkerAlt className="text-xs" /> {exp.location}
      </p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

      {exp.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[0.7rem] font-medium
                bg-white/[0.06] text-slate-400 border border-white/[0.06]
                hover:text-cyan-400 hover:border-cyan-400/30 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
