'use client';

import React from 'react';

import { Canvas } from '@react-three/fiber';

import BurgerScene from './burguer-scene';

export default function App() {
  return (
    <section className="h-screen w-full">
      <Canvas camera={{ position: [5, 5, 20], fov: 45 }}>
        <BurgerScene />
      </Canvas>
    </section>
  );
}
