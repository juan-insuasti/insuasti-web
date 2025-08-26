import type { Meta, StoryObj } from '@storybook/react';
import { BlogPostCard } from './BlogPostCard';
import { BlogPostMeta } from '@/lib/blog-types';

const meta: Meta<typeof BlogPostCard> = {
  title: 'Blog/PostCard',
  component: BlogPostCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      description: 'Blog post metadata object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePost: BlogPostMeta = {
  slug: 'hello-world',
  title: 'Hello World: Starting My Blog Journey',
  date: '2025-01-15',
  author: 'Juan Insuasti',
  excerpt: 'Welcome to my blog! This is the first post where I share my thoughts on frontend development and web technologies.',
  tags: ['introduction', 'frontend', 'blog'],
};

const longPost: BlogPostMeta = {
  slug: 'building-performant-react-applications',
  title: 'Building Performant React Applications with Advanced Optimization Techniques',
  date: '2025-01-10',
  author: 'Juan Insuasti',
  excerpt: 'Learn essential techniques for optimizing React applications, from code splitting to memory management. This is a longer excerpt to demonstrate how the component handles more text content and how it truncates properly.',
  tags: ['react', 'performance', 'optimization', 'frontend', 'javascript', 'typescript'],
};

const minimalPost: BlogPostMeta = {
  slug: 'short-post',
  title: 'Short Post',
  date: '2025-01-01',
  author: 'Author',
  excerpt: 'Brief excerpt.',
  tags: ['tag'],
};

export const Default: Story = {
  args: {
    post: samplePost,
  },
};

export const LongContent: Story = {
  args: {
    post: longPost,
  },
};

export const MinimalContent: Story = {
  args: {
    post: minimalPost,
  },
};

export const ManyTags: Story = {
  args: {
    post: {
      ...samplePost,
      tags: ['react', 'nextjs', 'typescript', 'tailwind', 'storybook', 'testing', 'performance'],
    },
  },
};

export const NoTags: Story = {
  args: {
    post: {
      ...samplePost,
      tags: [],
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BlogPostCard post={samplePost} />
      <BlogPostCard post={longPost} />
      <BlogPostCard post={minimalPost} />
      <BlogPostCard post={{ ...samplePost, slug: 'post-4', title: 'Another Post' }} />
      <BlogPostCard post={{ ...longPost, slug: 'post-5', title: 'Fifth Post' }} />
      <BlogPostCard post={{ ...minimalPost, slug: 'post-6', title: 'Sixth Post' }} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
