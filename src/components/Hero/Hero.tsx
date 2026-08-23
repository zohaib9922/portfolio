import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaReact, FaVuejs, FaLaravel, FaNodeJs, FaPhp, FaAws, FaDocker } from "react-icons/fa";
import { SiMysql, SiTypescript, SiTailwindcss } from "react-icons/si";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedUnderlineLink from "@/components/ui/AnimatedUnderlineLink";
import { HeroScene } from "./objects/HeroScene";
import { useHeroScroll } from "./scroll/useHeroScroll";
import { usePointerParallax } from "./scroll/usePointerParallax";
import { useResponsiveTier } from "./scroll/useResponsiveTier";
import { scrollToSection } from "./scroll/useLenis";

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

const hero = {
  eyebrow: "Full-Stack Developer",
  words: [
    { text: "ZOHAIB", style: "solid" },
    { text: "HASSAN", style: "stroke" },
    { text: "DEV", style: "fade" },
  ],
  roles: ["React", "Laravel", "Cloud"],
  desc: "Building scalable, high-performance web applications with React, Laravel, and cloud-native architectures that handle real-world traffic.",
} as const;

const stats = [
  { n: "5+", l: "Years exp." },
  { n: "100+", l: "Projects" },
  { n: "50+", l: "Clients" },
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
  solid: "text-white",
  stroke: "text-transparent [-webkit-text-stroke:1.5px_white]",
  fade: "text-white/75",
};

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();
  const tier = useResponsiveTier();

  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const exitHeadingRef = useRef<HTMLDivElement | null>(null);

  const accentColor = theme === "dark" ? "#6366f1" : "#4f46e5";

  // The hero is a permanently dark cinematic panel (its 3D canvas has a
  // fixed dark clear color, independent of the site theme). The fixed nav
  // needs matching dark/white styling only while the hero is behind it —
  // once scrolled past, it should follow the normal theme like every
  // other section does.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  usePointerParallax();
  useHeroScroll({
    section: sectionRef,
    eyebrow: eyebrowRef,
    headline: headlineRef,
    meta: metaRef,
    ctaGroup: ctaGroupRef,
    footer: footerRef,
    exitHeading: exitHeadingRef,
  });

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    scrollToSection(hash);
    history.pushState(null, "", hash);
  };

  return (
    <div id="home" className="relative bg-bg text-text-1">
      {/* NAVBAR — dark/white while the hero (a permanently dark cinematic
          panel) is behind it, then follows the site theme like every other
          section once scrolled past. */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
          overHero ? "border-white/10 bg-[#06070a]/70" : "border-border bg-bg/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className={`flex items-center gap-2 text-lg font-semibold tracking-tight ${overHero ? "text-white" : "text-text-1"}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-white">
              Z
            </span>
            Zohaib<span className={overHero ? "text-white/45" : "text-text-3"}>.dev</span>
          </a>

          <ul className={`hidden items-center gap-8 text-sm font-medium md:flex ${overHero ? "text-white/75" : "text-text-2"}`}>
            {navItems.map((item) => (
              <li key={item}>
                <AnimatedUnderlineLink
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  className={overHero ? "hover:text-white" : "hover:text-text-1"}
                >
                  {item}
                </AnimatedUnderlineLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div
              className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium sm:flex ${
                overHero ? "border-white/10 bg-white/5 text-white/75" : "border-border bg-surface-1 text-text-2"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                overHero
                  ? "border-white/10 bg-white/5 text-white hover:border-white/25"
                  : "border-border bg-surface-1 text-text-1 hover:border-border-strong"
              }`}
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
              className={`flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${
                overHero ? "border-white/10 bg-white/5 text-white" : "border-border bg-surface-1 text-text-1"
              }`}
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
              className={`overflow-hidden border-t md:hidden ${
                overHero ? "border-white/10 bg-[#06070a]" : "border-border bg-bg"
              }`}
            >
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      setMenuOpen(false);
                      handleNavClick(e, `#${item.toLowerCase()}`);
                    }}
                    className={`block px-6 py-3 text-sm font-medium ${
                      overHero ? "text-white/75 hover:text-white" : "text-text-2 hover:text-text-1"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO BODY — pinned scroll-scrubbed sequence driving the 3D scene.
          Locked to a dark cinematic panel (matches the 3D canvas's own
          clear color) independent of the site's light/dark toggle, so the
          scene's glow/space aesthetic and its overlaid text stay legible
          in both themes. */}
      <section
        ref={sectionRef as never}
        className="relative flex h-screen items-center overflow-hidden bg-[#06070a] pt-24 text-white"
      >
        {/* 3D scene — camera flythrough driven by scroll progress */}
        <div className="absolute inset-0 z-0">
          {isLargeScreen && !shouldReduceMotion && <HeroScene tier={tier} accentColor={accentColor} />}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden [mask-image:radial-gradient(ellipse_75%_65%_at_38%_45%,transparent_22%,black_68%)]">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#06070a]/10 via-transparent to-[#06070a]" />

        <div className="relative z-[3] mx-auto w-full max-w-7xl px-6">
          {/* PRIMARY COPY */}
          <div>
            <div
              ref={eyebrowRef}
              className="mb-6 flex items-center gap-3 text-sm font-medium text-white/75"
            >
              <span className="h-px w-8 bg-accent" />
              {hero.eyebrow}
            </div>

            <h1
              ref={headlineRef}
              className="mb-6 max-w-3xl text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            >
              {hero.words.map((w, i) => (
                <span key={i} className={`block ${wordStyles[w.style]}`}>
                  {w.text}
                </span>
              ))}
            </h1>

            <div ref={metaRef} className="max-w-lg">
              <div className="mb-6 flex flex-wrap gap-2">
                {hero.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <p className="mb-8 text-lg text-white/75">{hero.desc}</p>
            </div>

            <div ref={ctaGroupRef} className="mb-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#projects"
                className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                View my work
              </MagneticButton>
              <MagneticButton
                href="/cv.pdf"
                download
                className="inline-block rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white"
              >
                Download CV
              </MagneticButton>
            </div>

            <div ref={footerRef} className="flex flex-wrap items-center gap-8">
              <div className="flex gap-8">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold text-white">{s.n}</div>
                    <div className="text-xs text-white/55">{s.l}</div>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 max-w-md overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max items-center gap-8 motion-safe:animate-marquee">
                {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-white/55">
                    <t.icon className="text-sm" /> {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXIT COPY — revealed once the camera has traveled through the scene */}
          <div
            ref={exitHeadingRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex max-w-2xl flex-col justify-center opacity-0"
          >
            <span className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              01 — Foundations
            </span>
            <h2 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turning ideas into products.
            </h2>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/55">
          <span>Scroll to explore</span>
          <motion.span
            className="h-8 w-px bg-white/25"
            animate={shouldReduceMotion ? {} : { scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>
    </div>
  );
}
