import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaCode, FaServer, FaPalette, FaDatabase, FaBrain, FaSyncAlt, FaJava,
  FaLock, FaNetworkWired, FaWindows,
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiCplusplus,
  SiNodedotjs, SiExpress, SiSpring, SiPhp,
  SiReact, SiTailwindcss,
  SiPostgresql, SiMysql, SiMongodb, SiGithub, SiDocker, SiPostman,
  SiTensorflow, SiScikitlearn,
} from "react-icons/si";
import { skills } from "../data/portfolio";

/* ── Icon + color + url map per technology ── */
const techMap = {
  // Languages
  "Python":        { icon: SiPython,       color: "#3776AB", url: "https://python.org" },
  "Java":          { icon: FaJava,         color: "#f89820", url: "https://java.com" },
  "JavaScript":    { icon: SiJavascript,   color: "#F7DF1E", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
  "C":             { icon: FaCode,         color: "#A8B9CC", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  "C++":           { icon: SiCplusplus,    color: "#00599C", url: "https://cplusplus.com" },
  "C#":            { icon: FaWindows,      color: "#9b59b6", url: "https://learn.microsoft.com/dotnet/csharp" },
  ".NET":          { icon: FaWindows,      color: "#512BD4", url: "https://dotnet.microsoft.com" },
  // Backend
  "Node.js":       { icon: SiNodedotjs,    color: "#339933", url: "https://nodejs.org" },
  "Express.js":    { icon: SiExpress,      color: "#ffffff", url: "https://expressjs.com" },
  "Spring Boot":   { icon: SiSpring,       color: "#6DB33F", url: "https://spring.io/projects/spring-boot" },
  "PHP":           { icon: SiPhp,          color: "#777BB4", url: "https://php.net" },
  "JavaEE":        { icon: FaJava,         color: "#f89820", url: "https://jakarta.ee" },
  // Frontend
  "React.js":      { icon: SiReact,        color: "#61DAFB", url: "https://react.dev" },
  "CSS3":          { icon: FaPalette,      color: "#1572B6", url: "https://developer.mozilla.org/docs/Web/CSS" },
  "Tailwind CSS":  { icon: SiTailwindcss,  color: "#06B6D4", url: "https://tailwindcss.com" },
  // DB & Tools
  "PostgreSQL":    { icon: SiPostgresql,   color: "#336791", url: "https://postgresql.org" },
  "MySQL":         { icon: SiMysql,        color: "#4479A1", url: "https://mysql.com" },
  "MongoDB":       { icon: SiMongodb,      color: "#47A248", url: "https://mongodb.com" },
  "Oracle":        { icon: FaDatabase,     color: "#F80000", url: "https://oracle.com/database" },
  "Git/GitHub":    { icon: SiGithub,       color: "#ffffff", url: "https://github.com" },
  "Docker":        { icon: SiDocker,       color: "#2496ED", url: "https://docker.com" },
  "Postman":       { icon: SiPostman,      color: "#FF6C37", url: "https://postman.com" },
  // AI & Automation
  "Machine Learning": { icon: SiTensorflow,   color: "#FF6F00", url: "https://tensorflow.org" },
  "NLP":              { icon: SiScikitlearn,  color: "#F7931E", url: "https://scikit-learn.org" },
  "n8n Automation":   { icon: FaNetworkWired, color: "#EA4B71", url: "https://n8n.io" },
  // Methodology
  "Scrum / Agile": { icon: FaSyncAlt,      color: "#06b6d4", url: "https://scrum.org" },
  "UML":           { icon: FaCode,         color: "#a855f7", url: "https://uml.org" },
  "REST APIs":     { icon: FaNetworkWired, color: "#10a37f", url: "https://restfulapi.net" },
  "SOA":           { icon: FaServer,       color: "#ec4899", url: "https://en.wikipedia.org/wiki/Service-oriented_architecture" },
  "JWT Auth":      { icon: FaLock,         color: "#f59e0b", url: "https://jwt.io" },
};

const categoryIcons = {
  "Languages":        { icon: FaCode,     color: "#06b6d4" },
  "Backend":          { icon: FaServer,   color: "#a855f7" },
  "Frontend":         { icon: FaPalette,  color: "#ec4899" },
  "Databases & Tools":{ icon: FaDatabase, color: "#f59e0b" },
  "AI & Automation":  { icon: FaBrain,    color: "#10b981" },
  "Methodology":      { icon: FaSyncAlt,  color: "#06b6d4" },
};

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              What I work with
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Skills &amp; <span className="text-cyan-400">Technologies</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skills.map((skill, i) => (
            <FadeIn key={skill.category} delay={i * 0.08} className="h-full">
              <SkillCard skill={skill} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const catMeta = categoryIcons[skill.category] ?? { icon: FaCode, color: "#06b6d4" };
  const CatIcon = catMeta.icon;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03]
        backdrop-blur-sm overflow-hidden group cursor-default h-full flex flex-col
        hover:border-white/15 transition-all duration-300"
    >
      {/* Hover bg glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top left, ${skill.color}12, transparent 65%)` }}
      />
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.07]"
        style={{ background: `radial-gradient(circle, ${skill.color}, transparent)` }}
      />

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
            style={{ background: `${catMeta.color}18`, border: `1px solid ${catMeta.color}35` }}
          >
            <CatIcon style={{ color: catMeta.color, fontSize: "1.2rem" }} />
          </div>
          <h3 className="text-white font-semibold text-base">{skill.category}</h3>
        </div>

        {/* Tech badges with individual icons */}
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item, idx) => {
            const tech = techMap[item];
            const TechIcon = tech?.icon;
            const techColor = tech?.color ?? "#94a3b8";
            const techUrl = tech?.url;

            return (
              <motion.a
                key={item}
                href={techUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + idx * 0.06, duration: 0.35 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                  border border-white/[0.08] bg-white/[0.04] text-slate-300
                  hover:text-white hover:border-white/25 hover:bg-white/[0.09]
                  transition-colors duration-200 cursor-pointer select-none"
                style={{ textDecoration: "none" }}
              >
                {TechIcon && (
                  <TechIcon style={{ color: techColor, fontSize: "0.85rem", flexShrink: 0 }} />
                )}
                {item}
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
