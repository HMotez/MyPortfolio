import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls, Preload, useGLTF, Html, Float, MeshDistortMaterial, Sparkles, Environment, Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import useMediaQuery from "./fx/useMediaQuery";

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

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    /* gentle float up/down */
    groupRef.current.position.y = (isMobile ? -3 : -3.25) + Math.sin(t * 0.8) * 0.08;
    /* sway, plus a lean toward the pointer */
    const targetY = -0.2 + Math.sin(t * 0.4) * 0.06 + pointer.x * 0.25;
    const targetX = -0.01 - pointer.y * 0.06;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
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

/* Glossy liquid blobs orbiting the PC, coloured with the site palette */
const BLOBS = [
  { position: [0.5, 2.6, -4.5],  scale: 0.75, color: "#06b6d4", speed: 1.6 },
  { position: [-1.5, -0.4, 4.2], scale: 0.55, color: "#a855f7", speed: 2 },
  { position: [1.5, 1.4, 3.6],   scale: 0.35, color: "#ec4899", speed: 2.4 },
];

function Blobs() {
  return BLOBS.map((b, i) => (
    <Float key={i} speed={b.speed} rotationIntensity={1.2} floatIntensity={2}>
      <mesh position={b.position} scale={b.scale}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color={b.color}
          emissive={b.color}
          emissiveIntensity={0.35}
          roughness={0.05}
          metalness={0.85}
          distort={0.45}
          speed={2}
        />
      </mesh>
    </Float>
  ));
}

export default function Hero3D() {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef(null);

  /* stop rendering while the hero is scrolled out of view */
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ComputerModel isMobile={isMobile} />
          <Blobs />
          {/* reflections for the glossy blobs, built from local light panels (no HDR download) */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, -6]} scale={[10, 4, 1]} />
            <Lightformer form="ring" intensity={4} color="#22d3ee" position={[-6, 2, 4]} scale={4} />
            <Lightformer form="ring" intensity={3} color="#ec4899" position={[6, -1, 4]} scale={3} />
            <Lightformer form="rect" intensity={2} color="#a855f7" position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
          </Environment>
          <Sparkles count={60} scale={[10, 6, 10]} size={2.5} speed={0.4} color="#67e8f9" />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
