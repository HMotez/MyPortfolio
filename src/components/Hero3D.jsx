import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";

function Loader() {
  return (
    <Html center>
      <div style={{
        color: "#06b6d4",
        fontSize: "13px",
        fontFamily: "monospace",
        letterSpacing: "0.1em",
      }}>
        Loading...
      </div>
    </Html>
  );
}

function ComputerModel({ isMobile }) {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    /* gentle float up/down */
    groupRef.current.position.y = (isMobile ? -3 : -3.25) + Math.sin(t * 0.8) * 0.08;
    /* very slow sway left/right */
    groupRef.current.rotation.y = -0.2 + Math.sin(t * 0.4) * 0.06;
  });

  return (
    <group ref={groupRef}
      position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
    >
      <hemisphereLight intensity={2.5} groundColor="#ffffff" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={8}
        castShadow
        shadow-mapSize={1024}
      />
      <spotLight
        position={[20, 30, 10]}
        angle={0.15}
        penumbra={1}
        intensity={5}
        color="#ffffff"
      />
      <pointLight intensity={5} position={[10, 10, 10]} color="#ffffff" />
      <pointLight intensity={4} position={[-10, 5, -10]} color="#ffffff" />
      <pointLight intensity={3} position={[0, 5, 8]} color="#ffffff" />
      <ambientLight intensity={1.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.78 : 0.85}
      />
    </group>
  );
}

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ComputerModel isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
