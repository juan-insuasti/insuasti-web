'use client';

import { ReactNode } from 'react';

import { Canvas, CanvasProps } from '@react-three/fiber';
import { Leva } from 'leva';

export type WebGLCanvasProps = CanvasProps & { children: ReactNode; debug?: boolean };

export function WebGLCanvas({ children, debug, ...props }: WebGLCanvasProps) {
  return (
    <>
      <Leva hidden={!debug} />
      <Canvas {...props}>{children}</Canvas>
    </>
  );
}
