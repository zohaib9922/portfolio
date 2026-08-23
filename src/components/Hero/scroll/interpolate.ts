export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Remaps p from [inMin,inMax] to [0,1], clamped. */
export function segment(p: number, inMin: number, inMax: number) {
  return clamp01((p - inMin) / (inMax - inMin));
}

/** Smoothstep-family ease for cinematic (non-linear) motion between keyframes. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export interface Vec3Keyframe {
  p: number;
  x: number;
  y: number;
  z: number;
  fov?: number;
}

/** Piecewise-linear interpolation across an array of keyframes sorted by `p`,
 *  with an eased blend within each segment for smoother, less mechanical motion. */
export function interpolateKeyframes(
  progress: number,
  keyframes: Vec3Keyframe[],
  ease: (t: number) => number = easeInOutCubic
): { x: number; y: number; z: number; fov: number } {
  const p = clamp01(progress);

  if (p <= keyframes[0].p) {
    const k = keyframes[0];
    return { x: k.x, y: k.y, z: k.z, fov: k.fov ?? 50 };
  }
  const last = keyframes[keyframes.length - 1];
  if (p >= last.p) {
    return { x: last.x, y: last.y, z: last.z, fov: last.fov ?? 50 };
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = ease(segment(p, a.p, b.p));
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        fov: (a.fov ?? 50) + ((b.fov ?? 50) - (a.fov ?? 50)) * t,
      };
    }
  }

  return { x: last.x, y: last.y, z: last.z, fov: last.fov ?? 50 };
}

/** Exponential-ish smoothing toward a target — frame-rate independent. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
