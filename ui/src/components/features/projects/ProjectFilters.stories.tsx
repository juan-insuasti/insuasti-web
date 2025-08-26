import type { Meta, StoryObj } from '@storybook/react';

import { ProjectFilters, type ProjectFiltersProps } from '@features/projects/ProjectFilters';

const meta: Meta<typeof ProjectFilters> = {
  title: 'Projects/ProjectFilters',
  component: ProjectFilters,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/projects',
        query: {},
      },
    },
    docs: {
      description: {
        component:
          "Interactive filters for searching and narrowing projects by technology. URL updates are simulated via Storybook's Next.js navigation parameter.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    allTech: { description: 'All available tech strings' },
    currentTechCsv: { description: 'Comma separated list of initially selected tech' },
    currentSearch: { description: 'Initial search query' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const techList = [
  'nextjs',
  'react',
  'typescript',
  'tailwindcss',
  'shadcnui',
  'radix-ui',
  'openai',
  'vercel',
  'node',
  'css',
];

export const Default: Story = {
  args: {
    allTech: techList,
  } satisfies ProjectFiltersProps,
};

export const WithSelectedTech: Story = {
  args: {
    allTech: techList,
    currentTechCsv: 'react,typescript',
  } satisfies ProjectFiltersProps,
};

export const WithSearch: Story = {
  args: {
    allTech: techList,
    currentSearch: 'dashboard',
  } satisfies ProjectFiltersProps,
};

export const WithBoth: Story = {
  args: {
    allTech: techList,
    currentTechCsv: 'nextjs,openai',
    currentSearch: 'ai',
  } satisfies ProjectFiltersProps,
};

export const ManyTech: Story = {
  args: {
    allTech: [
      'nextjs',
      'react',
      'typescript',
      'tailwindcss',
      'shadcnui',
      'radix-ui',
      'openai',
      'vercel',
      'node',
      'css',
      'zustand',
      'graphql',
      'docker',
      'postgres',
      'redis',
      'prisma',
      'playwright',
      'vitest',
    ],
    currentTechCsv: 'react,tailwindcss,graphql',
  } satisfies ProjectFiltersProps,
};

export const NoTech: Story = {
  args: {
    allTech: [],
  } satisfies ProjectFiltersProps,
};
