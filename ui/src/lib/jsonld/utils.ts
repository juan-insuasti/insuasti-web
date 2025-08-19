/**
 * Utility functions for working with JSON-LD structured data
 */

/**
 * Creates a basic Person schema for Juan Insuasti
 */
export const createPersonSchema = () => ({
  '@type': 'Person',
  name: 'Juan Insuasti',
  url: 'https://insuasti.com/',
  jobTitle: 'Frontend Developer',
  knowsAbout: [
    'React',
    'TypeScript',
    'Next.js',
    'Frontend Development',
    'Web Development',
    'JavaScript',
    'UI/UX Design',
  ],
});

/**
 * Creates a basic WebSite schema
 */
export const createWebsiteSchema = () => ({
  '@type': 'WebSite',
  name: 'Insuasti',
  url: 'https://insuasti.com/',
  author: createPersonSchema(),
});

/**
 * Creates breadcrumb navigation for a given path
 */
export const createBreadcrumbSchema = (breadcrumbs: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

/**
 * Creates an image object schema
 */
export const createImageSchema = (url: string, width?: number, height?: number, alt?: string) => ({
  '@type': 'ImageObject',
  url,
  ...(width && { width }),
  ...(height && { height }),
  ...(alt && { description: alt }),
});

/**
 * Creates a basic organization schema
 */
export const createOrganizationSchema = () => ({
  '@type': 'Organization',
  name: 'Insuasti',
  url: 'https://insuasti.com/',
  founder: createPersonSchema(),
});

/**
 * Standard base URLs for the site
 */
export const SITE_URLS = {
  base: 'https://insuasti.com',
  blog: 'https://insuasti.com/blog',
  projects: 'https://insuasti.com/projects',
} as const;
