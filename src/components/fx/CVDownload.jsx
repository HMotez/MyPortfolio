import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaFilePdf, FaChevronDown } from "react-icons/fa";
import { useLang } from "../../i18n/lang";

const VARIANTS = {
  pink: "from-purple-600 to-pink-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]",
  cyan: "from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
};

/* "Download CV" button with an EN / FR file menu. */
export default function CVDownload({ variant = "pink", up = false }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* the CV in the page's current language comes first */
  const files = [
    { id: "en", label: t("cv.en"), file: "/cv_en.pdf", name: "Hamzaoui_Moetez_CV_EN.pdf", flag: "🇬🇧" },
    { id: "fr", label: t("cv.fr"), file: "/cv_fr.pdf", name: "Hamzaoui_Moetez_CV_FR.pdf", flag: "🇫🇷" },
  ].sort((a) => (a.id === lang ? -1 : 1));

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white
          bg-gradient-to-r ${VARIANTS[variant]} transition-all duration-300`}
      >
        <FaDownload className="text-xs" />
        {t("cv.download")}
        <FaChevronDown className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: up ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 8 : -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={`absolute ${up ? "bottom-full mb-2" : "top-full mt-2"} left-0 w-56 rounded-2xl overflow-hidden
              border border-white/10 bg-ink-2/95 backdrop-blur-xl shadow-2xl z-50`}
          >
            {files.map(({ id, label, file, name, flag }) => (
              <a
                key={id}
                href={file}
                download={name}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300
                  hover:bg-purple-500/15 hover:text-white transition-all duration-150 group"
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
