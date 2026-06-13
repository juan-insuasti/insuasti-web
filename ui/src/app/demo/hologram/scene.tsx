'use client';

import React from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import { HolographicMaterial } from './materials/holographic/holographic';
import { Ghost } from './models/ghost';
import holographicFragmentShader from './shaders/holographic/fragment.glsl';
import holographicVertexShader from './shaders/holographic/vertex.glsl';

export function Scene() {
  const [time, setTime] = React.useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
  });

  const { colorSphere, colorGhost, colorTorus } = useControls('hologram', {
    colorSphere: '#00ff00',
    colorGhost: '#ff0000',
    colorTorus: '#0000ff',
  });

  return (
    <>
      <OrbitControls />
      {/* <Grid args={[10, 10]} position={[0, 0, 0]} /> */}
      <group position={[0, 0, 0]}></group>
      <Ghost scale={0.5} useCustomShader>
        <HolographicMaterial uniforms={{ time, color: colorGhost }} />
      </Ghost>
      <mesh position={[-5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 1]} />
        <HolographicMaterial uniforms={{ time, color: colorSphere }} />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <torusKnotGeometry args={[1, 0.4, 64, 8]} />
        <HolographicMaterial uniforms={{ time, color: colorTorus }} />
      </mesh>
      <ambientLight intensity={1} />
    </>
  );
}
