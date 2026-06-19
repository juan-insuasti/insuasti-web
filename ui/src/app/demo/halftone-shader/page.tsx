import { WebGLCanvas } from '@/components/custom/WebGLCanvas';

import { Scene } from './scene';

export default async function App({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const debug = (await searchParams).debug === 'true';

  return (
    <section className="h-screen w-full">
      <WebGLCanvas
        debug={debug}
        camera={{
          position: [0, 0, 15],
          fov: 45,
          near: 0.1,
          far: 10000,
        }}
        gl={{ antialias: true }}
      >
        <Scene debug={debug} />
      </WebGLCanvas>
    </section>
  );
}
