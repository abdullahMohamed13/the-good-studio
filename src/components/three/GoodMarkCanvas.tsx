import { Canvas } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GoodMark } from "./GoodMark";
import { GoodMarkFallback } from "./GoodMarkFallback";

class StageBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <GoodMarkFallback /> : this.props.children;
  }
}

export default function GoodMarkCanvas() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <StageBoundary>
      <div ref={host} className="h-full w-full">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 6.2], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={active ? "always" : "never"}
          style={{ pointerEvents: "none" }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.12;
          }}
        >
          <ambientLight color="#f4f0e3" intensity={1.5} />
          <directionalLight
            color="#fff4e2"
            intensity={2.4}
            position={[4, 6, 5]}
          />
          <directionalLight
            color="#317959"
            intensity={1.1}
            position={[-5, -2, 3]}
          />
          <pointLight
            color="#ee6845"
            intensity={26}
            distance={14}
            decay={2}
            position={[3.4, -3.6, 3.2]}
          />
          <Suspense fallback={null}>
            <GoodMark />
          </Suspense>
        </Canvas>
      </div>
    </StageBoundary>
  );
}
