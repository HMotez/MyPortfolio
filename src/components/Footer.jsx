import { Link } from "react-scroll";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const social = [
  { href: "https://github.com/HMotez",               icon: FaGithub,     label: "GitHub" },
  { href: "https://linkedin.com/in/hamzaoui-moetez", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:hamzaouii.moetez@gmail.com",        icon: FaEnvelope,   label: "Email" },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.06] bg-[#050816]/80">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="home" smooth duration={600} className="cursor-pointer text-lg font-bold">
          <span className="text-white">HMoetez</span>
          <span className="text-cyan-400">.</span>
        </Link>

        <p className="text-slate-500 text-sm text-center">
          Designed &amp; Built by{" "}
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
    </footer>
  );
}
