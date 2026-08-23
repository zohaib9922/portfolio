import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { segment } from "../scroll/interpolate";

interface FloatingSymbolProps {
  symbol: string;
  orbitRadius: number;
  orbitSpeed: number;
  baseAngle: number;
  depth: number;
  height: number;
  color?: string;
  size?: number;
}

/** One of the `{ }` / `</>` / `[]` / `<>` glyphs orbiting the scene at a given depth. */
export function FloatingSymbol({
  symbol,
  orbitRadius,
  orbitSpeed,
  baseAngle,
  depth,
  height,
  color = "#eef0f6",
  size = 0.42,
}: FloatingSymbolProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollState.p;

    const drive = segment(p, 0, 0.6);
    const speed = orbitSpeed * (prefersReducedMotion ? 0.3 : 1 + drive * 0.8);
    const angle = baseAngle + t * speed;

    const radius = orbitRadius * (1 + drive * 0.35);
    ref.current.position.set(
      Math.cos(angle) * radius,
      height + Math.sin(t * 0.6 + baseAngle) * 0.15,
      depth + Math.sin(angle) * radius * 0.4
    );
    ref.current.rotation.y = -angle * 0.6;
    ref.current.rotation.z = Math.sin(t * 0.4 + baseAngle) * 0.15;

    const fade = 1 - segment(p, 0.72, 0.92);
    ref.current.scale.setScalar(size * fade);
  });

  return (
    <group ref={ref}>
      <Text
        fontSize={1}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#5ee6ff"
        outlineOpacity={0.5}
        outlineBlur="20%"
      >
        {symbol}
      </Text>
    </group>
  );
}
