import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import { BlogPostCard } from './BlogPostCard';
import { Typography } from './Typography';
import { ArrowRight } from 'lucide-react';
import { SectionFullPage } from './SectionFullPage';
import { BlogPostMeta } from '@/lib/blog-types';

// Client version of BlogShowcase for Storybook
interface BlogShowcaseClientProps {
  latestPost: BlogPostMeta | null;
  highlightedPost: BlogPostMeta | null;
}

function BlogShowcaseClient({ latestPost, highlightedPost }: BlogShowcaseClientProps) {
  // Don't render the section if we have no posts
  if (!latestPost && !highlightedPost) {
    return (
      <SectionFullPage>
        <div className="container mx-auto mb-24">
          <div className="text-center py-12">
            <Typography as="h2" variant="h2" className="mb-4">
              Latest from the Blog
            </Typography>
            <Typography as="p" variant="p" className="text-muted-foreground">
              No blog posts available at the moment.
            </Typography>
          </div>
        </div>
      </SectionFullPage>
    );
  }

  return (
    <SectionFullPage>
      <div className="container mx-auto mb-24">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Typography as="h2" variant="h2" className="mb-4">
            Latest from the Blog
          </Typography>
          <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
            Discover insights, tutorials, and thoughts on frontend development, React, and modern
            web technologies.
          </Typography>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-8 md:grid-cols-12 md:gap-12">
          {/* Latest Post Section */}
          {latestPost && (
            <div className="flex flex-col gap-2 sm:col-span-8 md:col-span-6">
              <div className="mb-6 flex items-center justify-between">
                <Typography as="h3" variant="h3" className="text-primary">
                  Latest Post
                </Typography>
              </div>
              <div className="flex-grow max-w-none">
                <BlogPostCard post={latestPost} />
              </div>
            </div>
          )}

          {/* Highlighted Post Section */}
          {highlightedPost && (
            <div className="flex flex-col gap-2 sm:col-span-8 md:col-span-6">
              <div className="mb-6 flex items-center justify-between">
                <Typography as="h3" variant="h3" className="text-primary">
                  Featured Post
                </Typography>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  Highlighted
                </div>
              </div>
              <div className="flex-grow max-w-none">
                <BlogPostCard post={highlightedPost} />
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors border-transparent border-2 hover:bg-primary/90 hover:text-foreground hover:border-primary"
          >
            Explore All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionFullPage>
  );
}

// Sample blog posts for Storybook
const samplePosts: BlogPostMeta[] = [
  {
    slug: 'react-performance',
    title: 'Building Performant React Applications',
    excerpt: 'Learn essential techniques for optimizing React applications, from code splitting to memory management.',
    date: '2025-01-10',
    author: 'Juan Insuasti',
    tags: ['react', 'performance', 'optimization', 'frontend'],
    publish: '2025-01-10',
    highlighted: false,
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Discover advanced TypeScript patterns and practices that help maintain code quality in large-scale applications.',
    date: '2025-01-05',
    author: 'Juan Insuasti',
    tags: ['typescript', 'best-practices', 'architecture', 'frontend'],
    publish: '2025-01-05',
    highlighted: true,
  },
  {
    slug: 'hello-world',
    title: 'Hello World: Starting My Blog Journey',
    excerpt: 'Welcome to my blog! This is the first post where I share my thoughts on frontend development and web technologies.',
    date: '2025-01-15',
    author: 'Juan Insuasti',
    tags: ['introduction', 'frontend', 'blog'],
    publish: '2025-01-15',
    highlighted: false,
  },
];

export default {
  component: BlogShowcaseClient,
  title: 'UI/BlogShowcase',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A showcase section that displays the latest and highlighted blog posts on the homepage.',
      },
    },
  },
} satisfies Meta<typeof BlogShowcaseClient>;

export type Story = StoryObj<typeof BlogShowcaseClient>;

export const Default: Story = {
  args: {
    latestPost: samplePosts[2], // Most recent post by date
    highlightedPost: samplePosts[1], // Highlighted post
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state showing both latest and highlighted posts.',
      },
    },
  },
};

export const LatestPostOnly: Story = {
  args: {
    latestPost: samplePosts[0],
    highlightedPost: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only the latest post when no highlighted post is available.',
      },
    },
  },
};

export const HighlightedPostOnly: Story = {
  args: {
    latestPost: null,
    highlightedPost: samplePosts[1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only the highlighted post when no latest post is available.',
      },
    },
  },
};

export const NoPosts: Story = {
  args: {
    latestPost: null,
    highlightedPost: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no posts are available.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    latestPost: {
      ...samplePosts[0],
      title: 'How to Build Ultra-Performant React Applications with Advanced Optimization Techniques',
      excerpt: 'This is a comprehensive guide that covers everything you need to know about building highly performant React applications. We will explore advanced techniques including code splitting, lazy loading, memoization strategies, virtual scrolling, and much more to ensure your applications run smoothly even under heavy load.',
    },
    highlightedPost: {
      ...samplePosts[1],
      title: 'The Complete Guide to TypeScript Best Practices for Enterprise-Scale Applications',
      excerpt: 'An in-depth exploration of TypeScript patterns, architectural decisions, and development practices that have been proven to work in large-scale enterprise applications with hundreds of developers and millions of lines of code.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles posts with longer titles and excerpts.',
      },
    },
  },
};
