'use client';

import { useSearchParams } from 'next/navigation';

import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';

import { Scene } from './scene';

export default function App() {
  const searchParams = useSearchParams();
  const debug = searchParams.get('debug') === 'true';

  return (
    <section className="h-screen w-full">
      <Leva hidden={!debug} />
      <Canvas
        camera={{
          position: [0, 0, 15],
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
