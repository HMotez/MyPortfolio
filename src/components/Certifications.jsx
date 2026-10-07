import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaAws, FaLinux, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { certifications } from "../data/portfolio";
import SectionHeading from "./fx/SectionHeading";
import { useLang } from "../i18n/lang";
import { trackSpotlight } from "./fx/spotlight";

const certIcons = {
  "Soft Skills, Innovation & Entrepreneurship": FaLightbulb,
  "Introduction to Amazon EC2":                 FaAws,
  "Introduction to Amazon S3":                  FaAws,
  "NDG Linux Unhatched":                        FaLinux,
};

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Certifications() {
  const { t } = useLang();
  return (
    <section id="certifications" className="py-24 bg-ink-2/60 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading index="05" kicker={t("certs.kicker")} title={t("certs.title")} accent={t("certs.accent")} ghost={t("certs.ghost")} />

        <div className="bento-grid grid md:grid-cols-2 gap-5 items-stretch" onPointerMove={(e) => trackSpotlight(e.currentTarget, e)}>
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1} className="h-full">
              <CertCard cert={cert} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert }) {
  const { tr } = useLang();
  const Icon = certIcons[cert.title] ?? FaCheckCircle;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bento-card flex items-center gap-5 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03]
        backdrop-blur-sm hover:border-white/15 transition-all duration-300 group h-full"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
        style={{
          background: `${cert.color}20`,
          border: `1px solid ${cert.color}40`,
          boxShadow: `0 0 20px ${cert.color}15`,
        }}
      >
        <Icon style={{ color: cert.color, fontSize: "1.6rem" }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-[0.92rem] leading-snug mb-1
          group-hover:text-cyan-400 transition-colors duration-200">
          {cert.title}
        </h3>
        <p className="text-slate-400 text-xs mb-2 leading-relaxed">{cert.issuer}</p>
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color: cert.color, background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
        >
          {tr(cert.date)}
        </span>
      </div>

      {/* Verified badge */}
      <MdVerified
        className="flex-shrink-0 text-2xl text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
}
