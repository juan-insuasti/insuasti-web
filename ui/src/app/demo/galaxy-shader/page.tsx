'use client';

import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import * as THREE from 'three';

import GalaxyScene from './galaxy-scene';

export default function App() {
  return (
    <section className="h-screen w-full">
      <Leva collapsed />
      <Canvas
        camera={{
          position: [-1.9908757513607382, -10.843449068765366, 2.8049219571559227],
          rotation: new THREE.Euler(1.3176703947622146, -0.17591377777547543, 0.59481841932217),
          fov: 45,
          near: 0.1,
          far: 10000,
        }}
        gl={{ antialias: true }}
      >
        <GalaxyScene />
      </Canvas>
    </section>
  );
}
