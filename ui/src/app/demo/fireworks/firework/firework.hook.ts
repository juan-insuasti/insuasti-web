import { useCallback, useMemo } from 'react';

export type UseFireworkProps = {
  particles: number;
  radius: number;
  isSurface: boolean;
  shellRatio: number;
  minPointSize: number;
};

export const useFirework = ({
  particles,
  radius,
  isSurface,
  shellRatio,
  minPointSize,
}: UseFireworkProps) => {
  const getDataArrays = useCallback(() => {
    const positionsArray = new Float32Array(particles * 3);
    const sizesArray = new Float32Array(particles * 1);

    for (let i = 0; i < particles; i++) {
      const index = i * 3;

      let x, y, z, magnitude;
      do {
        x = (Math.random() - 0.5) * 2 * radius;
        y = (Math.random() - 0.5) * 2 * radius;
        z = (Math.random() - 0.5) * 2 * radius;
        magnitude = Math.sqrt(x * x + y * y + z * z);
      } while (magnitude > radius || magnitude < radius * shellRatio);

      if (isSurface) {
        positionsArray[index] = (x / magnitude) * radius;
        positionsArray[index + 1] = (y / magnitude) * radius;
        positionsArray[index + 2] = (z / magnitude) * radius;
      } else {
        positionsArray[index] = x * radius;
        positionsArray[index + 1] = y * radius;
        positionsArray[index + 2] = z * radius;
      }

      sizesArray[i] = minPointSize + Math.random() * (1 - minPointSize);
    }

    return { positionsArray, sizesArray };
  }, [particles, radius, isSurface, shellRatio, minPointSize]);

  const { positionsArray, sizesArray } = useMemo(() => getDataArrays(), [getDataArrays]);

  return { positionsArray, sizesArray };
};
