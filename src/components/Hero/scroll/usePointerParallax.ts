import { useEffect } from "react";
import { pointerState, prefersReducedMotion } from "./sharedState";

/**
 * Tracks pointer position as normalized -1..1 coordinates into pointerState.
 * No setState — consumers read pointerState directly inside useFrame/rAF.
 */
export function usePointerParallax() {
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleLeave = () => {
      pointerState.x = 0;
      pointerState.y = 0;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);
}
