import { useState } from 'react';
import Image from 'next/image';

import clsx from 'clsx';

interface MarkdownImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const MarkdownImage = ({
  src,
  alt,
  title,
  width,
  height,
  className,
}: MarkdownImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle relative paths by prepending /
  const imageSrc = src.startsWith('/') ? src : `/${src}`;

  return (
    <div className={clsx('relative my-6', className)}>
      {error ? (
        <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image: {alt}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{imageSrc}</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Image
            src={imageSrc}
            alt={alt}
            title={title}
            width={width || 800}
            height={height || 600}
            className={clsx('h-auto w-full rounded-lg shadow-lg transition-opacity duration-300', {
              'opacity-0': isLoading,
              'opacity-100': !isLoading,
            })}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          )}

          {/* Caption if title is provided */}
          {title && !error && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 italic">
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
