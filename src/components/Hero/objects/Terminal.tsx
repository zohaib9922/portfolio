import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, interpolateKeyframes, type Vec3Keyframe } from "../scroll/interpolate";

const POSITION_KEYFRAMES: Vec3Keyframe[] = [
  { p: 0, x: 0.4, y: -2.4, z: -2.2 },
  { p: 0.25, x: 0.2, y: -1.4, z: -1.8 },
  { p: 0.5, x: -1.9, y: -0.3, z: -0.8 },
  { p: 0.75, x: -2.4, y: 0.1, z: -2.2 },
  { p: 1, x: -1.6, y: -0.9, z: -3 },
];

export function Terminal() {
  const group = useRef<THREE.Group>(null);
  const cursor = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = scrollState.p;
    const pos = interpolateKeyframes(p, POSITION_KEYFRAMES);
    const t = state.clock.elapsedTime;

    group.current.position.x = damp(group.current.position.x, pos.x, 3, delta);
    group.current.position.y = damp(
      group.current.position.y + 0,
      pos.y + (prefersReducedMotion ? 0 : Math.sin(t * 0.35) * 0.06),
      3,
      delta
    );
    group.current.position.z = damp(group.current.position.z, pos.z, 3, delta);
    group.current.rotation.y = damp(group.current.rotation.y, 0.25 - p * 0.4, 3, delta);

    if (cursor.current) {
      cursor.current.visible = Math.sin(t * 4) > 0;
    }

    const fadeOut = p > 0.62 ? 1 - Math.min(1, (p - 0.62) / 0.2) : 1;
    group.current.scale.setScalar(Math.max(0.001, fadeOut));
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.7, 1.05, 0.05]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#08090d" roughness={0.7} metalness={0.1} />
      </RoundedBox>
      <Text position={[-0.72, 0.32, 0.03]} fontSize={0.1} color="#9aa0b4" anchorX="left" anchorY="middle">
        ~/portfolio
      </Text>
      <Text position={[-0.72, 0.1, 0.03]} fontSize={0.1} color="#5ee6ff" anchorX="left" anchorY="middle">
        $ npm run build
      </Text>
      <Text position={[-0.72, -0.1, 0.03]} fontSize={0.1} color="#eef0f6" anchorX="left" anchorY="middle">
        &gt; compiling...
      </Text>
      <mesh ref={cursor} position={[-0.34, -0.1, 0.03]}>
        <planeGeometry args={[0.09, 0.13]} />
        <meshBasicMaterial color="#5ee6ff" />
      </mesh>
    </group>
  );
}
