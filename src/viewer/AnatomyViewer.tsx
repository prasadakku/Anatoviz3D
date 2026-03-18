import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, Suspense, useRef } from "react";
import * as THREE from "three";
import type { MuscleFinding, Severity } from "../parser/reportParser";

type System = "full" | "muscular" | "skeletal" | "nerves";

export type ViewerProps = {
  system: System;
  highlights: MuscleFinding[];
};

// 🔥 Clear color per severity
const colorMap: Record<Severity, string> = {
  NORMAL: "#22c55e",   // green
  MILD: "#eab308",     // yellow
  MODERATE: "#f97316", // orange
  SEVERE: "#ef4444",   // red
};

const paths = {
  full: "/models/human_full.glb",
  muscular: "/models/human_muscle.glb",
  skeletal: "/models/human_skeletal.glb",
  nerves: "/models/human_nerves.glb",
} as const;

function HumanModel({ system, highlights }: ViewerProps) {
  const { scene } = useGLTF(paths[system]) as any;
  const { camera } = useThree();

  const highlightedMeshesRef = useRef<Record<string, THREE.Mesh>>({});

  // One‑time setup per system: clone materials, base emissive, center model, set camera
  useEffect(() => {
    console.log("[AnatomyViewer] Loaded system:", system);

    scene.traverse((m: any) => {
      if (!m.isMesh) return;

      console.log("Scene mesh:", m.name);

      if (!m.userData.__baseMaterialCloned && m.material) {
        m.material = m.material.clone();
        m.userData.__baseMaterialCloned = true;
      }

      if (m.material && "emissive" in m.material) {
        m.material.emissive = new THREE.Color("#000000");
        (m.material as any).emissiveIntensity = 0.05;
      }
    });

    scene.position.set(0, 0, 0);
    scene.rotation.set(0, Math.PI * 0.3, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(0, 0, 4);
    cam.lookAt(0, 0, 0);
  }, [scene, camera, system]);

  // Apply highlights whenever findings change
  useEffect(() => {
    console.log("=== HIGHLIGHTS FROM PARSER ===");
    console.table(highlights);

    const highlighted: Record<string, THREE.Mesh> = {};

    scene.traverse((m: any) => {
      if (!m.isMesh || !m.material) return;

      // reset base
      if ("emissive" in m.material) {
        m.material.emissive.set("#000000");
        (m.material as any).emissiveIntensity = 0.05;
      }

      // flexible name match: exact or startsWith (handles .001, etc.)
      const hit = highlights.find(
        (h) => m.name === h.meshName || m.name.startsWith(h.meshName)
      );

      if (hit && "emissive" in m.material) {
        const color = colorMap[hit.severity];
        m.material.emissive = new THREE.Color(color);
        (m.material as any).emissiveIntensity = 2.0;
        highlighted[m.name] = m;
        console.log("MATCHED HIGHLIGHT:", hit.meshName, "->", m.name);
      }
    });

    highlightedMeshesRef.current = highlighted;
  }, [scene, highlights]);

  // Pulse only the highlighted meshes
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    Object.entries(highlightedMeshesRef.current).forEach(([name, mesh]) => {
      const finding = highlights.find(
        (h) => name === h.meshName || name.startsWith(h.meshName)
      );
      const severity = finding?.severity ?? "MILD";

      const speed =
        severity === "SEVERE" ? 4 : severity === "MODERATE" ? 3 : 2;
      const base =
        severity === "SEVERE" ? 1.8 : severity === "MODERATE" ? 1.4 : 1.1;
      const pulse = base + 0.4 * Math.sin(t * speed);

      if ((mesh as any).material && "emissive" in (mesh as any).material) {
        (mesh as any).material.emissiveIntensity = THREE.MathUtils.clamp(
          pulse,
          0.6,
          2.5
        );
      }
    });
  });

  return <primitive object={scene} scale={3.0} position={[0, 0, 0]} />;
}

function Loader() {
  return (
    <mesh scale={1.5} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#00d4ff"
        metalness={0.8}
        roughness={0.1}
        emissive="#00d4ff"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export default function AnatomyViewer({ system, highlights }: ViewerProps) {
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "rgba(15, 23, 42, 0.6)",
        borderRadius: "28px",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 4] }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.9} color="#00d4ff" />
        <pointLight position={[10, -10, 10]} intensity={0.7} color="#7c3aed" />
        <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#0f172a" />

        <Suspense fallback={<Loader />}>
          <HumanModel system={system} highlights={highlights} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}
          minDistance={2}
          maxDistance={10}
          enablePan
          enableZoom
          enableRotate
          dampingFactor={0.08}
          rotateSpeed={0.8}
          zoomSpeed={1.2}
          autoRotate={false}
        />
      </Canvas>

      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
          backdropFilter: "blur(25px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "20px",
          padding: "12px 24px",
          color: "rgba(255,255,255,0.95)",
          fontWeight: 700,
          fontSize: "0.95rem",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          transition: "all 0.4s ease",
          zIndex: 100,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        }}
        onClick={resetView}
      >
        🎯 Reset View
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.20)",
          borderRadius: "16px",
          padding: "10px 20px",
          color: "rgba(255,255,255,0.95)",
          fontWeight: 700,
          fontSize: "0.95rem",
          zIndex: 100,
        }}
      >
        {system.charAt(0).toUpperCase() + system.slice(1)} System
        {highlights.length > 0 && ` • ${highlights.length} Highlights`}
      </div>
    </div>
  );
}
