'use client';

import React from 'react';

import { Canvas } from '@react-three/fiber';

import { Scene } from './scene';

export default function App() {
  return (
    <section className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </section>
  );
}
