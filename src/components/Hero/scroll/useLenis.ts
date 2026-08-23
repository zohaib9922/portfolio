import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./sharedState";

gsap.registerPlugin(ScrollTrigger);

let lenisSingleton: Lenis | null = null;

/**
 * Scrolls to a target smoothly through Lenis when it's mounted (desktop,
 * motion allowed); falls back to the browser's native smooth scroll
 * otherwise (reduced-motion, or before Lenis has mounted).
 */
export function scrollToSection(target: string | HTMLElement) {
  if (lenisSingleton) {
    lenisSingleton.scrollTo(target, { offset: -80 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Mounts exactly one Lenis instance for the whole app and wires it to
 * GSAP's ticker + ScrollTrigger. Call this once, at the app root — never
 * inside a section component, or you'll get duplicate scroll listeners.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (lenisSingleton) return; // guard against double-mount in StrictMode

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisSingleton = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisSingleton = null;
    };
  }, []);
}
