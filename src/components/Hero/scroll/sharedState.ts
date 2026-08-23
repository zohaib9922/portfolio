// Deliberately NOT React state. GSAP writes to these every scroll tick and
// R3F reads them every frame inside useFrame — routing this through React
// state would re-render the whole tree ~60x/sec. Plain mutable objects +
// refs are the correct tool here.

export const scrollState = {
  /** 0 -> 1 progress through the pinned hero timeline */
  p: 0,
};

export const pointerState = {
  /** normalized -1..1, smoothed by consumers */
  x: 0,
  y: 0,
};

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type DeviceTier = "desktop" | "tablet" | "mobile";

export function getDeviceTier(width: number): DeviceTier {
  if (width < 640) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
}
