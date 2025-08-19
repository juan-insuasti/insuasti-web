import { ProjectMeta } from '../project-types';

/**
 * JSON-LD schema for the projects page
 * Includes CollectionPage and WebPage schemas
 */
export const projectsPageJsonLd = (projects: ProjectMeta[] = []) => {
  const highlightedProjects = projects.filter((p) => p.highlighted).slice(0, 3);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects | Insuasti',
      url: 'https://insuasti.com/projects',
      description: "A curated selection of web and electronics projects I've built.",
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Insuasti',
        url: 'https://insuasti.com/',
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Featured Projects',
        numberOfItems: highlightedProjects.length,
        itemListElement: highlightedProjects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary,
            url: project.demoUrl || project.repoUrl,
            dateCreated: project.date,
            creator: {
              '@type': 'Person',
              name: 'Juan Insuasti',
              url: 'https://insuasti.com/',
            },
            keywords: project.tech,
            image: {
              '@type': 'ImageObject',
              url: `https://insuasti.com${project.coverImage}`,
            },
            codeRepository: project.repoUrl,
          },
        })),
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
            name: 'Projects',
            item: 'https://insuasti.com/projects',
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Projects | Insuasti',
      url: 'https://insuasti.com/projects',
      description: "A curated selection of web and electronics projects I've built.",
      isPartOf: {
        '@type': 'WebSite',
        name: 'Insuasti',
        url: 'https://insuasti.com/',
      },
      author: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      about: {
        '@type': 'Thing',
        name: 'Software Development Projects',
        description: 'Portfolio of web development and electronics projects',
      },
      keywords: [
        'projects',
        'portfolio',
        'React',
        'TypeScript',
        'Next.js',
        'web development',
        'electronics',
        'open source',
      ],
    },
  ];
};
