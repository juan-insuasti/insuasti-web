import type { Meta, StoryObj } from '@storybook/react';

import { BlogFilters } from '@features/blog/BlogFilters';

const meta: Meta<typeof BlogFilters> = {
  title: 'Blog/Filters',
  component: BlogFilters,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    allTags: {
      description: 'Array of all available tags',
    },
    currentTag: {
      description: 'Currently selected tag',
    },
    currentSearch: {
      description: 'Current search query',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTags = [
  'react',
  'typescript',
  'nextjs',
  'frontend',
  'performance',
  'optimization',
  'javascript',
  'css',
  'tailwind',
  'storybook',
];

export const Default: Story = {
  args: {
    allTags: sampleTags,
  },
};

export const WithSelectedTag: Story = {
  args: {
    allTags: sampleTags,
    currentTag: 'react',
  },
};

export const WithSearchQuery: Story = {
  args: {
    allTags: sampleTags,
    currentSearch: 'performance',
  },
};

export const WithBothFilters: Story = {
  args: {
    allTags: sampleTags,
    currentTag: 'typescript',
    currentSearch: 'optimization',
  },
};

export const ManyTags: Story = {
  args: {
    allTags: [
      'react',
      'typescript',
      'nextjs',
      'frontend',
      'backend',
      'performance',
      'optimization',
      'javascript',
      'css',
      'tailwind',
      'storybook',
      'testing',
      'debugging',
      'architecture',
      'design-patterns',
      'web-development',
      'mobile',
      'api',
      'database',
      'devops',
    ],
  },
};

export const FewTags: Story = {
  args: {
    allTags: ['react', 'typescript', 'frontend'],
  },
};

export const NoTags: Story = {
  args: {
    allTags: [],
  },
};
