'use client';

import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';

import GalaxyScene from './galaxy-scene';

export default function App() {
  return (
    <section className="h-screen w-full">
      <Leva collapsed />
      <Canvas camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 10000 }}>
        <GalaxyScene />
      </Canvas>
    </section>
  );
}
