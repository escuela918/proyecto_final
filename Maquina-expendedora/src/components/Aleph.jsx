import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  Sphere,
  Torus,
} from "@react-three/drei";

import { useRef } from "react";

import "../styles/aleph.css";

function Core() {

  const mesh = useRef();

  useFrame((state) => {

    const time = state.clock.getElapsedTime();

    mesh.current.rotation.x = time * 0.15;
    mesh.current.rotation.y = time * 0.25;

    const scale =
      1 +
      Math.sin(time * 2) * 0.04;

    mesh.current.scale.set(
      scale,
      scale,
      scale
    );

  });

  return (
    <group ref={mesh}>

      <Sphere args={[1, 64, 64]}>

        <meshStandardMaterial
          color="#d9b76c"
          emissive="#8c6a2d"
          emissiveIntensity={2}
          roughness={0.15}
          metalness={0.8}
        />

      </Sphere>

      <Sphere
        args={[1.15, 32, 32]}
        scale={1}
      >

        <meshBasicMaterial
          color="#d7b968"
          transparent
          opacity={0.08}
          wireframe
        />

      </Sphere>

    </group>
  );
}


function Rings() {

  const group = useRef();

  useFrame((state) => {

    const time = state.clock.getElapsedTime();

    group.current.rotation.z =
      time * 0.12;

    group.current.rotation.x =
      Math.sin(time * 0.4) * 0.2;

  });

  return (

    <group ref={group}>

      <Torus
        args={[1.7, 0.008, 16, 128]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#c9a75c"
          transparent
          opacity={0.55}
        />
      </Torus>

      <Torus
        args={[2.05, 0.006, 16, 128]}
        rotation={[Math.PI / 3, 0.4, 0]}
      >
        <meshBasicMaterial
          color="#d8c084"
          transparent
          opacity={0.3}
        />
      </Torus>

      <Torus
        args={[2.45, 0.004, 16, 128]}
        rotation={[0.4, Math.PI / 2, 0]}
      >
        <meshBasicMaterial
          color="#b9964d"
          transparent
          opacity={0.22}
        />
      </Torus>

    </group>

  );
}


function Scene() {

  return (

    <>
      <ambientLight intensity={0.3} />

      <pointLight
        position={[0, 0, 3]}
        intensity={15}
        color="#d9b76c"
      />

      <pointLight
        position={[3, 2, -3]}
        intensity={5}
        color="#ffffff"
      />

      <Float
        speed={1}
        rotationIntensity={0.15}
        floatIntensity={0.2}
      >

        <Core />

        <Rings />

      </Float>

      <Sparkles
        count={180}
        scale={7}
        size={1.2}
        speed={0.2}
        color="#e5d09a"
      />

    </>

  );
}


function Aleph() {

  return (

    <div className="aleph-3d">

      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
      >

        <Scene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
        />

      </Canvas>

    </div>

  );
}

export default Aleph;