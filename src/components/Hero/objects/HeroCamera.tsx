import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, pointerState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, interpolateKeyframes, type Vec3Keyframe } from "../scroll/interpolate";

// Camera travels from a distant establishing shot, pushes through the core
// mid-scroll (the "traveling through the world" beat), then pulls back to
// a calm wide frame for the exit/technology composition.
const KEYFRAMES: Vec3Keyframe[] = [
  { p: 0, x: 0.4, y: 0.2, z: 6.2, fov: 42 },
  { p: 0.25, x: 0.9, y: 0.35, z: 4.1, fov: 44 },
  { p: 0.5, x: 0.6, y: 0.1, z: 2.4, fov: 50 },
  { p: 0.75, x: -0.3, y: -0.15, z: 0.35, fov: 60 },
  { p: 1, x: 0, y: 0.15, z: 5.4, fov: 40 },
];

const LOOK_TARGET: Vec3Keyframe[] = [
  { p: 0, x: 1.5, y: 0, z: 0 },
  { p: 0.25, x: 1.0, y: 0.1, z: 0 },
  { p: 0.5, x: 0.2, y: 0, z: -1 },
  { p: 0.75, x: 0, y: 0, z: -2.4 },
  { p: 1, x: 0, y: 0, z: -1.6 },
];

export function HeroCamera() {
  const { camera } = useThree();
  const perspCamera = camera as THREE.PerspectiveCamera;
  const lookTarget = useRef(new THREE.Vector3(1.5, 0, 0));
  const smoothedPointer = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const p = scrollState.p;
    const target = interpolateKeyframes(p, KEYFRAMES);
    const look = interpolateKeyframes(p, LOOK_TARGET);

    const parallaxStrength = prefersReducedMotion ? 0 : 0.18;
    smoothedPointer.current.x = damp(smoothedPointer.current.x, pointerState.x, 4, delta);
    smoothedPointer.current.y = damp(smoothedPointer.current.y, pointerState.y, 4, delta);

    const px = smoothedPointer.current.x * parallaxStrength;
    const py = -smoothedPointer.current.y * parallaxStrength * 0.6;

    camera.position.x = damp(camera.position.x, target.x + px, 3.2, delta);
    camera.position.y = damp(camera.position.y, target.y + py, 3.2, delta);
    camera.position.z = damp(camera.position.z, target.z, 3.2, delta);

    lookTarget.current.set(look.x + px * 0.4, look.y + py * 0.4, look.z);
    camera.lookAt(lookTarget.current);

    if (perspCamera.isPerspectiveCamera) {
      perspCamera.fov = damp(perspCamera.fov, target.fov, 3, delta);
      perspCamera.updateProjectionMatrix();
    }
  });

  return null;
}
