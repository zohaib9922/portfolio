import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaReact, FaVuejs, FaLaravel, FaNodeJs, FaPhp, FaAws, FaDocker } from "react-icons/fa";
import { SiMysql, SiTypescript, SiTailwindcss } from "react-icons/si";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedUnderlineLink from "@/components/ui/AnimatedUnderlineLink";
import CircuitBackground from "./CircuitBackground";

const Scene3D = lazy(() => import("./Scene3D"));

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

const slides = [
  {
    eyebrow: "Full-Stack Developer",
    words: [
      { text: "ZOHAIB", style: "solid" },
      { text: "HASSAN", style: "stroke" },
      { text: "DEV", style: "fade" },
    ],
    roles: ["React", "Laravel", "Cloud"],
    desc: "Building scalable, high-performance web applications with React, Laravel, and cloud-native architectures that handle real-world traffic.",
  },
  {
    eyebrow: "Frontend Engineer",
    words: [
      { text: "REACT", style: "solid" },
      { text: "SPECIALIST", style: "stroke" },
      { text: "UI/UX", style: "fade" },
    ],
    roles: ["Next.js", "Tailwind", "Framer Motion"],
    desc: "Designing fast, responsive, and accessible user interfaces using modern React architecture and animation-forward design principles.",
  },
  {
    eyebrow: "Backend Engineer",
    words: [
      { text: "LARAVEL", style: "solid" },
      { text: "ENGINEER", style: "stroke" },
      { text: "API", style: "fade" },
    ],
    roles: ["Laravel", "MySQL", "AWS"],
    desc: "Developing secure, performant backend systems with Laravel, REST APIs, and optimized relational databases built for scale.",
  },
] as const;

const stats = [
  { n: "4+", l: "Years exp." },
  { n: "35+", l: "Projects" },
  { n: "12+", l: "Clients" },
];

const socials = [
  { href: "https://github.com/zohaib9922", icon: FiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/zohaibhasann", icon: FiLinkedin, label: "LinkedIn" },
  { href: "mailto:hzuhaib57@gmail.com", icon: FiMail, label: "Email" },
];

const TECH_MARQUEE = [
  { icon: FaReact, name: "React.js" },
  { icon: FaVuejs, name: "Vue.js" },
  { icon: FaLaravel, name: "Laravel" },
  { icon: FaNodeJs, name: "Node.js" },
  { icon: FaPhp, name: "PHP" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiMysql, name: "MySQL" },
  { icon: FaAws, name: "AWS" },
  { icon: FaDocker, name: "Docker" },
] as const;

const wordStyles: Record<string, string> = {
  solid: "text-text-1",
  stroke: "text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]",
  fade: "text-text-3",
};

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 8000);
    return () => clearInterval(id);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const slide = slides[current];

  return (
    <div id="home" className="relative min-h-screen bg-bg text-text-1">
      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-white">
              Z
            </span>
            Zohaib<span className="text-text-3">.dev</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium text-text-2 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <AnimatedUnderlineLink href={`#${item.toLowerCase()}`} className="hover:text-text-1">
                  {item}
                </AnimatedUnderlineLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-surface-1 px-3 py-1.5 text-xs font-medium text-text-2 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1 text-text-1 transition-colors hover:border-border-strong"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -60 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 60 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  {theme === "dark" ? <FiMoon /> : <FiSun />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1 text-text-1 md:hidden"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border bg-bg md:hidden"
            >
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-3 text-sm font-medium text-text-2 hover:text-text-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO BODY */}
      <section className="relative flex min-h-screen items-center pt-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_75%_65%_at_38%_45%,transparent_22%,black_68%)]">
          <div
            className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
          />

          <CircuitBackground />

          <motion.div
            className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-[#818cf8]/25 blur-3xl"
            animate={{ x: [0, 26, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-24 right-[6%] h-80 w-80 rounded-full bg-[#5eead4]/20 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 24, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-[4%] h-80 w-80 rounded-full bg-[#f0abfc]/20 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.div
            className="absolute bottom-0 right-[8%] h-96 w-96 rounded-full bg-[#fbbf24]/15 blur-3xl"
            animate={{ x: [0, -22, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3 text-sm font-medium text-text-2">
                <span className="h-px w-8 bg-accent" />
                {slide.eyebrow}
              </motion.div>

              <h1 className="mb-6 text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                {slide.words.map((w, i) => (
                  <motion.span key={i} variants={fadeInUp} className={`block ${wordStyles[w.style]}`}>
                    {w.text}
                  </motion.span>
                ))}
              </h1>

              <motion.div variants={fadeInUp} className="mb-6 flex flex-wrap gap-2">
                {slide.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-medium text-text-2"
                  >
                    {r}
                  </span>
                ))}
              </motion.div>

              <motion.p variants={fadeInUp} className="mb-8 max-w-lg text-lg text-text-2">
                {slide.desc}
              </motion.p>

              <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="#projects"
                  className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
                >
                  View my work
                </MagneticButton>
                <MagneticButton
                  href="/cv.pdf"
                  download
                  className="inline-block rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-text-1"
                >
                  Download CV
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-8">
                <div className="flex gap-8">
                  {stats.map((s) => (
                    <div key={s.l}>
                      <div className="text-2xl font-bold">{s.n}</div>
                      <div className="text-xs text-text-3">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-2 transition-colors hover:border-border-strong hover:text-text-1"
                    >
                      <s.icon />
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 max-w-md overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              >
                <div className="flex w-max items-center gap-8 motion-safe:animate-marquee">
                  {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-text-3">
                      <t.icon className="text-sm" /> {t.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — 3D */}
          <div className="relative hidden h-[480px] lg:block">
            {isLargeScreen && !shouldReduceMotion && (
              <Suspense fallback={null}>
                <Scene3D accentColor={theme === "dark" ? "#6366f1" : "#4f46e5"} />
              </Suspense>
            )}
          </div>
        </div>

        {/* slide counter dots */}
        <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-3 lg:bottom-24 lg:left-auto lg:right-6 lg:translate-x-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-accent" : "w-1.5 bg-border-strong"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-text-3">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-text-3">
          <span>Scroll to explore</span>
          <motion.span
            className="h-8 w-px bg-border-strong"
            animate={shouldReduceMotion ? {} : { scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>
    </div>
  );
}
