/**
 * JSON-LD schema for the about page
 * Includes AboutPage and WebPage schemas
 */
export const aboutPageJsonLd = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About | Juan Insuasti',
      url: 'https://insuasti.com/about',
      description:
        'Learn more about Juan Insuasti, Senior Frontend Engineer passionate about crafting delightful user experiences.',
      mainEntity: {
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
          'Frontend Development',
          'Web Development',
          'UI/UX Design',
          'Electronics',
          'IoT',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Independent',
        },
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Universidad Javeriana',
          },
        ],
        sameAs: [
          'https://github.com/juan-insuasti',
          'https://www.linkedin.com/in/jinsuasti/',
          'https://x.com/JuanInsuasti4',
          'https://medium.com/@juan.insuasti',
        ],
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Insuasti',
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
            name: 'About',
            item: 'https://insuasti.com/about',
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'About | insuasti.com',
      url: 'https://insuasti.com/about',
      description:
        'Discover the career and work of Juan Insuasti, a Senior Frontend Engineer specializing in React, TypeScript, and modern web architectures. Explore his background, projects, and passion for building scalable, user-focused digital experiences.',
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
      about: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        jobTitle: 'Senior Frontend Engineer',
      },
      keywords: [
        'about',
        'Juan Insuasti',
        'Senior Frontend Engineer',
        'React',
        'TypeScript',
        'Next.js',
        'frontend development',
        'web development',
        'UI/UX',
        'portfolio',
        'biography',
      ],
    },
  ];
};
