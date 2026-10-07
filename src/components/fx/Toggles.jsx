import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "./theme";
import { useLang } from "../../i18n/lang";

/* EN | FR pill with a sliding thumb */
export function LangToggle({ id = "nav" }) {
  const { lang, setLang, t } = useLang();
  const other = lang === "en" ? "fr" : "en";
  return (
    <>
    {/* phones: one round button showing the language you'd switch to */}
    <motion.button
      type="button"
      onClick={() => setLang(other)}
      whileTap={{ scale: 0.88 }}
      aria-label={t("toggle.lang")}
      className="sm:hidden w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] font-mono text-[11px] font-bold
        uppercase text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
    >
      {other}
    </motion.button>
    <div
      role="group"
      aria-label={t("toggle.lang")}
      className="relative hidden sm:flex items-center p-1 rounded-full border border-white/10 bg-white/[0.04] font-mono text-[11px] font-bold"
    >
      {["en", "fr"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 w-9 h-7 rounded-full uppercase tracking-wider transition-colors duration-200 ${
            lang === l ? "on-accent text-white" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-thumb-${id}`}
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
    </>
  );
}

/* Sun / moon button; the theme change itself animates as a circular reveal */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const dark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      aria-label={dark ? t("toggle.toLight") : t("toggle.toDark")}
      title={dark ? t("toggle.toLight") : t("toggle.toDark")}
      className="relative w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] overflow-hidden
        flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg"
        >
          {dark ? <HiOutlineMoon /> : <HiOutlineSun />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
