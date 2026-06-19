import * as THREE from 'three';

import { WebGLCanvas } from '@/components/custom/WebGLCanvas';

import Scene from './scene';

export default async function App({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const debug = (await searchParams).debug === 'true';

  return (
    <section className="h-screen w-full relative">
      <WebGLCanvas
        debug={debug}
        camera={{
          position: [10, 5, 11],
          rotation: new THREE.Euler(-0.42662749312687615, 0.6913486098947812, 0.28207993553724836),
          fov: 45,
          near: 0.1,
          far: 10000,
        }}
        gl={{ antialias: true }}
      >
        <Scene />
      </WebGLCanvas>
    </section>
  );
}
