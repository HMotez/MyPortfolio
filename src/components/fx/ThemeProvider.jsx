import { useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { ThemeContext } from "./theme";

/* index.html sets data-theme before first paint; we start from that */
const readTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

const applyTheme = (t) => {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("theme", t); } catch { /* storage blocked */ }
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  /* Switches theme with a circular reveal growing from the click point. */
  const toggleTheme = useCallback((e) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      applyTheme(next);
      flushSync(() => setTheme(next));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement;
    root.classList.add("theme-vt");
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
    vt.finished.finally(() => root.classList.remove("theme-vt"));
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
