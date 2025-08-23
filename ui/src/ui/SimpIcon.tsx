'use client';

import { JSX } from 'react';
import { SimpleIcon } from 'simple-icons';

import { cn } from '@/lib/utils'; // Assuming you have a cn utility for class merging
interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  icon: SimpleIcon;
  size?: number | string;
  className?: string;
}

/**
 * Parse SVG string and extract elements for rendering
 */
function parseSvgIcon(svgString: string) {
  // Use a simple regex approach that works on both server and client
  const viewBoxMatch = svgString.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch?.[1] || '0 0 24 24';

  // Extract path elements and their attributes
  const pathRegex =
    /<(path|circle|rect|polygon)([^>]*)\/?>.*?<\/\1>|<(path|circle|rect|polygon)([^>]*)\s*\/>/g;
  const elements: Array<{ tag: string; attributes: Record<string, string> }> = [];

  let match;
  while ((match = pathRegex.exec(svgString)) !== null) {
    const tag = match[1] || match[3];
    const attributeString = match[2] || match[4];

    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)="([^"]*)"/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attributeString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }

    elements.push({ tag, attributes });
  }

  return { viewBox, elements };
}

export const SimpIcon = ({ icon, size = 24, className, ...props }: IconProps): JSX.Element => {
  const { viewBox, elements } = parseSvgIcon(icon.svg);

  return (
    <svg
      role="img"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="currentColor"
      className={cn('inline-block', className)}
      aria-label={icon.title}
      {...props}
    >
      <title>{icon.title}</title>
      {elements.map((element, index) => {
        const tag = element.tag.toLowerCase();
        const attributes = element.attributes;

        switch (tag) {
          case 'path':
            return <path key={index} {...attributes} />;
          case 'circle':
            return <circle key={index} {...attributes} />;
          case 'rect':
            return <rect key={index} {...attributes} />;
          case 'polygon':
            return <polygon key={index} {...attributes} />;
          default:
            return null;
        }
      })}
    </svg>
  );
};
