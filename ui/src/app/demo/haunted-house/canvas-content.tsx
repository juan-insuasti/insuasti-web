'use client';

import React from 'react';

import { OrbitControls, Sky, SkyProps, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

export default function CanvasContent() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const dirLightRef = React.useRef<THREE.DirectionalLight>(null);
  const ghostLight1Ref = React.useRef<THREE.PointLight>(null);
  const ghostLight2Ref = React.useRef<THREE.PointLight>(null);

  const floorTextures = useTexture([
    '/textures/floor/alpha.webp',
    '/textures/floor/albedo.webp',
    '/textures/floor/normal-gl.webp',
    '/textures/floor/roughness.webp',
    '/textures/floor/specular.webp',
    '/textures/floor/displacement.webp',
    '/textures/floor/ao.webp',
  ]);

  const [
    floorAlphaTexture,
    floorAlbedoTexture,
    floorNormalTexture,
    floorRoughnessTexture,
    floorSpecularTexture,
    floorDisplacementTexture,
    floorAoTexture,
  ] = floorTextures.map((texture, index) => {
    if (index === 0) {
      return texture;
    }
    if (index === 1) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  });

  const wallTextures = useTexture([
    '/textures/walls/albedo.webp',
    '/textures/walls/normal-gl.webp',
  ]);

  const [wallAlbedoTexture, wallNormalTexture, wallARMTexture] = wallTextures.map(
    (texture, index) => {
      if (index === 0) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.5, 1.5);
      return texture;
    },
  );

  const roofTextures = useTexture([
    '/textures/roof/albedo.webp',
    '/textures/roof/normal-gl.webp',
    '/textures/roof/ao-rough-metal.webp',
  ]);

  const [roofAlbedoTexture, roofNormalTexture, roofARMTexture] = roofTextures.map(
    (texture, index) => {
      if (index === 0) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 1);
      return texture;
    },
  );

  const bushTextures = useTexture([
    '/textures/bush/albedo.webp',
    '/textures/bush/normal-gl.webp',
    '/textures/bush/ao-rough-metal.webp',
  ]);

  const [bushAlbedoTexture, bushNormalTexture, bushARMTexture] = bushTextures.map(
    (texture, index) => {
      if (index === 0) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 1);
      return texture;
    },
  );

  const graveTextures = useTexture([
    '/textures/grave/albedo.webp',
    '/textures/grave/normal-gl.webp',
    '/textures/grave/ao-rough-metal.webp',
  ]);

  const [graveAlbedoTexture, graveNormalTexture, graveARMTexture] = graveTextures.map(
    (texture, index) => {
      if (index === 0) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      return texture;
    },
  );

  const doorTextures = useTexture([
    '/textures/door/alpha.webp',
    '/textures/door/color.webp',
    '/textures/door/normal.webp',
    '/textures/door/metalness.webp',
    '/textures/door/height.webp',
    '/textures/door/roughness.webp',
    '/textures/door/ao.webp',
  ]);

  const [
    doorAlphaTexture,
    doorColorTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorHeightTexture,
    doorRoughnessTexture,
    doorAoTexture,
  ] = doorTextures.map((texture, index) => {
    if (index === 0) {
      return texture;
    }
    if (index === 1) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  const walls = {
    size: {
      width: 4,
      height: 2.5,
      depth: 4,
    },
    position: {
      x: 0,
      y: 1.25,
      z: 0,
    },
  };
  const roof = {
    size: {
      radius: 3.5,
      height: 1.5,
    },
    position: {
      x: 0,
      y: walls.size.height + 1.5 / 2,
      z: 0,
    },
  };
  const door = {
    size: {
      width: 2.2,
      height: 2.2,
    },
    position: {
      x: 0,
      y: 1,
      z: walls.size.depth / 2 + 0.01,
    },
  };
  const doorLight = {
    position: {
      x: 0,
      y: 2.2,
      z: 2.5,
    },
  };

  if (dirLightRef.current && ghostLight1Ref.current && ghostLight2Ref.current) {
    dirLightRef.current.shadow.mapSize.width = 256;
    dirLightRef.current.shadow.mapSize.height = 256;
    dirLightRef.current.shadow.camera.near = 1;
    dirLightRef.current.shadow.camera.far = 20;
    dirLightRef.current.shadow.camera.top = 8;
    dirLightRef.current.shadow.camera.right = 8;
    dirLightRef.current.shadow.camera.bottom = -8;
    dirLightRef.current.shadow.camera.left = -8;

    ghostLight1Ref.current.shadow.mapSize.width = 256;
    ghostLight1Ref.current.shadow.mapSize.height = 256;
    ghostLight1Ref.current.shadow.camera.far = 7;

    ghostLight2Ref.current.shadow.mapSize.width = 256;
    ghostLight2Ref.current.shadow.mapSize.height = 256;
    ghostLight2Ref.current.shadow.camera.far = 7;
  }

  const Plane = () => (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20, 100, 100]} />
      <meshStandardMaterial
        color="#fff"
        alphaMap={floorAlphaTexture}
        transparent
        map={floorAlbedoTexture}
        normalMap={floorNormalTexture}
        roughnessMap={floorRoughnessTexture}
        roughness={0.7}
        displacementMap={floorDisplacementTexture}
        displacementScale={0.2}
        aoMap={floorAoTexture}
        metalnessMap={floorSpecularTexture}
      />
    </mesh>
  );

  const Walls = () => {
    const { width, height, depth } = walls.size;
    const { x, y, z } = walls.position;
    return (
      <mesh position={[x, y, z]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          map={wallAlbedoTexture}
          normalMap={wallNormalTexture}
          roughnessMap={wallARMTexture}
          roughness={0.7}
          aoMap={wallARMTexture}
          metalnessMap={wallARMTexture}
        />
      </mesh>
    );
  };

  const Door = () => {
    const { width, height } = door.size;
    const { x, y, z } = door.position;
    return (
      <mesh position={[x, y, z]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          alphaMap={doorAlphaTexture}
          map={doorColorTexture}
          normalMap={doorNormalTexture}
          metalnessMap={doorMetalnessTexture}
          roughnessMap={doorRoughnessTexture}
          displacementMap={doorHeightTexture}
          displacementScale={0.1}
          aoMap={doorAoTexture}
          transparent
          color={'#555'}
        />
      </mesh>
    );
  };

  const Roof = () => {
    const { radius, height } = roof.size;
    const { x, y, z } = roof.position;
    return (
      <mesh position={[x, y, z]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[radius, height, 4]} />
        <meshStandardMaterial
          map={roofAlbedoTexture}
          normalMap={roofNormalTexture}
          roughnessMap={roofARMTexture}
          roughness={0.7}
          aoMap={roofARMTexture}
          metalnessMap={roofARMTexture}
          envMapRotation={Math.PI}
        />
      </mesh>
    );
  };

  const Bush = ({ position, scale }: { position: [number, number, number]; scale: number }) => (
    <mesh position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial
        map={bushAlbedoTexture}
        normalMap={bushNormalTexture}
        roughnessMap={bushARMTexture}
        aoMap={bushARMTexture}
        metalnessMap={bushARMTexture}
        color={'#94c93a'}
      />
    </mesh>
  );

  const Grave = ({ position, scale }: { position: [number, number, number]; scale: number }) => (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[0.6, 0.8, 0.2]} />
      <meshStandardMaterial
        map={graveAlbedoTexture}
        normalMap={graveNormalTexture}
        roughnessMap={graveARMTexture}
        aoMap={graveARMTexture}
        metalnessMap={graveARMTexture}
      />
    </mesh>
  );

  const Ghost1 = () => {
    const ghostRef = React.useRef<THREE.Mesh>(null);

    useFrame((state) => {
      if (ghostRef.current) {
        const elapsedTime = state.clock.getElapsedTime();
        const radius = 4;
        const angle = (elapsedTime / Math.PI) * 2;
        ghostRef.current.position.x = Math.cos(angle) * radius;
        ghostRef.current.position.z = Math.sin(angle) * radius;
        ghostRef.current.position.y =
          Math.sin(elapsedTime * 3) * Math.sin(elapsedTime * 3.14) * Math.cos(elapsedTime * 1.32);
      }
    });

    return (
      <group ref={ghostRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ff00ff" transparent opacity={0.2} />
        </mesh>
        <pointLight
          ref={ghostLight1Ref}
          color="#ff00ff"
          intensity={4}
          distance={3}
          decay={2}
          castShadow
        />
      </group>
    );
  };

  const Ghost2 = () => {
    const ghostRef = React.useRef<THREE.Mesh>(null);
    useFrame((state) => {
      if (ghostRef.current) {
        const elapsedTime = state.clock.getElapsedTime();
        const radius = 6 + 2 * Math.sin(elapsedTime * 0.32) + 0.5 * Math.cos(elapsedTime * 1.32);
        const angle = -elapsedTime * 0.5;
        ghostRef.current.position.x = Math.cos(angle + Math.PI / 4) * radius;
        ghostRef.current.position.z = Math.sin(angle) * radius;
        ghostRef.current.position.y =
          Math.sin(elapsedTime * 3) * Math.sin(elapsedTime * 4.423) * Math.cos(elapsedTime * 1.32);
      }
    });

    return (
      <group ref={ghostRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#00aaff" transparent opacity={0.2} />
        </mesh>
        <pointLight
          ref={ghostLight2Ref}
          color="#00aaff"
          intensity={5}
          distance={3}
          decay={2}
          castShadow
        />
      </group>
    );
  };

  const skyProps: SkyProps = useControls('Sky', {
    sunPosition: {
      value: [-0.3, -0.038, -0.95],
      step: 0.1,
    },
    turbidity: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.1,
    },
    rayleigh: {
      value: 3,
      min: 0,
      max: 4,
      step: 0.001,
    },
    inclination: {
      value: 10,
      min: 0,
      max: 90,
      step: 0.1,
    },
    mieCoefficient: {
      value: 0.1,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    mieDirectionalG: {
      value: 0.95,
      min: 0,
      max: 1,
      step: 0.001,
    },
  });

  return (
    <>
      <Sky {...skyProps} distance={450000} />
      <OrbitControls />
      <fogExp2 attach="fog" args={['#02343f', 0.03]} />
      <group>
        <Plane />
        <Walls />
        <Roof />
        <Door />
      </group>
      <group>
        {Array(30)
          .fill(null)
          .map((_, i) => {
            const scale = 1 + 0.3 * Math.cos(i * 66032 + i * 213);
            const x = (i / 20) * 6 * Math.cos(i * 20533 + i * 5333);
            const z = (i / 20) * 8 * Math.sin(i * 56033 + i * 21243);
            const isPositionInHouse =
              Math.abs(x) < walls.size.width / 2 && Math.abs(z) < walls.size.depth / 2;
            const isPositionOutsidePlane = Math.abs(x) > 10 || Math.abs(z) > 10;
            if (isPositionInHouse || isPositionOutsidePlane) {
              return null;
            }
            return <Bush scale={scale} key={i} position={[x, 0.25, z]} />;
          })}
      </group>
      <group>
        {Array(20)
          .fill(null)
          .map((_, i) => {
            const scale = 1 + 0.2 * Math.cos(i * 32312 + i * 12);
            const r = 10 * Math.random();
            const angle = Math.random() * 2 * Math.PI;
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle);
            const isPositionInHouse =
              Math.abs(x) < walls.size.width && Math.abs(z) < walls.size.depth;
            const isPositionOutsidePlane = Math.abs(x) > 10 || Math.abs(z) > 10;
            if (isPositionInHouse || isPositionOutsidePlane) {
              return null;
            }
            return <Grave scale={scale} key={i} position={[x, 0.4, z]} />;
          })}
      </group>
      <ambientLight intensity={0.8} color={'#86cdff'} />
      <directionalLight
        ref={dirLightRef}
        position={[-4, 4, 3]}
        color="#86cdff"
        intensity={1}
        castShadow
      />
      <pointLight
        position={[doorLight.position.x, doorLight.position.y, doorLight.position.z]}
        color="#ff7d46"
        intensity={7}
        distance={7}
        decay={2}
        castShadow
      />
      <Ghost1 />
      <Ghost2 />
    </>
  );
}
