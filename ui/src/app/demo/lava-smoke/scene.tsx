'use client';

import React from 'react';

import { OrbitControls, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import lavaFragmentShader from './shaders/lava/fragment.glsl';
import lavaVertexShader from './shaders/lava/vertex.glsl';
import smokeFragmentShader from './shaders/smoke/fragment.glsl';
import smokeVertexShader from './shaders/smoke/vertex.glsl';

export default function Scene() {
  const perlinTexture = useTexture('/textures/smoke/perlin.png');
  perlinTexture.wrapS = perlinTexture.wrapT = THREE.RepeatWrapping;
  const [time, setTime] = React.useState(0);

  useFrame((state) => {
    setTime(() => state.clock.getElapsedTime());
  });

  return (
    <>
      <OrbitControls />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Smoke */}
      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[10, 10, 64, 256]} />
        <shaderMaterial
          vertexShader={smokeVertexShader}
          fragmentShader={smokeFragmentShader}
          transparent
          blending={THREE.NormalBlending}
          // wireframe
          uniforms={{
            uTime: new THREE.Uniform(time),
            uPerlinTexture: new THREE.Uniform(perlinTexture),
          }}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/*  Lava Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 64, 64]} />
        <shaderMaterial
          vertexShader={lavaVertexShader}
          fragmentShader={lavaFragmentShader}
          transparent
          // wireframe
          uniforms={{
            uTime: new THREE.Uniform(time),
          }}
        />
      </mesh>
    </>
  );
}
