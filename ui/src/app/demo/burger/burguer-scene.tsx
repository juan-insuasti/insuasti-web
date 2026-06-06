'use client';

import React from 'react';

import { OrbitControls, useCubeTexture, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function BurgerScene() {
  const gltf = useGLTF('/models/burger.glb');
  const { meshes: nodes, materials } = gltf;
  const torusRef = React.useRef<THREE.Mesh>(null!);

  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], {
    path: '/envs/restaurant/',
  });

  const scene = useThree((state) => state.scene);
  scene.background = envMap;
  scene.environment = envMap;
  scene.environmentIntensity = 2;
  scene.backgroundIntensity = 2;
  scene.backgroundBlurriness = 0.05;

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta;
    }
  });

  return (
    <>
      <OrbitControls />

      {/* <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh> */}
      <group dispose={null} scale={0.1} position={[0, 0, 0]}>
        <mesh geometry={nodes.Cube.geometry} material={materials.BunMaterial} />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials.MeatMaterial}
          position={[0, 0.69, 0]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.BunMaterial}
          position={[0, 6.981, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <mesh geometry={nodes.Plane.geometry} material={materials.CheeseMaterial} />
      </group>
      {/* <primitive object={gltf.scene} /> */}
      {/* <group position={[-2, 1.5, -1.5]}>
        <pointLight intensity={10} castShadow />
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group> */}
      {/* <ambientLight intensity={1} /> */}
    </>
  );
}
