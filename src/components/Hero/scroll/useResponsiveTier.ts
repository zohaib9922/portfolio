import { useEffect, useState } from "react";
import { getDeviceTier, type DeviceTier } from "./sharedState";

export function useResponsiveTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() =>
    getDeviceTier(typeof window !== "undefined" ? window.innerWidth : 1440)
  );

  useEffect(() => {
    let raf = 0;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      // Guard against mobile URL-bar show/hide firing height-only resizes.
      const width = window.innerWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTier(getDeviceTier(width)));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return tier;
}
