'use client';

import { useSearchParams } from 'next/navigation';

import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import * as THREE from 'three';

import Scene from './scene';

export default function App() {
  const searchParams = useSearchParams();
  const debug = searchParams.get('debug') === 'true';

  return (
    <section className="h-screen w-full relative">
      <Leva hidden={!debug} />
      <Canvas
        camera={{
          position: [10, 5, 11],
          rotation: new THREE.Euler(-0.42662749312687615, 0.6913486098947812, 0.28207993553724836),
          fov: 45,
          near: 0.1,
          far: 10000,
        }}
        gl={{ antialias: true }}
      >
        <Scene debug={debug} />
      </Canvas>
    </section>
  );
}
