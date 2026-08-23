import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";

interface AmbientShapesProps {
  count?: number;
}

const dummy = new THREE.Object3D();

/** Small tetrahedra scattered as a midground depth layer, independent from
 * the core shards and the background particle field. */
export function AmbientShapes({ count = 22 }: AmbientShapesProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 7,
        y: (Math.random() - 0.5) * 4,
        z: -1.5 - Math.random() * 5,
        speed: 0.1 + Math.random() * 0.3,
        seed: Math.random() * Math.PI * 2,
        scale: 0.05 + Math.random() * 0.09,
      })),
    [count]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollState.p;
    const drift = prefersReducedMotion ? 0.05 : 1;

    data.forEach((d, i) => {
      const depthFactor = THREE.MathUtils.clamp((d.z + 8) / 8, 0.2, 1);
      dummy.position.set(
        d.x + Math.sin(t * d.speed * drift + d.seed) * 0.4,
        d.y + Math.cos(t * d.speed * drift * 0.7 + d.seed) * 0.3 - p * depthFactor * 2.2,
        d.z
      );
      dummy.rotation.set(t * d.speed * drift, t * d.speed * 0.6 * drift, d.seed);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#7bb8ff"
        emissive="#2b7d8f"
        emissiveIntensity={0.4}
        roughness={0.5}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}
