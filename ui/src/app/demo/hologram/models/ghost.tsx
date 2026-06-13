'use client';

import { Grid, useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

export type GhostProps = ThreeElements['group'] & {
  debug?: boolean;
  useCustomShader?: boolean;
  color?: string;
  children?: React.ReactNode;
};

export function Ghost({ children, debug, ...props }: GhostProps) {
  const gltf = useGLTF('/models/ghost.glb');
  const { meshes: nodes, materials } = gltf;

  return (
    <>
      <group {...props}>
        {debug && (
          <>
            <Grid args={[10, 10]} position={[0, 0, 0]} side={THREE.DoubleSide} />
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              side={THREE.DoubleSide}
            />
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              side={THREE.DoubleSide}
            />
          </>
        )}
        {nodes &&
          Object.keys(nodes).map((key) => {
            const node = nodes[key];
            const materialName = node.name.split('_')[1]; // Assuming material name is the first part of the node name
            if (node.type === 'Mesh') {
              return (
                <mesh
                  key={key}
                  geometry={node.geometry}
                  material={materials[materialName]}
                  position={[node.position.x, node.position.y - 5.8, node.position.z + 1.3]}
                  rotation={[node.rotation.x, node.rotation.y - Math.PI / 2, node.rotation.z]}
                  scale={node.scale}
                >
                  {children}
                </mesh>
              );
            }
          })}
      </group>
    </>
  );
}
