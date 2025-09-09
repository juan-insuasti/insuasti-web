/**
 * JSON-LD schemas for different pages of the site
 *
 * Usage:
 * - Homepage: import { homepageJsonLd } from '@/lib/jsonld'
 * - Blog page: import { blogPageJsonLd } from '@/lib/jsonld'
 * - Blog post: import { blogPostJsonLd } from '@/lib/jsonld'
 * - Projects page: import { projectsPageJsonLd } from '@/lib/jsonld'
 */

export { homepageJsonLd } from './homepage';
export { blogPageJsonLd } from './blog-page';
export { blogPostJsonLd } from './blog-post';
export { projectsPageJsonLd } from './projects-page';
export { aboutPageJsonLd } from './about';

// Utility functions
export * from './utils';

// Legacy export for backward compatibility
export { homepageJsonLd as jsonLd } from './homepage';
