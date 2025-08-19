/**
 * JSON-LD schema for the blog listing page
 * Includes Blog and WebPage schemas
 */
export const blogPageJsonLd = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Insuasti Blog',
      url: 'https://insuasti.com/blog',
      description:
        'Articles on web development, electronics, and creative problem-solving. A mix of brain dumps, tech notes, and deep dives into frontend, web technologies, and electronics.',
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      publisher: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      inLanguage: 'en-US',
      keywords: [
        'web development',
        'frontend',
        'React',
        'TypeScript',
        'Next.js',
        'electronics',
        'IoT',
        'programming',
        'tech articles',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Blog | insuasti.com',
      url: 'https://insuasti.com/blog',
      description: 'Articles on web development, electronics, and creative problem-solving.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Juan Insuasti | insuasti.com',
        url: 'https://insuasti.com/',
      },
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://insuasti.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://insuasti.com/blog',
          },
        ],
      },
    },
  ];
};
