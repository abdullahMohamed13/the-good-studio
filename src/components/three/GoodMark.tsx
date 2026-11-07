import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARM_COUNT = 8;

type Arm = {
  angle: number;
  length: number;
  radius: number;
  depth: number;
};

function buildArms(): Arm[] {
  return Array.from({ length: ARM_COUNT }, (_, index) => {
    const long = index % 2 === 0;
    return {
      angle: (index / ARM_COUNT) * Math.PI * 2,
      length: long ? 1.15 : 0.85,
      radius: long ? 0.135 : 0.11,
      depth: long ? 0.05 : -0.05,
    };
  });
}

export function GoodMark() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);
  const arms = useMemo(buildArms, []);

  const dustPositions = useMemo(() => {
    const positions = new Float32Array(110 * 3);
    for (let index = 0; index < 110; index += 1) {
      const radius = 2.1 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state, delta) => {
    if (reduced.current) return;

    const time = state.clock.elapsedTime;
    const mark = group.current;

    if (mark) {
      mark.rotation.y = THREE.MathUtils.damp(
        mark.rotation.y,
        Math.sin(time * 0.22) * 0.5 + pointer.current.x * 0.32,
        2.4,
        delta,
      );
      mark.rotation.x = THREE.MathUtils.damp(
        mark.rotation.x,
        -0.16 + Math.sin(time * 0.17) * 0.1 - pointer.current.y * 0.18,
        2.2,
        delta,
      );
      mark.rotation.z = Math.sin(time * 0.12) * 0.07;
      mark.position.y = Math.sin(time * 0.65) * 0.09;
    }

    if (ring.current) {
      ring.current.rotation.z += delta * 0.1;
    }

    if (dust.current) {
      dust.current.rotation.y = time * 0.025;
      dust.current.rotation.x = Math.sin(time * 0.1) * 0.08;
    }
  });

  return (
    <group rotation={[-0.16, 0.35, 0.08]}>
      <group ref={group}>
        {arms.map((arm) => {
          const center = 0.34 + arm.radius + arm.length / 2;
          const tip = 0.34 + arm.length + arm.radius * 2 + 0.01;

          return (
            <group
              key={arm.angle}
              rotation={[0, 0, arm.angle]}
              position={[0, 0, arm.depth]}
            >
              <mesh position={[0, center, 0]}>
                <capsuleGeometry args={[arm.radius, arm.length, 8, 20]} />
                <meshStandardMaterial
                  color="#102f23"
                  roughness={0.3}
                  metalness={0.22}
                />
              </mesh>
              <mesh position={[0, tip, 0]}>
                <sphereGeometry args={[0.155, 24, 24]} />
                <meshStandardMaterial
                  color="#ee6845"
                  roughness={0.28}
                  metalness={0.12}
                />
              </mesh>
            </group>
          );
        })}

        <mesh>
          <sphereGeometry args={[0.44, 40, 40]} />
          <meshStandardMaterial
            color="#102f23"
            roughness={0.26}
            metalness={0.3}
          />
        </mesh>

        <mesh ref={ring} rotation={[Math.PI / 2.35, 0.18, 0]}>
          <torusGeometry args={[1.98, 0.012, 8, 160]} />
          <meshBasicMaterial color="#ee6845" transparent opacity={0.5} />
        </mesh>

        <points ref={dust}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[dustPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#317959"
            size={0.045}
            sizeAttenuation
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}
