import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import SectionHeading from "./fx/SectionHeading";
import { useLang } from "../i18n/lang";
import { trackSpotlight } from "./fx/spotlight";

/* VITE_API_URL: API address baked in at build time. Unset → local dev server in
   development, same site (nginx proxies /api) in a production build. */
const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        y: direction === "up" ? 30 : 0,
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

const contactItems = [
  { icon: FaEnvelope,      label: "contact.email",    value: "hamzaouii.moetez@gmail.com",                 href: "mailto:hamzaouii.moetez@gmail.com" },
  { icon: FaPhone,         label: "contact.phone",    value: "+216 95 200 179",                            href: "tel:+21695200179" },
  { icon: FaMapMarkerAlt,  label: "contact.location", value: { en: "Monastir, Tunisia", fr: "Monastir, Tunisie" }, href: null },
];

const socialLinks = [
  { href: "https://github.com/HMotez",               icon: FaGithub,     label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
];

const toastStyle = (border) => ({
  background: "var(--color-ink-2)",
  color: "var(--color-slate-200)",
  border: `1px solid ${border}`,
});

export default function Contact() {
  const { t, tr } = useLang();
  const [form, setForm]       = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const toastId = toast.loading(t("contact.toast.loading"), {
      style: toastStyle("rgba(6,182,212,0.3)"),
    });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Server error");

      toast.success(t("contact.toast.ok"), {
        id: toastId,
        duration: 5000,
        style: toastStyle("rgba(6,182,212,0.4)"),
      });

      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error(t("contact.toast.err"), {
        id: toastId,
        duration: 5000,
        style: toastStyle("rgba(239,68,68,0.4)"),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        rounded-full bg-cyan-500/4 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="06" kicker={t("contact.kicker")} title={t("contact.title")} accent={t("contact.accent")} ghost={t("contact.ghost")}>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            {t("contact.desc1")}{" "}
            <span className="text-cyan-400 font-medium">{t("contact.descHi")}</span>{" "}
            {t("contact.desc2")}
          </p>
        </SectionHeading>

        <div className="bento-grid grid lg:grid-cols-2 gap-12" onPointerMove={(e) => trackSpotlight(e.currentTarget, e)}>
          {/* Info */}
          <FadeIn direction="left">
            <div>
              <h3 className="text-white text-xl font-semibold mb-8">{t("contact.info")}</h3>

              <div className="flex flex-col gap-4 mb-10">
                {contactItems.map((item) => {
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="bento-card flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20
                        flex items-center justify-center text-cyan-400 flex-shrink-0
                        group-hover:bg-cyan-400/20 transition-colors">
                        <item.icon className="text-base" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs uppercase tracking-wider">{t(item.label)}</p>
                        <p className="text-slate-200 text-sm font-medium">{tr(item.value)}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-4">{t("contact.findMe")}</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center
                        text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10
                        transition-all duration-200 text-lg"
                    >
                      <s.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bento-card p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                    {t("contact.name")}
                  </label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder={t("contact.ph.name")}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                    {t("contact.email")}
                  </label>
                  <input
                    name="from_email"
                    type="email"
                    required
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder={t("contact.ph.email")}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                  {t("contact.subject")}
                </label>
                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t("contact.ph.subject")}
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                  {t("contact.message")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.ph.message")}
                  className="resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.97 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300
                  flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className={sending ? "animate-spin" : ""} />
                {sending ? t("contact.sending") : t("contact.send")}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
