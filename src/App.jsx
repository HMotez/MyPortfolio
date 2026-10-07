import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StarsBg from "./components/StarsBg";
import SmoothScroll from "./components/fx/SmoothScroll";
import Preloader from "./components/fx/Preloader";
import Cursor from "./components/fx/Cursor";
import Marquee from "./components/fx/Marquee";
import { IntroContext } from "./components/fx/IntroContext";
import ThemeProvider from "./components/fx/ThemeProvider";
import LangProvider from "./i18n/LangProvider";
import { useLang } from "./i18n/lang";

function BackToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* visible after the hero, hidden again at the very bottom so it doesn't cover the footer */
    const handler = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 140;
      setVisible(window.scrollY > 500 && !nearBottom);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toTop = () =>
    window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="btt"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={toTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full
            bg-gradient-to-br from-cyan-500 to-blue-600 text-white
            flex items-center justify-center shadow-xl
            hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
          aria-label={t("a11y.backToTop")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const skipIntro =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [introDone, setIntroDone] = useState(skipIntro);

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
      <LangProvider>
      <IntroContext.Provider value={introDone}>
        <SmoothScroll />
        {!introDone && <Preloader onDone={() => setIntroDone(true)} />}
        <Cursor />
        <StarsBg />
        <div aria-hidden className="grain fixed inset-0 z-[60] opacity-[0.35] light:opacity-[0.18]" />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <Toaster position="bottom-right" />
      </IntroContext.Provider>
      </LangProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
