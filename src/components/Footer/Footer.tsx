import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import CursorGlow from "@/components/ui/CursorGlow";

const NAV_ITEMS = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

const SOCIALS = [
  { href: "https://github.com/zohaib9922", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/zohaibhasann", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://gitlab.com/hzuhaib57", icon: FaGitlab, label: "GitLab" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <CursorGlow />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
              ZH
            </div>
            <p className="mb-1 text-base font-bold">Zohaib Hassan</p>
            <p className="mb-3 text-sm text-text-2">Full Stack Developer</p>
            <p className="max-w-xs text-sm leading-relaxed text-text-3">
              Building performant web experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-text-2 transition-colors hover:text-text-1"
                  >
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">Contact</p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hzuhaib57@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-text-1"
              >
                <FiMail size={14} /> hzuhaib57@gmail.com
              </a>
              <a
                href="tel:+923114277133"
                className="inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-text-1"
              >
                <FiPhone size={14} /> +92 311 4277133
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-3">Connect</p>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-text-1"
                >
                  <s.icon size={14} /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-8 text-xs text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zohaib Hassan. All rights reserved.</p>
          <p>Crafted with React & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
