import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FaGithub, FaGraduationCap, FaMapMarkerAlt, FaRegCopy, FaCheck, FaLanguage, FaBolt, FaArrowRight,
} from "react-icons/fa";
import { personalInfo } from "../data/portfolio";
import { useLang } from "../i18n/lang";
import SectionHeading from "./fx/SectionHeading";
import HoloPortrait from "./fx/HoloPortrait";
import CountUp from "./fx/CountUp";
import CVDownload from "./fx/CVDownload";
import { trackSpotlight } from "./fx/spotlight";

const EASE = [0.22, 1, 0.36, 1];

/* ── Statement whose words light up one by one as you scroll ─────────── */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

function ScrollStatement({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display font-semibold text-2xl sm:text-3xl md:text-[2.6rem] leading-[1.2] tracking-tight
        text-white max-w-5xl mx-auto text-center mb-20"
    >
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ── Bento grid: tiles reveal in sequence, borders follow the pointer ── */
const tileVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

function Tile({ className = "", children }) {
  return (
    <motion.div variants={tileVariants} className={`bento-card ${className}`}>
      {children}
    </motion.div>
  );
}

function TileLabel({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-500 mb-4">
      <Icon className="text-cyan-400 text-xs" />
      {children}
    </p>
  );
}

function BentoGrid({ children }) {
  return (
    <motion.div
      onPointerMove={(e) => trackSpotlight(e.currentTarget, e)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.08 }}
      className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {children}
    </motion.div>
  );
}

/* ── Individual tiles ─────────────────────────────────────────────────── */
/* The portrait tile is the holographic card itself (no tile chrome) */
function PortraitTile() {
  return (
    <motion.div variants={tileVariants} className="relative md:row-span-2 min-h-[520px]">
      <HoloPortrait
        photo="/profile-cutout.webp"
        art="/avatar.jpg"
        name="Hamzaoui Moetez"
        role={{ en: "Full-Stack Developer · AI", fr: "Développeur Full-Stack · IA" }}
      />
    </motion.div>
  );
}

function IntroTile() {
  const { t, tr } = useLang();
  return (
    <Tile className="lg:col-span-2 p-7 md:p-8 flex flex-col justify-between">
      <h3 className="font-display text-2xl md:text-[2rem] font-bold leading-tight text-white mb-5">
        {t("about.headline")} <span className="text-gradient-anim">{t("about.headlineAccent")}</span>
      </h3>
      <div className="space-y-3">
        {personalInfo.bio.slice(0, 2).map((p, i) => (
          <p key={i} className="text-slate-400 leading-relaxed text-[0.95rem]">{tr(p)}</p>
        ))}
      </div>
    </Tile>
  );
}

/* Split-flap style digits: each changed character slides in */
function FlipText({ text }) {
  return (
    <span className="inline-flex tabular-nums">
      {text.split("").map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden h-[1.1em] leading-[1.1em]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              className="inline-block"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

function LocationTile() {
  const { t, tr, lang } = useLang();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: personalInfo.timeZone,
  }).format(now);
  const zone = new Intl.DateTimeFormat("en-GB", { timeZone: personalInfo.timeZone, timeZoneName: "short" })
    .formatToParts(now).find((p) => p.type === "timeZoneName")?.value;

  return (
    <Tile className="p-6 flex flex-col justify-between min-h-[220px]">
      <div aria-hidden className="absolute inset-0 dot-grid opacity-60 -z-10" />
      {/* radar ping on the map */}
      <div aria-hidden className="absolute right-8 top-8 -z-10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute -left-10 -top-10 w-20 h-20 rounded-full border border-cyan-400/50"
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
          />
        ))}
        <span className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
      </div>

      <TileLabel icon={FaMapMarkerAlt}>{t("about.basedIn")}</TileLabel>
      <div>
        <p className="font-display text-xl font-bold text-white">{tr(personalInfo.location)}</p>
        <p className="mt-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-slate-500">
          {t("about.localTime")} · {zone}
        </p>
        <p className="font-display text-3xl font-bold text-cyan-400 mt-1" aria-live="off">
          <FlipText text={time} />
        </p>
      </div>
    </Tile>
  );
}

function StatsTile() {
  const { t } = useLang();
  return (
    <Tile className="md:col-span-2 p-6 md:p-8">
      <div className="grid grid-cols-3 divide-x divide-white/[0.07] h-full">
        {personalInfo.stats.map((s) => (
          <div key={s.key} className="flex flex-col items-center justify-center text-center px-2">
            <span className="font-display text-5xl md:text-6xl font-bold leading-none text-gradient-anim">
              <CountUp value={s.number} />
            </span>
            <span className="mt-3 text-xs md:text-sm text-slate-400">{t(`about.stat.${s.key}`)}</span>
          </div>
        ))}
      </div>
    </Tile>
  );
}

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "Bonjour", lang: "fr" },
  { text: "مرحبا", lang: "ar" },
];

function LanguagesTile() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const g = GREETINGS[i];

  return (
    <Tile className="p-6 flex flex-col justify-between min-h-[220px]">
      <TileLabel icon={FaLanguage}>{t("about.languages")}</TileLabel>
      <div className="relative h-16 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={g.text}
            lang={g.lang}
            dir={g.lang === "ar" ? "rtl" : "ltr"}
            className="absolute inset-x-0 font-display text-5xl font-bold text-white"
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {g.text}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-slate-400 text-sm">{t("about.languagesList")}</p>
    </Tile>
  );
}

function EducationTile() {
  const { t } = useLang();
  return (
    <Tile className="p-6 flex flex-col justify-between min-h-[200px]">
      <TileLabel icon={FaGraduationCap}>{t("about.education")}</TileLabel>
      <motion.div
        aria-hidden
        className="absolute -right-6 -bottom-8 text-[9rem] text-white/[0.04] -z-10"
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaGraduationCap />
      </motion.div>
      <div>
        <p className="font-display text-lg font-bold text-white leading-snug">{t("about.degree")}</p>
        <p className="text-slate-400 text-sm mt-1">{t("about.school")}</p>
      </div>
    </Tile>
  );
}

/* Cycles a highlight through what I'm doing now */
function NowTile() {
  const { t } = useLang();
  const items = t("about.nowItems");
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % items.length), 2400);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <Tile className="p-6 min-h-[200px]">
      <TileLabel icon={FaBolt}>{t("about.now")}</TileLabel>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={it} className="relative px-3 py-1.5 text-sm">
            {i === active && (
              <motion.span
                layoutId="now-highlight"
                className="absolute inset-0 rounded-lg bg-cyan-400/10 border border-cyan-400/25"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className={`relative flex items-center gap-2 transition-colors duration-300 ${
              i === active ? "text-white" : "text-slate-500"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${i === active ? "bg-cyan-400" : "bg-slate-600"}`} />
              {it}
            </span>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

function EmailTile() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <Tile className="p-6 flex flex-col justify-between min-h-[200px]">
      <p className="font-display text-2xl font-bold text-white leading-tight">{t("about.email")}</p>
      <div>
        <a
          href={`mailto:${personalInfo.email}`}
          className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors break-all mb-3"
        >
          {personalInfo.email}
        </a>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
            border border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-400/50 transition-colors overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "ok" : "copy"}
              className={`flex items-center gap-2 ${copied ? "text-emerald-400" : ""}`}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? <FaCheck /> : <FaRegCopy />}
              {copied ? t("about.copied") : t("about.copy")}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </Tile>
  );
}

function CtaTile() {
  const { t } = useLang();
  return (
    <Tile className="md:col-span-2 lg:col-span-1 p-6 flex flex-col justify-between min-h-[200px] overflow-visible">
      <div className="flex items-start justify-between">
        <p className="font-display text-2xl font-bold text-white">{t("about.cvTitle")}</p>
        <motion.span
          aria-hidden
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400"
          animate={{ rotate: [0, -45, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowRight />
        </motion.span>
      </div>
      <div className="flex flex-wrap gap-2">
        <CVDownload variant="cyan" up />
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
            border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
        >
          <FaGithub />
          {t("about.github")}
        </a>
      </div>
    </Tile>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-24 bg-ink-2/60 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          index="01"
          kicker={t("about.kicker")}
          title={t("about.title")}
          accent={t("about.accent")}
          ghost={t("about.ghost")}
        />

        <ScrollStatement key={t("about.statement")} text={t("about.statement")} />

        <BentoGrid>
          <PortraitTile />
          <IntroTile />
          <LocationTile />
          <StatsTile />
          <LanguagesTile />
          <EducationTile />
          <NowTile />
          <EmailTile />
          <CtaTile />
        </BentoGrid>
      </div>
    </section>
  );
}
