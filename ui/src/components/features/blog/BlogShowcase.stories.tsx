import type { Meta, StoryObj } from '@storybook/react';

import { BlogFilters } from '@features/blog/BlogFilters';
import { BlogPostCard } from '@features/blog/BlogPostCard';
import { Pagination } from '@ui/Pagination';
import { Typography } from '@ui/Typography';

import { BlogPostMeta, PaginatedBlogPosts } from '@lib/blog-types';

const meta: Meta = {
  title: 'Pages/Blog Showcase',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePosts: BlogPostMeta[] = [
  {
    slug: 'hello-world',
    title: 'Hello World: Starting My Blog Journey',
    date: '2025-01-15',
    author: 'Juan Insuasti',
    excerpt:
      'Welcome to my blog! This is the first post where I share my thoughts on frontend development and web technologies.',
    tags: ['introduction', 'frontend', 'blog'],
  },
  {
    slug: 'react-performance',
    title: 'Building Performant React Applications',
    date: '2025-01-10',
    author: 'Juan Insuasti',
    excerpt:
      'Learn essential techniques for optimizing React applications, from code splitting to memory management.',
    tags: ['react', 'performance', 'optimization', 'frontend'],
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    date: '2025-01-05',
    author: 'Juan Insuasti',
    excerpt:
      'Discover advanced TypeScript patterns and practices that help maintain code quality in large-scale applications.',
    tags: ['typescript', 'best-practices', 'architecture', 'frontend'],
  },
  {
    slug: 'nextjs-advanced-routing',
    title: 'Advanced Routing Patterns in Next.js',
    date: '2025-01-03',
    author: 'Juan Insuasti',
    excerpt:
      'Explore advanced routing techniques and patterns in Next.js for building complex applications.',
    tags: ['nextjs', 'routing', 'react', 'frontend'],
  },
  {
    slug: 'css-grid-mastery',
    title: 'Mastering CSS Grid for Modern Layouts',
    date: '2025-01-01',
    author: 'Juan Insuasti',
    excerpt:
      'Learn how to create complex, responsive layouts using CSS Grid with practical examples and tips.',
    tags: ['css', 'grid', 'layout', 'frontend'],
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization Strategies',
    date: '2024-12-28',
    author: 'Juan Insuasti',
    excerpt:
      'Comprehensive guide to optimizing web performance including Core Web Vitals and loading strategies.',
    tags: ['performance', 'optimization', 'web-vitals', 'frontend'],
  },
];

const allTags = [
  'introduction',
  'frontend',
  'blog',
  'react',
  'performance',
  'optimization',
  'typescript',
  'best-practices',
  'architecture',
  'nextjs',
  'routing',
  'css',
  'grid',
  'layout',
  'web-vitals',
];

const paginatedData: PaginatedBlogPosts = {
  posts: samplePosts,
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalPosts: 18,
    postsPerPage: 6,
    hasNextPage: true,
    hasPrevPage: false,
  },
};

export const BlogPage: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <Typography as="h1" variant="h1" className="mb-4">
            Blog
          </Typography>
          <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
            Thoughts, tutorials, and insights on frontend development, React, TypeScript, and web
            technologies.
          </Typography>
        </header>

        {/* Filters */}
        <BlogFilters allTags={allTags} />

        {/* Posts Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination paginatedData={paginatedData} />
      </div>
    </div>
  ),
};

export const BlogPageWithFilters: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <Typography as="h1" variant="h1" className="mb-4">
            Blog - Filtered Results
          </Typography>
          <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
            Showing posts filtered by &ldquo;react&rdquo; tag and &ldquo;performance&rdquo; search.
          </Typography>
        </header>

        {/* Filters with active filters */}
        <BlogFilters allTags={allTags} currentTag="react" currentSearch="performance" />

        {/* Filtered Posts */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard post={samplePosts[1]} />
        </div>

        {/* Pagination for filtered results */}
        <Pagination
          paginatedData={{
            posts: [samplePosts[1]],
            pagination: {
              currentPage: 1,
              totalPages: 1,
              totalPosts: 1,
              postsPerPage: 6,
              hasNextPage: false,
              hasPrevPage: false,
            },
          }}
        />
      </div>
    </div>
  ),
};

export const BlogPageEmpty: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <Typography as="h1" variant="h1" className="mb-4">
            Blog
          </Typography>
          <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
            Thoughts, tutorials, and insights on frontend development, React, TypeScript, and web
            technologies.
          </Typography>
        </header>

        {/* Empty state */}
        <div className="py-12 text-center">
          <Typography as="h3" variant="h3" className="mb-4">
            No blog posts yet
          </Typography>
          <Typography as="p" variant="p" className="text-muted-foreground">
            Check back soon for new content!
          </Typography>
        </div>
      </div>
    </div>
  ),
};
