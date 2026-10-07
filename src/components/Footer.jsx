import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaArrowRight } from "react-icons/fa";
import Logo from "./fx/Logo";
import Magnetic from "./fx/Magnetic";
import { useLang } from "../i18n/lang";

const EASE = [0.22, 1, 0.36, 1];
const EMAIL = "hamzaouii.moetez@gmail.com";

const social = [
  { href: "https://github.com/HMotez",               icon: FaGithub,     label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: `mailto:${EMAIL}`,                          icon: FaEnvelope,   label: "Email" },
];

/* Round magnetic CTA wrapped in slowly rotating ring text */
function HelloButton() {
  const { t } = useLang();
  const ring = `${t("footer.ring")} • `;
  return (
    <Magnetic strength={0.4}>
      <a
        href={`mailto:${EMAIL}`}
        data-cursor={t("footer.cta")}
        className="group relative block w-44 h-44 md:w-52 md:h-52"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]" aria-hidden>
          <defs>
            <path id="hello-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
          </defs>
          <text className="fill-slate-400 font-mono uppercase" style={{ fontSize: 11 }}>
            {/* stretched to exactly one lap (2πr ≈ 515) so it never overlaps or cuts mid-word */}
            <textPath href="#hello-ring" textLength="512" lengthAdjust="spacing">{ring}</textPath>
          </text>
        </svg>
        <span
          className="absolute inset-[22%] rounded-full bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600
            flex flex-col items-center justify-center text-white font-display font-bold text-base md:text-lg
            shadow-[0_0_50px_rgba(168,85,247,0.45)] transition-transform duration-500 group-hover:scale-110"
        >
          {t("footer.cta")}
          <FaArrowRight className="mt-1 text-sm -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </span>
      </a>
    </Magnetic>
  );
}

export default function Footer() {
  const { t, lang } = useLang();
  const lines = [t("footer.line1"), t("footer.line2")];

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink/80 overflow-hidden">
      <div aria-hidden className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

      {/* ── Closing call to action ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-6">{t("footer.kicker")}</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <motion.h2
            key={lang /* replay the reveal when the language changes */}
            className="font-display font-bold tracking-tight leading-[0.92] text-[15vw] md:text-[8.5rem] text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  className={`inline-block ${i === 1 ? "text-gradient-anim" : ""}`}
                  variants={{
                    hidden: { y: "105%", rotate: 3 },
                    visible: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <div className="self-center lg:self-end">
            <HelloButton />
          </div>
        </div>

        <motion.a
          href={`mailto:${EMAIL}`}
          className="group mt-12 inline-flex items-center gap-3 text-lg md:text-2xl font-display font-semibold text-slate-300 hover:text-white transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <span className="relative">
            {EMAIL}
            <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500
              bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
          </span>
          <FaArrowRight className="text-base -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </motion.a>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/[0.06] py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="home" smooth duration={600} className="cursor-pointer" aria-label={t("nav.top")}>
            <Logo size={38} />
          </Link>

          <p className="text-slate-500 text-sm text-center">
            {t("footer.built")}{" "}
            <span className="text-cyan-400 font-medium">Hamzaoui Moetez</span>{" "}
            &copy; 2026
          </p>

          <div className="flex gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-white/[0.07] flex items-center justify-center
                  text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200"
              >
                <s.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
