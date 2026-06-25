import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "home",           label: "Home"       },
  { to: "about",          label: "About"      },
  { to: "skills",         label: "Skills"     },
  { to: "experience",     label: "Experience" },
  { to: "projects",       label: "Projects"   },
  { to: "certifications", label: "Certs"      },
  { to: "contact",        label: "Contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

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
          ? "backdrop-blur-md bg-[#050816]/85 border-b border-white/[0.07] shadow-2xl"
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

      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="home" smooth duration={600} className="cursor-pointer">
          <div className="text-xl font-bold tracking-tight flex items-center">
            {"HMoetez".split("").map((char, i) => (
              <motion.span
                key={i}
                className="text-white inline-block"
                /* entrance */
                initial={{ y: -22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.055, duration: 0.45, ease: "easeOut" }}
                /* continuous wave — each letter bobs with offset, pauses 3 s */
                style={{ display: "inline-block" }}
                whileHover={{ y: -5, color: "#22d3ee", scale: 1.25, transition: { duration: 0.15 } }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    duration: 0.55,
                    delay: 0.8 + i * 0.09,
                    ease: "easeInOut",
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}

            {/* pulsing glowing dot */}
            <motion.span
              className="text-cyan-400 ml-[1px]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                textShadow: [
                  "0 0 4px #22d3ee",
                  "0 0 20px #22d3ee, 0 0 40px #06b6d4",
                  "0 0 4px #22d3ee",
                ],
              }}
              transition={{
                opacity: { delay: 0.6, duration: 0.3 },
                scale:   { delay: 0.6, duration: 0.3, type: "spring", stiffness: 300 },
                textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 },
              }}
            >
              .
            </motion.span>
          </div>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8">
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
                  className={`relative text-sm font-medium block pb-1 ${
                    active === l.to ? "text-cyan-400" : "text-slate-400"
                  }`}
                  whileHover={{ y: -2, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {l.label}

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

        {/* ── Hire Me button (original style) ── */}
        <motion.a
          href="mailto:hamzaouii.moetez@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hire Me
        </motion.a>

        {/* ── Mobile hamburger ── */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
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
            className="md:hidden overflow-hidden backdrop-blur-xl bg-[#050816]/96 border-t border-white/[0.06]"
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
                    {l.label}
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
