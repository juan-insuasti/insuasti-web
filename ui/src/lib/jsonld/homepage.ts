/**
 * JSON-LD schema for the homepage
 * Includes Person and WebSite schemas
 */
export const homepageJsonLd = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Juan Insuasti',
      url: 'https://insuasti.com/',
      description:
        'Frontend developer building sleek, accessible, high-performance web applications using React, TypeScript, Next.js, Remix, GraphQL, REST. Focused on scalable, intuitive UIs.',
      knowsTechnology: [
        'React',
        'TypeScript',
        'Next.js',
        'Remix',
        'GraphQL',
        'REST',
        'Accessibility',
        'UI/UX',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Frontend Developer',
      },
      workExample: [
        {
          '@type': 'CreativeWork',
          name: 'TTRPG Platform',
          description:
            'A platform for tabletop RPGs. Built with Next.js 15, React/TypeScript, Tailwind CSS, React-Query, dark mode theming, design system, Supabase backend.',
          url: 'https://insuasti.com/projects',
          dateCreated: '2025-08-09',
        },
        {
          '@type': 'CreativeWork',
          name: 'Personal Portfolio & Blog Platform',
          description:
            'Next.js 15 + React/TypeScript platform with reusable design system, dark mode theming, markdown content pipeline, SEO-ready pages.',
          url: 'https://insuasti.com/projects',
          dateCreated: '2025-05-12',
        },
      ],
      mainEntityOfPage: {
        '@type': 'WebSite',
        name: 'Insuasti',
        url: 'https://insuasti.com/',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Insuasti - Juan Insuasti Portfolio',
      url: 'https://insuasti.com/',
      description:
        'Portfolio and blog of Juan Insuasti, frontend developer specializing in React, TypeScript, and modern web technologies.',
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://insuasti.com/blog?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];
};
