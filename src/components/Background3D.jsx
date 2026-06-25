import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Camera z=20, fov=65 → visible half-width ≈ 22.7 at z=0
// Use wider bounds to fill edges of any 16:9 screen
const N = 150;
const BX = 26;   // horizontal bound
const BY = 15;   // vertical bound
const BZ = 5;    // depth bound
const CONNECT_DIST = 4.5;

function Scene() {
  const { scene } = useThree();
  const r = useRef({});
  const mouse = useRef({ x: 0, y: 0 });
  const rot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5);
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * BX * 2;
      pos[i*3+1] = (Math.random() - 0.5) * BY * 2;
      pos[i*3+2] = (Math.random() - 0.5) * BZ * 2;
      vel[i*3]   = (Math.random() - 0.5) * 0.009;
      vel[i*3+1] = (Math.random() - 0.5) * 0.009;
      vel[i*3+2] = (Math.random() - 0.5) * 0.003;

      // 35% purple, 65% cyan
      if (Math.random() > 0.65) {
        col[i*3] = 0.659; col[i*3+1] = 0.333; col[i*3+2] = 0.969;
      } else {
        col[i*3] = 0.024; col[i*3+1] = 0.714; col[i*3+2] = 0.831;
      }
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);

    const maxL = (N * (N - 1)) / 2;
    const lPos  = new Float32Array(maxL * 6);
    const lCol  = new Float32Array(maxL * 6);
    const lGeo  = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lGeo.setAttribute("color",    new THREE.BufferAttribute(lCol, 3));
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 });
    const lines = new THREE.LineSegments(lGeo, lMat);

    // Spread shapes across the full visible area including edges
    const shapeDefs = [
      { geo: new THREE.IcosahedronGeometry(0.8, 0), color: "#06b6d4", x: -20, y:  8,  z: -2 },
      { geo: new THREE.OctahedronGeometry(0.9),     color: "#a855f7", x:  20, y:  4,  z: -2 },
      { geo: new THREE.IcosahedronGeometry(0.6, 0), color: "#a855f7", x: -18, y: -5,  z: -3 },
      { geo: new THREE.OctahedronGeometry(0.7),     color: "#06b6d4", x:  18, y: -8,  z: -3 },
      { geo: new THREE.IcosahedronGeometry(0.55, 0),color: "#ec4899", x:   0, y:  10, z: -2 },
      { geo: new THREE.OctahedronGeometry(0.55),    color: "#06b6d4", x: -10, y: -12, z: -4 },
      { geo: new THREE.IcosahedronGeometry(0.5, 0), color: "#a855f7", x:  12, y:  11, z: -4 },
      { geo: new THREE.OctahedronGeometry(0.6),     color: "#ec4899", x:  22, y: -2,  z: -2 },
      { geo: new THREE.IcosahedronGeometry(0.45, 0),color: "#06b6d4", x: -22, y:  1,  z: -2 },
    ];

    const shapes = shapeDefs.map(({ geo, color, x, y, z }) => {
      const mat  = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.14 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.005,
        ry: (Math.random() - 0.5) * 0.005,
      };
      return mesh;
    });

    const group = new THREE.Group();
    group.add(points, lines, ...shapes);
    scene.add(group);

    r.current = { group, points, lines, pos, vel, lPos, lCol, shapes };

    return () => {
      scene.remove(group);
      pGeo.dispose(); pMat.dispose();
      lGeo.dispose(); lMat.dispose();
      shapeDefs.forEach(d => d.geo.dispose());
      shapes.forEach(m => m.material.dispose());
    };
  }, [scene]);

  useFrame(() => {
    const { group, points, lines, pos, vel, lPos, lCol, shapes } = r.current;
    if (!group) return;

    // Smooth mouse parallax
    rot.current.x += (mouse.current.y * 0.18 - rot.current.x) * 0.028;
    rot.current.y += (mouse.current.x * 0.18 - rot.current.y) * 0.028;
    group.rotation.x = rot.current.x;
    group.rotation.y = rot.current.y;

    // Move particles
    for (let i = 0; i < N; i++) {
      pos[i*3]   += vel[i*3];
      pos[i*3+1] += vel[i*3+1];
      pos[i*3+2] += vel[i*3+2];
      if (Math.abs(pos[i*3])   > BX) vel[i*3]   *= -1;
      if (Math.abs(pos[i*3+1]) > BY) vel[i*3+1] *= -1;
      if (Math.abs(pos[i*3+2]) > BZ) vel[i*3+2] *= -1;
    }
    points.geometry.attributes.position.needsUpdate = true;

    // Update connections
    const md2 = CONNECT_DIST * CONNECT_DIST;
    let lc = 0;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const d2 = dx*dx + dy*dy + dz*dz;
        if (d2 < md2) {
          const a = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.42;
          const lp = lc * 6;
          lPos[lp]   = pos[i*3];   lPos[lp+1] = pos[i*3+1]; lPos[lp+2] = pos[i*3+2];
          lPos[lp+3] = pos[j*3];   lPos[lp+4] = pos[j*3+1]; lPos[lp+5] = pos[j*3+2];
          lCol[lp]=0.024*a; lCol[lp+1]=0.714*a; lCol[lp+2]=0.831*a;
          lCol[lp+3]=0.024*a; lCol[lp+4]=0.714*a; lCol[lp+5]=0.831*a;
          lc++;
        }
      }
    }
    lines.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.color.needsUpdate = true;
    lines.geometry.setDrawRange(0, lc * 2);

    // Rotate wireframe shapes
    for (const m of shapes) {
      m.rotation.x += m.userData.rx;
      m.rotation.y += m.userData.ry;
    }
  });

  return null;
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 65 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
