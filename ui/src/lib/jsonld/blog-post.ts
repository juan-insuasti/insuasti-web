import { BlogPost } from '../blog-types';

/**
 * JSON-LD schema for individual blog posts
 * Includes BlogPosting, WebPage, and Article schemas
 */
export const blogPostJsonLd = (post: BlogPost) => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://insuasti.com/blog/${post.slug}`,
      datePublished: post.publish || post.date,
      dateModified: post.publish || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      publisher: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      keywords: post.tags,
      articleSection: 'Technology',
      inLanguage: 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://insuasti.com/blog/${post.slug}`,
      },
      isPartOf: {
        '@type': 'Blog',
        name: 'Blog | insuasti.com',
        url: 'https://insuasti.com/blog',
      },
      image: {
        '@type': 'ImageObject',
        url: 'https://insuasti.com/og.png?v=2',
        width: 1200,
        height: 630,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${post.title} | Blog | Insuasti`,
      url: `https://insuasti.com/blog/${post.slug}`,
      description: post.excerpt,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Insuasti',
        url: 'https://insuasti.com/',
      },
      author: {
        '@type': 'Person',
        name: post.author || 'Juan Insuasti',
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
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://insuasti.com/blog/${post.slug}`,
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      url: `https://insuasti.com/blog/${post.slug}`,
      datePublished: post.publish || post.date,
      dateModified: post.publish || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      publisher: {
        '@type': 'Person',
        name: 'Juan Insuasti',
        url: 'https://insuasti.com/',
      },
      articleSection: post.tags.length > 0 ? post.tags[0] : 'Technology',
      keywords: post.tags,
      image: {
        '@type': 'ImageObject',
        url: 'https://insuasti.com/og.png?v=2',
        width: 1200,
        height: 630,
      },
    },
  ];
};
