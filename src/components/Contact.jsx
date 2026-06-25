import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  { icon: FaEnvelope,      label: "Email",    value: "hamzaouii.moetez@gmail.com", href: "mailto:hamzaouii.moetez@gmail.com" },
  { icon: FaPhone,         label: "Phone",    value: "+216 95 200 179",             href: "tel:+21695200179" },
  { icon: FaMapMarkerAlt,  label: "Location", value: "Monastir, Tunisia",           href: null },
];

const socialLinks = [
  { href: "https://github.com/HMotez",               icon: FaGithub,     label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
];

export default function Contact() {
  const [form, setForm]       = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const toastId = toast.loading("Sending message…", {
      style: { background: "#0a0f1e", color: "#e2e8f0", border: "1px solid rgba(6,182,212,0.3)" },
    });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Server error");

      toast.success("Message sent successfully! I'll get back to you soon 🚀", {
        id: toastId,
        duration: 5000,
        style: { background: "#0a0f1e", color: "#e2e8f0", border: "1px solid rgba(6,182,212,0.4)" },
      });

      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send. Please try again or email me directly.", {
        id: toastId,
        duration: 5000,
        style: { background: "#0a0f1e", color: "#e2e8f0", border: "1px solid rgba(239,68,68,0.4)" },
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
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">Let's talk</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-[0.95rem] leading-relaxed">
              I'm currently looking for an{" "}
              <span className="text-cyan-400 font-medium">alternance</span> or exciting opportunities.
              Whether you have a question or a project idea — my inbox is always open!
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <FadeIn direction="left">
            <div>
              <h3 className="text-white text-xl font-semibold mb-8">Contact Information</h3>

              <div className="flex flex-col gap-4 mb-10">
                {contactItems.map((item) => {
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20
                        flex items-center justify-center text-cyan-400 flex-shrink-0
                        group-hover:bg-cyan-400/20 transition-colors">
                        <item.icon className="text-base" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs uppercase tracking-wider">{item.label}</p>
                        <p className="text-slate-200 text-sm font-medium">{item.value}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-4">Find me on</p>
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
              className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    name="from_email"
                    type="email"
                    required
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Alternance Opportunity"
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
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
                {sending ? "Sending…" : "Send Message"}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
