'use client';

import { JSX, useCallback, useState } from 'react';

import * as THREE from 'three';

import { Firework } from './firework/firework';

export type SceneProps = {
  debug?: boolean;
};

export default function Scene({ debug }: SceneProps) {
  const [fireworks, setFireworks] = useState<{ id: number; children: JSX.Element }[]>([]);

  const removeFirework = useCallback((id: number) => {
    setFireworks((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const addFirework = useCallback(
    (position: [number, number, number] = [0, 0, 0]) => {
      setFireworks((prev) => {
        const id = new Date().getTime();
        return [
          ...prev,
          {
            id,
            children: (
              <Firework
                key={id}
                onComplete={() => removeFirework(id)}
                position={position}
                debug={debug}
                random
              />
            ),
          },
        ];
      });
    },
    [removeFirework],
  );

  return (
    <>
      {/* <OrbitControls /> */}
      <mesh
        onClick={(e) => {
          addFirework([e.point.x, e.point.y, e.point.z]);
        }}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color={new THREE.Color('#fff')} transparent opacity={0} />
      </mesh>
      {fireworks.map((f) => f.children)}
    </>
  );
}
