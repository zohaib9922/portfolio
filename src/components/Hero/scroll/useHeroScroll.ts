import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, prefersReducedMotion } from "./sharedState";

gsap.registerPlugin(ScrollTrigger);

export interface HeroScrollRefs {
  section: RefObject<HTMLElement | null>;
  eyebrow: RefObject<HTMLElement | null>;
  headline: RefObject<HTMLElement | null>;
  meta: RefObject<HTMLElement | null>;
  ctaGroup: RefObject<HTMLElement | null>;
  footer: RefObject<HTMLElement | null>;
  exitHeading: RefObject<HTMLElement | null>;
}

/**
 * One coordinated master timeline for the whole hero.
 *
 * The ScrollTrigger pins the section and drives scrollState.p — the single
 * source of truth the 3D scene reads in useFrame. The same scrub also
 * drives a labeled GSAP timeline for the DOM copy, so text and scene stay
 * locked to the exact same scroll math.
 *
 * Labels: intro (0) -> enterWorld (0.25) -> deepDive (0.5) -> technology (0.75) -> exit (1)
 */
export function useHeroScroll(refs: HeroScrollRefs) {
  useLayoutEffect(() => {
    const section = refs.section.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([refs.headline.current, refs.meta.current, refs.ctaGroup.current, refs.footer.current], {
          opacity: 1,
          y: 0,
        });
        gsap.set(refs.exitHeading.current, { opacity: 0 });
        scrollState.p = 0.05;
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollState.p = self.progress;
          },
        },
        defaults: { ease: "none" },
      });

      // --- intro: 0 -> 0.25 ---------------------------------------------
      tl.addLabel("intro", 0);
      tl.to(refs.headline.current, { yPercent: -18, scale: 0.94, duration: 0.25, ease: "power2.out" }, "intro");
      tl.to(refs.meta.current, { opacity: 0.35, yPercent: -12, duration: 0.25, ease: "power1.inOut" }, "intro");
      tl.to(refs.ctaGroup.current, { opacity: 0, yPercent: -8, duration: 0.2, ease: "power1.in" }, "intro");
      tl.to(refs.eyebrow.current, { opacity: 0.4, duration: 0.25 }, "intro");

      // --- enterWorld: 0.25 -> 0.5 ----------------------------------------
      tl.addLabel("enterWorld", 0.25);
      tl.to(refs.eyebrow.current, { opacity: 0, duration: 0.15 }, "enterWorld");
      tl.to(
        refs.headline.current,
        { opacity: 0, yPercent: -38, scale: 0.82, duration: 0.25, filter: "blur(6px)", ease: "power1.in" },
        "enterWorld"
      );
      tl.to(refs.meta.current, { opacity: 0, duration: 0.15 }, "enterWorld");
      tl.to(refs.footer.current, { opacity: 0, yPercent: -10, duration: 0.15 }, "enterWorld");

      // --- deepDive: 0.5 -> 0.75 -------------------------------------------
      tl.addLabel("deepDive", 0.5);

      // --- technology: 0.75 -> 1 (also the exit) --------------------------
      tl.addLabel("technology", 0.75);
      tl.fromTo(
        refs.exitHeading.current,
        { opacity: 0, yPercent: 24 },
        { opacity: 1, yPercent: 0, duration: 0.2, ease: "power2.out" },
        "technology+=0.1"
      );

      tl.addLabel("exit", 1);
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
