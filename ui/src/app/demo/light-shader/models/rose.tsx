'use client';

import { Grid, useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';

export type GhostProps = ThreeElements['group'] & {
  debug?: boolean;
  children?: React.ReactNode;
};

export function Rose({ debug, children, ...props }: GhostProps) {
  const gltf = useGLTF('/models/rose/his_rose_no_texture.glb');
  const { nodes, materials } = gltf;

  return (
    <>
      <group {...props}>
        {debug && (
          <>
            {/* <Grid args={[10, 10]} position={[0, 0, 0]} side={THREE.DoubleSide} /> */}
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              // side={THREE.DoubleSide}
            />
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              // side={THREE.DoubleSide}
            />
          </>
        )}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            // castShadow
            // receiveShadow
            // @ts-expect-error - The model has this property
            geometry={nodes.defaultMaterial?.geometry}
            material={materials.None}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[3, 3, 3]}
          >
            {children}
          </mesh>
        </group>
      </group>
    </>
  );
}
