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
      givenName: 'Juan',
      familyName: 'Insuasti',
      url: 'https://insuasti.com/',
      email: 'juan.insuasti@gmail.com',
      jobTitle: 'Senior Frontend Engineer',
      description:
        'Juan Insuasti is a Senior Frontend Engineer with expertise in React, TypeScript, and modern web frameworks such as Next.js and Remix. He focuses on creating scalable, performant, and accessible user interfaces, collaborating with product and design teams to deliver impactful solutions across international and cross-functional environments.',
      knowsAbout: [
        'React',
        'TypeScript',
        'Next.js',
        'Remix',
        'GraphQL',
        'REST',
        'HTML',
        'CSS',
        'JavaScript',
        'Sass',
        'Tailwind CSS',
        'CSS Modules',
        'ReactQuery',
        'Redux',
        'Zustand',
        'Jest',
        'Vitest',
        'Storybook',
        'Cypress',
        'Node.js',
        'Vercel',
        'AWS',
        'Google Cloud',
        'Docker',
        'Accessibility',
        'WCAG AA',
        'UI/UX',
        'Performance',
        'Architecture',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Medellín',
        addressRegion: 'Antioquia',
        addressCountry: 'CO',
      },
      sameAs: [
        'https://github.com/juan-insuasti',
        'https://www.linkedin.com/in/jinsuasti/',
        'https://x.com/JuanInsuasti4',
        'https://medium.com/@juan.insuasti',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Frontend Engineer',
        description:
          'Building user-friendly web applications with a focus on performance and accessibility.',
        occupationLocation: {
          '@type': 'AdministrativeArea',
          name: 'Medellín, Colombia',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Medellín',
            addressRegion: 'Antioquia',
            addressCountry: 'CO',
          },
        },
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Universidad Javeriana',
        location: {
          '@type': 'Place',
          name: 'Bogotá, Colombia',
        },
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'undergraduate',
        name: 'Electronic Engineer',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Universidad Javeriana',
        },
      },
      knowsLanguage: [
        {
          '@type': 'Language',
          name: 'Spanish',
        },
        {
          '@type': 'Language',
          name: 'English',
        },
        {
          '@type': 'Language',
          name: 'Japanese',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Frontend Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'React Development',
              description: 'Building scalable React applications with TypeScript',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Next.js Development',
              description: 'Full-stack Next.js applications with modern tooling',
            },
          },
        ],
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        url: 'https://insuasti.com/',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Juan Insuasti | insuasti.com',
      alternateName: 'Insuasti',
      url: 'https://insuasti.com/',
      description:
        'Portfolio and blog of Juan Insuasti, Senior Frontend Engineer specializing in React, TypeScript, Next.js, and modern web technologies.',
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        jobTitle: 'Senior Frontend Engineer',
      },
      publisher: {
        '@type': 'Person',
        name: 'Juan Insuasti',
      },
      inLanguage: ['en'],
      mainEntity: {
        '@type': 'Person',
        name: 'Juan Insuasti',
      },
    },
  ];
};
