import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./fx/Logo";
import { useIntroDone } from "./fx/IntroContext";
import { LangToggle, ThemeToggle } from "./fx/Toggles";
import { useLang } from "../i18n/lang";

const links = ["home", "about", "skills", "experience", "projects", "certifications", "contact"]
  .map((to) => ({ to, key: `nav.${to}` }));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const introDone = useIntroDone();
  const { t } = useLang();

  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      setScrolled(window.scrollY > 60);
      setProgress((window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink/85 border-b border-white/[0.07] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] z-10 rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
        }}
      />

      {/* ── Animated top border (always visible) ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="h-full w-[60%]"
          style={{ background: "linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="home" smooth duration={600} className="cursor-pointer" aria-label={t("nav.top")}>
          <Logo play={introDone} />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l, i) => (
            <motion.li
              key={l.to}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: "easeOut" }}
            >
              <Link
                to={l.to}
                smooth
                duration={600}
                offset={-80}
                spy
                onSetActive={() => setActive(l.to)}
                className="cursor-pointer"
              >
                <motion.span
                  className={`relative text-sm font-medium block pb-1 whitespace-nowrap transition-colors ${
                    active === l.to ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {t(l.key)}

                  {/* sliding active underline */}
                  {active === l.to && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* active dot below */}
                  {active === l.to && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.6, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    />
                  )}

                  {/* hover underline */}
                  {active !== l.to && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[1px] rounded-full bg-slate-500/40"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.22 }}
                    />
                  )}
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* ── Toggles + Hire Me ── */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3 ml-auto lg:ml-0"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: "easeOut" }}
        >
          <LangToggle />
          <ThemeToggle />
          <motion.a
            href="mailto:hamzaouii.moetez@gmail.com"
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("nav.hire")}
          </motion.a>
        </motion.div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          className="lg:hidden flex flex-col gap-1.5 p-2 ml-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={t("nav.menu")}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.88 }}
        >
          <motion.span
            className="block w-6 h-0.5 bg-slate-300 rounded-full"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-slate-300 rounded-full"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-slate-300 rounded-full"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28 }}
          />
        </motion.button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-ink/96 border-t border-white/[0.06]"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ x: -28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.055, duration: 0.32, ease: "easeOut" }}
                >
                  <Link
                    to={l.to}
                    smooth
                    duration={600}
                    offset={-80}
                    className="flex items-center gap-3 py-3 px-3 rounded-lg text-slate-300 text-sm font-medium
                      hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-200 cursor-pointer group"
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors"
                      whileHover={{ scale: 1.5 }}
                    />
                    {t(l.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
